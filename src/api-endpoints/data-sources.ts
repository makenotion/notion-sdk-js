// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  DataSourceParentResponse,
  DatabaseParentResponse,
  EmptyObject,
  GroupFilterOperatorArray,
  IdRequest,
  IdResponse,
  NumberFormat,
  PageCoverResponse,
  PageIconRequest,
  PageIconResponse,
  PageObjectResponse,
  ParentOfDataSourceRequest,
  ParentOfDatabaseResponse,
  PartialPageObjectResponse,
  PartialUserObjectResponse,
  PropertyConfigurationRequest,
  PropertyDescriptionRequest,
  PropertyFilter,
  RichTextItemRequest,
  RichTextItemResponse,
  RollupFunction,
  SelectColor,
  StatusPropertyConfigUpdateRequest,
  TimestampFilter,
} from "./common"

type CheckboxDatabasePropertyConfigResponse = {
  // Always `checkbox`
  type: "checkbox"
  checkbox: EmptyObject
}

type CreatedByDatabasePropertyConfigResponse = {
  // Always `created_by`
  type: "created_by"
  created_by: EmptyObject
}

type CreatedTimeDatabasePropertyConfigResponse = {
  // Always `created_time`
  type: "created_time"
  created_time: EmptyObject
}

export type DataSourceObjectResponse = {
  // The data source object type name.
  object: "data_source"
  // The ID of the data source.
  id: IdResponse
  // The title of the data source.
  title: Array<RichTextItemResponse>
  // The description of the data source.
  description: Array<RichTextItemResponse>
  // The parent of the data source.
  parent: ParentOfDataSourceResponse
  // The parent of the data source's containing database. This is typically a page, block,
  // or workspace, but can be another database in the case of wikis.
  database_parent: ParentOfDatabaseResponse
  // Whether the data source is inline.
  is_inline: boolean
  // Whether the data source is in the trash.
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
  // The time when the data source was created.
  created_time: string
  // The time when the data source was last edited.
  last_edited_time: string
  // The user who created the data source.
  created_by: PartialUserObjectResponse
  // The user who last edited the data source.
  last_edited_by: PartialUserObjectResponse
  // The properties schema of the data source.
  properties: Record<string, DatabasePropertyConfigResponse>
  // The icon of the data source.
  icon: PageIconResponse | null
  // The cover of the data source.
  cover: PageCoverResponse | null
  // The URL of the data source.
  url: string
  // The public URL of the data source if it is publicly accessible.
  public_url: string | null
}

type DatabasePropertyConfigResponse = DatabasePropertyConfigResponseCommon &
  (
    | NumberDatabasePropertyConfigResponse
    | FormulaDatabasePropertyConfigResponse
    | SelectDatabasePropertyConfigResponse
    | MultiSelectDatabasePropertyConfigResponse
    | StatusDatabasePropertyConfigResponse
    | RelationDatabasePropertyConfigResponse
    | RollupDatabasePropertyConfigResponse
    | UniqueIdDatabasePropertyConfigResponse
    | TitleDatabasePropertyConfigResponse
    | RichTextDatabasePropertyConfigResponse
    | UrlDatabasePropertyConfigResponse
    | PeopleDatabasePropertyConfigResponse
    | FilesDatabasePropertyConfigResponse
    | EmailDatabasePropertyConfigResponse
    | PhoneNumberDatabasePropertyConfigResponse
    | DateDatabasePropertyConfigResponse
    | CheckboxDatabasePropertyConfigResponse
    | CreatedByDatabasePropertyConfigResponse
    | CreatedTimeDatabasePropertyConfigResponse
    | LastEditedByDatabasePropertyConfigResponse
    | LastEditedTimeDatabasePropertyConfigResponse
  )

type DatabasePropertyConfigResponseCommon = {
  // The ID of the property.
  id: string
  // The name of the property.
  name: string
  // The description of the property.
  description: PropertyDescriptionRequest | null
}

type DatabasePropertyRelationConfigResponse =
  DatabasePropertyRelationConfigResponseCommon &
    (
      | SinglePropertyDatabasePropertyRelationConfigResponse
      | DualPropertyDatabasePropertyRelationConfigResponse
    )

type DatabasePropertyRelationConfigResponseCommon = {
  database_id: IdResponse
  data_source_id: IdResponse
}

type DateDatabasePropertyConfigResponse = {
  // Always `date`
  type: "date"
  date: EmptyObject
}

type DualPropertyDatabasePropertyRelationConfigResponse = {
  // Always `dual_property`
  type?: "dual_property"
  dual_property: { synced_property_id: string; synced_property_name: string }
}

type EmailDatabasePropertyConfigResponse = {
  // Always `email`
  type: "email"
  email: EmptyObject
}

type FilesDatabasePropertyConfigResponse = {
  // Always `files`
  type: "files"
  files: EmptyObject
}

type FormulaDatabasePropertyConfigResponse = {
  // Always `formula`
  type: "formula"
  formula: { expression: string }
}

type LastEditedByDatabasePropertyConfigResponse = {
  // Always `last_edited_by`
  type: "last_edited_by"
  last_edited_by: EmptyObject
}

type LastEditedTimeDatabasePropertyConfigResponse = {
  // Always `last_edited_time`
  type: "last_edited_time"
  last_edited_time: EmptyObject
}

type MultiSelectDatabasePropertyConfigResponse = {
  // Always `multi_select`
  type: "multi_select"
  multi_select: { options: Array<SelectPropertyResponse> }
}

type NumberDatabasePropertyConfigResponse = {
  // Always `number`
  type: "number"
  number: {
    // The number format for the property.
    format: NumberFormat
  }
}

/**
 * The parent of the data source. This is typically a database (`database_id`), but for
 * externally synced data sources, can be another data source (`data_source_id`).
 */
type ParentOfDataSourceResponse =
  | DatabaseParentResponse
  | DataSourceParentResponse

export type PartialDataSourceObjectResponse = {
  // The data source object type name.
  object: "data_source"
  // The ID of the data source.
  id: IdResponse
  // The properties schema of the data source.
  properties: Record<string, DatabasePropertyConfigResponse>
}

type PeopleDatabasePropertyConfigResponse = {
  // Always `people`
  type: "people"
  people: EmptyObject
}

type PhoneNumberDatabasePropertyConfigResponse = {
  // Always `phone_number`
  type: "phone_number"
  phone_number: EmptyObject
}

type RelationDatabasePropertyConfigResponse = {
  // Always `relation`
  type: "relation"
  relation: DatabasePropertyRelationConfigResponse
}

type RichTextDatabasePropertyConfigResponse = {
  // Always `rich_text`
  type: "rich_text"
  rich_text: EmptyObject
}

type RollupDatabasePropertyConfigResponse = {
  // Always `rollup`
  type: "rollup"
  rollup: {
    // The function to use for the rollup, e.g. count, count_values, percent_not_empty, max.
    function: RollupFunction
    rollup_property_name: string
    relation_property_name: string
    rollup_property_id: string
    relation_property_id: string
  }
}

type SelectDatabasePropertyConfigResponse = {
  // Always `select`
  type: "select"
  select: { options: Array<SelectPropertyResponse> }
}

type SelectPropertyResponse = {
  id: string
  name: string
  color: SelectColor
  description: string | null
}

type SinglePropertyDatabasePropertyRelationConfigResponse = {
  // Always `single_property`
  type: "single_property"
  single_property: EmptyObject
}

type StatusDatabasePropertyConfigResponse = {
  // Always `status`
  type: "status"
  status: {
    // The options for the status property.
    options: Array<StatusPropertyResponse>
    // The groups for the status property.
    groups: Array<{
      // The ID of the status group.
      id: string
      // The name of the status group.
      name: string
      // The color of the status group.
      color: SelectColor
      // The IDs of the status options in this group.
      option_ids: Array<string>
    }>
  }
}

type StatusPropertyResponse = {
  // The ID of the status option.
  id: string
  // The name of the status option.
  name: string
  // The color of the status option.
  color: SelectColor
  // The description of the status option.
  description: string | null
}

type TitleDatabasePropertyConfigResponse = {
  // Always `title`
  type: "title"
  title: EmptyObject
}

type UniqueIdDatabasePropertyConfigResponse = {
  // Always `unique_id`
  type: "unique_id"
  unique_id: {
    // The prefix for the unique ID.
    prefix: string | null
  }
}

type UrlDatabasePropertyConfigResponse = {
  // Always `url`
  type: "url"
  url: EmptyObject
}

type GetDataSourcePathParameters = {
  // ID of a Notion data source.
  data_source_id: IdRequest
}

export type GetDataSourceParameters = GetDataSourcePathParameters

export type GetDataSourceResponse =
  | PartialDataSourceObjectResponse
  | DataSourceObjectResponse

/**
 * Retrieve a data source
 */
export const getDataSource = {
  method: "get",
  pathParams: ["data_source_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetDataSourcePathParameters): string =>
    `data_sources/${p.data_source_id}`,
} as const

type UpdateDataSourcePathParameters = {
  // ID of a Notion data source.
  data_source_id: IdRequest
}

type UpdateDataSourceBodyParameters = {
  // Title of data source as it appears in Notion.
  title?: Array<RichTextItemRequest>
  // Page icon.
  icon?: PageIconRequest | null
  // The property schema of the data source. The keys are property names or IDs, and the
  // values are property configuration objects. Properties set to null will be removed.
  properties?: Record<
    string,
    | ({
        // The name of the property.
        name?: string
        // The description of the property.
        description?: PropertyDescriptionRequest | null
      } & (
        | {
            // Always `number`
            type?: "number"
            number: { format?: NumberFormat }
          }
        | {
            // Always `formula`
            type?: "formula"
            formula: { expression?: string }
          }
        | {
            // Always `select`
            type?: "select"
            select: {
              options?: Array<
                { color?: SelectColor; description?: string | null } & (
                  | { name: string; id?: string }
                  | { id: string; name?: string }
                )
              >
            }
          }
        | {
            // Always `multi_select`
            type?: "multi_select"
            multi_select: {
              options?: Array<
                { color?: SelectColor; description?: string | null } & (
                  | { name: string; id?: string }
                  | { id: string; name?: string }
                )
              >
            }
          }
        | {
            // Always `status`
            type?: "status"
            status: StatusPropertyConfigUpdateRequest
          }
        | {
            // Always `relation`
            type?: "relation"
            relation: { data_source_id: IdRequest } & (
              | {
                  // Always `single_property`
                  type?: "single_property"
                  single_property: EmptyObject
                }
              | {
                  // Always `dual_property`
                  type?: "dual_property"
                  dual_property: {
                    synced_property_id?: string
                    synced_property_name?: string
                  }
                }
            )
          }
        | {
            // Always `rollup`
            type?: "rollup"
            rollup: {
              // The function to use for the rollup, e.g. count, count_values, percent_not_empty, max.
              function: RollupFunction
            } & (
              | { relation_property_name: string; rollup_property_name: string }
              | { relation_property_id: string; rollup_property_name: string }
              | { relation_property_name: string; rollup_property_id: string }
              | { relation_property_id: string; rollup_property_id: string }
            )
          }
        | {
            // Always `unique_id`
            type?: "unique_id"
            unique_id: { prefix?: string | null }
          }
        | {
            // Always `title`
            type?: "title"
            title: EmptyObject
          }
        | {
            // Always `rich_text`
            type?: "rich_text"
            rich_text: EmptyObject
          }
        | {
            // Always `url`
            type?: "url"
            url: EmptyObject
          }
        | {
            // Always `people`
            type?: "people"
            people: EmptyObject
          }
        | {
            // Always `files`
            type?: "files"
            files: EmptyObject
          }
        | {
            // Always `email`
            type?: "email"
            email: EmptyObject
          }
        | {
            // Always `phone_number`
            type?: "phone_number"
            phone_number: EmptyObject
          }
        | {
            // Always `date`
            type?: "date"
            date: EmptyObject
          }
        | {
            // Always `checkbox`
            type?: "checkbox"
            checkbox: EmptyObject
          }
        | {
            // Always `created_by`
            type?: "created_by"
            created_by: EmptyObject
          }
        | {
            // Always `created_time`
            type?: "created_time"
            created_time: EmptyObject
          }
        | {
            // Always `last_edited_by`
            type?: "last_edited_by"
            last_edited_by: EmptyObject
          }
        | {
            // Always `last_edited_time`
            type?: "last_edited_time"
            last_edited_time: EmptyObject
          }
        | {
            // Always `place`
            type?: "place"
            place: EmptyObject
          }
      ))
    | {
        // The new name of the property.
        name: string
      }
    | null
  >
  // Whether the database should be moved to or from the trash. If not provided, the trash
  // status will not be updated.
  in_trash?: boolean
  /** @deprecated Use `in_trash` instead. */
  archived?: boolean
  // The parent of the data source, when moving it to a different database. If not
  // provided, the parent will not be updated.
  parent?: ParentOfDataSourceRequest
}

export type UpdateDataSourceParameters = UpdateDataSourcePathParameters &
  UpdateDataSourceBodyParameters

export type UpdateDataSourceResponse =
  | PartialDataSourceObjectResponse
  | DataSourceObjectResponse

/**
 * Update a data source
 */
export const updateDataSource = {
  method: "patch",
  pathParams: ["data_source_id"],
  queryParams: [],
  bodyParams: ["archived", "title", "icon", "properties", "in_trash", "parent"],

  path: (p: UpdateDataSourcePathParameters): string =>
    `data_sources/${p.data_source_id}`,
} as const

type QueryDataSourcePathParameters = {
  data_source_id: IdRequest
}

type QueryDataSourceQueryParameters = {
  filter_properties?: Array<string>
}

type QueryDataSourceBodyParameters = {
  sorts?: Array<
    | { property: string; direction: "ascending" | "descending" }
    | {
        timestamp: "created_time" | "last_edited_time"
        direction: "ascending" | "descending"
      }
  >
  filter?:
    | { or: GroupFilterOperatorArray }
    | { and: GroupFilterOperatorArray }
    | PropertyFilter
    | TimestampFilter
  start_cursor?: string
  page_size?: number
  in_trash?: boolean
  /** @deprecated Use `in_trash` instead. */
  archived?: boolean
  // Optionally filter the results to only include pages or data sources. Regular, non-wiki
  // databases only support page children. The default behavior is no result type
  // filtering, in other words, returning both pages and data sources for wikis.
  result_type?: "page" | "data_source"
}

export type QueryDataSourceParameters = QueryDataSourcePathParameters &
  QueryDataSourceQueryParameters &
  QueryDataSourceBodyParameters

export type QueryDataSourceResponse = {
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
 * Query a data source
 */
export const queryDataSource = {
  method: "post",
  pathParams: ["data_source_id"],
  queryParams: ["filter_properties"],
  bodyParams: [
    "archived",
    "sorts",
    "filter",
    "start_cursor",
    "page_size",
    "in_trash",
    "result_type",
  ],

  path: (p: QueryDataSourcePathParameters): string =>
    `data_sources/${p.data_source_id}/query`,
} as const

type CreateDataSourceBodyParameters = {
  // An object specifying the parent of the new data source to be created.
  parent: ParentOfDataSourceRequest
  // Property schema of data source.
  properties: Record<string, PropertyConfigurationRequest>
  // Title of data source as it appears in Notion.
  title?: Array<RichTextItemRequest>
  // Page icon.
  icon?: PageIconRequest | null
}

export type CreateDataSourceParameters = CreateDataSourceBodyParameters

export type CreateDataSourceResponse =
  | PartialDataSourceObjectResponse
  | DataSourceObjectResponse

/**
 * Create a data source
 */
export const createDataSource = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "title", "icon"],

  path: (): string => `data_sources`,
} as const

type ListDataSourceTemplatesPathParameters = {
  // ID of a Notion data source.
  data_source_id: IdRequest
}

type ListDataSourceTemplatesQueryParameters = {
  // Filter templates by name (case-insensitive substring match).
  name?: string
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListDataSourceTemplatesParameters =
  ListDataSourceTemplatesPathParameters & ListDataSourceTemplatesQueryParameters

export type ListDataSourceTemplatesResponse = {
  // Array of templates available in this data source.
  templates: Array<{
    // ID of the template page.
    id: IdResponse
    // Name of the template.
    name: string
    // Whether this template is the default template for the data source.
    is_default: boolean
  }>
  // Whether there are more templates available beyond this page.
  has_more: boolean
  // Cursor to use for the next page of results. Null if there are no more results.
  next_cursor: IdResponse | null
}

/**
 * List templates in a data source
 */
export const listDataSourceTemplates = {
  method: "get",
  pathParams: ["data_source_id"],
  queryParams: ["name", "start_cursor", "page_size"],
  bodyParams: [],

  path: (p: ListDataSourceTemplatesPathParameters): string =>
    `data_sources/${p.data_source_id}/templates`,
} as const
