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
   * Optional path to the session-state file for this run.
   *
   * When provided, the SDK reads and writes the same file. When omitted, the SDK
   * writes a new file under
   * `tmp/infra-as-code/sessions`.
   */
  sessionStateFilePath?: string
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
  const sessionStateFilePath =
    args.sessionStateFilePath ?? (await createDefaultSessionStateFilePath())
  const priorState = await readSessionState(sessionStateFilePath)
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

  await writeSessionState(sessionStateFilePath, priorState, result)

  return {
    ...result,
    sessionStateFilePath,
  }
}
