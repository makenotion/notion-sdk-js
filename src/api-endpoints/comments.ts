// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  EmptyObject,
  IdRequest,
  IdResponse,
  InternalFileResponse,
  PartialUserObjectResponse,
  RichTextItemRequest,
  RichTextItemResponse,
} from "./common"

type BlockIdCommentParentResponse = {
  // Always `block_id`
  type: "block_id"
  block_id: IdResponse
}

export type CommentObjectResponse = {
  // The comment object type name.
  object: "comment"
  // The ID of the comment.
  id: IdResponse
  // The parent of the comment.
  parent: CommentParentResponse
  // The ID of the discussion thread this comment belongs to.
  discussion_id: IdResponse
  // The time when the comment was created.
  created_time: string
  // The time when the comment was last edited.
  last_edited_time: string
  // The user who created the comment.
  created_by: PartialUserObjectResponse
  // The rich text content of the comment.
  rich_text: Array<RichTextItemResponse>
  // The display name of the comment.
  display_name: {
    // One of: `custom`, `user`, `integration`
    type: "custom" | "user" | "integration"
    resolved_name: string | null
  }
  // Any file attachments associated with the comment.
  attachments?: Array<{
    // One of: `audio`, `image`, `pdf`, `productivity`, `video`
    category: "audio" | "image" | "pdf" | "productivity" | "video"
    file: InternalFileResponse
  }>
}

type CommentParentResponse =
  | PageIdCommentParentResponse
  | BlockIdCommentParentResponse

type PageIdCommentParentResponse = {
  // Always `page_id`
  type: "page_id"
  page_id: IdResponse
}

export type PartialCommentObjectResponse = {
  // The comment object type name.
  object: "comment"
  // The ID of the comment.
  id: IdResponse
}

type CreateCommentBodyParameters = {
  // An array of files to attach to the comment. Maximum of 3 allowed.
  attachments?: Array<{
    // ID of a FileUpload object that has the status `uploaded`.
    file_upload_id: string
    // Always `file_upload`
    type?: "file_upload"
  }>
  // Display name for the comment.
  display_name?:
    | {
        // Always `integration`
        type: "integration"
      }
    | {
        // Always `user`
        type: "user"
      }
    | {
        // Always `custom`
        type: "custom"
        custom: {
          // The custom display name to use
          name: string
        }
      }
} & (
  | {
      // The parent of the comment. This can be a page or a block.
      parent:
        | {
            // The ID of the parent page (with or without dashes), for example,
            // 195de9221179449fab8075a27c979105
            page_id: IdRequest
            // Always `page_id`
            type?: "page_id"
          }
        | {
            // The ID of the parent block (with or without dashes), for example,
            // 195de9221179449fab8075a27c979105
            block_id: IdRequest
            // Always `block_id`
            type?: "block_id"
          }
      // An array of rich text objects that represent the content of the comment.
      rich_text: Array<RichTextItemRequest>
    }
  | {
      // The parent of the comment. This can be a page or a block.
      parent:
        | {
            // The ID of the parent page (with or without dashes), for example,
            // 195de9221179449fab8075a27c979105
            page_id: IdRequest
            // Always `page_id`
            type?: "page_id"
          }
        | {
            // The ID of the parent block (with or without dashes), for example,
            // 195de9221179449fab8075a27c979105
            block_id: IdRequest
            // Always `block_id`
            type?: "block_id"
          }
      // The content of the comment as a Markdown string. Comment Markdown supports inline
      // formatting only (bold, italic, strikethrough, code, links), inline equations
      // ($expression$), and mentions. Block-level Markdown such as fenced code blocks,
      // headings, lists, tables, and blockquotes does not render as structured blocks in
      // comments.
      markdown: string
    }
  | {
      // The ID of the discussion to comment on.
      discussion_id: IdRequest
      // An array of rich text objects that represent the content of the comment.
      rich_text: Array<RichTextItemRequest>
    }
  | {
      // The ID of the discussion to comment on.
      discussion_id: IdRequest
      // The content of the comment as a Markdown string. Comment Markdown supports inline
      // formatting only (bold, italic, strikethrough, code, links), inline equations
      // ($expression$), and mentions. Block-level Markdown such as fenced code blocks,
      // headings, lists, tables, and blockquotes does not render as structured blocks in
      // comments.
      markdown: string
    }
)

export type CreateCommentParameters = CreateCommentBodyParameters

export type CreateCommentResponse =
  | PartialCommentObjectResponse
  | CommentObjectResponse

/**
 * Create a comment
 */
export const createComment = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "attachments",
    "display_name",
    "parent",
    "rich_text",
    "markdown",
    "discussion_id",
  ],

  path: (): string => `comments`,
} as const

type ListCommentsQueryParameters = {
  // Identifier for a Notion block or page.
  block_id: IdRequest
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListCommentsParameters = ListCommentsQueryParameters

export type ListCommentsResponse = {
  // Always `list`
  object: "list"
  next_cursor: IdResponse | null
  has_more: boolean
  results: Array<CommentObjectResponse>
  // Always `comment`
  type: "comment"
  comment: EmptyObject
}

/**
 * List comments
 */
export const listComments = {
  method: "get",
  pathParams: [],
  queryParams: ["block_id", "start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `comments`,
} as const

type GetCommentPathParameters = {
  // The ID of the comment to retrieve.
  comment_id: IdRequest
}

export type GetCommentParameters = GetCommentPathParameters

export type GetCommentResponse =
  | PartialCommentObjectResponse
  | CommentObjectResponse

/**
 * Retrieve a comment
 */
export const getComment = {
  method: "get",
  pathParams: ["comment_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetCommentPathParameters): string => `comments/${p.comment_id}`,
} as const

type UpdateCommentPathParameters = {
  // The ID of the comment to update.
  comment_id: IdRequest
}

type UpdateCommentBodyParameters =
  | {
      // An array of rich text objects that represent the updated content of the comment.
      rich_text: Array<RichTextItemRequest>
    }
  | {
      // The updated content of the comment as a Markdown string. Comment Markdown supports
      // inline formatting only (bold, italic, strikethrough, code, links), inline equations
      // ($expression$), and mentions. Block-level Markdown such as fenced code blocks,
      // headings, lists, tables, and blockquotes does not render as structured blocks in
      // comments.
      markdown: string
    }

export type UpdateCommentParameters = UpdateCommentPathParameters &
  UpdateCommentBodyParameters

export type UpdateCommentResponse =
  | PartialCommentObjectResponse
  | CommentObjectResponse

/**
 * Update a comment
 */
export const updateComment = {
  method: "patch",
  pathParams: ["comment_id"],
  queryParams: [],
  bodyParams: ["rich_text", "markdown"],

  path: (p: UpdateCommentPathParameters): string => `comments/${p.comment_id}`,
} as const

type DeleteCommentPathParameters = {
  // The ID of the comment to delete.
  comment_id: IdRequest
}

export type DeleteCommentParameters = DeleteCommentPathParameters

export type DeleteCommentResponse =
  | PartialCommentObjectResponse
  | CommentObjectResponse

/**
 * Delete a comment
 */
export const deleteComment = {
  method: "delete",
  pathParams: ["comment_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteCommentPathParameters): string => `comments/${p.comment_id}`,
} as const
