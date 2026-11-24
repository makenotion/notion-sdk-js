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
  // Sync identity and available health, included when retrieving a database.
  sync_metadata?: {
    // Live collection sync health. Null means unavailable, not unhealthy. Missing timestamps
    // are unknown.
    health?:
      | null
      | {
          checks: {
            sync_version_updated_at: string
            delta_synced_through_at?: string
            last_execution_succeeded_at?: string
          }
          error: {
            code: string
            severity: "action_required" | "degraded" | "failing"
          }
          ok: false
          paused: boolean
          stage: "backfilling" | "initializing" | "steady"
        }
      | {
          checks: {
            sync_version_updated_at: string
            delta_synced_through_at?: string
            last_execution_succeeded_at?: string
          }
          ok: true
          paused: boolean
          stage: "backfilling" | "initializing" | "steady"
        }
      | { paused: true }
    // Notion user who owns the sync credential, included when health is available.
    owner_user_id?: IdResponse
    // Provider resource synced to this data source, when available.
    resource?: string
    // Stored identity of an external database sync.
    external_database_sync?: {
      // The stored sync ID. This is not a credential.
      sync_id: IdResponse
      // The sync provider: github (GitHub), jira (Jira), or salesforce (Salesforce).
      provider: "github" | "jira" | "salesforce"
    }
    // The provider of a legacy synced data source: Jira or Salesforce. Values are
    // case-sensitive.
    external_collection_type?: "Jira" | "Salesforce"
    // The stored sync ID when provider details are unavailable. This is not a credential.
    sync_id?: IdResponse
    // Stored state for a legacy synced data source. Missing or invalid timestamps are
    // omitted. This is not a live health check.
    sync_state?: {
      // Stored legacy sync state: true means syncing, false means not syncing, and
      // row_limit_exceeded means the row limit stopped syncing. False does not guarantee a
      // successful sync.
      syncing: boolean | "row_limit_exceeded"
      // Stored legacy sync update time in UTC ISO 8601 format. This does not guarantee that
      // all source changes have been imported.
      last_synced_at?: string
      // Stored legacy sync checkpoint time in UTC ISO 8601 format.
      last_sync_checkpoint_at?: string
      // Stored legacy sync heartbeat time in UTC ISO 8601 format.
      last_sync_heartbeat_at?: string
    }
    // Opaque, developer-defined collection key for a worker sync. It is not a globally
    // unique ID or a credential. Worker status is not included.
    synced_collection_key?: string
  }
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
  // The type of typed database, such as `tasks`, `projects`, or `skills`, or `null` for a
  // regular database. Create a database accepts `tasks`, `projects`, and `skills`.
  database_type:
    | "tasks"
    | "projects"
    | "sprints"
    | "docs"
    | "wiki"
    | "meetings"
    | "meeting_notes"
    | "skills"
    | "github_prs"
    | null
  // Whether the database is in the trash.
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
  // Whether the database is locked from editing in the Notion app UI.
  is_locked: boolean
  // Whether the data source title is shown above the database's views, matching the Show
  // data source title toggle in the Notion app. Full-page databases with one data source
  // don't show this title even when this is `true`.
  show_data_source_title: boolean
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
  PartialDatabaseObjectResponse | DatabaseObjectResponse

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
  // Whether to show the data source title above the database's views. Matches the Show
  // data source title toggle in the Notion app. If not provided, the setting will not be
  // updated.
  show_data_source_title?: boolean
}

export type UpdateDatabaseParameters = UpdateDatabasePathParameters &
  UpdateDatabaseBodyParameters

export type UpdateDatabaseResponse =
  PartialDatabaseObjectResponse | DatabaseObjectResponse

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
    "show_data_source_title",
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
  // Create a typed database with Notion's canonical schema. One of `tasks`, `projects`, or
  // `skills`. Cannot be combined with `initial_data_source`. When `title` is omitted, the
  // database is named after the type.
  database_type?: "tasks" | "projects" | "skills"
  // The icon for the database.
  icon?: PageIconRequest
  // The cover image for the database.
  cover?: PageCoverRequest
  // Whether to show the data source title above the database's views. Matches the Show
  // data source title toggle in the Notion app. Defaults to true. Full-page databases with
  // one data source don't show this title.
  show_data_source_title?: boolean
}

export type CreateDatabaseParameters = CreateDatabaseBodyParameters

export type CreateDatabaseResponse =
  PartialDatabaseObjectResponse | DatabaseObjectResponse

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
    "database_type",
    "icon",
    "cover",
    "show_data_source_title",
  ],

  path: (): string => `databases`,
} as const
