// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type { EmptyObject, IdResponse } from "./common"

export type BaseWebhookPayload = {
  // Unique identifier for this webhook event.
  id: string
  // ISO 8601 timestamp of when the event occurred. Can be used to order events.
  timestamp: string
  // The ID of the workspace where the event originated.
  workspace_id: IdResponse
  // The name of the workspace where the event originated.
  workspace_name: string
  // The ID of the webhook subscription.
  subscription_id: IdResponse
  // The ID of the integration the subscription is set up with.
  integration_id: IdResponse
  // The users or bots that performed the action. Typically an array of length 1; can be
  // more for aggregated events.
  authors: Array<
    | {
        // The ID of the user.
        id: IdResponse
        // Always `person`
        type: "person"
      }
    | {
        // The ID of the bot.
        id: IdResponse
        // Always `bot`
        type: "bot"
      }
  >
  // The delivery attempt number (1-8) of the current event delivery.
  attempt_number: number
  // The Notion API version that was used to render this webhook event's shape.
  api_version: "2022-06-28" | "2025-09-03" | "2026-03-11"
  // The users or bots who own the bot connection to the `integration_id` and have access
  // to the webhook's `entity`. Only present for public integrations.
  accessible_by?: Array<
    | {
        // The ID of the user.
        id: IdResponse
        // Always `person`
        type: "person"
      }
    | {
        // The ID of the bot.
        id: IdResponse
        // Always `bot`
        type: "bot"
      }
  >
}

export type CommentCreatedWebhookPayload = BaseWebhookPayload & {
  // Always `comment.created`
  type: "comment.created"
  // The object that triggered the event.
  entity: WebhookCommentEntity
  // Additional event-specific data.
  data: {
    // The parent of the comment (the page or block the comment is attached to).
    parent: WebhookExternalBlock
    // The ID of the page containing the comment.
    page_id: IdResponse
  }
}

export type CommentDeletedWebhookPayload = BaseWebhookPayload & {
  // Always `comment.deleted`
  type: "comment.deleted"
  // The object that triggered the event.
  entity: WebhookCommentEntity
  // Additional event-specific data.
  data: {
    // The parent of the comment (the page or block the comment is attached to).
    parent: WebhookExternalBlock
    // The ID of the page containing the comment.
    page_id: IdResponse
  }
}

export type CommentUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `comment.updated`
  type: "comment.updated"
  // The object that triggered the event.
  entity: WebhookCommentEntity
  // Additional event-specific data.
  data: {
    // The parent of the comment (the page or block the comment is attached to).
    parent: WebhookExternalBlock
    // The ID of the page containing the comment.
    page_id: IdResponse
  }
}

export type DataSourceContentUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `data_source.content_updated`
  type: "data_source.content_updated"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity whose content was updated.
    parent: WebhookParentBlock
    // The blocks that were updated in this event.
    updated_blocks: Array<WebhookUpdatedBlock>
  }
}

export type DataSourceCreatedWebhookPayload = BaseWebhookPayload & {
  // Always `data_source.created`
  type: "data_source.created"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DataSourceDeletedWebhookPayload = BaseWebhookPayload & {
  // Always `data_source.deleted`
  type: "data_source.deleted"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DataSourceMovedWebhookPayload = BaseWebhookPayload & {
  // Always `data_source.moved`
  type: "data_source.moved"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DataSourceSchemaUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `data_source.schema_updated`
  type: "data_source.schema_updated"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the database whose schema was updated.
    parent: WebhookParentBlock
    // The database properties that were created, updated, or deleted.
    updated_properties?: Array<{
      // The ID of the database property that changed.
      id: string
      // The name of the database property, or `null` if deleted.
      name: string | null
      // The action taken on the property.
      action: "created" | "updated" | "deleted"
    }>
  }
}

export type DataSourceUndeletedWebhookPayload = BaseWebhookPayload & {
  // Always `data_source.undeleted`
  type: "data_source.undeleted"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DatabaseContentUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `database.content_updated`
  type: "database.content_updated"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity whose content was updated.
    parent: WebhookParentBlock
    // The blocks that were updated in this event.
    updated_blocks: Array<WebhookUpdatedBlock>
  }
}

export type DatabaseCreatedWebhookPayload = BaseWebhookPayload & {
  // Always `database.created`
  type: "database.created"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DatabaseDeletedWebhookPayload = BaseWebhookPayload & {
  // Always `database.deleted`
  type: "database.deleted"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DatabaseMovedWebhookPayload = BaseWebhookPayload & {
  // Always `database.moved`
  type: "database.moved"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type DatabaseSchemaUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `database.schema_updated`
  type: "database.schema_updated"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the database whose schema was updated.
    parent: WebhookParentBlock
    // The database properties that were created, updated, or deleted.
    updated_properties?: Array<{
      // The ID of the database property that changed.
      id: string
      // The name of the database property, or `null` if deleted.
      name: string | null
      // The action taken on the property.
      action: "created" | "updated" | "deleted"
    }>
  }
}

export type DatabaseUndeletedWebhookPayload = BaseWebhookPayload & {
  // Always `database.undeleted`
  type: "database.undeleted"
  // The object that triggered the event.
  entity: WebhookDatabaseEventEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type FileUploadCompletedWebhookPayload = BaseWebhookPayload & {
  // Always `file_upload.completed`
  type: "file_upload.completed"
  // The object that triggered the event.
  entity: WebhookFileUploadEntity
}

export type FileUploadCreatedWebhookPayload = BaseWebhookPayload & {
  // Always `file_upload.created`
  type: "file_upload.created"
  // The object that triggered the event.
  entity: WebhookFileUploadEntity
}

export type FileUploadExpiredWebhookPayload = BaseWebhookPayload & {
  // Always `file_upload.expired`
  type: "file_upload.expired"
  // The object that triggered the event.
  entity: WebhookFileUploadEntity
}

export type FileUploadUploadFailedWebhookPayload = BaseWebhookPayload & {
  // Always `file_upload.upload_failed`
  type: "file_upload.upload_failed"
  // The object that triggered the event.
  entity: WebhookFileUploadEntity
  // Additional event-specific data.
  data: {
    // The result of the file import attempt.
    file_import_result:
      | {
          // Always `success`
          type: "success"
          // ISO 8601 timestamp of when the file was imported.
          imported_time: string
          // Empty object indicating success.
          success: EmptyObject
        }
      | {
          // Always `error`
          type: "error"
          // ISO 8601 timestamp of when the import was attempted.
          imported_time: string
          // Details about the error.
          error: {
            // The category of the error.
            type:
              | "validation_error"
              | "internal_system_error"
              | "download_error"
              | "upload_error"
            // A machine-readable error code.
            code: string
            // A human-readable description of the error.
            message: string
            // The parameter that caused the error, or `null`.
            parameter: string | null
            // The HTTP status code associated with the error, or `null`.
            status_code: number | null
          }
        }
  }
}

export type PageContentUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `page.content_updated`
  type: "page.content_updated"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity whose content was updated.
    parent: WebhookParentBlock
    // The blocks that were updated in this event.
    updated_blocks: Array<WebhookUpdatedBlock>
  }
}

export type PageCreatedWebhookPayload = BaseWebhookPayload & {
  // Always `page.created`
  type: "page.created"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type PageDeletedWebhookPayload = BaseWebhookPayload & {
  // Always `page.deleted`
  type: "page.deleted"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type PageLockedWebhookPayload = BaseWebhookPayload & {
  // Always `page.locked`
  type: "page.locked"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type PageMovedWebhookPayload = BaseWebhookPayload & {
  // Always `page.moved`
  type: "page.moved"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type PagePropertiesUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `page.properties_updated`
  type: "page.properties_updated"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the page whose properties were updated.
    parent: WebhookParentBlock
    // The IDs of the properties that were updated.
    updated_properties: Array<string>
  }
}

export type PageTranscriptionBlockTranscriptDeletedWebhookPayload =
  BaseWebhookPayload & {
    // Always `page.transcription_block.transcript_deleted`
    type: "page.transcription_block.transcript_deleted"
    // The object that triggered the event.
    entity: WebhookPageEntity
    // Additional event-specific data.
    data: {
      // The block that contained the deleted transcript.
      target: WebhookExternalBlock
      // The ID of the deleted transcript, or `null` if not available.
      transcript_id: string | null
    }
  }

export type PageUndeletedWebhookPayload = BaseWebhookPayload & {
  // Always `page.undeleted`
  type: "page.undeleted"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type PageUnlockedWebhookPayload = BaseWebhookPayload & {
  // Always `page.unlocked`
  type: "page.unlocked"
  // The object that triggered the event.
  entity: WebhookPageEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type ViewCreatedWebhookPayload = BaseWebhookPayload & {
  // Always `view.created`
  type: "view.created"
  // The object that triggered the event.
  entity: WebhookViewEntity
  // Additional event-specific data.
  data: {
    // The parent of the created view.
    parent: WebhookParentBlock
    // The type of the created view (e.g. `table`, `board`, `list`, `calendar`, `gallery`,
    // `timeline`).
    view_type: string
  }
}

export type ViewDeletedWebhookPayload = BaseWebhookPayload & {
  // Always `view.deleted`
  type: "view.deleted"
  // The object that triggered the event.
  entity: WebhookViewEntity
  // Additional event-specific data.
  data: {
    // The parent of the entity that triggered the event.
    parent: WebhookParentBlock
  }
}

export type ViewUpdatedWebhookPayload = BaseWebhookPayload & {
  // Always `view.updated`
  type: "view.updated"
  // The object that triggered the event.
  entity: WebhookViewEntity
  // Additional event-specific data.
  data: {
    // The parent of the updated view.
    parent: WebhookParentBlock
    // The fields of the view that were updated.
    updated_fields: Array<"name" | "filter" | "sorts" | "configuration">
  }
}

type WebhookCommentEntity = {
  // Always `comment`
  type: "comment"
  // The ID of the comment that triggered the event.
  id: IdResponse
}

type WebhookDatabaseEventEntity = {
  // The ID of the database or data source that triggered the event.
  id: IdResponse
  // The type of entity. For linked databases, this is `block`.
  type: "block" | "database" | "data_source"
}

type WebhookExternalBlock = {
  // The ID of the parent.
  id: IdResponse
  // The type of the parent.
  type: "page" | "database" | "block"
}

type WebhookFileUploadEntity = {
  // Always `file_upload`
  type: "file_upload"
  // The ID of the file upload that triggered the event.
  id: IdResponse
}

type WebhookPageEntity = {
  // Always `page`
  type: "page"
  // The ID of the page that triggered the event.
  id: IdResponse
}

type WebhookParentBlock = {
  // The ID of the parent.
  id: IdResponse
  // The type of the parent.
  type: "space" | "block" | "page" | "database" | "team"
  // The data source ID of the parent, if applicable.
  data_source_id?: IdResponse
}

type WebhookUpdatedBlock = {
  // The ID of the updated block.
  id: IdResponse
  // The type of the updated block.
  type: "page" | "database" | "block"
}

type WebhookViewEntity = {
  // The ID of the view that triggered the event.
  id: IdResponse
  // Always `view`
  type: "view"
}
