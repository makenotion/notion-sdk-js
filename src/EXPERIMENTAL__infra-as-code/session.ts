import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import path = require("node:path")

import type { InfraAsCodeApiResult } from "./api"
import { isEnoentError } from "./utils"

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
 * Reads optional existing resource mappings used to make reruns incremental.
 */
export async function readSessionState(
  existingResourcesFilePath: string | undefined
): Promise<InfraAsCodeSessionInput> {
  if (existingResourcesFilePath === undefined) {
    return emptySessionState()
  }

  try {
    const parsed = JSON.parse(
      await readFile(existingResourcesFilePath, "utf8")
    )

    return {
      existingResources: parsed?.existingResources ?? {},
      existingProperties: parsed?.existingProperties ?? {},
    }
  } catch (error) {
    if (isEnoentError(error)) {
      return emptySessionState()
    }
    throw error
  }
}

/**
 * Writes the next session-state file using the API result mapping names.
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
 * Creates a unique default path where the next session-state file can be saved.
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
 * Provides empty mappings when no session-state file exists yet.
 */
function emptySessionState(): InfraAsCodeSessionInput {
  return {
    existingResources: {},
    existingProperties: {},
  }
}
