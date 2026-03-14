/**
 * Shared test utilities for mocking fetch responses
 */

// Test constants
export const TEST_BLOCK_ID = "9f96555b-cf98-4889-83b0-bd6bbe53911e"

// Response type definitions for mock builder
export type ResponseType =
  | "success"
  | "rate_limited"
  | "internal_server_error"
  | "service_unavailable"
  | "validation_error"
  | "unauthorized"

export type ResponseOptions = {
  retryAfter?: string
  body?: Record<string, unknown>
}

// Maps response types to their HTTP status codes and API error codes
const RESPONSE_CONFIG: Record<
  ResponseType,
  { status: number; code?: string; message: string }
> = {
  success: { status: 200, message: "" },
  rate_limited: { status: 429, code: "rate_limited", message: "Rate limited" },
  internal_server_error: {
    status: 500,
    code: "internal_server_error",
    message: "Internal error",
  },
  service_unavailable: {
    status: 503,
    code: "service_unavailable",
    message: "Service unavailable",
  },
  validation_error: {
    status: 400,
    code: "validation_error",
    message: "Validation failed",
  },
  unauthorized: { status: 401, code: "unauthorized", message: "Unauthorized" },
}

/**
 * Creates a mock Response object for the given response type
 */
export function mockResponse(
  type: ResponseType,
  options: ResponseOptions = {}
): Response {
  const config = RESPONSE_CONFIG[type]
  const headers = new Headers()
  if (options.retryAfter) {
    headers.set("retry-after", options.retryAfter)
  }

  const body =
    type === "success"
      ? (options.body ?? {})
      : { code: config.code, message: config.message, ...options.body }

  return {
    ok: type === "success",
    text: () => Promise.resolve(JSON.stringify(body)),
    headers,
    status: config.status,
  } as Response
}

/**
 * Sets up mockFetch to return a sequence of responses.
 * Example: setupMockSequence(mockFetch, ["rate_limited", "success"])
 */
export function setupMockSequence(
  mockFetch: jest.MockedFn<typeof fetch>,
  sequence: Array<
    ResponseType | { type: ResponseType; options: ResponseOptions }
  >
): void {
  for (const item of sequence) {
    const type = typeof item === "string" ? item : item.type
    const options = typeof item === "string" ? {} : item.options
    mockFetch.mockResolvedValueOnce(mockResponse(type, options))
  }
}

/**
 * Creates a pre-configured mockFetch with success response (common setup)
 */
export function createMockFetch(): jest.MockedFn<typeof fetch> {
  const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
  mockFetch.mockResolvedValue(mockResponse("success"))
  return mockFetch
}
