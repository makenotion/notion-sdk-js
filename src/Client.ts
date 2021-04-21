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
  public async request<Response extends {}>(path: string, method: Method, query?: QueryParams, body?: {}, auth?: string): Promise<Response> {
    this.log(LogLevel.INFO, `request start`, { method, path });

    try {
      const response = this.#got(path, {
        method,
        searchParams: query,
        json: body,
        headers: this.authAsHeaders(auth),
      }).json<Response>();

      this.log(LogLevel.INFO, `request end`, { method, path });
      return response;
    } catch (error) {
      // TODO: check error conditions and throw the appropriate error
      throw error;
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
      return this.request<DatabasesRetrieveResponse>(
        databasesRetrieve.path(args),
        databasesRetrieve.method,
        pick(args, ...databasesRetrieve.queryParams),
        pick(args, ...databasesRetrieve.bodyParams),
        args.auth,
      );
    },

    /**
     * Query a database
     */
    query: (args: WithAuth<DatabasesQueryParameters>): Promise<DatabasesQueryResponse> => {
      return this.request(
        databasesQuery.path(args),
        databasesQuery.method,
        // TODO: there's a type check error on the following line
        pick(args, ...databasesQuery.queryParams),
        pick(args, ...databasesQuery.bodyParams),
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
  private log(level: LogLevel, ...args: any[]) {
    if (logLevelSeverity(level) >= logLevelSeverity(this.#logLevel)) {
      console.log(`${this.constructor.name} ${level}: `, ...args);
    }
  }

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
