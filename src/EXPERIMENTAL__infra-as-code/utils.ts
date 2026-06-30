import path = require("node:path")

export const DEFAULT_SESSION_STATE_FILE_DIRECTORY = path.resolve(
  process.cwd(),
  "tmp",
  "infra-as-code",
  "sessions"
)

export const DEFAULT_SESSION_STATE_FILE_PREFIX = "infra-as-code-session-state"

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
