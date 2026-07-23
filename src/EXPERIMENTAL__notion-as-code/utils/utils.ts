import { createInterface } from "node:readline/promises"

import chalk = require("chalk")

import type { NotionAsCodeRunParameters, NotionAsCodeRunResponse } from "./run"

export type CommandLineArgs = {
  scriptFilePath?: string
  sessionStateFilePath?: string
  spaceId?: string
}

const DEFAULT_SESSION_STATE_DIRECTORY =
  "./src/EXPERIMENTAL__notion-as-code/sessions"

/**
 * Parses supported command-line flags for the Notion as Code example runner.
 *
 * Flags can be passed as either `--name=value` or `--name value`.
 */
export function parseCommandLineArgs(argv: string[]): CommandLineArgs {
  const args: CommandLineArgs = {}

  for (let index = 0; index < argv.length; index++) {
    const rawArg = argv[index]
    if (!isDefined(rawArg) || !rawArg.startsWith("--")) {
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

    if (!isDefined(value) || value.length === 0 || value.startsWith("--")) {
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
 * Builds runnable Notion as Code args from parsed CLI flags.
 *
 * If required flags are missing, this prints a friendly command example and
 * sets the process exit code instead of throwing a stack trace.
 */
export function buildRunArgsFromCommandLineArgs({
  scriptFilePath,
  sessionStateFilePath,
  spaceId,
}: CommandLineArgs) {
  if (!isDefined(scriptFilePath)) {
    console.error(
      chalk.red(`You have not provided a --scriptFilePath. You can try the example script with this command:

npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts`)
    )
    process.exitCode = 1
    return undefined
  }

  if (!isDefined(spaceId)) {
    console.error(
      chalk.red(`Make sure to attach your workspace ID with --spaceId. You can run this command:

npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=${scriptFilePath}`)
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
export function printNotionAsCodeRunSuccessMessage({
  result,
  runArgs,
}: {
  result: NotionAsCodeRunResponse
  runArgs: NotionAsCodeRunParameters
}): void {
  const workspace = `Your workspace ${runArgs.spaceId}`
  const successMessage = chalk.green(
    `✅ ${workspace} has been successfully updated with ${runArgs.scriptFilePath}. The session-state file has been saved to ${result.sessionStateFilePath}`
  )
  const nextStepsMessage = chalk.blue(
    `To run new scripts against this workspace, run the following command:
npm run notion-as-code -- --scriptFilePath=${runArgs.scriptFilePath} --spaceId=${runArgs.spaceId} --sessionStateFilePath=${result.sessionStateFilePath}`
  )

  console.log(`${successMessage}\n\n${nextStepsMessage}`)
}

/**
 * Warns that omitting a previously generated session state may duplicate work.
 */
export function printMissingSessionStateWarning(): void {
  console.warn(
    chalk.yellow(`⚠️ No session-state file was provided. This is expected for a first run.
If this script was previously deployed, running it without --sessionStateFilePath may create duplicate resources.\n`)
  )
}

/**
 * Confirms whether a run without session state should continue.
 */
export async function confirmRunWithoutSessionState(
  askForConfirmation: (
    prompt: string
  ) => Promise<string> = askUserForConfirmation
): Promise<boolean> {
  const answer = await askForConfirmation("Continue? (y/N) ")
  return ["y", "yes"].includes(answer.trim().toLowerCase())
}

async function askUserForConfirmation(prompt: string): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return ""
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    return await readline.question(chalk.yellow(prompt))
  } finally {
    readline.close()
  }
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
