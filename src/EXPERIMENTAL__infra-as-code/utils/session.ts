import { mkdir, readFile, writeFile } from "node:fs/promises"
import path = require("node:path")

import type { InfraAsCodeApiResult } from "./api"

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
  const parsed: InfraAsCodeSessionStateFile | null = JSON.parse(
    await readFile(sessionStateFilePath, "utf8")
  )

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

  await mkdir(path.dirname(sessionStateFilePath), { recursive: true })
  await writeFile(
    sessionStateFilePath,
    `${JSON.stringify(nextState, null, 2)}\n`,
    "utf8"
  )
}
