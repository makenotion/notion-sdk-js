import {
  pollInfraAsCodeTask,
  submitInfraAsCodeRunToApi,
  type InfraAsCodeApiResult,
} from "./api"
import type Client from "../../Client"
import { compileInfraAsCodeScriptToIntents } from "./compile"
import { readSessionState, writeSessionState } from "./session"

export type InfraAsCodeRunParameters = {
  /**
   * Path to the local infra as code script to compile and run.
   */
  scriptFilePath: string
  /**
   * Path to the session-state file for this run.
   *
   * The SDK reads and writes the same file.
   */
  sessionStateFilePath: string
}

export type InfraAsCodeRunResponse = InfraAsCodeApiResult & {
  /**
   * Location of the session-state file written for this run.
   */
  sessionStateFilePath: string
}

/**
 * Implements `Client.EXPERIMENTAL__infraAsCode.run()`.
 *
 * This is the SDK-facing workflow: compile the local script into intents,
 * send those intents plus current resource mappings to Notion, poll the async
 * task, then write the session-state file for the run.
 */
export async function runInfraAsCode(
  args: InfraAsCodeRunParameters,
  request: Client["request"]
): Promise<InfraAsCodeRunResponse> {
  const priorState = await readSessionState(args.sessionStateFilePath)
  const intents = await compileInfraAsCodeScriptToIntents({
    filePathToScript: args.scriptFilePath,
  })
  const existingResources = priorState.resourceIdToPointerMappings
  const existingProperties = priorState.resourceIdToPropertyIdMappings

  const asyncTask = await submitInfraAsCodeRunToApi({
    request,
    intents,
    existingResources,
    existingProperties,
  })

  const result = await pollInfraAsCodeTask({
    request,
    taskId: asyncTask.id,
  })

  await writeSessionState(args.sessionStateFilePath, priorState, result)

  return {
    ...result,
    sessionStateFilePath: args.sessionStateFilePath,
  }
}
