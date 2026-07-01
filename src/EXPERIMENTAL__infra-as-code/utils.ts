/**
 * Returns whether a caught filesystem error means "file not found".
 */
export function isEnoentError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  )
}
