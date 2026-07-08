import { mkdir, readFile, writeFile } from "node:fs/promises"
import path = require("node:path")

import type { InfraAsCodeApiResult } from "./api"
import { isFileNotFoundError } from "./utils"

export type InfraAsCodeSessionState = {
  resourceIdToPointerMappings: Record<string, unknown>
  resourceIdToPropertyIdMappings: Record<string, string>
}

type InfraAsCodeSessionStateFile = Partial<InfraAsCodeSessionState> & {
  existingResources?: Record<string, unknown>
  existingProperties?: Record<string, string>
}

/**
 * Reads the persisted session state for an infra as code run.
 *
 * The preferred persisted shape uses resourceIdTo* keys. For compatibility,
 * this also accepts the user/importer-facing existingResources wrapper.
 */
export async function readSessionState(
  sessionStateFilePath: string
): Promise<InfraAsCodeSessionState> {
  const parsed = await readSessionStateFile(sessionStateFilePath)

  return {
    resourceIdToPointerMappings:
      parsed?.resourceIdToPointerMappings ?? parsed?.existingResources ?? {},
    resourceIdToPropertyIdMappings:
      parsed?.resourceIdToPropertyIdMappings ??
      parsed?.existingProperties ??
      {},
  }
}

/**
 * Reads and parses a session-state file with user-facing error messages.
 */
async function readSessionStateFile(
  sessionStateFilePath: string
): Promise<InfraAsCodeSessionStateFile | null> {
  try {
    return JSON.parse(await readFile(sessionStateFilePath, "utf8"))
  } catch (error) {
    if (isFileNotFoundError(error)) {
      throw new Error(
        `Infra as code session state not found: ${sessionStateFilePath}`
      )
    }

    throw new Error(
      `Unable to read infra as code session state at ${sessionStateFilePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

/**
 * Writes the next session state back to the same session-state file.
 */
export async function writeSessionState(
  sessionStateFilePath: string,
  priorState: InfraAsCodeSessionState,
  result: InfraAsCodeApiResult
): Promise<void> {
  const nextState: InfraAsCodeSessionState = {
    resourceIdToPointerMappings: {
      ...priorState.resourceIdToPointerMappings,
      ...(result.resourceIdToPointerMappings ?? {}),
    },
    resourceIdToPropertyIdMappings: {
      ...priorState.resourceIdToPropertyIdMappings,
      ...(result.resourceIdToPropertyIdMappings ?? {}),
    },
  }

  try {
    await mkdir(path.dirname(sessionStateFilePath), { recursive: true })
    await writeFile(
      sessionStateFilePath,
      `${JSON.stringify(nextState, null, 2)}\n`,
      "utf8"
    )
  } catch (error) {
    throw new Error(
      `Unable to write infra as code session state at ${sessionStateFilePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}
