import type { IncomingHttpHeaders } from 'http';
import type { RequestError as GotRequestError, HTTPError } from 'got';

/**
 * An error produced by the Client.
 *
 * Each of these errors have a `code` property, which can be depended on to separate kinds of errors.
 */
export interface ClientError extends Error {
  code: ErrorCode | string;
  status?: number;
  headers?: IncomingHttpHeaders;
  body?: string;
}

/**
 * Transforms any error into a coded error by enforcing a default value for the `code` property.
 *
 * @param error any Error
 * @returns a ClientError
 */
function anyErrorAsClientError(error: Error): ClientError {
  const asClientError = error as ClientError;
  asClientError.code = asClientError.code ?? 'notionhq_client_error';
  return asClientError;
}

/**
 * Error codes for responses from the API.
 *
 * When a ClientError's code property is equal to one of these, it is a ResponseError and has more information.
 */
export enum ErrorCode {
  Unauthorized = 'unauthorized',
  RestrictedResource = 'restricted_resource',
  ObjectNotFound = 'object_not_found',
  RateLimited = 'rate_limited',
  InvalidJSON = 'invalid_json',
  InvalidRequestURL = 'invalid_request_url',
  InvalidRequest = 'invalid_request',
  ValidationError = 'validation_error',
  ConflictError = 'conflict_error',
  InternalServerError = 'internal_server_error',
  ServiceUnavailable = 'service_unavailable',
}

/**
 * Body of an error response from the API
 */
interface ErrorResponseBody {
  message: string;
  code: ErrorCode;
}

/**
 * A response from the API indicating a problem.
 *
 * Use the `code` property to handle various kinds of errors. All its possible values are in `ErrorCode`.
 */
export class ResponseError extends Error implements ClientError {
  readonly code: ErrorCode;
  readonly status: number;
  readonly headers: IncomingHttpHeaders;
  readonly body: string;

  constructor(original: HTTPError, body: ErrorResponseBody) {
    super(body.message);
    this.message = body.message;
    this.code = body.code;
    this.status = original.response.statusCode;
    this.headers = original.response.headers;
    this.body = original.response.rawBody.toString();
  }
}

export function wrapError(originalError: unknown): ClientError {
  if (isGotError(originalError)) {
    if (isHttpError(originalError)) {
      if (typeof originalError.response.body === 'string') {
        const body = JSON.parse(originalError.response.body);
        if (isErrorResponseBody(body)) {
          return new ResponseError(originalError, body);
        }
      }
    }
  }
  if (originalError instanceof Error) {
    return anyErrorAsClientError(originalError);
  }
  return anyErrorAsClientError(new Error(`An unknown client error occurred: ${originalError}`));
}

/*
 * Type guards
 */

function isGotError(error: unknown): error is GotRequestError {
  const asAny = error as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  return 'options' in asAny && 'method' in asAny.options;
}

function isHttpError(error: GotRequestError): error is HTTPError {
  return 'response' in error;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorResponseBody(body: any): body is ErrorResponseBody {
  return 'message' in body && 'code' in body && Object.values(ErrorCode).includes(body.code);
}
