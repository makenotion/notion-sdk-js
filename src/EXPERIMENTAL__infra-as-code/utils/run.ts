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
   * Workspace ID to use as the existing space for this run.
   *
   * If `sessionStateFilePath` is provided, the workspace ID must match the
   * compiled script's existing space mapping.
   */
  spaceId: string
  /**
   * Path to the session-state file for this run.
   *
   * The SDK reads and writes the same file. If omitted, the SDK writes a
   * timestamped session-state file.
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
  if (!isDefined(args.spaceId)) {
    throw new Error(
      "Infra as code requires spaceId. Pass --spaceId when running the script."
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
  spaceId: string
  intents: InfraAsCodeIntent[]
}): InfraAsCodeSessionState {
  const baseState = priorState ?? {
    resourceIdToPointerMappings: {},
    resourceIdToPropertyIdMappings: {},
  }
  const spaceResourceId = inferSpaceResourceIdFromIntents(intents)
  const existingSpacePointer =
    baseState.resourceIdToPointerMappings[spaceResourceId]

  if (isDefined(existingSpacePointer)) {
    assertSpacePointerMatchesSpaceId({
      spacePointer: existingSpacePointer,
      resourceId: spaceResourceId,
      spaceId,
    })

    return baseState
  }

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
 * Verifies that the inferred session-state space mapping targets the workspace.
 *
 * When `sessionStateFilePath` and `spaceId` are both provided, they must agree
 * so the run cannot accidentally target two different workspaces.
 */
function assertSpacePointerMatchesSpaceId({
  spacePointer,
  resourceId,
  spaceId,
}: {
  spacePointer: unknown
  resourceId: string
  spaceId: string
}): void {
  if (!isRecord(spacePointer) || spacePointer["table"] !== "space") {
    return
  }

  const spacePointerId = spacePointer["id"]
  if (isString(spacePointerId) && spacePointerId !== spaceId) {
    throw new Error(
      `The provided spaceId "${spaceId}" does not match the session state mapping for resourceId "${resourceId}" (found "${spacePointerId}"). Make sure --spaceId matches the workspace in --sessionStateFilePath, or pass the correct session-state file.`
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
      "Unable to use spaceId because the script declares multiple spaces. Keep one workspace anchor in the script."
    )
  }

  // Validate that there is only one teamspace parent resourceId
  if (teamspaceParentResourceIds.size === 1) {
    return getOnlyResourceId(teamspaceParentResourceIds)
  }

  if (teamspaceParentResourceIds.size > 1) {
    throw new Error(
      "Unable to use spaceId because the script declares teamspaces with multiple parent resourceIds. Keep one workspace anchor in the script."
    )
  }

  throw new Error(
    "Unable to use spaceId because the script does not declare a space or a teamspace parent resourceId. Add one workspace anchor to the script."
  )
}

function getOnlyResourceId(resourceIds: Set<string>): string {
  const value = resourceIds.values().next().value
  if (!isDefined(value)) {
    throw new Error("Expected one resourceId but found none")
  }

  return value
}
