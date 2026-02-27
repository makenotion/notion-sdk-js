import type { Agent } from "node:http"
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
  isHTTPResponseError,
  isNotionClientError,
  type NotionClientError,
  RequestTimeoutError,
  validateRequestPath,
} from "./errors"
import { pick } from "./utils"
import {
  type GetBlockParameters,
  type GetBlockResponse,
  getBlock,
  type UpdateBlockParameters,
  type UpdateBlockResponse,
  updateBlock,
  type DeleteBlockParameters,
  type DeleteBlockResponse,
  deleteBlock,
  type AppendBlockChildrenParameters,
  type AppendBlockChildrenResponse,
  appendBlockChildren,
  type ListBlockChildrenParameters,
  type ListBlockChildrenResponse,
  listBlockChildren,
  type QueryDataSourceParameters,
  type QueryDataSourceResponse,
  queryDataSource,
  type CreateDataSourceParameters,
  type CreateDataSourceResponse,
  createDataSource,
  type UpdateDataSourceParameters,
  type UpdateDataSourceResponse,
  updateDataSource,
  type GetDataSourceParameters,
  type GetDataSourceResponse,
  getDataSource,
  type CreatePageParameters,
  type CreatePageResponse,
  createPage,
  type GetPageParameters,
  type GetPageResponse,
  getPage,
  type UpdatePageParameters,
  type UpdatePageResponse,
  updatePage,
  type MovePageParameters,
  type MovePageResponse,
  movePage,
  type GetPageMarkdownParameters,
  type GetPageMarkdownResponse,
  getPageMarkdown,
  type UpdatePageMarkdownParameters,
  type UpdatePageMarkdownResponse,
  updatePageMarkdown,
  type GetUserParameters,
  type GetUserResponse,
  getUser,
  type ListUsersParameters,
  type ListUsersResponse,
  listUsers,
  type SearchParameters,
  type SearchResponse,
  search,
  type GetSelfParameters,
  type GetSelfResponse,
  getSelf,
  type GetPagePropertyParameters,
  type GetPagePropertyResponse,
  getPageProperty,
  type CreateCommentParameters,
  type CreateCommentResponse,
  createComment,
  type ListCommentsParameters,
  type ListCommentsResponse,
  listComments,
  type GetCommentParameters,
  type GetCommentResponse,
  getComment,
  type OauthTokenResponse,
  type OauthTokenParameters,
  oauthToken,
  type OauthIntrospectResponse,
  type OauthIntrospectParameters,
  oauthIntrospect,
  type OauthRevokeResponse,
  type OauthRevokeParameters,
  oauthRevoke,
  type CreateFileUploadParameters,
  type CreateFileUploadResponse,
  createFileUpload,
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
  GetDatabaseParameters,
  GetDatabaseResponse,
  getDatabase,
  CreateDatabaseResponse,
  CreateDatabaseParameters,
  createDatabase,
  UpdateDatabaseParameters,
  UpdateDatabaseResponse,
  updateDatabase,
  listDataSourceTemplates,
  ListDataSourceTemplatesResponse,
  ListDataSourceTemplatesParameters,
} from "./api-endpoints"
import {
  version as PACKAGE_VERSION,
  name as PACKAGE_NAME,
} from "../package.json"
import type { SupportedFetch } from "./fetch-types"

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
}

type FileParam = {
  filename?: string
  data: string | Blob
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

export default class Client {
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
    this.#prefixUrl = `${options?.baseUrl ?? "https://api.notion.com"}/v1/`
    this.#timeoutMs = options?.timeoutMs ?? 60_000
    this.#notionVersion = options?.notionVersion ?? Client.defaultNotionVersion
    this.#fetch = options?.fetch ?? fetch
    this.#agent = options?.agent
    this.#userAgent = `notionhq-client/${PACKAGE_VERSION}`

    if (options?.retry === false) {
      this.#maxRetries = 0
      this.#initialRetryDelayMs = 0
      this.#maxRetryDelayMs = 0
    } else {
      this.#maxRetries = options?.retry?.maxRetries ?? 2
      this.#initialRetryDelayMs = options?.retry?.initialRetryDelayMs ?? 1000
      this.#maxRetryDelayMs = options?.retry?.maxRetryDelayMs ?? 60_000
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

    return this.executeWithRetry<ResponseBody>({
      url,
      method,
      path,
      headers,
      body: bodyAsJsonString ?? formData,
    })
  }

  /**
   * Builds the full URL with query parameters.
   */
  private buildRequestUrl(path: string, query: QueryParams | undefined): URL {
    const url = new URL(`${this.#prefixUrl}${path}`)
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined) {
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
    if (!body || Object.entries(body).length === 0) {
      return undefined
    }
    return JSON.stringify(body)
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
  private async executeWithRetry<ResponseBody extends object>(args: {
    url: URL
    method: Method
    path: string
    headers: Record<string, string>
    body: string | FormData | undefined
  }): Promise<ResponseBody> {
    const { url, method, path, headers, body } = args
    let attempt = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        return await this.executeSingleRequest<ResponseBody>({
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
  private async executeSingleRequest<ResponseBody extends object>(args: {
    url: URL
    method: Method
    path: string
    headers: Record<string, string>
    body: string | FormData | undefined
  }): Promise<ResponseBody> {
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
   * Rate limits (429) are always retryable since the server explicitly asks us
   * to retry. Server errors (500, 503) are only retried for idempotent methods
   * (GET, DELETE) to avoid duplicate side effects.
   */
  private canRetry(error: unknown, method: Method): boolean {
    if (!APIResponseError.isAPIResponseError(error)) {
      return false
    }

    // Rate limits are always retryable - server says "try again later"
    if (error.code === APIErrorCode.RateLimited) {
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
    if (!headers) {
      return undefined
    }

    let retryAfterValue: string | null = null

    // Handle Headers object (standard fetch API)
    if (typeof headers === "object" && "get" in headers) {
      const headersObj = headers as { get: (name: string) => string | null }
      retryAfterValue = headersObj.get("retry-after")
    }
    // Handle plain object
    else if (typeof headers === "object") {
      const headersRecord = headers as Record<string, string>
      retryAfterValue =
        headersRecord["retry-after"] ?? headersRecord["Retry-After"] ?? null
    }

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

  public readonly blocks = {
    /**
     * Retrieve block
     */
    retrieve: (
      args: WithAuth<GetBlockParameters>
    ): Promise<GetBlockResponse> => {
      return this.request<GetBlockResponse>({
        path: getBlock.path(args),
        method: getBlock.method,
        query: pick(args, getBlock.queryParams),
        body: pick(args, getBlock.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update block
     */
    update: (
      args: WithAuth<UpdateBlockParameters>
    ): Promise<UpdateBlockResponse> => {
      return this.request<UpdateBlockResponse>({
        path: updateBlock.path(args),
        method: updateBlock.method,
        query: pick(args, updateBlock.queryParams),
        body: pick(args, updateBlock.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Delete block
     */
    delete: (
      args: WithAuth<DeleteBlockParameters>
    ): Promise<DeleteBlockResponse> => {
      return this.request<DeleteBlockResponse>({
        path: deleteBlock.path(args),
        method: deleteBlock.method,
        query: pick(args, deleteBlock.queryParams),
        body: pick(args, deleteBlock.bodyParams),
        auth: args?.auth,
      })
    },
    children: {
      /**
       * Append block children
       */
      append: (
        args: WithAuth<AppendBlockChildrenParameters>
      ): Promise<AppendBlockChildrenResponse> => {
        return this.request<AppendBlockChildrenResponse>({
          path: appendBlockChildren.path(args),
          method: appendBlockChildren.method,
          query: pick(args, appendBlockChildren.queryParams),
          body: pick(args, appendBlockChildren.bodyParams),
          auth: args?.auth,
        })
      },

      /**
       * Retrieve block children
       */
      list: (
        args: WithAuth<ListBlockChildrenParameters>
      ): Promise<ListBlockChildrenResponse> => {
        return this.request<ListBlockChildrenResponse>({
          path: listBlockChildren.path(args),
          method: listBlockChildren.method,
          query: pick(args, listBlockChildren.queryParams),
          body: pick(args, listBlockChildren.bodyParams),
          auth: args?.auth,
        })
      },
    },
  }

  public readonly databases = {
    /**
     * Retrieve a database
     */
    retrieve: (
      args: WithAuth<GetDatabaseParameters>
    ): Promise<GetDatabaseResponse> => {
      return this.request<GetDatabaseResponse>({
        path: getDatabase.path(args),
        method: getDatabase.method,
        query: pick(args, getDatabase.queryParams),
        body: pick(args, getDatabase.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Create a database
     */
    create: (
      args: WithAuth<CreateDatabaseParameters>
    ): Promise<CreateDatabaseResponse> => {
      return this.request<CreateDatabaseResponse>({
        path: createDatabase.path(),
        method: createDatabase.method,
        query: pick(args, createDatabase.queryParams),
        body: pick(args, createDatabase.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update a database
     */
    update: (
      args: WithAuth<UpdateDatabaseParameters>
    ): Promise<UpdateDatabaseResponse> => {
      return this.request<UpdateDatabaseResponse>({
        path: updateDatabase.path(args),
        method: updateDatabase.method,
        query: pick(args, updateDatabase.queryParams),
        body: pick(args, updateDatabase.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly dataSources = {
    /**
     * Retrieve a data source
     */
    retrieve: (
      args: WithAuth<GetDataSourceParameters>
    ): Promise<GetDataSourceResponse> => {
      return this.request<GetDataSourceResponse>({
        path: getDataSource.path(args),
        method: getDataSource.method,
        query: pick(args, getDataSource.queryParams),
        body: pick(args, getDataSource.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Query a data source
     */
    query: (
      args: WithAuth<QueryDataSourceParameters>
    ): Promise<QueryDataSourceResponse> => {
      return this.request<QueryDataSourceResponse>({
        path: queryDataSource.path(args),
        method: queryDataSource.method,
        query: pick(args, queryDataSource.queryParams),
        body: pick(args, queryDataSource.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Create a data source
     */
    create: (
      args: WithAuth<CreateDataSourceParameters>
    ): Promise<CreateDataSourceResponse> => {
      return this.request<CreateDataSourceResponse>({
        path: createDataSource.path(),
        method: createDataSource.method,
        query: pick(args, createDataSource.queryParams),
        body: pick(args, createDataSource.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update a data source
     */
    update: (
      args: WithAuth<UpdateDataSourceParameters>
    ): Promise<UpdateDataSourceResponse> => {
      return this.request<UpdateDataSourceResponse>({
        path: updateDataSource.path(args),
        method: updateDataSource.method,
        query: pick(args, updateDataSource.queryParams),
        body: pick(args, updateDataSource.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * List page templates that are available for a data source
     */
    listTemplates: (
      args: WithAuth<ListDataSourceTemplatesParameters>
    ): Promise<ListDataSourceTemplatesResponse> => {
      return this.request<ListDataSourceTemplatesResponse>({
        path: listDataSourceTemplates.path(args),
        method: listDataSourceTemplates.method,
        query: pick(args, listDataSourceTemplates.queryParams),
        body: pick(args, listDataSourceTemplates.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly pages = {
    /**
     * Create a page
     */
    create: (
      args: WithAuth<CreatePageParameters>
    ): Promise<CreatePageResponse> => {
      return this.request<CreatePageResponse>({
        path: createPage.path(),
        method: createPage.method,
        query: pick(args, createPage.queryParams),
        body: pick(args, createPage.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Retrieve a page
     */
    retrieve: (args: WithAuth<GetPageParameters>): Promise<GetPageResponse> => {
      return this.request<GetPageResponse>({
        path: getPage.path(args),
        method: getPage.method,
        query: pick(args, getPage.queryParams),
        body: pick(args, getPage.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update page properties
     */
    update: (
      args: WithAuth<UpdatePageParameters>
    ): Promise<UpdatePageResponse> => {
      return this.request<UpdatePageResponse>({
        path: updatePage.path(args),
        method: updatePage.method,
        query: pick(args, updatePage.queryParams),
        body: pick(args, updatePage.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Move a page
     */
    move: (args: WithAuth<MovePageParameters>): Promise<MovePageResponse> => {
      return this.request<MovePageResponse>({
        path: movePage.path(args),
        method: movePage.method,
        query: pick(args, movePage.queryParams),
        body: pick(args, movePage.bodyParams),
        auth: args?.auth,
      })
    },

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
    properties: {
      /**
       * Retrieve page property
       */
      retrieve: (
        args: WithAuth<GetPagePropertyParameters>
      ): Promise<GetPagePropertyResponse> => {
        return this.request<GetPagePropertyResponse>({
          path: getPageProperty.path(args),
          method: getPageProperty.method,
          query: pick(args, getPageProperty.queryParams),
          body: pick(args, getPageProperty.bodyParams),
          auth: args?.auth,
        })
      },
    },
  }

  public readonly users = {
    /**
     * Retrieve a user
     */
    retrieve: (args: WithAuth<GetUserParameters>): Promise<GetUserResponse> => {
      return this.request<GetUserResponse>({
        path: getUser.path(args),
        method: getUser.method,
        query: pick(args, getUser.queryParams),
        body: pick(args, getUser.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * List all users
     */
    list: (args: WithAuth<ListUsersParameters>): Promise<ListUsersResponse> => {
      return this.request<ListUsersResponse>({
        path: listUsers.path(),
        method: listUsers.method,
        query: pick(args, listUsers.queryParams),
        body: pick(args, listUsers.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Get details about bot
     */
    me: (args: WithAuth<GetSelfParameters>): Promise<GetSelfResponse> => {
      return this.request<GetSelfResponse>({
        path: getSelf.path(),
        method: getSelf.method,
        query: pick(args, getSelf.queryParams),
        body: pick(args, getSelf.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly comments = {
    /**
     * Create a comment
     */
    create: (
      args: WithAuth<CreateCommentParameters>
    ): Promise<CreateCommentResponse> => {
      return this.request<CreateCommentResponse>({
        path: createComment.path(),
        method: createComment.method,
        query: pick(args, createComment.queryParams),
        body: pick(args, createComment.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * List comments
     */
    list: (
      args: WithAuth<ListCommentsParameters>
    ): Promise<ListCommentsResponse> => {
      return this.request<ListCommentsResponse>({
        path: listComments.path(),
        method: listComments.method,
        query: pick(args, listComments.queryParams),
        body: pick(args, listComments.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Retrieve a comment
     */
    retrieve: (
      args: WithAuth<GetCommentParameters>
    ): Promise<GetCommentResponse> => {
      return this.request<GetCommentResponse>({
        path: getComment.path(args),
        method: getComment.method,
        query: pick(args, getComment.queryParams),
        body: pick(args, getComment.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly fileUploads = {
    /**
     * Create a file upload
     */
    create: (
      args: WithAuth<CreateFileUploadParameters>
    ): Promise<CreateFileUploadResponse> => {
      return this.request<CreateFileUploadResponse>({
        path: createFileUpload.path(),
        method: createFileUpload.method,
        query: pick(args, createFileUpload.queryParams),
        body: pick(args, createFileUpload.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Retrieve a file upload
     */
    retrieve: (
      args: WithAuth<GetFileUploadParameters>
    ): Promise<GetFileUploadResponse> => {
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
      return this.request<CompleteFileUploadResponse>({
        path: completeFileUpload.path(args),
        method: completeFileUpload.method,
        query: pick(args, completeFileUpload.queryParams),
        auth: args?.auth,
      })
    },
  }

  /**
   * Search
   */
  public search = (
    args: WithAuth<SearchParameters>
  ): Promise<SearchResponse> => {
    return this.request<SearchResponse>({
      path: search.path(),
      method: search.method,
      query: pick(args, search.queryParams),
      body: pick(args, search.bodyParams),
      auth: args?.auth,
    })
  }

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

/*
 * Type aliases to support the generic request interface.
 */
type Method = "get" | "post" | "patch" | "delete"
type QueryParams =
  | Record<string, string | number | boolean | string[]>
  | URLSearchParams

type WithAuth<P> = P & { auth?: string }
