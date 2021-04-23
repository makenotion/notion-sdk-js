/* eslint-disable @typescript-eslint/no-empty-interface */

import { NotionDatabase, NotionDatabaseFilter, NotionDatabaseSort, NotionPage, PaginatedList } from './api-types';

/**
 * Notion API Endpoints
 *
 * This file contains metadata about each of the API endpoints such as the HTTP method, the parameters, and the types.
 * In the future, the contents of this file will be generated from an API definition.
 */

// TODO: type assertions to verify that each interface is synchronized to the list of keys in the runtime value below.

/*
 * databases.retrieve()
 */

interface DatabasesRetrievePathParameters {
  database_id: string;
}
interface DatabasesRetrieveQueryParameters {}
interface DatabasesRetrieveBodyParameters {}

export interface DatabasesRetrieveParameters extends DatabasesRetrievePathParameters, DatabasesRetrieveQueryParameters, DatabasesRetrieveBodyParameters {}
export interface DatabasesRetrieveResponse extends NotionDatabase {}

export const databasesRetrieve = {
  method: 'get',
  // The following lists are synchronized with keyof DatabasesRetrievePathParams / DatabasesRetrieveQueryParameters / DatabasesRetrieveBodyParameters
  pathParams: ['database_id'],
  queryParams: [],
  bodyParams: [],
  path: (p: DatabasesRetrievePathParameters) => `databases/${p.database_id}`,
} as const;

/*
 * databases.query()
 */

interface DatabasesQueryPathParameters {
  database_id: string;
}
interface DatabasesQueryQueryParameters {}
interface DatabasesQueryBodyParameters {
  filter?: NotionDatabaseFilter;
  sorts?: NotionDatabaseSort[];
  start_cursor?: string;
}

export interface DatabasesQueryParameters extends DatabasesQueryPathParameters, DatabasesQueryQueryParameters, DatabasesQueryBodyParameters {}
export interface DatabasesQueryResponse extends PaginatedList<NotionPage> {}

export const databasesQuery = {
  method: 'post',
  // The following lists are synchronized with keyof DatabasesQueryPathParams / DatabasesQueryQueryParams / DatabasesQueryBodyParams
  pathParams: ['database_id'],
  queryParams: [],
  bodyParams: ['filter', 'sorts', 'start_cursor'],
  path: (p: DatabasesRetrievePathParameters) => `databases/${p.database_id}`,
} as const;

