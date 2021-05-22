import { CrossResponse } from "./fetch-types"
import { isObject } from "./helpers"

// Root type
class NotionClientErrorBase extends Error {}

export type NotionClientError =
  | RequestTimeoutError
  | HTTPResponseError
  | APIResponseError
export function isNotionClientError(
  error: unknown
): error is NotionClientError {
  return error instanceof NotionClientErrorBase
}

export class RequestTimeoutError extends NotionClientErrorBase {
  readonly code = "notionhq_client_request_timeout"

  constructor(message = "Request to Notion API has timed out") {
    super(message)
    this.name = "RequestTimeoutError"
  }

  static isRequestTimeoutError(error: unknown): error is RequestTimeoutError {
    return (
      error instanceof Error &&
      error.name === "RequestTimeoutError" &&
      "code" in error &&
      error["code"] === RequestTimeoutError.prototype.code
    )
  }
}

export class HTTPResponseError extends NotionClientErrorBase {
  readonly code: string = "notionhq_client_response_error"
  readonly status: number
  readonly headers: Headers
  readonly body: string

  constructor(response: CrossResponse, bodyText: string, message?: string) {
    super(
      message ?? `Request to Notion API failed with status: ${response.status}`
    )
    this.name = "HTTPResponseError"
    this.status = response.status
    this.headers = response.headers
    this.body = bodyText
  }

  static isHTTPResponseError(error: unknown): error is HTTPResponseError {
    return (
      error instanceof Error &&
      error.name === "HTTPResponseError" &&
      "code" in error &&
      error["code"] === HTTPResponseError.prototype.code
    )
  }
}

/**
 * Error codes for responses from the API.
 */
export enum APIErrorCode {
  Unauthorized = "unauthorized",
  RestrictedResource = "restricted_resource",
  ObjectNotFound = "object_not_found",
  RateLimited = "rate_limited",
  InvalidJSON = "invalid_json",
  InvalidRequestURL = "invalid_request_url",
  InvalidRequest = "invalid_request",
  ValidationError = "validation_error",
  ConflictError = "conflict_error",
  InternalServerError = "internal_server_error",
  ServiceUnavailable = "service_unavailable",
}

/**
 * Body of an error response from the API.
 */
interface APIErrorResponseBody {
  code: APIErrorCode
  message: string
}

/**
 * A response from the API indicating a problem.
 *
 * Use the `code` property to handle various kinds of errors. All its possible values are in `APIErrorCode`.
 */
export class APIResponseError
  extends HTTPResponseError
  implements APIErrorResponseBody
{
  readonly code: APIErrorCode

  constructor(response: CrossResponse, body: APIErrorResponseBody) {
    super(response, body.message)
    this.name = "APIResponseError"
    this.code = body.code
  }

  static isAPIResponseError(error: unknown): error is APIResponseError {
    return (
      error instanceof Error &&
      error.name === "APIResponseError" &&
      "code" in error &&
      isAPIErrorCode(error["code"])
    )
  }
}

type RequestError = RequestTimeoutError | HTTPResponseError

export function buildRequestError(
  response: CrossResponse,
  bodyText: string
): RequestError | undefined {
  const apiErrorResponseBody = parseAPIErrorResponseBody(bodyText)
  if (apiErrorResponseBody !== undefined) {
    return new APIResponseError(response, apiErrorResponseBody)
  }
  return new HTTPResponseError(response, bodyText)
}

function parseAPIErrorResponseBody(
  body: unknown
): APIErrorResponseBody | undefined {
  if (typeof body !== "string") {
    return
  }

  let parsed
  try {
    parsed = JSON.parse(body)
  } catch (parseError) {
    return
  }

  if (
    !isObject(parsed) ||
    typeof parsed["message"] !== "string" ||
    !isAPIErrorCode(parsed["code"])
  ) {
    return
  }

  return {
    ...parsed,
    code: parsed["code"],
    message: parsed["message"],
  }
}

/*
 * Type guards
 */

function isAPIErrorCode(code: unknown): code is APIErrorCode {
  return (
    typeof code === "string" &&
    Object.values<string>(APIErrorCode).includes(code)
  )
}
