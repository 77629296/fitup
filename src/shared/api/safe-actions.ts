import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type HandleReturnedServerError = (e: Error) => string;
const handleReturnedServerError: HandleReturnedServerError = (e) => {
  if (e instanceof ActionError) {
    return e.message;
  }

  return "An unexpected error occurred.";
};

export const actionClient = createSafeActionClient({
  handleServerError: handleReturnedServerError,
});
