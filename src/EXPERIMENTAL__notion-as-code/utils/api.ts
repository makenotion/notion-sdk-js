import type Client from "../../Client"
import { APIErrorCode, APIResponseError } from "../../errors"
import { isRecord, isString } from "./utils"

export type NotionAsCodeApiResult = {
  object: "infra_as_code_result"
  resourceIdToPointerMappings: Record<string, unknown>
  resourceIdToPropertyIdMappings: Record<string, string>
  createdRecordCounts: Record<string, number>
}

type NotionAsCodeAsyncTaskResponse =
  | {
      status: "queued" | "running" | "retrying"
      poll_after_seconds?: number
    }
  | {
      status: "succeeded"
      poll_after_seconds?: number
      result?: unknown
    }
  | {
      status: "failed"
      poll_after_seconds?: number
      error?: unknown
    }
  | {
      status: string
      poll_after_seconds?: number
      result?: unknown
      error?: unknown
    }

const POLL_INTERVAL_MS = 1000
const MAX_POLL_COUNT = 600

/**
 * Submits a Notion as Code run to Notion and returns the async task id.
 */
export async function submitNotionAsCodeRunToApi({
  request,
  intents,
  existingResources,
  existingProperties,
}: {
  request: Client["request"]
  intents: InfraAsCodeIntent[]
  existingResources: Record<string, unknown>
  existingProperties: Record<string, string>
}): Promise<{ id: string }> {
  try {
    return await request<{ id: string }>({
      path: "infra_as_code",
      method: "post",
      body: {
        intents,
        existingResources,
        existingProperties,
      },
    })
  } catch (error) {
    throw mapNotionAsCodeApiError(error)
  }
}

/**
 * Polls the Notion async task endpoint until the Notion as Code run finishes.
 */
export async function pollNotionAsCodeTask({
  request,
  taskId,
}: {
  request: Client["request"]
  taskId: string
}): Promise<NotionAsCodeApiResult> {
  for (let pollCount = 0; pollCount < MAX_POLL_COUNT; pollCount++) {
    const task = await request<NotionAsCodeAsyncTaskResponse>({
      path: `async_tasks/${taskId}`,
      method: "get",
    })

    if (task.status === "succeeded") {
      if (!isNotionAsCodeApiResult(task.result)) {
        throw new Error(
          `Notion as Code async task ${taskId} succeeded with a malformed result`
        )
      }

      return task.result
    }

    if (task.status === "failed") {
      throw new Error(
        `Notion as Code async task ${taskId} failed: ${formatTaskError(
          task.error
        )}`
      )
    }

    if (!isActiveTaskStatus(task.status)) {
      throw new Error(
        `Notion as Code async task ${taskId} returned unknown status: ${task.status}`
      )
    }

    const delayMs =
      typeof task.poll_after_seconds === "number"
        ? Math.max(0, task.poll_after_seconds * 1000)
        : POLL_INTERVAL_MS

    if (delayMs > 0) {
      await sleep(delayMs)
    }
  }

  throw new Error(
    `Notion as Code async task ${taskId} did not finish after ${MAX_POLL_COUNT} polls`
  )
}

/**
 * Waits between async task polls.
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Returns whether a task status means the async task should be polled again.
 */
function isActiveTaskStatus(status: string): boolean {
  return status === "queued" || status === "running" || status === "retrying"
}

/**
 * Validates the shape of a successful Notion as Code API result payload.
 */
function isNotionAsCodeApiResult(
  result: unknown
): result is NotionAsCodeApiResult {
  return (
    isRecord(result) &&
    result["object"] === "infra_as_code_result" &&
    isRecord(result["resourceIdToPointerMappings"]) &&
    isStringRecord(result["resourceIdToPropertyIdMappings"]) &&
    isNumberRecord(result["createdRecordCounts"])
  )
}

/**
 * Formats a task error into a concise user-facing string.
 */
function formatTaskError(error: unknown): string {
  if (isRecord(error)) {
    const code = typeof error["code"] === "string" ? error["code"] : undefined
    const message =
      typeof error["message"] === "string" ? error["message"] : undefined
    const publicMessage = formatNotionAsCodeApiMessage({ code, message })
    const publicDetails = [code, publicMessage].filter(Boolean).join(": ")

    if (publicDetails.length > 0) {
      return publicDetails
    }
  }

  return JSON.stringify(error)
}

/**
 * Rewrites supported API response errors into clearer Notion as Code messages,
 * including a more actionable explanation for PAT/workspace-access validation
 * failures.
 */
function mapNotionAsCodeApiError(error: unknown): Error {
  if (!APIResponseError.isAPIResponseError(error)) {
    return error instanceof Error ? error : new Error(String(error))
  }

  const message = formatNotionAsCodeApiMessage({
    code: error.code,
    message: error.message,
  })

  if (message === error.message) {
    return error
  }

  return new Error(message)
}

/**
 * Formats a Notion as Code API error message, including a more actionable
 * explanation for PAT/workspace-access validation failures.
 */
function formatNotionAsCodeApiMessage({
  code,
  message,
}: {
  code?: string
  message?: string
}): string | undefined {
  if (
    code === APIErrorCode.ValidationError &&
    isString(message) &&
    /^Existing resource ".*" does not belong to this workspace\.$/u.test(
      message
    )
  ) {
    return `${message} This usually means the Personal Access Token used for this run is not attached to the workspace passed via --spaceId, or that --spaceId points to a different workspace. Attach the token to that workspace and confirm the workspace ID before retrying.`
  }

  return message
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every(isString)
}

function isNumberRecord(value: unknown): value is Record<string, number> {
  return isRecord(value) && Object.values(value).every(isNumber)
}

function isNumber(value: unknown): value is number {
  return typeof value === "number"
}
