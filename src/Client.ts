import type { Agent } from 'http';
import { URL } from 'url';
import { Logger, LogLevel, logLevelSeverity, makeConsoleLogger } from './logging';
import { buildRequestError, HTTPResponseError } from './errors'
import { pick } from './helpers';
import {
  BlocksChildrenAppendParameters, BlocksChildrenAppendResponse, blocksChildrenAppend,
  BlocksChildrenListParameters, BlocksChildrenListResponse, blocksChildrenList,
  DatabasesListParameters, DatabasesListResponse, databasesList,
  DatabasesQueryResponse, DatabasesQueryParameters, databasesQuery,
  DatabasesRetrieveParameters, DatabasesRetrieveResponse, databasesRetrieve,
  PagesCreateParameters, PagesCreateResponse, pagesCreate,
  PagesRetrieveParameters, PagesRetrieveResponse, pagesRetrieve,
  PagesUpdateParameters, PagesUpdateResponse, pagesUpdate,
  UsersListParameters, UsersListResponse, usersList,
  UsersRetrieveParameters, UsersRetrieveResponse, usersRetrieve,
  SearchParameters, SearchResponse, search,
} from './api-endpoints';

import got, { Got, Options as GotOptions, Headers as GotHeaders, Agents as GotAgents } from 'got';

export interface ClientOptions {
  auth?: string;
  timeoutMs?: number;
  baseUrl?: string;
  logLevel?: LogLevel;
  logger?: Logger;
  agent?: Agent;
  notionVersion?: string;
}

export interface RequestParameters {
  path: string;
  method: Method;
  query?: QueryParams;
  body?: Record<string, unknown>;
  auth?: string;
}

export default class Client {

  #auth?: string;
  #logLevel: LogLevel;
  #logger: Logger;
  #got: Got;

  static readonly defaultNotionVersion = '2021-05-13';

  public constructor(options?: ClientOptions) {
    this.#auth = options?.auth;
    this.#logLevel = options?.logLevel ?? LogLevel.WARN;
    this.#logger = options?.logger ?? makeConsoleLogger(this.constructor.name);

    const prefixUrl = (options?.baseUrl ?? 'https://api.notion.com') + '/v1/';
    const timeout = options?.timeoutMs ?? 60_000;
    const notionVersion = options?.notionVersion ?? Client.defaultNotionVersion;

    this.#got = got.extend({
      prefixUrl,
      timeout,
      headers: {
        'Notion-Version': notionVersion,
        // TODO: update with format appropriate for telemetry, use version from package.json
        'user-agent': 'notionhq-client/0.1.0',
      },
      retry: 0,
      agent: makeAgentOption(prefixUrl, options?.agent),
    });
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
  public async request<Response>({ path, method, query, body, auth }: RequestParameters): Promise<Response> {
    this.log(LogLevel.INFO, 'request start', { method, path });

    // If the body is empty, don't send the body in the HTTP request
    const json = (body !== undefined && Object.entries(body).length === 0) ? undefined : body;

    try {
      const response = await this.#got(path, {
        method,
        searchParams: query,
        json,
        headers: this.authAsHeaders(auth),
      }).json<Response>();

      this.log(LogLevel.INFO, `request success`, { method, path });
      return response;
    } catch (error) {
      // Build an error of a known type, otherwise throw unexpected errors
      const requestError = buildRequestError(error);
      if (requestError === undefined) {
        throw error;
      }

      this.log(LogLevel.WARN, `request fail`, { code: requestError.code, message: requestError.message });
      if (HTTPResponseError.isHTTPResponseError(requestError)) {
        // The response body may contain sensitive information so it is logged separately at the DEBUG level
        this.log(LogLevel.DEBUG, `failed response body`, { body: requestError.body });
      }

      // Throw as a known error type
      throw requestError;
    }
  }

  /*
   * Notion API endpoints
   */

  public readonly blocks = {
    children: {
      /**
       * Append block children
       */
      append: (args: WithAuth<BlocksChildrenAppendParameters>): Promise<BlocksChildrenAppendResponse> => {
        return this.request<BlocksChildrenAppendResponse>({
          path: blocksChildrenAppend.path(args),
          method: blocksChildrenAppend.method,
          query: pick(args, blocksChildrenAppend.queryParams),
          body: pick(args, blocksChildrenAppend.bodyParams),
          auth: args?.auth,
        });
      },

      /**
       * Retrieve block children
       */
      list: (args: WithAuth<BlocksChildrenListParameters>): Promise<BlocksChildrenListResponse> => {
        return this.request<BlocksChildrenListResponse>({
          path: blocksChildrenList.path(args),
          method: blocksChildrenList.method,
          query: pick(args, blocksChildrenList.queryParams),
          body: pick(args, blocksChildrenList.bodyParams),
          auth: args?.auth,
        });
      },
    }
  }

  public readonly databases = {
    /**
     * List databases
     */
    list: (args: WithAuth<DatabasesListParameters> = {}): Promise<DatabasesListResponse> => {
      return this.request<DatabasesListResponse>({
        path: databasesList.path(),
        method: databasesList.method,
        query: pick(args, databasesList.queryParams),
        body: pick(args, databasesList.bodyParams),
        auth: args?.auth,
      });
    },

    /**
     * Retrieve a database
     */
    retrieve: (args: WithAuth<DatabasesRetrieveParameters>): Promise<DatabasesRetrieveResponse> => {
      return this.request<DatabasesRetrieveResponse>({
        path: databasesRetrieve.path(args),
        method: databasesRetrieve.method,
        query: pick(args, databasesRetrieve.queryParams),
        body: pick(args, databasesRetrieve.bodyParams),
        auth: args?.auth,
      });
    },

    /**
     * Query a database
     */
    query: (args: WithAuth<DatabasesQueryParameters>): Promise<DatabasesQueryResponse> => {
      return this.request<DatabasesQueryResponse>({
        path: databasesQuery.path(args),
        method: databasesQuery.method,
        query: pick(args, databasesQuery.queryParams),
        body: pick(args, databasesQuery.bodyParams),
        auth: args?.auth,
      });
    },
  };

  public readonly pages = {
    /**
     * Create a page
     */
    create: (args: WithAuth<PagesCreateParameters>): Promise<PagesCreateResponse> => {
      return this.request<PagesCreateResponse>({
        path: pagesCreate.path(),
        method: pagesCreate.method,
        query: pick(args, pagesCreate.queryParams),
        body: pick(args, pagesCreate.bodyParams),
        auth: args?.auth,
      });
    },

    /**
     * Retrieve a page
     */
    retrieve: (args: WithAuth<PagesRetrieveParameters>): Promise<PagesRetrieveResponse> => {
      return this.request<PagesRetrieveResponse>({
        path: pagesRetrieve.path(args),
        method: pagesRetrieve.method,
        query: pick(args, pagesRetrieve.queryParams),
        body: pick(args, pagesRetrieve.bodyParams),
        auth: args?.auth,
      });
    },

    /**
     * Update page properties
     */
    update: (args: WithAuth<PagesUpdateParameters>): Promise<PagesUpdateResponse> => {
      return this.request<PagesUpdateResponse>({
        path: pagesUpdate.path(args),
        method: pagesUpdate.method,
        query: pick(args, pagesUpdate.queryParams),
        body: pick(args, pagesUpdate.bodyParams),
        auth: args?.auth,
      });
    },
  };

  public readonly users = {
    /**
     * Retrieve a user
     */
    retrieve: (args: WithAuth<UsersRetrieveParameters>): Promise<UsersRetrieveResponse> => {
      return this.request<UsersRetrieveResponse>({
        path: usersRetrieve.path(args),
        method: usersRetrieve.method,
        query: pick(args, usersRetrieve.queryParams),
        body: pick(args, usersRetrieve.bodyParams),
        auth: args?.auth,
      });
    },

    /**
     * List all users
     */
    list: (args: WithAuth<UsersListParameters> = {}): Promise<UsersListResponse> => {
      return this.request<UsersListResponse>({
        path: usersList.path(),
        method: usersList.method,
        query: pick(args, usersList.queryParams),
        body: pick(args, usersList.bodyParams),
        auth: args?.auth,
      });
    },
  };

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
    });
  }

  /**
   * Emits a log message to the console.
   *
   * @param level The level for this message
   * @param args Arguments to send to the console
   */
  private log(level: LogLevel, message: string, extraInfo: Record<string, unknown>) {
    if (logLevelSeverity(level) >= logLevelSeverity(this.#logLevel)) {
      this.#logger(level, message, extraInfo);
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
  private authAsHeaders(auth?: string): GotHeaders {
    const headers: GotHeaders = {};
    const authHeaderValue = auth ?? this.#auth;
    if (authHeaderValue !== undefined) {
      headers['authorization'] = `Bearer ${authHeaderValue}`;
    }
    return headers;
  }
}

/*
 * Type aliases to support the generic request interface.
 */
type Method = 'get' | 'post' | 'patch';
type QueryParams = GotOptions['searchParams'];


type WithAuth<P> = P & { auth?: string };

/*
 * Helper functions
 */

function makeAgentOption(prefixUrl: string, agent: Agent | undefined): GotAgents | undefined {
  if (agent === undefined) {
    return undefined;
  }
  return {
    [selectProtocol(prefixUrl)]: agent,
  };
}

function selectProtocol(prefixUrl: string): 'http' | 'https' {
  const url = new URL(prefixUrl);

  if (url.protocol === 'https:') {
    return 'https';
  } else if (url.protocol === 'http:') {
    return 'http';
  }

  throw new TypeError(`baseUrl option must begin with "https://" or "http://"`);
}
