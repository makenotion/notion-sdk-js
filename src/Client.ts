import got, { Got, Options as GotOptions, Headers as GotHeaders } from 'got';
import { LogLevel, logLevelSeverity } from './logging';
import { buildRequestError, HTTPResponseError } from './errors'
import { pick } from './helpers';
import {
  DatabasesRetrieveParameters, DatabasesRetrieveResponse, databasesRetrieve,
  DatabasesQueryResponse, DatabasesQueryParameters, databasesQuery,
} from './api-endpoints';

export interface ClientOptions {
  auth?: string;
  timeoutMs?: number;
  baseUrl?: string;
  logLevel?: LogLevel;
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
  #got: Got;

  public constructor(options?: ClientOptions) {
    this.#auth = options?.auth;
    this.#logLevel = options?.logLevel ?? LogLevel.WARN;

    const prefixUrl = (options?.baseUrl ?? 'https://api.notion.com') + '/v1/';
    const timeout = options?.timeoutMs ?? 60_000;

    this.#got = got.extend({
      prefixUrl,
      timeout,
      headers: {
        // TODO: update with format appropriate for telemetry, use version from package.json
        'user-agent': 'notion:client/v0.1.0',
      },
      retry: 0,
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
    this.log(LogLevel.INFO, `request start`, { method, path });

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

  public readonly databases = {
    /**
     * Retrieve a database
     */
    retrieve: (args: WithAuth<DatabasesRetrieveParameters>): Promise<DatabasesRetrieveResponse> => {
      return this.request<DatabasesRetrieveResponse>({
        path: databasesRetrieve.path(args),
        method: databasesRetrieve.method,
        query: pick(args, databasesRetrieve.queryParams),
        body: pick(args, databasesRetrieve.bodyParams),
        auth: args.auth,
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
        auth: args.auth,
      });
    },
  };

  /**
   * Emits a log message to the console.
   *
   * @param level The level for this message
   * @param args Arguments to send to the console
   */
  private log(level: LogLevel, ...args: unknown[]) {
    if (logLevelSeverity(level) >= logLevelSeverity(this.#logLevel)) {
      console.log(`${this.constructor.name} ${level}: `, ...args);
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
