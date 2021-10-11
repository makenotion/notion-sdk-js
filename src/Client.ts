import type { Agent } from "http"
import {
  Logger,
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
import { pick } from "./helpers"
import {
  GetBlockParameters,
  GetBlockResponse,
  getBlock,
  UpdateBlockParameters,
  UpdateBlockResponse,
  updateBlock,
  DeleteBlockParameters,
  DeleteBlockResponse,
  deleteBlock,
  AppendBlockChildrenParameters,
  AppendBlockChildrenResponse,
  appendBlockChildren,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  listBlockChildren,
  ListDatabasesParameters,
  ListDatabasesResponse,
  listDatabases,
  GetDatabaseParameters,
  GetDatabaseResponse,
  getDatabase,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  queryDatabase,
  CreateDatabaseParameters,
  CreateDatabaseResponse,
  createDatabase,
  UpdateDatabaseParameters,
  UpdateDatabaseResponse,
  updateDatabase,
  CreatePageParameters,
  CreatePageResponse,
  createPage,
  GetPageParameters,
  GetPageResponse,
  getPage,
  UpdatePageParameters,
  UpdatePageResponse,
  updatePage,
  GetUserParameters,
  GetUserResponse,
  getUser,
  ListUsersParameters,
  ListUsersResponse,
  listUsers,
  SearchParameters,
  SearchResponse,
  search,
  GetSelfParameters,
  GetSelfResponse,
  getSelf,
  GetPagePropertyParameters,
  GetPagePropertyResponse,
  getPageProperty,
} from "./api-endpoints"
import nodeFetch from "node-fetch"
import {
  version as PACKAGE_VERSION,
  name as PACKAGE_NAME,
} from "../package.json"
import { SupportedFetch } from "./fetch-types"

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

export interface RequestParameters {
  path: string
  method: Method
  query?: QueryParams
  body?: Record<string, unknown>
  auth?: string
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

  static readonly defaultNotionVersion = "2021-08-16"

  public constructor(options?: ClientOptions) {
    this.#auth = options?.auth
    this.#logLevel = options?.logLevel ?? LogLevel.WARN
    this.#logger = options?.logger ?? makeConsoleLogger(PACKAGE_NAME)
    this.#prefixUrl = (options?.baseUrl ?? "https://api.notion.com") + "/v1/"
    this.#timeoutMs = options?.timeoutMs ?? 60_000
    this.#notionVersion = options?.notionVersion ?? Client.defaultNotionVersion
    this.#fetch = options?.fetch ?? nodeFetch
    this.#agent = options?.agent
    this.#userAgent = `notionhq-client/${PACKAGE_VERSION}`
  }

  /**
   * Sends a request.
   *
   * @param path
   * @param method
   * @param query
   * @param body
   * @returns
   */
  public async request<ResponseBody>({
    path,
    method,
    query,
    body,
    auth,
  }: RequestParameters): Promise<ResponseBody> {
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
          url.searchParams.append(key, String(value))
        }
      }
    }

    const headers: Record<string, string> = {
      ...this.authAsHeaders(auth),
      "Notion-Version": this.#notionVersion,
      "user-agent": this.#userAgent,
    }

    if (bodyAsJsonString !== undefined) {
      headers["content-type"] = "application/json"
    }
    try {
      const response = await RequestTimeoutError.rejectAfterTimeout(
        this.#fetch(url.toString(), {
          method,
          headers,
          body: bodyAsJsonString,
          agent: this.#agent,
        }),
        this.#timeoutMs
      )

      const responseText = await response.text()
      if (!response.ok) {
        throw buildRequestError(response, responseText)
      }

      const responseJson: ResponseBody = JSON.parse(responseText)
      this.log(LogLevel.INFO, `request success`, { method, path })
      return responseJson
    } catch (error: unknown) {
      if (!isNotionClientError(error)) {
        throw error
      }

      // Log the error if it's one of our known error types
      this.log(LogLevel.WARN, `request fail`, {
        code: error.code,
        message: error.message,
      })

      if (isHTTPResponseError(error)) {
        // The response body may contain sensitive information so it is logged separately at the DEBUG level
        this.log(LogLevel.DEBUG, `failed response body`, {
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

  /**
   * Search
   */
  public search(args: WithAuth<SearchParameters>): Promise<SearchResponse> {
    return this.request<SearchResponse>({
      path: search.path(),
      method: search.method,
      query: pick(args, search.queryParams),
      body: pick(args, search.bodyParams),
      auth: args?.auth,
    })
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
type QueryParams = Record<string, string | number> | URLSearchParams

type WithAuth<P> = P & { auth?: string }
