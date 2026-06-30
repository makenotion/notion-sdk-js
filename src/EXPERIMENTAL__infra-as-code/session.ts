import { readFile, writeFile } from "node:fs/promises"

import type { InfraAsCodeApiResult } from "./api"
import { getErrorCode } from "./utils"

export type InfraAsCodeSessionState = {
  existingResources: Record<string, unknown>
  existingProperties: Record<string, string>
}

type InfraAsCodeWrittenSessionState = {
  resourceIdToPointerMappings: Record<string, unknown>
  resourceIdToPropertyIdMappings: Record<string, string>
}

type InfraAsCodeSessionStateFile = Partial<
  InfraAsCodeSessionState & InfraAsCodeWrittenSessionState
>

/**
 * Reads optional existing resource mappings used to make reruns incremental.
 */
export async function readSessionState(
  existingResourcesFilePath: string | undefined
): Promise<InfraAsCodeSessionState> {
  if (existingResourcesFilePath === undefined) {
    return emptySessionState()
  }

  try {
    const parsed = JSON.parse(
      await readFile(existingResourcesFilePath, "utf8")
    ) as InfraAsCodeSessionStateFile | null

    return {
      existingResources:
        parsed?.existingResources ?? parsed?.resourceIdToPointerMappings ?? {},
      existingProperties:
        parsed?.existingProperties ??
        parsed?.resourceIdToPropertyIdMappings ??
        {},
    }
  } catch (error) {
    if (getErrorCode(error) === "ENOENT") {
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
  priorState: InfraAsCodeSessionState,
  result: InfraAsCodeApiResult
): Promise<void> {
  const nextState: InfraAsCodeWrittenSessionState = {
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
 * Provides empty mappings when no session-state file exists yet.
 */
function emptySessionState(): InfraAsCodeSessionState {
  return {
    existingResources: {},
    existingProperties: {},
  }
}
