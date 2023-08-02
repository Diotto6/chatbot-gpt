export function isErrorWithMessage(error: unknown): error is { message: unknown } {
  return typeof error === "object" && error !== null && "message" in error;
}
