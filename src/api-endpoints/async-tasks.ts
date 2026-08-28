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
      result: { [key: string]: PublicApiAsyncTaskStatusResultJsonValue }
    }
  | {
      object: "async_task"
      id: string
      status_url: string
      created_time: string
      operation: { surface: "rest" | "mcp"; name: string }
      status: "failed"
      error: {
        object: "error"
        message: string
        additional_data?: { [key: string]: string | Array<string> }
      } & (
        | {
            status: 400
            code:
              | "invalid_json"
              | "invalid_request_url"
              | "invalid_request"
              | "missing_version"
              | "invalid_beta"
              | "validation_error"
          }
        | { status: 401; code: "unauthorized" }
        | { status: 403; code: "restricted_resource" }
        | { status: 404; code: "object_not_found" }
        | { status: 429; code: "rate_limited" }
        | { status: 529; code: "service_overload" }
        | { status: 500; code: "internal_server_error" }
        | { status: 503; code: "service_unavailable" }
        | { status: 504; code: "gateway_timeout" }
        | { status: 409; code: "conflict_error" | "row_limit_exceeded" }
      )
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
