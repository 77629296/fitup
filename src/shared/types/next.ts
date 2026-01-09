import type { ReactNode } from "react";

/**
 * @name PageParams
 *
 * @usage
 * In NextJS, params are the dynamic parts of the URL.
 * For example, if you have a page with the route `/posts/[id]`, then `id` is a param.
 *
 * You can then use the `PageParams` type to define the type of the params.
 *
 * ```tsx
 * export default function Page(params: PageParams<{ id: string }>) {
 *   ...
 * }
 * ```
 */
export type PageParams<T extends Record<string, string> = {}> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * @name LayoutParams
 *
 * @usage
 * In NextJS, params can be defined also in the layout.
 *
 * For an example, this file `/app/users/[userId]/layout.tsx` will have the following params:
 *
 * ```tsx
 * export default function Layout(params: LayoutParams<{ userId: string }>) {
 *   ...
 * }
 * ```
 */
export type LayoutParams<T extends Record<string, string> = {}> = {
  params: Promise<T>;
  children?: ReactNode | undefined;
};

/**
 * @name ErrorParams
 *
 * @usage
 * This type is used to define the parameters of the `error.tsx` page.
 */
export type ErrorParams = {
  error: Error & { digest?: string };
  reset: () => void;
};
