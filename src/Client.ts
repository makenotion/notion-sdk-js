import { LogLevel, logLevelSeverity } from './logging';
import { pick } from './helpers';
import {
  DatabasesRetrieveParameters, DatabasesRetrieveResponse, databasesRetrieve,
  DatabasesQueryResponse, DatabasesQueryParameters, databasesQuery,
} from './api-endpoints';

import got, { Got, Options as GotOptions, Headers as GotHeaders } from 'got';


export interface ClientOptions {
  auth?: string;
  timeout?: number;
  baseUrl?: string;
  logLevel?: LogLevel;
}

export default class Client {

  #auth?: string;
  #logLevel: LogLevel;
  #got: Got;

  public constructor(options?: ClientOptions) {
    this.#auth = options?.auth;
    this.#logLevel = options?.logLevel ?? LogLevel.WARN;

    const prefixUrl = (options?.baseUrl ?? 'https://api.notion.com') + '/v1/';
    const timeout = options?.timeout ?? 60;

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
  public async request<Response>(path: string, method: Method, query?: QueryParams, body?: Record<string, unknown>, auth?: string): Promise<Response> {
    this.log(LogLevel.INFO, `request start`, { method, path });

    // TODO: check error conditions and throw the appropriate error
    const response = this.#got(path, {
      method,
      searchParams: query,
      json: body,
      headers: this.authAsHeaders(auth),
    }).json<Response>();

    this.log(LogLevel.INFO, `request end`, { method, path });
    return response;
  }

  /*
   * Notion API endpoints
   */

  public readonly databases = {
    /**
     * Retrieve a database
     */
    retrieve: (args: WithAuth<DatabasesRetrieveParameters>): Promise<DatabasesRetrieveResponse> => {
      return this.request<DatabasesRetrieveResponse>(
        databasesRetrieve.path(args),
        databasesRetrieve.method,
        pick(args, databasesRetrieve.queryParams),
        pick(args, databasesRetrieve.bodyParams),
        args.auth,
      );
    },

    /**
     * Query a database
     */
    query: (args: WithAuth<DatabasesQueryParameters>): Promise<DatabasesQueryResponse> => {
      return this.request<DatabasesQueryResponse>(
        databasesQuery.path(args),
        databasesQuery.method,
        pick(args, databasesQuery.queryParams),
        pick(args, databasesQuery.bodyParams),
        args.auth,
      );
    },
  };

  /**
   * Emits a log message to the console.
   *
   * @param level The level for this message
   * @param args Arguments to send to the console
   */
  private log(level: LogLevel, ...args: any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
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
