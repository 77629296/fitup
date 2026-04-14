import { NextResponse } from "next/server";

import type { TypeOf, ZodError, ZodSchema } from "zod";
import type { NextRequest } from "next/server";

export type HandleReturnedServerErrorFn = (e: unknown) => NextResponse | string;

export type MiddlewareFn<TContext> = (req: NextRequest) => Promise<TContext>;

type CreateHandlerParams<TContext> = {
  middleware?: MiddlewareFn<TContext>;
  handleReturnedServerError?: HandleReturnedServerErrorFn;
};

type HandlerParams<TBody, TParams, TSearchParams> = {
  bodySchema?: TBody;
  searchSchema?: TSearchParams;
  paramsSchema?: TParams;
};

type Callback<TContext, TBody, TParams, TSearchParams> = (params: {
  request: NextRequest;
  context: TContext;
  body: TBody extends ZodSchema ? TypeOf<TBody> : undefined;
  searchParams: TSearchParams extends ZodSchema ? TypeOf<TSearchParams> : undefined;
  params: TParams extends ZodSchema ? TypeOf<TParams> : undefined;
}) => Promise<Response> | Response;

class CustomZodError extends Error {
  type: "body" | "params";
  zodError: ZodError;
  received: unknown;
  constructor(type: "body" | "params", zodError: ZodError, received?: unknown) {
    super();
    this.type = type;
    this.zodError = zodError;
    this.received = received;
  }
}

export function createSafeHandler<TContext>({ middleware, handleReturnedServerError }: CreateHandlerParams<TContext>) {
  function handler<TBody extends ZodSchema | undefined, TParams extends ZodSchema | undefined, TSearchParams extends ZodSchema | undefined>(
    { bodySchema, searchSchema, paramsSchema }: HandlerParams<TBody, TParams, TSearchParams>,
    callback: Callback<TContext, TBody, TParams, TSearchParams>,
  ) {
    return async (req: NextRequest, { params: baseParams }: { params: Promise<Record<string, string | string[]>> }) => {
      try {
        const body = await parseBody(req, bodySchema);
        const searchParams = await parseSearchParams(req, searchSchema);
        const params = await parseParams(baseParams, paramsSchema);

        const context = await middleware?.(req);

        const response = await callback({
          request: req,
          body: body as never,
          context: context as never,
          searchParams: searchParams as never,
          params: params as never,
        });

        return response;
      } catch (error: unknown) {
        // check if error is from zod
        if (error instanceof CustomZodError) {
          return NextResponse.json(
            {
              error: `Invalid ${error.type}.`,
              validation: error.zodError.errors,
              received: error.received,
            },
            {
              status: 400,
            },
          );
        }

        const returnedError = handleReturnedServerError?.(error);

        if (returnedError && typeof returnedError !== "string") {
          return returnedError;
        }

        return NextResponse.json(
          {
            error: returnedError ?? "An unexpected error occurred.",
          },
          {
            status: 400,
          },
        );
      }
    };
  }

  return handler;
}

const parseBody = async <T>(req: NextRequest, schema?: ZodSchema<T>) => {
  let parsedBody: T | undefined = undefined;

  if (schema && req.method !== "GET") {
    const json = await req.json();
    const bodyParseResult = schema.safeParse(json);
    if (bodyParseResult.success) {
      parsedBody = bodyParseResult.data;
    } else {
      throw new CustomZodError("body", bodyParseResult.error, json);
    }
  }
  return parsedBody;
};

const parseSearchParams = async <T>(req: NextRequest, schema?: ZodSchema<T>) => {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const params = {} as Record<string, string | string[]>;

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  let parsedSearchParams: T | undefined = undefined;

  if (schema) {
    const paramsParseResult = schema.safeParse(params);
    if (paramsParseResult.success) {
      parsedSearchParams = paramsParseResult.data;
    } else {
      throw new CustomZodError("params", paramsParseResult.error, params);
    }
  }

  return parsedSearchParams;
};

const parseParams = async <T>(params: Promise<Record<string, string | string[]>>, schema?: ZodSchema<T>) => {
  let parsedParams: T | undefined = undefined;
  const resolvedParams = await params;

  if (schema) {
    const paramsParseResult = schema.safeParse(resolvedParams);
    if (paramsParseResult.success) {
      parsedParams = paramsParseResult.data;
    } else {
      throw new CustomZodError("params", paramsParseResult.error, resolvedParams);
    }
  }

  return parsedParams;
};
