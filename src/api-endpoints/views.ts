// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  CreateViewQueryRequest,
  CreateViewRequest,
  DataSourceViewObjectResponse,
  DataSourceViewReferenceResponse,
  DeletedViewQueryResponse,
  EmptyObject,
  IdRequest,
  IdResponse,
  PartialDataSourceViewObjectResponse,
  PartialPageObjectResponse,
  UpdateViewRequest,
  ViewQueryResponse,
} from "./common"

type ListDatabaseViewsQueryParameters = {
  // ID of a Notion database (collection view block) to list views for. At least one of
  // database_id or data_source_id is required.
  database_id?: IdRequest
  // ID of a data source (collection) to list all views for, including linked views across
  // the workspace. At least one of database_id or data_source_id is required.
  data_source_id?: IdRequest
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListDatabaseViewsParameters = ListDatabaseViewsQueryParameters

export type ListDatabaseViewsResponse = {
  // Always `list`
  object: "list"
  next_cursor: IdResponse | null
  has_more: boolean
  results: Array<DataSourceViewReferenceResponse>
  // Always `view`
  type: "view"
  view: EmptyObject
}

/**
 * List views
 */
export const listDatabaseViews = {
  method: "get",
  pathParams: [],
  queryParams: ["database_id", "data_source_id", "start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `views`,
} as const

type CreateViewBodyParameters = CreateViewRequest

export type CreateViewParameters = CreateViewBodyParameters

export type CreateViewResponse =
  | PartialDataSourceViewObjectResponse
  | DataSourceViewObjectResponse

/**
 * Create a view
 */
export const createView = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [],

  path: (): string => `views`,
} as const

type GetViewPathParameters = {
  // ID of a Notion view.
  view_id: IdRequest
}

export type GetViewParameters = GetViewPathParameters

export type GetViewResponse =
  | PartialDataSourceViewObjectResponse
  | DataSourceViewObjectResponse

/**
 * Retrieve a view
 */
export const getView = {
  method: "get",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetViewPathParameters): string => `views/${p.view_id}`,
} as const

type UpdateViewPathParameters = {
  // ID of a Notion view.
  view_id: IdRequest
}

type UpdateViewBodyParameters = UpdateViewRequest

export type UpdateViewParameters = UpdateViewPathParameters &
  UpdateViewBodyParameters

export type UpdateViewResponse =
  | PartialDataSourceViewObjectResponse
  | DataSourceViewObjectResponse

/**
 * Update a view
 */
export const updateView = {
  method: "patch",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: UpdateViewPathParameters): string => `views/${p.view_id}`,
} as const

type DeleteViewPathParameters = {
  // The ID of the view to delete.
  view_id: IdRequest
}

export type DeleteViewParameters = DeleteViewPathParameters

export type DeleteViewResponse = PartialDataSourceViewObjectResponse

/**
 * Delete a view
 */
export const deleteView = {
  method: "delete",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteViewPathParameters): string => `views/${p.view_id}`,
} as const

type CreateViewQueryPathParameters = {
  // The ID of the view.
  view_id: IdRequest
}

type CreateViewQueryBodyParameters = CreateViewQueryRequest

export type CreateViewQueryParameters = CreateViewQueryPathParameters &
  CreateViewQueryBodyParameters

export type CreateViewQueryResponse = ViewQueryResponse

/**
 * Create a view query
 */
export const createViewQuery = {
  method: "post",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: CreateViewQueryPathParameters): string =>
    `views/${p.view_id}/queries`,
} as const

type GetViewQueryResultsPathParameters = {
  // The ID of the view.
  view_id: IdRequest
  // The ID of the query.
  query_id: IdRequest
}

type GetViewQueryResultsQueryParameters = {
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided.
  start_cursor?: string
  // The number of results to return per page. Maximum: 100
  page_size?: number
}

export type GetViewQueryResultsParameters = GetViewQueryResultsPathParameters &
  GetViewQueryResultsQueryParameters

export type GetViewQueryResultsResponse = {
  // Always `list`
  object: "list"
  next_cursor: IdResponse | null
  has_more: boolean
  results: Array<PartialPageObjectResponse>
  // Always `page`
  type: "page"
  page: EmptyObject
}

/**
 * Get view query results
 */
export const getViewQueryResults = {
  method: "get",
  pathParams: ["view_id", "query_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (p: GetViewQueryResultsPathParameters): string =>
    `views/${p.view_id}/queries/${p.query_id}`,
} as const

type DeleteViewQueryPathParameters = {
  // The ID of the view.
  view_id: IdRequest
  // The ID of the query.
  query_id: IdRequest
}

export type DeleteViewQueryParameters = DeleteViewQueryPathParameters

export type DeleteViewQueryResponse = DeletedViewQueryResponse

/**
 * Delete a view query
 */
export const deleteViewQuery = {
  method: "delete",
  pathParams: ["view_id", "query_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteViewQueryPathParameters): string =>
    `views/${p.view_id}/queries/${p.query_id}`,
} as const
