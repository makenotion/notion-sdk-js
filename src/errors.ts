import type { IncomingHttpHeaders } from "http"
import type {
	HTTPError as GotHTTPError,
	TimeoutError as GotTimeoutError,
	Response as GotResponse,
} from "got"
import { isObject } from "./helpers"

export class RequestTimeoutError extends Error {
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

export class HTTPResponseError extends Error {
	readonly code: string = "notionhq_client_response_error"
	readonly status: number
	readonly headers: IncomingHttpHeaders
	readonly body: string

	constructor(response: GotResponse, message?: string) {
		super(
			message ??
				`Request to Notion API failed with status: ${response.statusCode}`
		)
		this.name = "HTTPResponseError"
		this.status = response.statusCode
		this.headers = response.headers
		this.body = response.rawBody.toString()
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

	constructor(response: GotResponse, body: APIErrorResponseBody) {
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

export function buildRequestError(error: unknown): RequestError | undefined {
	if (isGotTimeoutError(error)) {
		return new RequestTimeoutError()
	}
	if (isGotHTTPError(error)) {
		const apiErrorResponseBody = parseAPIErrorResponseBody(error.response.body)
		if (apiErrorResponseBody !== undefined) {
			return new APIResponseError(error.response, apiErrorResponseBody)
		}
		return new HTTPResponseError(error.response)
	}
	return
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

function isGotTimeoutError(error: unknown): error is GotTimeoutError {
	return (
		error instanceof Error &&
		error.name === "TimeoutError" &&
		"event" in error &&
		typeof error["event"] === "string" &&
		isObject(error["request"]) &&
		isObject(error["timings"])
	)
}

function isGotHTTPError(error: unknown): error is GotHTTPError {
	return (
		error instanceof Error &&
		error.name === "HTTPError" &&
		"request" in error &&
		isObject(error["request"]) &&
		"response" in error &&
		isObject(error["response"]) &&
		"timings" in error &&
		isObject(error["timings"])
	)
}
