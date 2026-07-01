export type InfraAsCodeRequest = <ResponseBody extends object>(args: {
  path: string
  method: "get" | "post"
  body?: Record<string, unknown>
}) => Promise<ResponseBody>

export type InfraAsCodeApiResult = {
  resourceIdToPointerMappings?: Record<string, unknown>
  resourceIdToPropertyIdMappings?: Record<string, string>
  [key: string]: unknown
}

const POLL_INTERVAL_MS = 1000
const MAX_POLL_COUNT = 600
const LOGGED_TASK_ID = "logged-infra-as-code-run"

/**
 * Temporarily logs the payload that will eventually go to the IaC API.
 */
export async function submitInfraAsCodeRunToApi(_args: {
  request: InfraAsCodeRequest
  intents: InfraAsCodeIntent[]
  existingResources: Record<string, unknown>
  existingProperties: Record<string, string>
}): Promise<{ id: string }> {
  // TODO: uncomment the real API call once endpoint is available.
  // return args.request<{ id: string }>({
  //   path: "infra_as_code",
  //   method: "post",
  //   body: {
  //     intents: args.intents,
  //     existingResources: args.existingResources,
  //     existingProperties: args.existingProperties,
  //   },
  // })

  return { id: LOGGED_TASK_ID }
}

/**
 * Polls the Notion async task endpoint until the infra as code run finishes.
 */
export async function pollInfraAsCodeTask(args: {
  request: InfraAsCodeRequest
  taskId: string
}): Promise<InfraAsCodeApiResult> {
  if (args.taskId === LOGGED_TASK_ID) {
    return {
      resourceIdToPointerMappings: {},
      resourceIdToPropertyIdMappings: {},
    }
  }

  for (let pollCount = 0; pollCount < MAX_POLL_COUNT; pollCount++) {
    const task = await args.request<{
      status: string
      result?: InfraAsCodeApiResult
      error?: unknown
    }>({
      path: `async_tasks/${args.taskId}`,
      method: "get",
    })

    if (task.status === "succeeded") {
      return task.result ?? {}
    }

    if (task.status === "failed") {
      throw new Error(
        `Infra as code async task ${args.taskId} failed: ${JSON.stringify(
          task.error
        )}`
      )
    }

    await sleep(POLL_INTERVAL_MS)
  }

  throw new Error(
    `Infra as code async task ${args.taskId} did not finish after ${MAX_POLL_COUNT} polls`
  )
}

/**
 * Waits between async task polls.
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
