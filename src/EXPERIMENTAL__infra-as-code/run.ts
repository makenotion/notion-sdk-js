import { mkdir, mkdtemp } from "node:fs/promises"
import path = require("node:path")

import {
  pollInfraAsCodeTask,
  submitInfraAsCodeRunToApi,
  type InfraAsCodeApiResult,
  type InfraAsCodeRequest,
} from "./api"
import { compileInfraAsCodeScriptToIntents } from "./compile"
import { readSessionState, writeSessionState } from "./session"
import {
  DEFAULT_SESSION_STATE_FILE_DIRECTORY,
  DEFAULT_SESSION_STATE_FILE_PREFIX,
} from "./utils"

export type InfraAsCodeRunParameters = {
  /**
   * Path to the local infra as code script to compile and run.
   */
  scriptFilePath: string
  /**
   * Optional path to existing resource/property mappings used as run input.
   * This file is read but never written to.
   */
  existingResourcesFilePath?: string
  /**
   * Optional path where the next session-state file should be written. When
   * omitted, a new file is created under the default session-state directory.
   */
  sessionStateFilePath?: string
}

export type InfraAsCodeRunResponse = InfraAsCodeApiResult & {
  logs: string[]
  sessionStateFilePath: string
}

/**
 * Implements `Client.infraAsCode.run()`.
 *
 * This is the SDK-facing workflow: compile the local script into intents,
 * send those intents plus any existing resource mappings to Notion, poll the
 * async task, then write the next session-state file.
 */
export async function runInfraAsCode(
  args: InfraAsCodeRunParameters,
  request: InfraAsCodeRequest
): Promise<InfraAsCodeRunResponse> {
  const priorState = await readSessionState(args.existingResourcesFilePath)
  const { intents, logs } = await compileInfraAsCodeScriptToIntents({
    filePathToScript: args.scriptFilePath,
  })
  const sessionStateFilePath =
    args.sessionStateFilePath ?? (await createDefaultSessionStateFilePath())

  // Temporary logging to see json intents
  console.dir(
    {
      intents,
      existingResources: priorState.existingResources,
      existingProperties: priorState.existingProperties,
    },
    { depth: null }
  )

  const asyncTask = await submitInfraAsCodeRunToApi({
    request,
    intents,
    existingResources: priorState.existingResources,
    existingProperties: priorState.existingProperties,
  })

  const result = await pollInfraAsCodeTask({
    request,
    taskId: asyncTask.id,
  })

  await writeSessionState(sessionStateFilePath, priorState, result)

  return {
    ...result,
    logs,
    sessionStateFilePath,
  }
}

async function createDefaultSessionStateFilePath(): Promise<string> {
  await mkdir(DEFAULT_SESSION_STATE_FILE_DIRECTORY, { recursive: true })
  const tempDir = await mkdtemp(
    path.join(
      DEFAULT_SESSION_STATE_FILE_DIRECTORY,
      `${DEFAULT_SESSION_STATE_FILE_PREFIX}-`
    )
  )
  return path.join(tempDir, "session-state.json")
}
