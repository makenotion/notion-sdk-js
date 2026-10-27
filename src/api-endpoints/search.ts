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

type SearchQueryParameters = {
  // Property names or IDs to include in each page's `properties` object. Other properties
  // are left out. Repeat the parameter to pass more than one value, for example
  // `filter_properties=title&filter_properties=Status`. Pages that aren't in a data source
  // always return only `title`. Search skips names or IDs that don't exist on a page.
  filter_properties?: Array<string>
}

type SearchBodyParameters = {
  sort?:
    | { timestamp: "last_edited_time"; direction: "ascending" | "descending" }
    | { property: "relevance" }
  query?: string
  start_cursor?: string | null
  page_size?: number
  filter?:
    | { property: "object"; value: "page" | "data_source"; in_trash?: boolean }
    | { in_trash: boolean }
}

export type SearchParameters = SearchQueryParameters & SearchBodyParameters

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
  queryParams: ["filter_properties"],
  bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],

  path: (): string => `search`,
} as const
