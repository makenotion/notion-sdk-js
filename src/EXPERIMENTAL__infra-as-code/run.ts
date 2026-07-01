import {
  pollInfraAsCodeTask,
  submitInfraAsCodeRunToApi,
  type InfraAsCodeApiResult,
} from "./api"
import type Client from "../Client"
import { compileInfraAsCodeScriptToIntents } from "./compile"
import {
  createDefaultSessionStateFilePath,
  readSessionState,
  writeSessionState,
} from "./session"

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
  request: Client["request"]
): Promise<InfraAsCodeRunResponse> {
  const priorState = await readSessionState(args.existingResourcesFilePath)
  const intents = await compileInfraAsCodeScriptToIntents({
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
    sessionStateFilePath,
  }
}
