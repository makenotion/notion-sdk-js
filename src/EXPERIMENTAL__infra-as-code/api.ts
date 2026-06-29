import type Client from "../Client"

export type InfraAsCodeApiResult = {
  object: "infra_as_code_result"
  resourceIdToPointerMappings: Record<string, unknown>
  resourceIdToPropertyIdMappings: Record<string, string>
  createdRecordCounts: Record<string, number>
}

type InfraAsCodeAsyncTaskResponse =
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
 * Submits an infra as code run to Notion and returns the async task id.
 */
export async function submitInfraAsCodeRunToApi({
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
  return request<{ id: string }>({
    path: "infra_as_code",
    method: "post",
    body: {
      intents,
      existingResources,
      existingProperties,
    },
  })
}

/**
 * Polls the Notion async task endpoint until the infra as code run finishes.
 */
export async function pollInfraAsCodeTask({
  request,
  taskId,
}: {
  request: Client["request"]
  taskId: string
}): Promise<InfraAsCodeApiResult> {
  for (let pollCount = 0; pollCount < MAX_POLL_COUNT; pollCount++) {
    const task = await request<InfraAsCodeAsyncTaskResponse>({
      path: `async_tasks/${taskId}`,
      method: "get",
    })

    if (task.status === "succeeded") {
      if (!isInfraAsCodeApiResult(task.result)) {
        throw new Error(
          `Infra as code async task ${taskId} succeeded with a malformed result`
        )
      }

      return task.result
    }

    if (task.status === "failed") {
      throw new Error(
        `Infra as code async task ${taskId} failed: ${formatTaskError(
          task.error
        )}`
      )
    }

    if (!isActiveTaskStatus(task.status)) {
      throw new Error(
        `Infra as code async task ${taskId} returned unknown status: ${task.status}`
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
    `Infra as code async task ${taskId} did not finish after ${MAX_POLL_COUNT} polls`
  )
}

/**
 * Waits between async task polls.
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isActiveTaskStatus(status: string): boolean {
  return status === "queued" || status === "running" || status === "retrying"
}

function isInfraAsCodeApiResult(
  result: unknown
): result is InfraAsCodeApiResult {
  return (
    isRecord(result) &&
    result["object"] === "infra_as_code_result" &&
    isRecord(result["resourceIdToPointerMappings"]) &&
    isStringRecord(result["resourceIdToPropertyIdMappings"]) &&
    isNumberRecord(result["createdRecordCounts"])
  )
}

function formatTaskError(error: unknown): string {
  if (isRecord(error)) {
    const code = typeof error["code"] === "string" ? error["code"] : undefined
    const message =
      typeof error["message"] === "string" ? error["message"] : undefined
    const publicDetails = [code, message].filter(Boolean).join(": ")

    if (publicDetails.length > 0) {
      return publicDetails
    }
  }

  return JSON.stringify(error)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.values(value).every(isString)
}

function isNumberRecord(value: unknown): value is Record<string, number> {
  return isRecord(value) && Object.values(value).every(isNumber)
}

function isString(value: unknown): value is string {
  return typeof value === "string"
}

function isNumber(value: unknown): value is number {
  return typeof value === "number"
}
