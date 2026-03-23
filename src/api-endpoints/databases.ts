// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  IdRequest,
  IdResponse,
  InitialDataSourceRequest,
  PageCoverRequest,
  PageCoverResponse,
  PageIconRequest,
  PageIconResponse,
  ParentOfDatabaseResponse,
  RichTextItemRequest,
  RichTextItemResponse,
} from "./common"

type DataSourceReferenceResponse = {
  // The ID of the data source.
  id: IdResponse
  // The name of the data source.
  name: string
}

export type DatabaseObjectResponse = {
  // The database object type name.
  object: "database"
  // The ID of the database.
  id: IdResponse
  // The title of the database.
  title: Array<RichTextItemResponse>
  // The description of the database.
  description: Array<RichTextItemResponse>
  // The parent of the database. This is typically a page, block, or workspace, but can be
  // another database in the case of wikis.
  parent: ParentOfDatabaseResponse
  // Whether the database is inline.
  is_inline: boolean
  // Whether the database is in the trash.
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
  // Whether the database is locked from editing in the Notion app UI.
  is_locked: boolean
  // The time when the database was created.
  created_time: string
  // The time when the database was last edited.
  last_edited_time: string
  // The data sources of the database.
  data_sources: Array<DataSourceReferenceResponse>
  // The icon of the database.
  icon: PageIconResponse | null
  // The cover of the database.
  cover: PageCoverResponse | null
  // The URL of the database.
  url: string
  // The public URL of the database if it is publicly accessible.
  public_url: string | null
}

export type PartialDatabaseObjectResponse = {
  // The database object type name.
  object: "database"
  // The ID of the database.
  id: IdResponse
}

type GetDatabasePathParameters = {
  // ID of a Notion database, a container for one or more data sources.
  database_id: IdRequest
}

export type GetDatabaseParameters = GetDatabasePathParameters

export type GetDatabaseResponse =
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

/**
 * Retrieve a database
 */
export const getDatabase = {
  method: "get",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetDatabasePathParameters): string => `databases/${p.database_id}`,
} as const

type UpdateDatabasePathParameters = {
  // ID of a Notion database, a container for one or more data sources.
  database_id: IdRequest
}

type UpdateDatabaseBodyParameters = {
  // The parent page or workspace to move the database to. If not provided, the database
  // will not be moved.
  parent?: {
    // The type of parent.
    type: "page_id" | "workspace"
  } & (
    | {
        // Always `page_id`
        type: "page_id"
        page_id: IdRequest
      }
    | {
        // Always `workspace`
        type: "workspace"
        // Always `true`
        workspace: true
      }
  )
  // The updated title of the database, if any. If not provided, the title will not be
  // updated.
  title?: Array<RichTextItemRequest>
  // The updated description of the database, if any. If not provided, the description will
  // not be updated.
  description?: Array<RichTextItemRequest>
  // Whether the database should be displayed inline in the parent page. If not provided,
  // the inline status will not be updated.
  is_inline?: boolean
  // The updated icon for the database, if any. If not provided, the icon will not be
  // updated.
  icon?: PageIconRequest
  // The updated cover image for the database, if any. If not provided, the cover will not
  // be updated.
  cover?: PageCoverRequest
  // Whether the database should be moved to or from the trash. If not provided, the trash
  // status will not be updated.
  in_trash?: boolean
  /** @deprecated Use `in_trash` instead. */
  archived?: boolean
  // Whether the database should be locked from editing in the Notion app UI. If not
  // provided, the locked state will not be updated.
  is_locked?: boolean
}

export type UpdateDatabaseParameters = UpdateDatabasePathParameters &
  UpdateDatabaseBodyParameters

export type UpdateDatabaseResponse =
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

/**
 * Update a database
 */
export const updateDatabase = {
  method: "patch",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [
    "parent",
    "title",
    "description",
    "is_inline",
    "icon",
    "cover",
    "in_trash",
    "is_locked",
  ],

  path: (p: UpdateDatabasePathParameters): string =>
    `databases/${p.database_id}`,
} as const

type CreateDatabaseBodyParameters = {
  // The parent page or workspace where the database will be created.
  parent: {
    // The type of parent.
    type: "page_id" | "workspace"
  } & (
    | {
        // Always `page_id`
        type: "page_id"
        page_id: IdRequest
      }
    | {
        // Always `workspace`
        type: "workspace"
        // Always `true`
        workspace: true
      }
  )
  // The title of the database.
  title?: Array<RichTextItemRequest>
  // The description of the database.
  description?: Array<RichTextItemRequest>
  // Whether the database should be displayed inline in the parent page. Defaults to false.
  is_inline?: boolean
  // Initial data source configuration for the database.
  initial_data_source?: InitialDataSourceRequest
  // The icon for the database.
  icon?: PageIconRequest
  // The cover image for the database.
  cover?: PageCoverRequest
}

export type CreateDatabaseParameters = CreateDatabaseBodyParameters

export type CreateDatabaseResponse =
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse

/**
 * Create a database
 */
export const createDatabase = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "parent",
    "title",
    "description",
    "is_inline",
    "initial_data_source",
    "icon",
    "cover",
  ],

  path: (): string => `databases`,
} as const
