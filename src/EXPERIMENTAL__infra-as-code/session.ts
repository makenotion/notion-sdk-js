import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import path = require("node:path")

import type { InfraAsCodeApiResult } from "./api"
import { isFileNotFoundError } from "./utils"

export const DEFAULT_SESSION_STATE_FILE_DIRECTORY = path.resolve(
  process.cwd(),
  "tmp",
  "infra-as-code",
  "sessions"
)

export const DEFAULT_SESSION_STATE_FILE_PREFIX = "infra-as-code-session-state"

export type InfraAsCodeSessionInput = {
  existingResources: Record<string, unknown>
  existingProperties: Record<string, string>
}

type InfraAsCodeSessionOutput = {
  resourceIdToPointerMappings: Record<string, unknown>
  resourceIdToPropertyIdMappings: Record<string, string>
}

/**
 * Reads mappings that let a script target existing Notion resources.
 *
 * A missing file is treated as empty state so first-time tests can run before
 * any mappings have been generated.
 */
export async function readSessionState(
  existingResourcesFilePath: string | undefined
): Promise<InfraAsCodeSessionInput> {
  if (existingResourcesFilePath === undefined) {
    return emptySessionState()
  }

  try {
    const parsed = JSON.parse(await readFile(existingResourcesFilePath, "utf8"))

    return {
      existingResources: parsed?.existingResources ?? {},
      existingProperties: parsed?.existingProperties ?? {},
    }
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return emptySessionState()
    }
    throw error
  }
}

/**
 * Writes the resource mappings returned by an infra as code run.
 *
 * This does not mutate the input mapping file. Each run gets its own output
 * file unless the caller provides a specific `sessionStateFilePath`.
 */
export async function writeSessionState(
  sessionStateFilePath: string,
  priorState: InfraAsCodeSessionInput,
  result: InfraAsCodeApiResult
): Promise<void> {
  const nextState: InfraAsCodeSessionOutput = {
    resourceIdToPointerMappings: {
      ...priorState.existingResources,
      ...(result.resourceIdToPointerMappings ?? {}),
    },
    resourceIdToPropertyIdMappings: {
      ...priorState.existingProperties,
      ...(result.resourceIdToPropertyIdMappings ?? {}),
    },
  }

  await writeFile(
    sessionStateFilePath,
    `${JSON.stringify(nextState, null, 2)}\n`,
    "utf8"
  )
}

/**
 * Creates a unique default path for the session-state file from this run.
 */
export async function createDefaultSessionStateFilePath(): Promise<string> {
  await mkdir(DEFAULT_SESSION_STATE_FILE_DIRECTORY, { recursive: true })
  const tempDir = await mkdtemp(
    path.join(
      DEFAULT_SESSION_STATE_FILE_DIRECTORY,
      `${DEFAULT_SESSION_STATE_FILE_PREFIX}-`
    )
  )
  return path.join(tempDir, "session-state.json")
}

/**
 * Provides empty mappings when no existing resource file is supplied.
 */
function emptySessionState(): InfraAsCodeSessionInput {
  return {
    existingResources: {},
    existingProperties: {},
  }
}
