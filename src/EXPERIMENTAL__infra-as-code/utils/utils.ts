import { InfraAsCodeRunParameters, InfraAsCodeRunResponse } from "./run"

export type CommandLineArgs = {
  scriptFilePath?: string
  sessionStateFilePath?: string
  spaceId?: string
}

const DEFAULT_SESSION_STATE_DIRECTORY =
  "./src/EXPERIMENTAL__infra-as-code/sessions"

/**
 * Parses supported command-line flags for the infra as code example runner.
 *
 * Flags can be passed as either `--name=value` or `--name value`.
 */
export function parseCommandLineArgs(argv: string[]): CommandLineArgs {
  const args: CommandLineArgs = {}

  for (let index = 0; index < argv.length; index++) {
    const rawArg = argv[index]
    if (rawArg === undefined || !rawArg.startsWith("--")) {
      throw new Error(`Expected a flag such as --scriptFilePath, got ${rawArg}`)
    }

    const rawOption = rawArg.slice(2)
    const equalsIndex = rawOption.indexOf("=")
    const name =
      equalsIndex === -1 ? rawOption : rawOption.slice(0, equalsIndex)
    const value =
      equalsIndex === -1 ? argv[index + 1] : rawOption.slice(equalsIndex + 1)

    if (!isCommandLineArgName(name)) {
      throw new Error(
        `Unknown flag --${name}. Use --scriptFilePath, --sessionStateFilePath, or --spaceId.`
      )
    }

    if (value === undefined || value.length === 0 || value.startsWith("--")) {
      throw new Error(`Missing value for --${name}`)
    }

    args[name] = value

    if (equalsIndex === -1) {
      index++
    }
  }

  return args
}

/**
 * Builds runnable infra as code args from parsed CLI flags.
 *
 * If `--scriptFilePath` is missing, this prints a friendly command example and
 * sets the process exit code instead of throwing a stack trace.
 */
export function buildRunArgsFromCommandLineArgs({
  scriptFilePath,
  sessionStateFilePath,
  spaceId,
}: CommandLineArgs): InfraAsCodeRunParameters | undefined {
  if (!isDefined(scriptFilePath)) {
    console.error(
      `You have not provided a --scriptFilePath. You can try the example script with this command:

npm run build
NOTION_TOKEN=<personal-access-token> node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<workspace-id> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts`
    )
    process.exitCode = 1
    return undefined
  }

  return {
    scriptFilePath,
    sessionStateFilePath,
    spaceId,
  }
}

/**
 * Prints the success message for the example command-line runner.
 */
export function printInfraAsCodeRunSuccessMessage({
  result,
  runArgs,
}: {
  result: InfraAsCodeRunResponse
  runArgs: InfraAsCodeRunParameters
}): void {
  const workspace =
    runArgs.spaceId === undefined
      ? "Your workspace"
      : `Your workspace ${runArgs.spaceId}`

  console.log(
    `✅ ${workspace} has been successfully updated with ${runArgs.scriptFilePath}.
The session-state file has been saved to ${result.sessionStateFilePath}.

To run new scripts against this workspace, run the following command:
npm run build && node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --scriptFilePath=<YOUR_NEW_SCRIPT_FILE_PATH> --sessionStateFilePath=${result.sessionStateFilePath}`
  )
}

/**
 * Creates a session-state file path using a compact UTC timestamp.
 */
export function createTimestampedSessionStateFilePath(
  date: Date = new Date()
): string {
  const timestamp = date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z")

  return `${DEFAULT_SESSION_STATE_DIRECTORY}/sessionState_${timestamp}.json`
}

/**
 * Returns whether a command-line flag name is supported by the runner.
 */
function isCommandLineArgName(name: string): name is keyof CommandLineArgs {
  return (
    name === "scriptFilePath" ||
    name === "sessionStateFilePath" ||
    name === "spaceId"
  )
}

/**
 * Returns whether a caught filesystem error means a file was not found.
 */
export function isFileNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  )
}

/**
 * Returns whether a value is a record, excluding arrays.
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Returns whether a value is a string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string"
}

/**
 * Type predicate: signals that `value` is defined, and of type `T`, in this
 * branch.
 *
 * NOTE: This can now usually be inlined: modern TypeScript will safely
 * infer `value => value !== undefined` to be a type guard (#57465).
 */
export function isDefined<T>(value: T | undefined): value is T {
  if (value !== undefined) {
    value satisfies T
    return true
  }
  return false
}
