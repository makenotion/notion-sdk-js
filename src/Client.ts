import type { Agent } from "node:http"
import {
  type Logger,
  LogLevel,
  logLevelSeverity,
  makeConsoleLogger,
} from "./logging"
import {
  buildRequestError,
  isHTTPResponseError,
  isNotionClientError,
  RequestTimeoutError,
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
  type ListDatabasesParameters,
  type ListDatabasesResponse,
  listDatabases,
  type GetDatabaseParameters,
  type GetDatabaseResponse,
  getDatabase,
  type QueryDatabaseParameters,
  type QueryDatabaseResponse,
  queryDatabase,
  type CreateDatabaseParameters,
  type CreateDatabaseResponse,
  createDatabase,
  type UpdateDatabaseParameters,
  type UpdateDatabaseResponse,
  updateDatabase,
  type CreatePageParameters,
  type CreatePageResponse,
  createPage,
  type GetPageParameters,
  type GetPageResponse,
  getPage,
  type UpdatePageParameters,
  type UpdatePageResponse,
  updatePage,
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
} from "./api-endpoints"
import {
  version as PACKAGE_VERSION,
  name as PACKAGE_NAME,
} from "../package.json"
import type { SupportedFetch } from "./fetch-types"
import type { Readable } from "stream"

export interface ClientOptions {
  auth?: string
  timeoutMs?: number
  baseUrl?: string
  logLevel?: LogLevel
  logger?: Logger
  notionVersion?: string
  fetch?: SupportedFetch
  /** Silently ignored in the browser */
  agent?: Agent
}

type FileParam = {
  filename?: string
  data: string | Blob
}

export interface RequestParameters {
  path: string
  method: Method
  query?: QueryParams
  body?: Record<string, unknown>
  formDataParams?: Record<string, string | FileParam>
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

  static readonly defaultNotionVersion = "2022-06-28"

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
  }

  /**
   * Sends a request.
   */
  public async request<ResponseBody>(
    args: RequestParameters
  ): Promise<ResponseBody> {
    const { path, method, query, body, formDataParams, auth } = args

    this.log(LogLevel.INFO, "request start", { method, path })

    // If the body is empty, don't send the body in the HTTP request
    const bodyAsJsonString =
      !body || Object.entries(body).length === 0
        ? undefined
        : JSON.stringify(body)

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

    // Allow both client ID / client secret based auth as well as token based auth.
    let authorizationHeader: Record<string, string>
    if (typeof auth === "object") {
      // Client ID and secret based auth is **ONLY** supported when using the
      // `/oauth/token` endpoint. If this is the case, handle formatting the
      // authorization header as required by `Basic` auth.
      const unencodedCredential = `${auth.client_id}:${auth.client_secret}`
      const encodedCredential =
        Buffer.from(unencodedCredential).toString("base64")
      authorizationHeader = { authorization: `Basic ${encodedCredential}` }
    } else {
      // Otherwise format authorization header as `Bearer` token auth.
      authorizationHeader = this.authAsHeaders(auth)
    }

    const headers: Record<string, string> = {
      ...authorizationHeader,
      "Notion-Version": this.#notionVersion,
      "user-agent": this.#userAgent,
    }

    if (bodyAsJsonString !== undefined) {
      headers["content-type"] = "application/json"
    }

    let formData: FormData | undefined
    if (formDataParams) {
      delete headers["content-type"]

      formData = new FormData()
      for (const [key, value] of Object.entries(formDataParams)) {
        if (typeof value === "string") {
          formData.append(key, value)
        } else if (typeof value === "object") {
          formData.append(
            key,
            typeof value.data === "object"
              ? value.data
              : new Blob([value.data]),
            value.filename
          )
        }
      }
    }

    try {
      const response = await RequestTimeoutError.rejectAfterTimeout(
        this.#fetch(url.toString(), {
          method: method.toUpperCase(),
          headers,
          body: bodyAsJsonString ?? (formData as unknown as Readable),
          agent: this.#agent,
        }),
        this.#timeoutMs
      )

      const responseText = await response.text()
      if (!response.ok) {
        throw buildRequestError(response, responseText)
      }

      const responseJson: ResponseBody = JSON.parse(responseText)
      this.log(LogLevel.INFO, "request success", { method, path })
      return responseJson
    } catch (error: unknown) {
      if (!isNotionClientError(error)) {
        throw error
      }

      // Log the error if it's one of our known error types
      this.log(LogLevel.WARN, "request fail", {
        code: error.code,
        message: error.message,
      })

      if (isHTTPResponseError(error)) {
        // The response body may contain sensitive information so it is logged separately at the DEBUG level
        this.log(LogLevel.DEBUG, "failed response body", {
          body: error.body,
        })
      }

      throw error
    }
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
     * List databases
     *
     * @deprecated Please use `search`
     */
    list: (
      args: WithAuth<ListDatabasesParameters>
    ): Promise<ListDatabasesResponse> => {
      return this.request<ListDatabasesResponse>({
        path: listDatabases.path(),
        method: listDatabases.method,
        query: pick(args, listDatabases.queryParams),
        body: pick(args, listDatabases.bodyParams),
        auth: args?.auth,
      })
    },

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
     * Query a database
     */
    query: (
      args: WithAuth<QueryDatabaseParameters>
    ): Promise<QueryDatabaseResponse> => {
      return this.request<QueryDatabaseResponse>({
        path: queryDatabase.path(args),
        method: queryDatabase.method,
        query: pick(args, queryDatabase.queryParams),
        body: pick(args, queryDatabase.bodyParams),
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
type QueryParams = Record<string, string | number | string[]> | URLSearchParams

type WithAuth<P> = P & { auth?: string }
