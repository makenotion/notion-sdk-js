import { CrossResponse } from "./fetch-types"
import { isObject } from "./helpers"

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
 * Error codes generated for client errors.
 */
export enum ClientErrorCode {
  RequestTimeout = "notionhq_client_request_timeout",
  ResponseError = "notionhq_client_response_error",
}

/**
 * Error codes on errors thrown by the Client.
 */
export type NotionErrorCode = APIErrorCode | ClientErrorCode

/**
 * Base error type.
 */
abstract class NotionClientErrorBase<
  Code extends NotionErrorCode
> extends Error {
  abstract code: Code
}

/**
 * Error type that encompases all the kinds of errors that the Notion client will throw.
 */
export type NotionClientError =
  | RequestTimeoutError
  | UnknownHTTPResponseError
  | APIResponseError

export function isNotionClientError(
  error: unknown
): error is NotionClientError {
  return isObject(error) && error instanceof NotionClientErrorBase
}

export function isHTTPResponseError(
  error: unknown
): error is UnknownHTTPResponseError | APIResponseError {
  if (!isNotionClientError(error)) {
    return false
  }
  return (
    error.code === ClientErrorCode.ResponseError || isAPIErrorCode(error.code)
  )
}

export class RequestTimeoutError extends NotionClientErrorBase<ClientErrorCode.RequestTimeout> {
  readonly code = ClientErrorCode.RequestTimeout
  readonly name = "RequestTimeoutError"

  constructor(message = "Request to Notion API has timed out") {
    super(message)
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

class HTTPResponseError<
  Code extends ClientErrorCode.ResponseError | APIErrorCode
> extends NotionClientErrorBase<Code> {
  readonly name: string = "HTTPResponseError"
  readonly code: Code
  readonly status: number
  readonly headers: Headers
  readonly body: string

  constructor(args: {
    code: Code
    status: number
    message: string
    headers: CrossResponse["headers"]
    rawBodyText: string
  }) {
    super(args.message)
    const { code, status, headers, rawBodyText } = args
    this.code = code
    this.status = status
    this.headers = headers
    this.body = rawBodyText
  }
}

export class UnknownHTTPResponseError extends HTTPResponseError<ClientErrorCode.ResponseError> {
  readonly name = "UnkownHTTPResponseError"
  constructor(args: {
    status: number
    message: string | undefined
    headers: CrossResponse["headers"]
    rawBodyText: string
  }) {
    super({
      ...args,
      code: ClientErrorCode.ResponseError,
      message:
        args.message ??
        `Request to Notion API failed with status: ${args.status}`,
    })
  }
}

/**
 * A response from the API indicating a problem.
 *
 * Use the `code` property to handle various kinds of errors. All its possible values are in `APIErrorCode`.
 */
export class APIResponseError extends HTTPResponseError<APIErrorCode> {
  readonly name = "APIResponseError"

  static isAPIResponseError(error: unknown): error is APIResponseError {
    return (
      error instanceof Error &&
      error.name === "APIResponseError" &&
      "code" in error &&
      isAPIErrorCode(error["code"])
    )
  }
}

export function buildRequestError(
  response: CrossResponse,
  bodyText: string
): APIResponseError | UnknownHTTPResponseError {
  const apiErrorResponseBody = parseAPIErrorResponseBody(bodyText)
  if (apiErrorResponseBody !== undefined) {
    return new APIResponseError({
      code: apiErrorResponseBody.code,
      message: apiErrorResponseBody.message,
      headers: response.headers,
      status: response.status,
      rawBodyText: bodyText,
    })
  }
  return new UnknownHTTPResponseError({
    message: undefined,
    headers: response.headers,
    status: response.status,
    rawBodyText: bodyText,
  })
}

function parseAPIErrorResponseBody(
  body: string
): { code: APIErrorCode; message: string } | undefined {
  if (typeof body !== "string") {
    return
  }

  let parsed: unknown
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
