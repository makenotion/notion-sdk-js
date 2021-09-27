import {
  Logger,
  LogLevel,
  logLevelSeverity,
  makeConsoleLogger,
} from "./logging.ts"
import {
  buildRequestError,
  isHTTPResponseError,
  isNotionClientError,
  RequestTimeoutError,
} from "./errors.ts"
import { pick } from "./helpers.ts"
import {
  BlocksChildrenAppendParameters,
  BlocksChildrenAppendResponse,
  blocksChildrenAppend,
  BlocksChildrenListParameters,
  BlocksChildrenListResponse,
  blocksChildrenList,
  DatabasesListParameters,
  DatabasesListResponse,
  databasesList,
  DatabasesQueryResponse,
  DatabasesQueryParameters,
  databasesQuery,
  DatabasesRetrieveParameters,
  DatabasesRetrieveResponse,
  databasesRetrieve,
  PagesCreateParameters,
  PagesCreateResponse,
  pagesCreate,
  PagesRetrieveParameters,
  PagesRetrieveResponse,
  pagesRetrieve,
  PagesUpdateParameters,
  PagesUpdateResponse,
  pagesUpdate,
  UsersListParameters,
  UsersListResponse,
  usersList,
  UsersRetrieveParameters,
  UsersRetrieveResponse,
  usersRetrieve,
  SearchParameters,
  SearchResponse,
  search,
  DatabasesCreateParameters,
  DatabasesCreateResponse,
  databasesCreate,
  BlocksRetrieveParameters,
  BlocksRetrieveResponse,
  blocksRetrieve,
  BlocksUpdateParameters,
  BlocksUpdateResponse,
  blocksUpdate,
  databasesUpdate,
  DatabasesUpdateParameters,
  DatabasesUpdateResponse,
  blocksDelete,
  BlocksDeleteParameters,
  BlocksDeleteResponse,
} from "./api-endpoints.ts"
// import {
//   version as PACKAGE_VERSION,
//   name as PACKAGE_NAME,
// } from "../package.json"
import { SupportedFetch } from "./fetch-types.ts"

const PACKAGE_NAME = "cloudydeno/deno-notion_sdk";
const PACKAGE_VERSION = "0.3.3";

export interface ClientOptions {
  auth?: string
  timeoutMs?: number
  baseUrl?: string
  logLevel?: LogLevel
  logger?: Logger
  notionVersion?: string
  fetch?: SupportedFetch
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
  #userAgent: string

  static readonly defaultNotionVersion = "2021-08-16"

  public constructor(options?: ClientOptions) {
    this.#auth = options?.auth
    this.#logLevel = options?.logLevel ?? LogLevel.WARN
    this.#logger = options?.logger ?? makeConsoleLogger(PACKAGE_NAME)
    this.#prefixUrl = (options?.baseUrl ?? "https://api.notion.com") + "/v1/"
    this.#timeoutMs = options?.timeoutMs ?? 60_000
    this.#notionVersion = options?.notionVersion ?? Client.defaultNotionVersion
    this.#fetch = options?.fetch ?? fetch
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
      args: WithAuth<BlocksRetrieveParameters>
    ): Promise<BlocksRetrieveResponse> => {
      return this.request<BlocksRetrieveResponse>({
        path: blocksRetrieve.path(args),
        method: blocksRetrieve.method,
        query: pick(args, blocksRetrieve.queryParams),
        body: pick(args, blocksRetrieve.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update block
     */
    update: (
      args: WithAuth<BlocksUpdateParameters>
    ): Promise<BlocksUpdateResponse> => {
      return this.request<BlocksUpdateResponse>({
        path: blocksUpdate.path(args),
        method: blocksUpdate.method,
        query: pick(args, blocksUpdate.queryParams),
        body: pick(args, blocksUpdate.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Delete block
     */
    delete: (
      args: WithAuth<BlocksDeleteParameters>
    ): Promise<BlocksDeleteResponse> => {
      return this.request<BlocksRetrieveResponse>({
        path: blocksDelete.path(args),
        method: blocksDelete.method,
        query: pick(args, blocksDelete.queryParams),
        body: pick(args, blocksDelete.bodyParams),
        auth: args?.auth,
      })
    },
    children: {
      /**
       * Append block children
       */
      append: (
        args: WithAuth<BlocksChildrenAppendParameters>
      ): Promise<BlocksChildrenAppendResponse> => {
        return this.request<BlocksChildrenAppendResponse>({
          path: blocksChildrenAppend.path(args),
          method: blocksChildrenAppend.method,
          query: pick(args, blocksChildrenAppend.queryParams),
          body: pick(args, blocksChildrenAppend.bodyParams),
          auth: args?.auth,
        })
      },

      /**
       * Retrieve block children
       */
      list: (
        args: WithAuth<BlocksChildrenListParameters>
      ): Promise<BlocksChildrenListResponse> => {
        return this.request<BlocksChildrenListResponse>({
          path: blocksChildrenList.path(args),
          method: blocksChildrenList.method,
          query: pick(args, blocksChildrenList.queryParams),
          body: pick(args, blocksChildrenList.bodyParams),
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
      args: WithAuth<DatabasesListParameters> = {}
    ): Promise<DatabasesListResponse> => {
      return this.request<DatabasesListResponse>({
        path: databasesList.path(),
        method: databasesList.method,
        query: pick(args, databasesList.queryParams),
        body: pick(args, databasesList.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Retrieve a database
     */
    retrieve: (
      args: WithAuth<DatabasesRetrieveParameters>
    ): Promise<DatabasesRetrieveResponse> => {
      return this.request<DatabasesRetrieveResponse>({
        path: databasesRetrieve.path(args),
        method: databasesRetrieve.method,
        query: pick(args, databasesRetrieve.queryParams),
        body: pick(args, databasesRetrieve.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Query a database
     */
    query: (
      args: WithAuth<DatabasesQueryParameters>
    ): Promise<DatabasesQueryResponse> => {
      return this.request<DatabasesQueryResponse>({
        path: databasesQuery.path(args),
        method: databasesQuery.method,
        query: pick(args, databasesQuery.queryParams),
        body: pick(args, databasesQuery.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Create a database
     */
    create: (
      args: WithAuth<DatabasesCreateParameters>
    ): Promise<DatabasesCreateResponse> => {
      return this.request<DatabasesCreateResponse>({
        path: databasesCreate.path(),
        method: databasesCreate.method,
        query: pick(args, databasesCreate.queryParams),
        body: pick(args, databasesCreate.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update a database
     */
    update: (
      args: WithAuth<DatabasesUpdateParameters>
    ): Promise<DatabasesUpdateResponse> => {
      return this.request<DatabasesUpdateResponse>({
        path: databasesUpdate.path(args),
        method: databasesUpdate.method,
        query: pick(args, databasesUpdate.queryParams),
        body: pick(args, databasesUpdate.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly pages = {
    /**
     * Create a page
     */
    create: (
      args: WithAuth<PagesCreateParameters>
    ): Promise<PagesCreateResponse> => {
      return this.request<PagesCreateResponse>({
        path: pagesCreate.path(),
        method: pagesCreate.method,
        query: pick(args, pagesCreate.queryParams),
        body: pick(args, pagesCreate.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Retrieve a page
     */
    retrieve: (
      args: WithAuth<PagesRetrieveParameters>
    ): Promise<PagesRetrieveResponse> => {
      return this.request<PagesRetrieveResponse>({
        path: pagesRetrieve.path(args),
        method: pagesRetrieve.method,
        query: pick(args, pagesRetrieve.queryParams),
        body: pick(args, pagesRetrieve.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * Update page properties
     */
    update: (
      args: WithAuth<PagesUpdateParameters>
    ): Promise<PagesUpdateResponse> => {
      return this.request<PagesUpdateResponse>({
        path: pagesUpdate.path(args),
        method: pagesUpdate.method,
        query: pick(args, pagesUpdate.queryParams),
        body: pick(args, pagesUpdate.bodyParams),
        auth: args?.auth,
      })
    },
  }

  public readonly users = {
    /**
     * Retrieve a user
     */
    retrieve: (
      args: WithAuth<UsersRetrieveParameters>
    ): Promise<UsersRetrieveResponse> => {
      return this.request<UsersRetrieveResponse>({
        path: usersRetrieve.path(args),
        method: usersRetrieve.method,
        query: pick(args, usersRetrieve.queryParams),
        body: pick(args, usersRetrieve.bodyParams),
        auth: args?.auth,
      })
    },

    /**
     * List all users
     */
    list: (
      args: WithAuth<UsersListParameters> = {}
    ): Promise<UsersListResponse> => {
      return this.request<UsersListResponse>({
        path: usersList.path(),
        method: usersList.method,
        query: pick(args, usersList.queryParams),
        body: pick(args, usersList.bodyParams),
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
