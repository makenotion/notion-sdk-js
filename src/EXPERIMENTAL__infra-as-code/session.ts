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
 *
 * A missing file is treated as empty state so first-time tests can run before
 * any mappings have been generated.
 */
export async function readSessionState(
  sessionStateFilePath: string | undefined
): Promise<InfraAsCodeSessionState> {
  if (sessionStateFilePath === undefined) {
    return emptySessionState()
  }

  try {
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
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return emptySessionState()
    }
    throw error
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
 * Provides empty mappings when no session-state file exists yet.
 */
function emptySessionState(): InfraAsCodeSessionState {
  return {
    resourceIdToPointerMappings: {},
    resourceIdToPropertyIdMappings: {},
  }
}
