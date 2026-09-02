import type { Agent } from "node:http"
import { createEndpointMethods } from "./api-endpoint-methods"
import {
  type Logger,
  LogLevel,
  logLevelSeverity,
  makeConsoleLogger,
} from "./logging"
import {
  APIErrorCode,
  APIResponseError,
  buildRequestError,
  getResponseHeader,
  isHTTPResponseError,
  isNotionClientError,
  type NotionClientError,
  RequestTimeoutError,
  validateRequestPath,
} from "./errors"
import { pick, getUnknownParams, type EndpointDefinition } from "./utils"
import {
  DEFAULT_BASE_URL,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_MAX_RETRIES,
  DEFAULT_INITIAL_RETRY_DELAY_MS,
  DEFAULT_MAX_RETRY_DELAY_MS,
} from "./constants"
import {
  type GetPageMarkdownParameters,
  type GetPageMarkdownResponse,
  getPageMarkdown,
  type UpdatePageMarkdownParameters,
  type UpdatePageMarkdownResponse,
  updatePageMarkdown,
  type OauthTokenResponse,
  type OauthTokenParameters,
  oauthToken,
  type OauthIntrospectResponse,
  type OauthIntrospectParameters,
  oauthIntrospect,
  type OauthRevokeResponse,
  type OauthRevokeParameters,
  oauthRevoke,
  type GetFileUploadResponse,
  type GetFileUploadParameters,
  getFileUpload,
  type SendFileUploadParameters,
  type SendFileUploadResponse,
  sendFileUpload,
  type CompleteFileUploadParameters,
  type CompleteFileUploadResponse,
  completeFileUpload,
  type ListFileUploadsParameters,
  type ListFileUploadsResponse,
  listFileUploads,
  type CreateViewParameters,
  type CreateViewResponse,
  createView,
  type UpdateViewParameters,
  type UpdateViewResponse,
  updateView,
  type CreateViewQueryParameters,
  type CreateViewQueryResponse,
  createViewQuery,
  type ListCustomEmojisParameters,
  type ListCustomEmojisResponse,
  listCustomEmojis,
  type UpdateSessionStreamParameters,
  type UpdateSessionStreamResponse,
  updateSessionStream,
} from "./api-endpoints"
import {
  type QueryMeetingNotesResponse,
  queryMeetingNotes,
} from "./api-endpoints/meeting-notes"
import type { QueryMeetingNotesParameters } from "./meeting-notes"
import {
  version as PACKAGE_VERSION,
  name as PACKAGE_NAME,
} from "../package.json"
import type { SupportedFetch, SupportedResponse } from "./fetch-types"

export type RetryOptions = {
  /**
   * Maximum number of retry attempts. Set to 0 to disable retries.
   * @default 2
   */
  maxRetries?: number
  /**
   * Initial delay between retries in milliseconds.
   * Used as base for exponential back-off when retry-after header is absent.
   * @default 1000
   */
  initialRetryDelayMs?: number
  /**
   * Maximum delay between retries in milliseconds.
   * @default 60000
   */
  maxRetryDelayMs?: number
}

export type ClientOptions = {
  auth?: string
  timeoutMs?: number
  baseUrl?: string
  logLevel?: LogLevel
  logger?: Logger
  notionVersion?: string
  fetch?: SupportedFetch
  /** Silently ignored in the browser */
  agent?: Agent
  /**
   * Configuration for automatic retries on rate limit (429) and server errors.
   * Set to false to disable retries entirely.
   */
  retry?: RetryOptions | false
  /**
   * Confirms that you mean to hold a Notion token inside a browser page, and
   * silences the warning the client logs in that case. Anyone who can load the
   * page can read the token and act as your integration, so only set this for
   * pages that nobody else can open.
   */
  dangerouslyAllowBrowser?: boolean
}

type FileParam = {
  filename?: string
  data: string | Blob
}

const START_CURSOR_PARAM_NAME = "start_cursor"

const BROWSER_TOKEN_WARNING =
  "This client holds a Notion token inside a browser page. Anyone who can " +
  "load the page can read the token and act as your integration. Only do " +
  "this for pages that nobody else can open. Pass " +
  "`dangerouslyAllowBrowser: true` to confirm and silence this warning. See " +
  "https://developers.notion.com/guides/get-started/handling-api-keys#calling-the-api-from-a-browser"

/**
 * True only inside a browser page. Node, Bun, Deno, edge runtimes, and web
 * workers have no `window.document`, and those are the places a token can
 * live safely.
 */
function isBrowserEnvironment(): boolean {
  const maybeWindow = (globalThis as { window?: { document?: unknown } }).window
  return maybeWindow !== undefined && maybeWindow.document !== undefined
}

export type RequestParameters = {
  path: string
  method: Method
  query?: QueryParams
  body?: Record<string, unknown>
  formDataParams?: Record<string, string | FileParam>
  headers?: Record<string, string>
  /**
   * To authenticate using public API token, `auth` should be passed as a
   * string. If you are trying to complete OAuth, then `auth` should be an object
   * containing your integration's client ID and secret.
   */
  auth?:
    | string
    | {
        client_id: string
        client_secret: string
      }
}

type ExecutableRequest = {
  url: URL
  method: Method
  path: string
  headers: Record<string, string>
  body: string | FormData | undefined
}

export default class Client {
  #endpointMethods = createEndpointMethods({
    request: args => this.request(args),
    warnUnknownParams: (args, endpoint) =>
      this.warnUnknownParams(args, endpoint),
  })
  #auth?: string
  #logLevel: LogLevel
  #logger: Logger
  #prefixUrl: string
  #timeoutMs: number
  #notionVersion: string
  #fetch: SupportedFetch
  #agent: Agent | undefined
  #userAgent: string
  #maxRetries: number
  #initialRetryDelayMs: number
  #maxRetryDelayMs: number

  static readonly defaultNotionVersion = "2025-09-03"

  public constructor(options?: ClientOptions) {
    this.#auth = options?.auth
    this.#logLevel = options?.logLevel ?? LogLevel.WARN
    this.#logger = options?.logger ?? makeConsoleLogger(PACKAGE_NAME)
    this.#prefixUrl = `${options?.baseUrl ?? DEFAULT_BASE_URL}/v1/`
    this.#timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS
    this.#notionVersion = options?.notionVersion ?? Client.defaultNotionVersion
    this.#fetch = options?.fetch ?? fetch.bind(globalThis)
    this.#agent = options?.agent
    this.#userAgent = `notionhq-client/${PACKAGE_VERSION}`

    if (options?.retry === false) {
      this.#maxRetries = 0
      this.#initialRetryDelayMs = 0
      this.#maxRetryDelayMs = 0
    } else {
      this.#maxRetries = options?.retry?.maxRetries ?? DEFAULT_MAX_RETRIES
      this.#initialRetryDelayMs =
        options?.retry?.initialRetryDelayMs ?? DEFAULT_INITIAL_RETRY_DELAY_MS
      this.#maxRetryDelayMs =
        options?.retry?.maxRetryDelayMs ?? DEFAULT_MAX_RETRY_DELAY_MS
    }

    if (
      options?.auth !== undefined &&
      !options.dangerouslyAllowBrowser &&
      isBrowserEnvironment()
    ) {
      this.log(LogLevel.WARN, BROWSER_TOKEN_WARNING, {})
    }
  }

  /**
   * Sends a request.
   */
  public async request<ResponseBody extends object>(
    args: RequestParameters
  ): Promise<ResponseBody> {
    const { path, method, query, body, formDataParams, auth } = args

    validateRequestPath(path)

    this.log(LogLevel.INFO, "request start", { method, path })

    const url = this.buildRequestUrl(path, query)
    const bodyAsJsonString = this.serializeBody(body)
    const headers = this.buildRequestHeaders(
      args.headers,
      auth,
      bodyAsJsonString
    )
    const formData = this.buildFormData(formDataParams, headers)

    return this.executeWithRetry<ResponseBody>(
      {
        url,
        method,
        path,
        headers,
        body: bodyAsJsonString ?? formData,
      },
      request => this.executeSingleRequest<ResponseBody>(request)
    )
  }

  /**
   * Opens an SSE response and yields each parsed event as it arrives.
   */
  private async *streamRequest<ResponseBody>(
    args: RequestParameters,
    parseEvent: (frame: SseFrame) => ResponseBody
  ): AsyncIterable<ResponseBody> {
    const { path, method, query, body, auth } = args

    validateRequestPath(path)

    this.log(LogLevel.INFO, "stream request start", { method, path })

    const url = this.buildRequestUrl(path, query)
    const bodyAsJsonString = this.serializeBody(body)
    const headers = this.buildRequestHeaders(
      args.headers,
      auth,
      bodyAsJsonString
    )
    const response = await this.executeWithRetry<SupportedResponse>(
      {
        url,
        method,
        path,
        headers,
        body: bodyAsJsonString,
      },
      request => this.executeSingleStreamRequest(request)
    )

    this.log(LogLevel.INFO, "stream request opened", { method, path })

    if (response.body === undefined || response.body === null) {
      for (const frame of takeSseFrames({
        content: await response.text(),
        complete: true,
      }).frames) {
        yield parseEvent(frame)
      }
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let remaining = ""
    let complete = false
    try {
      while (!complete) {
        const { done, value } = await reader.read()
        if (done) {
          complete = true
          continue
        }
        if (value === undefined) {
          throw new Error("SSE response body ended without a data chunk.")
        }

        const frames = takeSseFrames({
          content: `${remaining}${decoder.decode(value, { stream: true })}`,
          complete: false,
        })
        remaining = frames.remaining
        for (const frame of frames.frames) {
          yield parseEvent(frame)
        }
      }

      for (const frame of takeSseFrames({
        content: `${remaining}${decoder.decode()}`,
        complete: true,
      }).frames) {
        yield parseEvent(frame)
      }
    } finally {
      try {
        if (!complete) {
          await reader.cancel?.()
        }
      } finally {
        reader.releaseLock()
      }
    }
  }

  /**
   * Builds the full URL with query parameters.
   */
  private buildRequestUrl(path: string, query: QueryParams | undefined): URL {
    const url = new URL(`${this.#prefixUrl}${path}`)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        // Skip `null` for the same reason as `undefined`: callers pipe
        // `next_cursor` (which can be `null`) back as `start_cursor`, and a
        // null cursor means "no cursor" — encoding it as the string "null"
        // would send a bogus value to the server.
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            for (const val of value) {
              url.searchParams.append(key, decodeURIComponent(val))
            }
          } else {
            url.searchParams.append(key, String(value))
          }
        }
      }
    }
    return url
  }

  /**
   * Serializes the request body to JSON string if non-empty.
   */
  private serializeBody(
    body: Record<string, unknown> | undefined
  ): string | undefined {
    if (!body) {
      return undefined
    }

    const serializedBody = { ...body }
    if (serializedBody[START_CURSOR_PARAM_NAME] === null) {
      delete serializedBody[START_CURSOR_PARAM_NAME]
    }

    if (Object.entries(serializedBody).length === 0) {
      return undefined
    }

    return JSON.stringify(serializedBody)
  }

  /**
   * Builds the request headers including auth and content-type.
   */
  private buildRequestHeaders(
    customHeaders: Record<string, string> | undefined,
    auth: RequestParameters["auth"],
    bodyAsJsonString: string | undefined
  ): Record<string, string> {
    const authorizationHeader = this.buildAuthHeader(auth)

    const headers: Record<string, string> = {
      ...customHeaders,
      ...authorizationHeader,
      "Notion-Version": this.#notionVersion,
      "user-agent": this.#userAgent,
    }

    if (bodyAsJsonString !== undefined) {
      headers["content-type"] = "application/json"
    }

    return headers
  }

  /**
   * Builds the authorization header based on auth type.
   */
  private buildAuthHeader(
    auth: RequestParameters["auth"]
  ): Record<string, string> {
    if (typeof auth === "object") {
      const unencodedCredential = `${auth.client_id}:${auth.client_secret}`
      const encodedCredential =
        Buffer.from(unencodedCredential).toString("base64")
      return { authorization: `Basic ${encodedCredential}` }
    }
    return this.authAsHeaders(auth)
  }

  /**
   * Builds FormData from form parameters if provided.
   * Also removes content-type header to let fetch set the boundary.
   */
  private buildFormData(
    formDataParams: Record<string, string | FileParam> | undefined,
    headers: Record<string, string>
  ): FormData | undefined {
    if (!formDataParams) {
      return undefined
    }

    delete headers["content-type"]

    const formData = new FormData()
    for (const [key, value] of Object.entries(formDataParams)) {
      if (typeof value === "string") {
        formData.append(key, value)
      } else if (typeof value === "object") {
        formData.append(
          key,
          typeof value.data === "object" ? value.data : new Blob([value.data]),
          value.filename
        )
      }
    }
    return formData
  }

  /**
   * Executes the request with retry logic.
   */
  private async executeWithRetry<ResponseBody extends object>(
    args: ExecutableRequest,
    execute: (request: ExecutableRequest) => Promise<ResponseBody>
  ): Promise<ResponseBody> {
    const { url, method, path, headers, body } = args
    let attempt = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        return await execute({
          url,
          method,
          path,
          headers,
          body,
        })
      } catch (error: unknown) {
        if (!isNotionClientError(error)) {
          throw error
        }

        this.logRequestError(error, attempt)

        if (attempt < this.#maxRetries && this.canRetry(error, method)) {
          const delayMs = this.calculateRetryDelay(error, attempt)
          this.log(LogLevel.INFO, "retrying request", {
            method,
            path,
            attempt: attempt + 1,
            delayMs,
          })
          await this.sleep(delayMs)
          attempt++
          continue
        }

        throw error
      }
    }
  }

  /**
   * Executes a single HTTP request (no retry).
   */
  private async executeSingleRequest<ResponseBody extends object>(
    args: ExecutableRequest
  ): Promise<ResponseBody> {
    const { url, method, path, headers, body } = args
    const response = await RequestTimeoutError.rejectAfterTimeout(
      this.#fetch(url.toString(), {
        method: method.toUpperCase(),
        headers,
        body,
        agent: this.#agent,
      }),
      this.#timeoutMs
    )

    const responseText = await response.text()
    if (!response.ok) {
      throw buildRequestError(response, responseText)
    }

    const responseJson: ResponseBody = JSON.parse(responseText)
    this.log(LogLevel.INFO, "request success", {
      method,
      path,
      ...this.extractRequestId(responseJson),
    })
    return responseJson
  }

  /**
   * Opens an SSE response without consuming its body. Retry orchestration is
   * shared with JSON requests so only the initial, retryable HTTP failures are
   * retried; once a stream has opened, its events are never replayed.
   */
  private async executeSingleStreamRequest(
    args: ExecutableRequest
  ): Promise<SupportedResponse> {
    const { url, method, body } = args
    const response = await RequestTimeoutError.rejectAfterTimeout(
      this.#fetch(url.toString(), {
        method: method.toUpperCase(),
        headers: args.headers,
        body,
        agent: this.#agent,
      }),
      this.#timeoutMs
    )

    if (!response.ok) {
      throw buildRequestError(response, await response.text())
    }

    return response
  }

  /**
   * Logs a request error with appropriate detail level.
   */
  private logRequestError(error: NotionClientError, attempt: number): void {
    this.log(LogLevel.WARN, "request fail", {
      code: error.code,
      message: error.message,
      attempt,
      ...this.extractRequestId(error),
    })

    if (isHTTPResponseError(error)) {
      this.log(LogLevel.DEBUG, "failed response body", {
        body: error.body,
      })
    }
  }

  /**
   * Extracts request_id from an object if present.
   */
  private extractRequestId(obj: unknown): { requestId?: string } {
    if (
      obj &&
      typeof obj === "object" &&
      "request_id" in obj &&
      typeof obj.request_id === "string"
    ) {
      return { requestId: obj.request_id }
    }
    return {}
  }

  /**
   * Determines if an error can be retried based on its error code and method.
   * Rate limits (429) and service overloads (529) are always retryable since
   * the server explicitly asks us to retry. Server errors (500, 503) are only
   * retried for idempotent methods (GET, DELETE) to avoid duplicate side
   * effects.
   */
  private canRetry(error: unknown, method: Method): boolean {
    if (!APIResponseError.isAPIResponseError(error)) {
      return false
    }

    // Server says "try again later"; retry these for every HTTP method.
    if (
      error.code === APIErrorCode.RateLimited ||
      error.code === APIErrorCode.ServiceOverload
    ) {
      return true
    }

    // Server errors only retry for idempotent methods
    const isIdempotent = method === "get" || method === "delete"
    if (isIdempotent) {
      return (
        error.code === APIErrorCode.InternalServerError ||
        error.code === APIErrorCode.ServiceUnavailable
      )
    }

    return false
  }

  /**
   * Calculates the delay before the next retry attempt.
   * Uses retry-after header if present, otherwise exponential back-off with
   * jitter.
   */
  private calculateRetryDelay(error: unknown, attempt: number): number {
    // Try to get retry-after from the error headers
    if (APIResponseError.isAPIResponseError(error)) {
      const retryAfterMs = this.parseRetryAfterHeader(error.headers)
      if (retryAfterMs !== undefined) {
        return Math.min(retryAfterMs, this.#maxRetryDelayMs)
      }
    }

    // Exponential back-off with full jitter
    const baseDelay = this.#initialRetryDelayMs * Math.pow(2, attempt)
    const jitter = Math.random()
    return Math.min(baseDelay * jitter + baseDelay / 2, this.#maxRetryDelayMs)
  }

  /**
   * Parses the retry-after header value.
   * Supports both delta-seconds (e.g., "120") and HTTP-date formats.
   * Returns the delay in milliseconds, or undefined if not present or invalid.
   */
  private parseRetryAfterHeader(headers: unknown): number | undefined {
    const retryAfterValue = getResponseHeader(headers, "retry-after")
    if (!retryAfterValue) {
      return undefined
    }

    // Try parsing as delta-seconds (integer)
    const seconds = parseInt(retryAfterValue, 10)
    if (!isNaN(seconds) && seconds >= 0) {
      return seconds * 1000
    }

    // Try parsing as HTTP-date
    const date = Date.parse(retryAfterValue)
    if (!isNaN(date)) {
      const delayMs = date - Date.now()
      return delayMs > 0 ? delayMs : 0
    }

    return undefined
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /*
   * Notion API endpoints
   */

  public readonly agents = this.#endpointMethods.agents

  public readonly sessions = {
    /**
     * Retrieve a session
     */
    retrieve: this.#endpointMethods.sessions.retrieve,

    /**
     * Update a session
     */
    update: this.#endpointMethods.sessions.update,

    /**
     * Open a session stream
     */
    stream: (
      args: WithAuth<UpdateSessionStreamParameters>
    ): AsyncIterable<UpdateSessionStreamResponse> => {
      this.warnUnknownParams(args, updateSessionStream)
      return this.streamRequest(
        {
          path: updateSessionStream.path(),
          method: updateSessionStream.method,
          query: pick(args, updateSessionStream.queryParams),
          body: pick(args, updateSessionStream.bodyParams),
          headers: updateSessionStream.headers,
          auth: args?.auth,
        },
        parseSessionStreamEvent
      )
    },

    /**
     * Cancel a session
     */
    cancel: this.#endpointMethods.sessions.cancel,

    /**
     * Query sessions
     */
    query: this.#endpointMethods.sessions.query,

    /**
     * Query session events
     */
    queryEvents: this.#endpointMethods.sessions.queryEvents,
  }

  public readonly asyncTasks = this.#endpointMethods.asyncTasks

  public readonly blocks = {
    /**
     * Retrieve block
     */
    retrieve: this.#endpointMethods.blocks.retrieve,

    /**
     * Update block
     */
    update: this.#endpointMethods.blocks.update,

    /**
     * Delete block
     */
    delete: this.#endpointMethods.blocks.delete,
    children: this.#endpointMethods.blocks.children,

    meetingNotes: {
      /**
       * Create a meeting note
       */
      create: this.#endpointMethods.blocks.meetingNotes.create,

      /**
       * Query meeting notes
       */
      query: (
        args: WithAuth<QueryMeetingNotesParameters>
      ): Promise<QueryMeetingNotesResponse> => {
        return this.request<QueryMeetingNotesResponse>({
          path: queryMeetingNotes.path(),
          method: queryMeetingNotes.method,
          query: pick(args, queryMeetingNotes.queryParams),
          body: pick(args, queryMeetingNotes.bodyParams),
          auth: args?.auth,
        })
      },
    },
  }

  public readonly databases = this.#endpointMethods.databases

  public readonly dataSources = this.#endpointMethods.dataSources

  public readonly pages = {
    /**
     * Create a page
     */
    create: this.#endpointMethods.pages.create,

    /**
     * Retrieve a page
     */
    retrieve: this.#endpointMethods.pages.retrieve,

    /**
     * Update page properties
     */
    update: this.#endpointMethods.pages.update,

    /**
     * Move a page
     */
    move: this.#endpointMethods.pages.move,

    /**
     * Retrieve a page as markdown
     */
    retrieveMarkdown: (
      args: WithAuth<GetPageMarkdownParameters>
    ): Promise<GetPageMarkdownResponse> => {
      return this.request<GetPageMarkdownResponse>({
        path: getPageMarkdown.path(args),
        method: getPageMarkdown.method,
        query: pick(args, getPageMarkdown.queryParams),
        body: pick(args, getPageMarkdown.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update a page's content as markdown
     */
    updateMarkdown: (
      args: WithAuth<UpdatePageMarkdownParameters>
    ): Promise<UpdatePageMarkdownResponse> => {
      return this.request<UpdatePageMarkdownResponse>({
        path: updatePageMarkdown.path(args),
        method: updatePageMarkdown.method,
        query: pick(args, updatePageMarkdown.queryParams),
        body: pick(args, updatePageMarkdown.bodyParams),
        auth: args?.auth,
      })
    },
    properties: this.#endpointMethods.pages.properties,
  }

  public readonly users = this.#endpointMethods.users

  public readonly customEmojis = {
    /**
     * List custom emojis
     */
    list: (
      args?: WithAuth<ListCustomEmojisParameters>
    ): Promise<ListCustomEmojisResponse> => {
      this.warnUnknownParams(args ?? {}, listCustomEmojis)
      return this.request<ListCustomEmojisResponse>({
        path: listCustomEmojis.path(),
        method: listCustomEmojis.method,
        query: pick(args ?? {}, listCustomEmojis.queryParams),
        body: pick(args ?? {}, listCustomEmojis.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly comments = this.#endpointMethods.comments

  public readonly fileUploads = {
    /**
     * Create a file upload
     */
    create: this.#endpointMethods.fileUploads.create,

    /**
     * Retrieve a file upload
     */
    retrieve: (
      args: WithAuth<GetFileUploadParameters>
    ): Promise<GetFileUploadResponse> => {
      this.warnUnknownParams(args, getFileUpload)
      return this.request<GetFileUploadResponse>({
        path: getFileUpload.path(args),
        method: getFileUpload.method,
        query: pick(args, getFileUpload.queryParams),
        auth: args?.auth,
      })
    },

    /**
     * List file uploads
     */
    list: (
      args: WithAuth<ListFileUploadsParameters>
    ): Promise<ListFileUploadsResponse> => {
      this.warnUnknownParams(args, listFileUploads)
      return this.request<ListFileUploadsResponse>({
        path: listFileUploads.path(),
        method: listFileUploads.method,
        query: pick(args, listFileUploads.queryParams),
        auth: args?.auth,
      })
    },

    /**
     * Send a file upload
     *
     * Requires a `file_upload_id`, obtained from the `id` of the Create File
     * Upload API response.
     *
     * The `file` parameter contains the raw file contents or Blob/File object
     * under `file.data`, and an optional `file.filename` string.
     *
     * Supply a stringified `part_number` parameter when using file uploads
     * in multi-part mode.
     *
     * This endpoint sends HTTP multipart/form-data instead of JSON parameters.
     */
    send: (
      args: WithAuth<SendFileUploadParameters>
    ): Promise<SendFileUploadResponse> => {
      this.warnUnknownParams(args, sendFileUpload)
      return this.request<SendFileUploadResponse>({
        path: sendFileUpload.path(args),
        method: sendFileUpload.method,
        query: pick(args, sendFileUpload.queryParams),
        formDataParams: pick(args, sendFileUpload.formDataParams),
        auth: args?.auth,
      })
    },

    /**
     * Complete a file upload
     */
    complete: (
      args: WithAuth<CompleteFileUploadParameters>
    ): Promise<CompleteFileUploadResponse> => {
      this.warnUnknownParams(args, completeFileUpload)
      return this.request<CompleteFileUploadResponse>({
        path: completeFileUpload.path(args),
        method: completeFileUpload.method,
        query: pick(args, completeFileUpload.queryParams),
        auth: args?.auth,
      })
    },
  }

  public readonly views = {
    /**
     * Create a view
     */
    create: (
      args: WithAuth<CreateViewParameters>
    ): Promise<CreateViewResponse> => {
      return this.request<CreateViewResponse>({
        path: createView.path(),
        method: createView.method,
        query: pick(args, createView.queryParams),
        body: pick(args, [
          "data_source_id",
          "name",
          "type",
          "database_id",
          "view_id",
          "filter",
          "sorts",
          "quick_filters",
          "create_database",
          "configuration",
          "position",
          "placement",
        ] as const),
        auth: args?.auth,
      })
    },

    /**
     * Retrieve a view
     */
    retrieve: this.#endpointMethods.views.retrieve,

    /**
     * Update a view
     */
    update: (
      args: WithAuth<UpdateViewParameters>
    ): Promise<UpdateViewResponse> => {
      return this.request<UpdateViewResponse>({
        path: updateView.path(args),
        method: updateView.method,
        query: pick(args, updateView.queryParams),
        body: pick(args, [
          "name",
          "filter",
          "sorts",
          "quick_filters",
          "configuration",
        ] as const),
        auth: args?.auth,
      })
    },

    /**
     * Delete a view
     */
    delete: this.#endpointMethods.views.delete,

    /**
     * List views for a database
     */
    list: this.#endpointMethods.views.list,

    queries: {
      /**
       * Create a view query
       */
      create: (
        args: WithAuth<CreateViewQueryParameters>
      ): Promise<CreateViewQueryResponse> => {
        return this.request<CreateViewQueryResponse>({
          path: createViewQuery.path(args),
          method: createViewQuery.method,
          query: pick(args, createViewQuery.queryParams),
          body: pick(args, ["page_size"] as const),
          auth: args?.auth,
        })
      },

      /**
       * Get view query results
       */
      results: this.#endpointMethods.views.queries.results,

      /**
       * Delete a view query
       */
      delete: this.#endpointMethods.views.queries.delete,
    },
  }

  /**
   * Search
   */
  public search = this.#endpointMethods.search

  public readonly oauth = {
    /**
     * Get token
     */
    token: (
      args: OauthTokenParameters & {
        client_id: string
        client_secret: string
      }
    ): Promise<OauthTokenResponse> => {
      return this.request<OauthTokenResponse>({
        path: oauthToken.path(),
        method: oauthToken.method,
        query: pick(args, oauthToken.queryParams),
        body: pick(args, oauthToken.bodyParams),
        auth: {
          client_id: args.client_id,
          client_secret: args.client_secret,
        },
      })
    },
    /**
     * Introspect token
     */
    introspect: (
      args: OauthIntrospectParameters & {
        client_id: string
        client_secret: string
      }
    ): Promise<OauthIntrospectResponse> => {
      return this.request<OauthIntrospectResponse>({
        path: oauthIntrospect.path(),
        method: oauthIntrospect.method,
        query: pick(args, oauthIntrospect.queryParams),
        body: pick(args, oauthIntrospect.bodyParams),
        auth: {
          client_id: args.client_id,
          client_secret: args.client_secret,
        },
      })
    },
    /**
     * Revoke token
     */
    revoke: (
      args: OauthRevokeParameters & {
        client_id: string
        client_secret: string
      }
    ): Promise<OauthRevokeResponse> => {
      return this.request<OauthRevokeResponse>({
        path: oauthRevoke.path(),
        method: oauthRevoke.method,
        query: pick(args, oauthRevoke.queryParams),
        body: pick(args, oauthRevoke.bodyParams),
        auth: {
          client_id: args.client_id,
          client_secret: args.client_secret,
        },
      })
    },
  }

  /**
   * Logs a warning when the caller passes parameters that are not recognized
   * by the endpoint definition. This helps catch typos and renamed parameters
   * (e.g. `archived` vs `in_trash` for `databases.update`) that would
   * otherwise be silently dropped by `pick()`.
   */
  private warnUnknownParams(
    args: Record<string, unknown>,
    endpoint: EndpointDefinition
  ): void {
    if (!args || typeof args !== "object") {
      return
    }

    const unknownKeys = getUnknownParams(args, endpoint)
    if (unknownKeys.length > 0) {
      this.log(LogLevel.WARN, "unknown parameters were ignored", {
        unknownParams: unknownKeys,
        knownParams: [
          ...endpoint.pathParams,
          ...endpoint.queryParams,
          ...endpoint.bodyParams,
          ...(endpoint.formDataParams ?? []),
        ],
      })
    }
  }

  /**
   * Emits a log message to the console.
   *
   * @param level The level for this message
   * @param args Arguments to send to the console
   */
  private log(
    level: LogLevel,
    message: string,
    extraInfo: Record<string, unknown>
  ) {
    if (logLevelSeverity(level) >= logLevelSeverity(this.#logLevel)) {
      this.#logger(level, message, extraInfo)
    }
  }

  /**
   * Transforms an API key or access token into a headers object suitable for an HTTP request.
   *
   * This method uses the instance's value as the default when the input is undefined. If neither are defined, it returns
   * an empty object
   *
   * @param auth API key or access token
   * @returns headers key-value object
   */
  private authAsHeaders(auth?: string): Record<string, string> {
    const headers: Record<string, string> = {}
    const authHeaderValue = auth ?? this.#auth
    if (authHeaderValue !== undefined) {
      headers["authorization"] = `Bearer ${authHeaderValue}`
    }
    return headers
  }
}

type SseFrame = {
  eventName: string
  data: string
}

const sessionStreamEventTypes = new Set<string>([
  "session.snapshot",
  "event.provisional",
  "event.committed",
  "stream.timeout",
  "stream.end",
  "stream.error",
])

function takeSseFrames(args: { content: string; complete: boolean }): {
  frames: SseFrame[]
  remaining: string
} {
  const frames: SseFrame[] = []
  let remaining = args.content.replace(/\r\n/g, "\n")

  let boundary = remaining.indexOf("\n\n")
  while (boundary !== -1) {
    const frame = parseSseFrame(remaining.slice(0, boundary))
    if (frame !== undefined) {
      frames.push(frame)
    }
    remaining = remaining.slice(boundary + 2)
    boundary = remaining.indexOf("\n\n")
  }

  if (args.complete && remaining !== "") {
    const frame = parseSseFrame(remaining)
    if (frame !== undefined) {
      frames.push(frame)
    }
    remaining = ""
  }

  return { frames, remaining }
}

function parseSseFrame(content: string): SseFrame | undefined {
  let eventName: string | undefined
  const dataLines: string[] = []

  for (const line of content.split("\n")) {
    if (line.startsWith(":")) {
      continue
    }

    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) {
      continue
    }

    const field = line.slice(0, colonIndex)
    const valueStart =
      line.charAt(colonIndex + 1) === " " ? colonIndex + 2 : colonIndex + 1
    const value = line.slice(valueStart)
    if (field === "event") {
      eventName = value
    } else if (field === "data") {
      dataLines.push(value)
    }
  }

  if (dataLines.length === 0) {
    return undefined
  }
  if (eventName === undefined) {
    throw new Error("Session stream event is missing its SSE event name.")
  }

  return { eventName, data: dataLines.join("\n") }
}

function parseSessionStreamEvent(frame: SseFrame): UpdateSessionStreamResponse {
  const event: UpdateSessionStreamResponse = JSON.parse(frame.data)
  if (
    typeof event !== "object" ||
    event === null ||
    !sessionStreamEventTypes.has(event.type) ||
    event.type !== frame.eventName
  ) {
    throw new Error("Session stream event does not match its SSE event name.")
  }
  return event
}

/*
 * Type aliases to support the generic request interface.
 */
type Method = "get" | "post" | "patch" | "delete"
type QueryParams =
  | Record<string, string | number | boolean | string[] | null>
  | URLSearchParams

type WithAuth<P> = P & { auth?: string }
