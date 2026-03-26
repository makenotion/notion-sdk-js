// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  ApiColor,
  BlockObjectRequest,
  ContentPositionSchema,
  ContentWithExpressionRequest,
  ContentWithRichTextAndColorRequest,
  ContentWithRichTextRequest,
  ContentWithTableRowRequest,
  EmptyObject,
  HeaderContentWithRichTextAndColorRequest,
  IdRequest,
  InternalFileResponse,
  LanguageRequest,
  PageIconRequest,
  PageIconResponse,
  ParentForBlockBasedObjectResponse,
  PartialUserObjectResponse,
  RichTextItemRequest,
  RichTextItemResponse,
  TextRequest,
  UpdateMediaContentWithFileAndCaptionRequest,
  UpdateMediaContentWithFileNameAndCaptionRequest,
  UpdateMediaContentWithUrlAndCaptionRequest,
} from "./common"

type ApiTranscriptionStatus =
  | "transcription_not_started"
  | "transcription_paused"
  | "transcription_in_progress"
  | "summary_in_progress"
  | "notes_ready"

export type AudioBlockObjectResponse = {
  type: "audio"
  audio: MediaContentWithFileAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type BlockObjectResponse =
  | ParagraphBlockObjectResponse
  | Heading1BlockObjectResponse
  | Heading2BlockObjectResponse
  | Heading3BlockObjectResponse
  | BulletedListItemBlockObjectResponse
  | NumberedListItemBlockObjectResponse
  | QuoteBlockObjectResponse
  | ToDoBlockObjectResponse
  | ToggleBlockObjectResponse
  | TemplateBlockObjectResponse
  | SyncedBlockBlockObjectResponse
  | ChildPageBlockObjectResponse
  | ChildDatabaseBlockObjectResponse
  | EquationBlockObjectResponse
  | CodeBlockObjectResponse
  | CalloutBlockObjectResponse
  | DividerBlockObjectResponse
  | BreadcrumbBlockObjectResponse
  | TableOfContentsBlockObjectResponse
  | TabBlockObjectResponse
  | ColumnListBlockObjectResponse
  | ColumnBlockObjectResponse
  | LinkToPageBlockObjectResponse
  | TableBlockObjectResponse
  | TableRowBlockObjectResponse
  | MeetingNotesBlockObjectResponse
  | TranscriptionBlockObjectResponse
  | EmbedBlockObjectResponse
  | BookmarkBlockObjectResponse
  | ImageBlockObjectResponse
  | VideoBlockObjectResponse
  | PdfBlockObjectResponse
  | FileBlockObjectResponse
  | AudioBlockObjectResponse
  | LinkPreviewBlockObjectResponse
  | UnsupportedBlockObjectResponse

export type BookmarkBlockObjectResponse = {
  type: "bookmark"
  bookmark: MediaContentWithUrlAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type BreadcrumbBlockObjectResponse = {
  type: "breadcrumb"
  breadcrumb: EmptyObject
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type BulletedListItemBlockObjectResponse = {
  type: "bulleted_list_item"
  bulleted_list_item: ContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type CalloutBlockObjectResponse = {
  type: "callout"
  callout: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    icon: PageIconResponse | null
  }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ChildDatabaseBlockObjectResponse = {
  type: "child_database"
  child_database: TitleObjectResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ChildPageBlockObjectResponse = {
  type: "child_page"
  child_page: TitleObjectResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type CodeBlockObjectResponse = {
  type: "code"
  code: {
    rich_text: Array<RichTextItemResponse>
    caption: Array<RichTextItemResponse>
    language: LanguageRequest
  }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ColumnBlockObjectResponse = {
  type: "column"
  column: ColumnResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ColumnListBlockObjectResponse = {
  type: "column_list"
  column_list: EmptyObject
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type ColumnResponse = {
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
}

type ContentWithRichTextAndColorAndListResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
  list_start_index?: number
  list_format?: NumberedListFormat
}

type ContentWithRichTextAndColorResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
}

type ContentWithTableResponse = {
  has_column_header: boolean
  has_row_header: boolean
  table_width: number
}

type ContentWithTableRowResponse = { cells: Array<Array<RichTextItemResponse>> }

export type DividerBlockObjectResponse = {
  type: "divider"
  divider: EmptyObject
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type EmbedBlockObjectResponse = {
  type: "embed"
  embed: MediaContentWithUrlAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type EquationBlockObjectResponse = {
  type: "equation"
  equation: ExpressionObjectResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type ExpressionObjectResponse = { expression: string }

type ExternalMediaContentWithFileAndCaptionResponse = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
}

type ExternalMediaContentWithFileNameAndCaptionResponse = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
  name: string
}

export type FileBlockObjectResponse = {
  type: "file"
  file: MediaContentWithFileNameAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type FileMediaContentWithFileAndCaptionResponse = {
  type: "file"
  file: InternalFileResponse
  caption: Array<RichTextItemResponse>
}

type FileMediaContentWithFileNameAndCaptionResponse = {
  type: "file"
  file: InternalFileResponse
  caption: Array<RichTextItemResponse>
  name: string
}

type HeaderContentWithRichTextAndColorResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
  is_toggleable: boolean
}

export type Heading1BlockObjectResponse = {
  type: "heading_1"
  heading_1: HeaderContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type Heading2BlockObjectResponse = {
  type: "heading_2"
  heading_2: HeaderContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type Heading3BlockObjectResponse = {
  type: "heading_3"
  heading_3: HeaderContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ImageBlockObjectResponse = {
  type: "image"
  image: MediaContentWithFileAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type LinkPreviewBlockObjectResponse = {
  type: "link_preview"
  link_preview: MediaContentWithUrlResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type LinkToPageBlockObjectResponse = {
  type: "link_to_page"
  link_to_page:
    | { type: "page_id"; page_id: IdRequest }
    | { type: "database_id"; database_id: IdRequest }
    | { type: "comment_id"; comment_id: IdRequest }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type MediaContentWithFileAndCaptionResponse =
  | ExternalMediaContentWithFileAndCaptionResponse
  | FileMediaContentWithFileAndCaptionResponse

type MediaContentWithFileNameAndCaptionResponse =
  | ExternalMediaContentWithFileNameAndCaptionResponse
  | FileMediaContentWithFileNameAndCaptionResponse

type MediaContentWithUrlAndCaptionResponse = {
  url: string
  caption: Array<RichTextItemResponse>
}

type MediaContentWithUrlResponse = { url: TextRequest }

/**
 * @deprecated Use MeetingNotesBlockObjectResponse instead. Renamed in API version 2026-03-11.
 */
export type TranscriptionBlockObjectResponse = {
  type: "transcription"
  transcription: TranscriptionBlockResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type MeetingNotesBlockObjectResponse = {
  type: "meeting_notes"
  meeting_notes: TranscriptionBlockResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type NumberedListFormat = "numbers" | "letters" | "roman"

export type NumberedListItemBlockObjectResponse = {
  type: "numbered_list_item"
  numbered_list_item: ContentWithRichTextAndColorAndListResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ParagraphBlockObjectResponse = {
  type: "paragraph"
  paragraph: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    icon: PageIconResponse | null
  }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type PartialBlockObjectResponse = { object: "block"; id: string }

export type PdfBlockObjectResponse = {
  type: "pdf"
  pdf: MediaContentWithFileAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type QuoteBlockObjectResponse = {
  type: "quote"
  quote: ContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type SyncedBlockBlockObjectResponse = {
  type: "synced_block"
  synced_block: {
    synced_from: { type: "block_id"; block_id: IdRequest } | null
  }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type TabBlockObjectResponse = {
  type: "tab"
  tab: EmptyObject
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type TableBlockObjectResponse = {
  type: "table"
  table: ContentWithTableResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type TableOfContentsBlockObjectResponse = {
  type: "table_of_contents"
  table_of_contents: { color: ApiColor }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type TableRowBlockObjectResponse = {
  type: "table_row"
  table_row: ContentWithTableRowResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type TemplateBlockObjectResponse = {
  type: "template"
  template: { rich_text: Array<RichTextItemResponse> }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type TitleObjectResponse = { title: string }

export type ToDoBlockObjectResponse = {
  type: "to_do"
  to_do: {
    rich_text: Array<RichTextItemResponse>
    color: ApiColor
    checked: boolean
  }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type ToggleBlockObjectResponse = {
  type: "toggle"
  toggle: ContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type TranscriptionBlockResponse = {
  title?: Array<RichTextItemResponse>
  status?: ApiTranscriptionStatus
  children?: TranscriptionChildrenResponse
  calendar_event?: TranscriptionCalendarEventResponse
  recording?: TranscriptionRecordingResponse
}

type TranscriptionCalendarEventResponse = {
  start_time: string
  end_time: string
  attendees?: Array<IdRequest>
}

type TranscriptionChildrenResponse = {
  summary_block_id?: IdRequest
  notes_block_id?: IdRequest
  transcript_block_id?: IdRequest
}

type TranscriptionRecordingResponse = { start_time?: string; end_time?: string }

export type UnsupportedBlockObjectResponse = {
  type: "unsupported"
  unsupported: {
    // The underlying block type that is not currently supported by the Public API. Example
    // values include: form, button, drive.
    block_type: string
  }
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

export type VideoBlockObjectResponse = {
  type: "video"
  video: MediaContentWithFileAndCaptionResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
}

type GetBlockPathParameters = {
  block_id: IdRequest
}

export type GetBlockParameters = GetBlockPathParameters

export type GetBlockResponse = PartialBlockObjectResponse | BlockObjectResponse

/**
 * Retrieve a block
 */
export const getBlock = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

type UpdateBlockPathParameters = {
  block_id: IdRequest
}

type UpdateBlockBodyParameters =
  | {
      embed: UpdateMediaContentWithUrlAndCaptionRequest
      type?: "embed"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      bookmark: UpdateMediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      image: UpdateMediaContentWithFileAndCaptionRequest
      type?: "image"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      video: UpdateMediaContentWithFileAndCaptionRequest
      type?: "video"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      pdf: UpdateMediaContentWithFileAndCaptionRequest
      type?: "pdf"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      file: UpdateMediaContentWithFileNameAndCaptionRequest
      type?: "file"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      audio: UpdateMediaContentWithFileAndCaptionRequest
      type?: "audio"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      code: {
        rich_text?: Array<RichTextItemRequest>
        language?: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      equation: ContentWithExpressionRequest
      type?: "equation"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      divider: EmptyObject
      type?: "divider"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      breadcrumb: EmptyObject
      type?: "breadcrumb"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      tab: EmptyObject
      type?: "tab"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      table_row: ContentWithTableRowRequest
      type?: "table_row"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      heading_1: HeaderContentWithRichTextAndColorRequest
      type?: "heading_1"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      heading_2: HeaderContentWithRichTextAndColorRequest
      type?: "heading_2"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      heading_3: HeaderContentWithRichTextAndColorRequest
      type?: "heading_3"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      paragraph: {
        rich_text?: Array<RichTextItemRequest>
        icon?: PageIconRequest
        color?: ApiColor
      }
      type?: "paragraph"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      bulleted_list_item: ContentWithRichTextAndColorRequest
      type?: "bulleted_list_item"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      numbered_list_item: ContentWithRichTextAndColorRequest
      type?: "numbered_list_item"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      quote: ContentWithRichTextAndColorRequest
      type?: "quote"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      to_do: {
        rich_text?: Array<RichTextItemRequest>
        checked?: boolean
        color?: ApiColor
      }
      type?: "to_do"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      toggle: ContentWithRichTextAndColorRequest
      type?: "toggle"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      template: ContentWithRichTextRequest
      type?: "template"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      callout: {
        rich_text?: Array<RichTextItemRequest>
        icon?: PageIconRequest
        color?: ApiColor
      }
      type?: "callout"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
      }
      type?: "synced_block"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      table: { has_column_header?: boolean; has_row_header?: boolean }
      type?: "table"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      column: {
        // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
        // If not provided, uses an equal width.
        width_ratio?: number
      }
      type?: "column"
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }
  | {
      in_trash?: boolean
      /** @deprecated Use `in_trash` instead. */
      archived?: boolean
    }

export type UpdateBlockParameters = UpdateBlockPathParameters &
  UpdateBlockBodyParameters

export type UpdateBlockResponse =
  | PartialBlockObjectResponse
  | BlockObjectResponse

/**
 * Update a block
 */
export const updateBlock = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [
    "archived",
    "embed",
    "type",
    "in_trash",
    "bookmark",
    "image",
    "video",
    "pdf",
    "file",
    "audio",
    "code",
    "equation",
    "divider",
    "breadcrumb",
    "tab",
    "table_of_contents",
    "link_to_page",
    "table_row",
    "heading_1",
    "heading_2",
    "heading_3",
    "paragraph",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "to_do",
    "toggle",
    "template",
    "callout",
    "synced_block",
    "table",
    "column",
  ],

  path: (p: UpdateBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

type DeleteBlockPathParameters = {
  block_id: IdRequest
}

export type DeleteBlockParameters = DeleteBlockPathParameters

export type DeleteBlockResponse =
  | PartialBlockObjectResponse
  | BlockObjectResponse

/**
 * Delete a block
 */
export const deleteBlock = {
  method: "delete",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

type ListBlockChildrenPathParameters = {
  block_id: IdRequest
}

type ListBlockChildrenQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListBlockChildrenParameters = ListBlockChildrenPathParameters &
  ListBlockChildrenQueryParameters

export type ListBlockChildrenResponse = {
  type: "block"
  block: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PartialBlockObjectResponse | BlockObjectResponse>
}

/**
 * Retrieve block children
 */
export const listBlockChildren = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (p: ListBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const

type AppendBlockChildrenPathParameters = {
  block_id: IdRequest
}

type AppendBlockChildrenBodyParameters = {
  children: Array<BlockObjectRequest>
  /** @deprecated Use `position` instead. */
  after?: IdRequest
  position?: ContentPositionSchema
}

export type AppendBlockChildrenParameters = AppendBlockChildrenPathParameters &
  AppendBlockChildrenBodyParameters

export type AppendBlockChildrenResponse = {
  type: "block"
  block: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PartialBlockObjectResponse | BlockObjectResponse>
}

/**
 * Append block children
 */
export const appendBlockChildren = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: ["after", "children", "position"],

  path: (p: AppendBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const
