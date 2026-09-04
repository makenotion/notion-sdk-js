// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  EmptyObject,
  IdRequest,
  IdResponse,
  RequestStatusResponse,
} from "./common"

export type FileUploadObjectResponse = {
  // Always `file_upload`
  object: "file_upload"
  id: IdResponse
  created_time: string
  created_by: {
    id: IdResponse
    // One of: `person`, `bot`, `agent`
    type: "person" | "bot" | "agent"
  }
  last_edited_time: string
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
  expiry_time: string | null
  // One of: `pending`, `uploaded`, `expired`, `failed`
  status: "pending" | "uploaded" | "expired" | "failed"
  filename: string | null
  content_type: string | null
  content_length: number | null
  upload_url?: string
  complete_url?: string
  file_import_result?: {
    // The time the file was imported into Notion. ISO 8601 format.
    imported_time: string
  } & (
    | {
        // Indicates a successful import.
        type: "success"
        // Empty object for success type.
        success: EmptyObject
      }
    | {
        // Indicates an error occurred during import.
        type: "error"
        // Details about the error that occurred during file import.
        error: {
          // The type of error that occurred during file import.
          type:
            | "validation_error"
            | "internal_system_error"
            | "download_error"
            | "upload_error"
          // A short string code representing the error.
          code: string
          // A human-readable message describing the error.
          message: string
          // The parameter related to the error, if applicable. Null if not applicable.
          parameter: string | null
          // The HTTP status code associated with the error, if available. Null if not applicable.
          status_code: number | null
        }
      }
  )
  number_of_parts?: { total: number; sent: number }
}

type CreateFileUploadBodyParameters = {
  // How the file is sent. Defaults to single_part. Use multi_part for files larger than 20
  // MiB or external_url for a temporary public HTTPS URL.
  mode?: "single_part" | "multi_part" | "external_url"
  // The filename. Required for multi_part and external_url uploads. Include an extension
  // or provide content_type so one can be inferred.
  filename?: string
  // The MIME type. It must match the uploaded file and any filename extension.
  content_type?: string
  // The number of parts in a multi_part upload. Required only for multi_part uploads.
  number_of_parts?: number
  // A public HTTPS URL to import. Required only for external_url uploads.
  external_url?: string
}

export type CreateFileUploadParameters = CreateFileUploadBodyParameters

export type CreateFileUploadResponse = FileUploadObjectResponse

/**
 * Create a file upload
 */
export const createFileUpload = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "mode",
    "filename",
    "content_type",
    "number_of_parts",
    "external_url",
  ],

  path: (): string => `file_uploads`,
} as const

type ListFileUploadsQueryParameters = {
  // If supplied, the endpoint will return file uploads with the specified status.
  status?: "pending" | "uploaded" | "expired" | "failed"
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string | null
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListFileUploadsParameters = ListFileUploadsQueryParameters

export type ListFileUploadsResponse = {
  // Always `list`
  object: "list"
  next_cursor: IdResponse | null
  has_more: boolean
  results: Array<FileUploadObjectResponse>
  // Always `file_upload`
  type: "file_upload"
  file_upload: EmptyObject
  request_status?: RequestStatusResponse
}

/**
 * List file uploads
 */
export const listFileUploads = {
  method: "get",
  pathParams: [],
  queryParams: ["status", "start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `file_uploads`,
} as const

type SendFileUploadPathParameters = {
  // Identifier for a Notion file upload object.
  file_upload_id: IdRequest
}

type SendFileUploadFormDataParameters = {
  file: { filename?: string; data: string | Blob }
  part_number?: string
}

export type SendFileUploadParameters = SendFileUploadPathParameters &
  SendFileUploadFormDataParameters

export type SendFileUploadResponse = FileUploadObjectResponse

/**
 * Upload a file
 */
export const sendFileUpload = {
  method: "post",
  pathParams: ["file_upload_id"],
  queryParams: [],
  bodyParams: [],
  formDataParams: ["file", "part_number"],
  path: (p: SendFileUploadPathParameters): string =>
    `file_uploads/${p.file_upload_id}/send`,
} as const

type CompleteFileUploadPathParameters = {
  // Identifier for a Notion file upload object.
  file_upload_id: IdRequest
}

export type CompleteFileUploadParameters = CompleteFileUploadPathParameters

export type CompleteFileUploadResponse = FileUploadObjectResponse

/**
 * Complete a multi-part file upload
 */
export const completeFileUpload = {
  method: "post",
  pathParams: ["file_upload_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: CompleteFileUploadPathParameters): string =>
    `file_uploads/${p.file_upload_id}/complete`,
} as const

type GetFileUploadPathParameters = {
  // Identifier for a Notion file upload object.
  file_upload_id: IdRequest
}

export type GetFileUploadParameters = GetFileUploadPathParameters

export type GetFileUploadResponse = FileUploadObjectResponse

/**
 * Retrieve a file upload
 */
export const getFileUpload = {
  method: "get",
  pathParams: ["file_upload_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetFileUploadPathParameters): string =>
    `file_uploads/${p.file_upload_id}`,
} as const
