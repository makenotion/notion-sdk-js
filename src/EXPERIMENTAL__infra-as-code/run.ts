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
   * Optional path to JSON mappings for resources that already exist in Notion.
   *
   * Use this when testing against an existing space, or when a rerun should
   * update the same known resources. The file is read but never written to.
   */
  existingResourcesFilePath?: string
  /**
   * Optional path where the session-state file for this run should be written.
   *
   * When omitted, the SDK writes a new file under
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
