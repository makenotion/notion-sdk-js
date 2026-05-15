// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  EmptyObject,
  PageObjectResponse,
  PartialPageObjectResponse,
} from "./common"
import type {
  DataSourceObjectResponse,
  PartialDataSourceObjectResponse,
} from "./data-sources"

type SearchBodyParameters = {
  sort?: {
    timestamp: "last_edited_time"
    direction: "ascending" | "descending"
  }
  query?: string
  start_cursor?: string
  page_size?: number
  filter?: { property: "object"; value: "page" | "data_source" }
}

export type SearchParameters = SearchBodyParameters

export type SearchResponse = {
  type: "page_or_data_source"
  page_or_data_source: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDataSourceObjectResponse
    | DataSourceObjectResponse
  >
  request_status?: {
    type: "complete" | "incomplete"
    incomplete_reason?: "query_result_limit_reached"
  }
}

/**
 * Search by title
 */
export const search = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],

  path: (): string => `search`,
} as const
