import {
  pollInfraAsCodeTask,
  submitInfraAsCodeRunToApi,
  type InfraAsCodeApiResult,
} from "./api"
import type Client from "../../Client"
import { compileInfraAsCodeScriptToIntents } from "./compile"
import {
  readSessionState,
  writeSessionState,
  type InfraAsCodeSessionState,
} from "./session"
import {
  createTimestampedSessionStateFilePath,
  isDefined,
  isRecord,
  isString,
} from "./utils"

export type InfraAsCodeRunParameters = {
  /**
   * Path to the local infra as code script to compile and run.
   */
  scriptFilePath: string
  /**
   * Path to the session-state file for this run.
   *
   * The SDK reads and writes the same file. If omitted, `spaceId` is required
   * and the SDK writes a timestamped session-state file.
   */
  sessionStateFilePath?: string
  /**
   * Workspace ID to use as the existing space for this run.
   *
   * If `sessionStateFilePath` is provided, the workspace ID must match the
   * compiled script's existing space mapping.
   */
  spaceId?: string
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
  if (!isDefined(args.sessionStateFilePath) && !isDefined(args.spaceId)) {
    throw new Error(
      "Infra as code requires either sessionStateFilePath or spaceId. Pass either one of these flags when running the script."
    )
  }

  const priorState = isDefined(args.sessionStateFilePath)
    ? await readSessionState(args.sessionStateFilePath)
    : undefined

  const sessionStateFilePath =
    args.sessionStateFilePath ?? createTimestampedSessionStateFilePath()

  const intents = await compileInfraAsCodeScriptToIntents({
    filePathToScript: args.scriptFilePath,
  })

  const resolvedState = resolveSessionStateForRun({
    priorState,
    spaceId: args.spaceId,
    intents,
  })
  const existingResources = resolvedState.resourceIdToPointerMappings
  const existingProperties = resolvedState.resourceIdToPropertyIdMappings

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

  await writeSessionState(sessionStateFilePath, resolvedState, result)

  return {
    ...result,
    sessionStateFilePath,
  }
}

/**
 * Resolves session state from either a persisted file or a workspace ID.
 */
function resolveSessionStateForRun({
  priorState,
  spaceId,
  intents,
}: {
  priorState: InfraAsCodeSessionState | undefined
  spaceId: string | undefined
  intents: InfraAsCodeIntent[]
}): InfraAsCodeSessionState {
  if (!isDefined(spaceId)) {
    if (!isDefined(priorState)) {
      throw new Error(
        "Infra as code requires spaceId when no session state is used"
      )
    }
    return priorState
  }

  const baseState = priorState ?? {
    resourceIdToPointerMappings: {},
    resourceIdToPropertyIdMappings: {},
  }
  const spaceResourceId = inferSpaceResourceIdFromIntents(intents)
  const existingPointer = baseState.resourceIdToPointerMappings[spaceResourceId]

  // If there is an existing space resourceId, warn if the spaceId does not match the session state mapping
  if (isDefined(existingPointer)) {
    warnIfSpacePointerConflictsWithSpaceId({
      pointer: existingPointer,
      resourceId: spaceResourceId,
      spaceId,
    })

    return baseState
  }

  // If there is no existing space resourceId, build the new space resourceId and add it to the session state
  return {
    resourceIdToPointerMappings: {
      ...baseState.resourceIdToPointerMappings,
      [spaceResourceId]: buildSpacePointer(spaceId),
    },
    resourceIdToPropertyIdMappings: baseState.resourceIdToPropertyIdMappings,
  }
}

function buildSpacePointer(spaceId: string): Record<string, string> {
  return {
    table: "space",
    id: spaceId,
    spaceId,
  }
}

/**
 * Warns the user that the provided spaceId does not match the session state mapping for the
 * provided resourceId. When this function is called, we still proceed with the run, but we
 * want to educate the user that it is recommended to pass the same spaceId for future script runs
 * to avoid confusion.
 */
function warnIfSpacePointerConflictsWithSpaceId({
  pointer,
  resourceId,
  spaceId,
}: {
  pointer: unknown
  resourceId: string
  spaceId: string
}): void {
  if (!isRecord(pointer)) {
    return
  }

  const pointerIds = [pointer["id"], pointer["spaceId"]].filter(isString)
  const conflictingId = pointerIds.find(pointerId => pointerId !== spaceId)

  if (isDefined(conflictingId)) {
    console.warn(
      `Resources have been processed using the provided sessionStateFilePath, but the provided spaceId does not match the session state mapping for resourceId "${resourceId}". For future runs, make sure the spaceId in your session state matches your spaceId argument.`
    )
  }
}

/**
 * Finds the script resourceId that should point at the provided workspace ID.
 */
function inferSpaceResourceIdFromIntents(intents: InfraAsCodeIntent[]): string {
  const spaceResourceIds = new Set<string>()
  const teamspaceParentResourceIds = new Set<string>()

  // Gather all the space and teamspace parent resourceIds from the intents
  for (const intent of intents) {
    if (intent.type === "space") {
      spaceResourceIds.add(intent.resourceId)
    }

    if (intent.type === "teamspace" && intent.parent?.type === "resourceId") {
      teamspaceParentResourceIds.add(intent.parent.resourceId)
    }
  }

  // Validate that there is only one space resourceId
  if (spaceResourceIds.size === 1) {
    return getOnlyResourceId(spaceResourceIds)
  }

  if (spaceResourceIds.size > 1) {
    throw new Error(
      "Unable to use spaceId because the script declares multiple spaces. Pass sessionStateFilePath instead."
    )
  }

  // Validate that there is only one teamspace parent resourceId
  if (teamspaceParentResourceIds.size === 1) {
    return getOnlyResourceId(teamspaceParentResourceIds)
  }

  if (teamspaceParentResourceIds.size > 1) {
    throw new Error(
      "Unable to use spaceId because the script declares teamspaces with multiple parent resourceIds. Pass sessionStateFilePath instead."
    )
  }

  throw new Error(
    "Unable to use spaceId because the script does not declare a space or a teamspace parent resourceId. Pass sessionStateFilePath instead."
  )
}

function getOnlyResourceId(resourceIds: Set<string>): string {
  const value = resourceIds.values().next().value
  if (!isDefined(value)) {
    throw new Error("Expected one resourceId but found none")
  }

  return value
}
