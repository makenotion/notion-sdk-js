// Compile consumer examples through the public entry point during the build.
import { Client } from "../src"
import type {
  ClientOptions,
  CreateDataSourceParameters,
  CreatePageParameters,
  DateRequest,
  DateResponse,
  PageIconRequest,
  PageIconResponse,
  PropertyConfigurationRequest,
  PropertyFilter,
  QueryDataSourceFilter,
  QueryDataSourceParameters,
  QueryDataSourceSort,
  RichTextItemRequest,
  TimestampFilter,
} from "../src"

export function createClient(options: ClientOptions): Client {
  return new Client(options)
}

export function createPage(
  title: RichTextItemRequest[],
  date: DateRequest,
  icon: PageIconRequest
): CreatePageParameters {
  return {
    parent: { data_source_id: "data-source-id" },
    properties: {
      Name: { title },
      Date: { date },
    },
    icon,
  }
}

export function createDataSource(
  properties: Record<string, PropertyConfigurationRequest>
): CreateDataSourceParameters {
  return { parent: { database_id: "database-id" }, properties }
}

export function createQuery(
  property: PropertyFilter,
  timestamp: TimestampFilter,
  sort: QueryDataSourceSort
): QueryDataSourceParameters {
  const filter: QueryDataSourceFilter = {
    or: [{ and: [property, timestamp] }, property],
  }
  return { data_source_id: "data-source-id", filter, sorts: [sort] }
}

export function readQuery(
  query: QueryDataSourceParameters
): [QueryDataSourceFilter | undefined, QueryDataSourceSort[] | undefined] {
  return [query.filter, query.sorts]
}

export function readResponseValues(
  date: DateResponse,
  icon: PageIconResponse
): string {
  return `${date.start}: ${icon.type}`
}
