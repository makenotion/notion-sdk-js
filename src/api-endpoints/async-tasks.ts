// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type { PublicApiAsyncTaskStatusResultJsonValue } from "./common"

type GetAsyncTaskPathParameters = {
  // The ID of the async task to retrieve.
  task_id: string
}

export type GetAsyncTaskParameters = GetAsyncTaskPathParameters

export type GetAsyncTaskResponse =
  | {
      object: "async_task"
      id: string
      status_url: string
      created_time: string
      operation: { surface: "rest" | "mcp"; name: string }
      status: "queued" | "running" | "retrying"
      poll_after_seconds: number
    }
  | {
      object: "async_task"
      id: string
      status_url: string
      created_time: string
      operation: { surface: "rest" | "mcp"; name: string }
      status: "succeeded"
      result: Record<string, PublicApiAsyncTaskStatusResultJsonValue>
    }
  | {
      object: "async_task"
      id: string
      status_url: string
      created_time: string
      operation: { surface: "rest" | "mcp"; name: string }
      status: "failed"
      error:
        | {
            object: "error"
            status: 400
            code: "invalid_json"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 400
            code: "invalid_request_url"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 400
            code: "invalid_request"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 400
            code: "missing_version"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 400
            code: "validation_error"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 401
            code: "unauthorized"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 403
            code: "restricted_resource"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 404
            code: "object_not_found"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 429
            code: "rate_limited"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 529
            code: "service_overload"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 500
            code: "internal_server_error"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 503
            code: "service_unavailable"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 504
            code: "gateway_timeout"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 409
            code: "conflict_error"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
        | {
            object: "error"
            status: 409
            code: "row_limit_exceeded"
            message: string
            additional_data?: Record<string, string | Array<string>>
          }
    }

/**
 * Retrieve an async task
 */
export const getAsyncTask = {
  method: "get",
  pathParams: ["task_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetAsyncTaskPathParameters): string => `async_tasks/${p.task_id}`,
} as const
