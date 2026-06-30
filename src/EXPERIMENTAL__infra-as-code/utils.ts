import path = require("node:path")

export const DEFAULT_SESSION_STATE_FILE_DIRECTORY = path.resolve(
  process.cwd(),
  "tmp",
  "infra-as-code",
  "sessions"
)

export const DEFAULT_SESSION_STATE_FILE_PREFIX = "infra-as-code-session-state"

/**
 * Extracts Node-style error codes such as `ENOENT` from caught values.
 */
export function getErrorCode(error: unknown): string | undefined {
  return typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
    ? error.code
    : undefined
}
