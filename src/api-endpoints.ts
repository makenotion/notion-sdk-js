// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

type AnnotationRequest = {
  // Whether the text is formatted as bold.
  bold?: boolean
  // Whether the text is formatted as italic.
  italic?: boolean
  // Whether the text is formatted with a strikethrough.
  strikethrough?: boolean
  // Whether the text is formatted with an underline.
  underline?: boolean
  // Whether the text is formatted as code.
  code?: boolean
  // The color of the text.
  color?: ApiColor
}

type AnnotationResponse = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: ApiColor
}

/**
 * One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`,
 * `pink`, `red`, `default_background`, `gray_background`, `brown_background`,
 * `orange_background`, `yellow_background`, `green_background`, `blue_background`,
 * `purple_background`, `pink_background`, `red_background`
 */
type ApiColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default_background"
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background"

type ApiTranscriptionStatus =
  | "transcription_not_started"
  | "transcription_paused"
  | "transcription_in_progress"
  | "summary_in_progress"
  | "notes_ready"

type ArrayBasedPropertyValueResponse =
  | TitleArrayBasedPropertyValueResponse
  | RichTextArrayBasedPropertyValueResponse
  | PeopleArrayBasedPropertyValueResponse
  | RelationArrayBasedPropertyValueResponse

type ArrayPartialRollupValueResponse = {
  // Always `array`
  type: "array"
  array: Array<SimpleOrArrayPropertyValueResponse>
}

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

type BlockIdCommentParentResponse = {
  // Always `block_id`
  type: "block_id"
  block_id: IdResponse
}

type BlockIdParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "block_id"
  // The ID of the parent block.
  block_id: IdResponse
}

export type BlockObjectRequest =
  | {
      embed: MediaContentWithUrlAndCaptionRequest
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: MediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: MediaContentWithFileAndCaptionRequest
      type?: "image"
      object?: "block"
    }
  | {
      video: MediaContentWithFileAndCaptionRequest
      type?: "video"
      object?: "block"
    }
  | {
      pdf: MediaContentWithFileAndCaptionRequest
      type?: "pdf"
      object?: "block"
    }
  | {
      file: MediaContentWithFileNameAndCaptionRequest
      type?: "file"
      object?: "block"
    }
  | {
      audio: MediaContentWithFileAndCaptionRequest
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        rich_text: Array<RichTextItemRequest>
        language: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      object?: "block"
    }
  | {
      equation: ContentWithExpressionRequest
      type?: "equation"
      object?: "block"
    }
  | { divider: EmptyObject; type?: "divider"; object?: "block" }
  | { breadcrumb: EmptyObject; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      object?: "block"
    }
  | {
      table_row: ContentWithTableRowRequest
      type?: "table_row"
      object?: "block"
    }
  | {
      table: TableRequestWithTableRowChildren
      type?: "table"
      object?: "block"
    }
  | { column_list: ColumnListRequest; type?: "column_list"; object?: "block" }
  | { column: ColumnWithChildrenRequest; type?: "column"; object?: "block" }
  | {
      heading_1: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        is_toggleable?: boolean
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "heading_3"
      object?: "block"
    }
  | {
      paragraph: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "quote"
      object?: "block"
    }
  | {
      to_do: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
        checked?: boolean
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "toggle"
      object?: "block"
    }
  | {
      template: {
        rich_text: Array<RichTextItemRequest>
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "template"
      object?: "block"
    }
  | {
      callout: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
        icon?: PageIconRequest
      }
      type?: "callout"
      object?: "block"
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
        children?: Array<BlockObjectWithSingleLevelOfChildrenRequest>
      }
      type?: "synced_block"
      object?: "block"
    }

export type BlockObjectRequestWithoutChildren =
  | {
      embed: MediaContentWithUrlAndCaptionRequest
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: MediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: MediaContentWithFileAndCaptionRequest
      type?: "image"
      object?: "block"
    }
  | {
      video: MediaContentWithFileAndCaptionRequest
      type?: "video"
      object?: "block"
    }
  | {
      pdf: MediaContentWithFileAndCaptionRequest
      type?: "pdf"
      object?: "block"
    }
  | {
      file: MediaContentWithFileNameAndCaptionRequest
      type?: "file"
      object?: "block"
    }
  | {
      audio: MediaContentWithFileAndCaptionRequest
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        rich_text: Array<RichTextItemRequest>
        language: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      object?: "block"
    }
  | {
      equation: ContentWithExpressionRequest
      type?: "equation"
      object?: "block"
    }
  | { divider: EmptyObject; type?: "divider"; object?: "block" }
  | { breadcrumb: EmptyObject; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      object?: "block"
    }
  | {
      table_row: ContentWithTableRowRequest
      type?: "table_row"
      object?: "block"
    }
  | {
      heading_1: HeaderContentWithRichTextAndColorRequest
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: HeaderContentWithRichTextAndColorRequest
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: HeaderContentWithRichTextAndColorRequest
      type?: "heading_3"
      object?: "block"
    }
  | {
      paragraph: ContentWithRichTextAndColorRequest
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: ContentWithRichTextAndColorRequest
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: ContentWithRichTextAndColorRequest
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: ContentWithRichTextAndColorRequest
      type?: "quote"
      object?: "block"
    }
  | {
      to_do: {
        rich_text: Array<RichTextItemRequest>
        checked?: boolean
        color?: ApiColor
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: ContentWithRichTextAndColorRequest
      type?: "toggle"
      object?: "block"
    }
  | {
      template: ContentWithRichTextRequest
      type?: "template"
      object?: "block"
    }
  | {
      callout: {
        rich_text: Array<RichTextItemRequest>
        icon?: PageIconRequest
        color?: ApiColor
      }
      type?: "callout"
      object?: "block"
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
      }
      type?: "synced_block"
      object?: "block"
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

type BlockObjectWithSingleLevelOfChildrenRequest =
  | {
      embed: MediaContentWithUrlAndCaptionRequest
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: MediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: MediaContentWithFileAndCaptionRequest
      type?: "image"
      object?: "block"
    }
  | {
      video: MediaContentWithFileAndCaptionRequest
      type?: "video"
      object?: "block"
    }
  | {
      pdf: MediaContentWithFileAndCaptionRequest
      type?: "pdf"
      object?: "block"
    }
  | {
      file: MediaContentWithFileNameAndCaptionRequest
      type?: "file"
      object?: "block"
    }
  | {
      audio: MediaContentWithFileAndCaptionRequest
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        rich_text: Array<RichTextItemRequest>
        language: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      object?: "block"
    }
  | {
      equation: ContentWithExpressionRequest
      type?: "equation"
      object?: "block"
    }
  | { divider: EmptyObject; type?: "divider"; object?: "block" }
  | { breadcrumb: EmptyObject; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      object?: "block"
    }
  | {
      table_row: ContentWithTableRowRequest
      type?: "table_row"
      object?: "block"
    }
  | {
      heading_1: HeaderContentWithSingleLevelOfChildrenRequest
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: HeaderContentWithSingleLevelOfChildrenRequest
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: HeaderContentWithSingleLevelOfChildrenRequest
      type?: "heading_3"
      object?: "block"
    }
  | {
      paragraph: ContentWithSingleLevelOfChildrenRequest
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: ContentWithSingleLevelOfChildrenRequest
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: ContentWithSingleLevelOfChildrenRequest
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: ContentWithSingleLevelOfChildrenRequest
      type?: "quote"
      object?: "block"
    }
  | {
      table: TableRequestWithTableRowChildren
      type?: "table"
      object?: "block"
    }
  | {
      to_do: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectRequestWithoutChildren>
        checked?: boolean
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: ContentWithSingleLevelOfChildrenRequest
      type?: "toggle"
      object?: "block"
    }
  | {
      template: {
        rich_text: Array<RichTextItemRequest>
        children?: Array<BlockObjectRequestWithoutChildren>
      }
      type?: "template"
      object?: "block"
    }
  | {
      callout: {
        rich_text: Array<RichTextItemRequest>
        color?: ApiColor
        children?: Array<BlockObjectRequestWithoutChildren>
        icon?: PageIconRequest
      }
      type?: "callout"
      object?: "block"
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
        children?: Array<BlockObjectRequestWithoutChildren>
      }
      type?: "synced_block"
      object?: "block"
    }

type BoardViewConfigRequest = {
  // The view type. Must be "board".
  type: "board"
  // Group-by configuration for board columns.
  group_by: GroupByConfigRequest
  // Secondary group-by configuration for sub-grouping within columns. Pass null to remove
  // sub-grouping.
  sub_group_by?: GroupByConfigRequest | null
  // Property visibility and display configuration on cards. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
  // Cover image configuration for cards. Pass null to clear.
  cover?: CoverConfigRequest | null
  // Size of the cover image on cards. Pass null to clear.
  cover_size?: "small" | "medium" | "large" | null
  // Aspect ratio mode for cover images. "contain" fits the image, "cover" fills the area.
  // Pass null to clear.
  cover_aspect?: "contain" | "cover" | null
  // Card layout mode. "list" shows full cards, "compact" shows condensed cards. Pass null
  // to clear.
  card_layout?: "list" | "compact" | null
}

type BoardViewConfigResponse = {
  // The view configuration type.
  type: "board"
  // Column (horizontal) grouping - required for board view.
  group_by: GroupByConfigResponse
  // Sub-grouping (vertical swimlanes within columns).
  sub_group_by?: GroupByConfigResponse
  // Properties to display on each card.
  properties?: Array<ViewPropertyConfigResponse>
  // Card cover/preview image configuration.
  cover?: CoverConfigResponse
  // Cover image size.
  cover_size?: "small" | "medium" | "large"
  // Cover image aspect ratio.
  cover_aspect?: "contain" | "cover"
  // Card layout mode (list shows all properties, compact shows inline).
  card_layout?: "list" | "compact"
}

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

type BooleanFormulaPropertyResponse = {
  type: "boolean"
  boolean: boolean | null
}

type BooleanFormulaPropertyValueResponse = {
  // Always `boolean`
  type: "boolean"
  boolean: boolean | null
}

type BotInfoResponse = {
  // Details about the owner of the bot.
  owner:
    | {
        // Always `user`
        type: "user"
        // Details about the owner of the bot, when the `type` of the owner is `user`. This means
        // the bot is for a integration.
        user:
          | {
              // The ID of the user.
              id: IdResponse
              // The user object type name.
              object: "user"
              // The name of the user.
              name: string | null
              // The avatar URL of the user.
              avatar_url: string | null
              // The type of the user.
              type: "person"
              // The person info of the user.
              person: {
                // The email of the person.
                email?: string
              }
            }
          | PartialUserObjectResponse
      }
    | {
        // Always `workspace`
        type: "workspace"
        // Details about the owner of the bot, when the `type` of the owner is `workspace`. This
        // means the bot is for an internal integration.
        workspace: true
      }
  // The ID of the bot's workspace.
  workspace_id: string
  // Limits and restrictions that apply to the bot's workspace
  workspace_limits: {
    // The maximum allowable size of a file upload, in bytes
    max_file_upload_size_in_bytes: number
  }
  // The name of the bot's workspace.
  workspace_name: string | null
}

export type BotUserObjectResponse = {
  // Indicates this user is a bot.
  type: "bot"
  // Details about the bot, when the `type` of the user is `bot`.
  bot: EmptyObject | BotInfoResponse
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

type ButtonPropertyConfigurationRequest = {
  // Always `button`
  type?: "button"
  button: EmptyObject
}

export type ButtonPropertyItemObjectResponse = {
  type: "button"
  button: EmptyObject
  object: "property_item"
  id: string
}

type ButtonSimplePropertyValueResponse = {
  // Always `button`
  type: "button"
  button: EmptyObject
}

type CalendarViewConfigRequest = {
  // The view type. Must be "calendar".
  type: "calendar"
  // Property ID of the date property used to position items on the calendar.
  date_property_id: string
  // Property visibility and display configuration on calendar cards. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
  // Default calendar range. "week" shows a week view, "month" shows a month view. Pass
  // null to clear.
  view_range?: "week" | "month" | null
  // Whether to show weekend days. Pass null to clear.
  show_weekends?: boolean | null
}

type CalendarViewConfigResponse = {
  // The view configuration type.
  type: "calendar"
  // Date property used to position items on the calendar - required.
  date_property_id: string
  // Date property name (convenience field).
  date_property_name?: string
  // Properties to display on calendar event cards.
  properties?: Array<ViewPropertyConfigResponse>
  // Calendar view range.
  view_range?: "week" | "month"
  // Whether to show weekend days.
  show_weekends?: boolean
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

type CheckboxDatabasePropertyConfigResponse = {
  // Always `checkbox`
  type: "checkbox"
  checkbox: EmptyObject
}

type CheckboxGroupByConfigRequest = {
  // The property type for grouping.
  type: "checkbox"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type CheckboxGroupByConfigResponse = {
  // The property type for grouping.
  type: "checkbox"
  // Property ID to group by.
  property_id: string
  // Sort order for groups (only manual for checkbox).
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type CheckboxPropertyConfigurationRequest = {
  // Always `checkbox`
  type?: "checkbox"
  checkbox: EmptyObject
}

type CheckboxPropertyFilter = { equals: boolean } | { does_not_equal: boolean }

export type CheckboxPropertyItemObjectResponse = {
  type: "checkbox"
  checkbox: boolean
  object: "property_item"
  id: string
}

type CheckboxSimplePropertyValueResponse = {
  // Always `checkbox`
  type: "checkbox"
  checkbox: boolean
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

type ColumnBlockWithChildrenRequest = {
  column: ColumnWithChildrenRequest
  type?: "column"
  object?: "block"
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

type ColumnListRequest = { children: Array<ColumnBlockWithChildrenRequest> }

type ColumnResponse = {
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
}

type ColumnWithChildrenRequest = {
  children: Array<BlockObjectWithSingleLevelOfChildrenRequest>
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
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

type ContentPositionSchema =
  | { type: "after_block"; after_block: { id: IdRequest } }
  | { type: "start" }
  | { type: "end" }

type ContentWithExpressionRequest = { expression: string }

type ContentWithRichTextAndColorAndListResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
  list_start_index?: number
  list_format?: NumberedListFormat
}

type ContentWithRichTextAndColorRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
}

type ContentWithRichTextAndColorResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
}

type ContentWithRichTextRequest = { rich_text: Array<RichTextItemRequest> }

type ContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  children?: Array<BlockObjectRequestWithoutChildren>
}

type ContentWithTableResponse = {
  has_column_header: boolean
  has_row_header: boolean
  table_width: number
}

type ContentWithTableRowRequest = { cells: Array<Array<RichTextItemRequest>> }

type ContentWithTableRowResponse = { cells: Array<Array<RichTextItemResponse>> }

type CoverConfigRequest = {
  // Source of the cover image.
  type: "page_cover" | "page_content" | "property"
  // Property ID when type is "property".
  property_id?: string
}

type CoverConfigResponse = {
  // Source of the cover image.
  type: "page_cover" | "page_content" | "page_content_first" | "property"
  // Property ID when type is "property".
  property_id?: string
}

type CreateViewQueryRequest = {
  // The number of results to return per page. Maximum: 100
  page_size?: number
}

type CreateViewRequest = {
  // The ID of the data source this view should be scoped to.
  data_source_id: string
  // The name of the view.
  name: string
  // The type of view to create.
  type: ViewTypeRequest
  // The ID of the database to create a view in. Mutually exclusive with view_id.
  database_id?: IdRequest
  // The ID of a dashboard view to add this view to as a widget. Mutually exclusive with
  // database_id.
  view_id?: IdRequest
  // Filter to apply to the view. Uses the same format as the data source query filter.
  filter?: ViewFilterRequest
  // Sorts to apply to the view. Uses the same format as the data source query sorts.
  sorts?: ViewSortsRequest
  // View presentation configuration. The type field must match the view type.
  configuration?: ViewConfigRequest
}

type CreatedByDatabasePropertyConfigResponse = {
  // Always `created_by`
  type: "created_by"
  created_by: EmptyObject
}

type CreatedByPropertyConfigurationRequest = {
  // Always `created_by`
  type?: "created_by"
  created_by: EmptyObject
}

export type CreatedByPropertyItemObjectResponse = {
  type: "created_by"
  created_by: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

type CreatedBySimplePropertyValueResponse = {
  // Always `created_by`
  type: "created_by"
  created_by: UserValueResponse
}

type CreatedTimeDatabasePropertyConfigResponse = {
  // Always `created_time`
  type: "created_time"
  created_time: EmptyObject
}

type CreatedTimePropertyConfigurationRequest = {
  // Always `created_time`
  type?: "created_time"
  created_time: EmptyObject
}

export type CreatedTimePropertyItemObjectResponse = {
  type: "created_time"
  created_time: string
  object: "property_item"
  id: string
}

type CreatedTimeSimplePropertyValueResponse = {
  // Always `created_time`
  type: "created_time"
  created_time: string
}

type CustomEmojiPageIconRequest = {
  // Always `custom_emoji`
  type?: "custom_emoji"
  custom_emoji: {
    // The ID of the custom emoji.
    id: IdRequest
    // The name of the custom emoji.
    name?: string
    // The URL of the custom emoji.
    url?: string
  }
}

type CustomEmojiPageIconResponse = {
  // Type of icon. In this case, a custom emoji.
  type: "custom_emoji"
  // The custom emoji details for the icon.
  custom_emoji: CustomEmojiResponse
}

type CustomEmojiResponse = {
  // The ID of the custom emoji.
  id: IdResponse
  // The name of the custom emoji.
  name: string
  // The URL of the custom emoji.
  url: string
}

type DashboardRowResponse = {
  // The ID of this row module.
  id: string
  // The widget modules within this row.
  widgets: Array<DashboardWidgetResponse>
  // Fixed height of the row in pixels.
  height?: number
}

type DashboardViewConfigResponse = {
  // The view configuration type.
  type: "dashboard"
  // The rows that make up the dashboard layout. Each row contains one or more widget
  // modules.
  rows: Array<DashboardRowResponse>
}

type DashboardWidgetResponse = {
  // The ID of this widget module.
  id: string
  // The ID of the collection view rendered by this widget.
  view_id: string
  // Width of the widget in a 12-column grid (1-12). 12 means full width.
  width?: number
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

type DataSourceParentResponse = {
  // The parent type.
  type: "data_source_id"
  // The ID of the parent data source.
  data_source_id: IdResponse
  // The ID of the data source's parent database.
  database_id: IdResponse
}

type DataSourceReferenceResponse = {
  // The ID of the data source.
  id: IdResponse
  // The name of the data source.
  name: string
}

type DataSourceViewObjectResponse = {
  // The object type name.
  object: "view"
  // The ID of the view.
  id: IdResponse
  // The parent database of the view.
  parent: DatabaseParentResponse
  // The name of the view.
  name: string
  // The view type.
  type:
    | "table"
    | "board"
    | "list"
    | "calendar"
    | "timeline"
    | "gallery"
    | "form"
    | "chart"
    | "map"
    | "dashboard"
  // The time when the view was created.
  created_time: string
  // The time when the view was last edited.
  last_edited_time: string
  // Canonical deep link to the view in Notion.
  url: string
  // The ID of the data source this view is scoped to, or null for dashboard views.
  data_source_id?: string | null
  // The user who created the view, or null if not available.
  created_by?: PartialUserObjectResponse | null
  // The user who last edited the view, or null if not available.
  last_edited_by?: PartialUserObjectResponse | null
  // The filter applied to this view (same shape as data source query filter).
  filter?: ViewFilterResponse | null
  // The sorts applied to this view (same shape as data source query sorts).
  sorts?: Array<ViewSortResponse> | null
  // View presentation configuration.
  configuration?: ViewConfigResponse | null
  // For dashboard widget views, the ID of the parent dashboard view. Only present when
  // this view is a widget inside a dashboard.
  dashboard_view_id?: string
}

type DataSourceViewReferenceResponse = {
  // The object type name.
  object: "view"
  // The ID of the view.
  id: IdResponse
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

type DatabaseParentResponse = {
  // The parent type.
  type: "database_id"
  // The ID of the parent database.
  database_id: IdResponse
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

type DateFormulaPropertyResponse = { type: "date"; date: DateResponse | null }

type DateFormulaPropertyValueResponse = {
  // Always `date`
  type: "date"
  date: DateResponse | null
}

type DateGroupByConfigRequest = {
  // The property type for grouping.
  type: "date" | "created_time" | "last_edited_time"
  // Property ID to group by.
  property_id: string
  // Granularity for date grouping.
  group_by: "relative" | "day" | "week" | "month" | "year"
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
  // Start day of week for week grouping (0 = Sunday, 1 = Monday).
  start_day_of_week?: 0 | 1
}

type DateGroupByConfigResponse = {
  // The property type for grouping.
  type: "date" | "created_time" | "last_edited_time"
  // Property ID to group by.
  property_id: string
  // Granularity for date grouping.
  group_by: "relative" | "day" | "week" | "month" | "year"
  // Sort order for groups (no manual sort for dates).
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
  // Start day of week for week grouping (0 = Sunday, 1 = Monday).
  start_day_of_week?: 0 | 1
}

type DatePartialRollupValueResponse = {
  // Always `date`
  type: "date"
  date: DateResponse | null
}

type DatePropertyConfigurationRequest = {
  // Always `date`
  type?: "date"
  date: EmptyObject
}

type DatePropertyFilter =
  | { equals: string }
  | { before: string }
  | { after: string }
  | { on_or_before: string }
  | { on_or_after: string }
  | { this_week: EmptyObject }
  | { past_week: EmptyObject }
  | { past_month: EmptyObject }
  | { past_year: EmptyObject }
  | { next_week: EmptyObject }
  | { next_month: EmptyObject }
  | { next_year: EmptyObject }
  | ExistencePropertyFilter

export type DatePropertyItemObjectResponse = {
  type: "date"
  date: DateResponse | null
  object: "property_item"
  id: string
}

type DateRequest = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end?: string | null
  // The time zone of the date object, if any. E.g. America/Los_Angeles, Europe/London,
  // etc.
  time_zone?: TimeZoneRequest | null
}

type DateResponse = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end: string | null
  // The time zone of the date object.
  time_zone: TimeZoneRequest | null
}

type DateSimplePropertyValueResponse = {
  // Always `date`
  type: "date"
  date: DateResponse | null
}

type DeletedViewQueryResponse = {
  // The object type.
  object: "view_query"
  // The ID of the deleted view query.
  id: IdResponse
  // Whether the view query was deleted.
  deleted: boolean
}

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

type EmailPropertyConfigurationRequest = {
  // Always `email`
  type?: "email"
  email: EmptyObject
}

export type EmailPropertyItemObjectResponse = {
  type: "email"
  email: string | null
  object: "property_item"
  id: string
}

type EmailSimplePropertyValueResponse = {
  // Always `email`
  type: "email"
  email: string | null
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

type EmojiPageIconRequest = {
  // Always `emoji`
  type?: "emoji"
  // An emoji character.
  emoji: EmojiRequest
}

type EmojiPageIconResponse = {
  // Type of icon. In this case, an emoji.
  type: "emoji"
  // The emoji character used as the icon.
  emoji: EmojiRequest
}

type EmojiRequest = string

type EmptyObject = Record<string, never>

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

type EquationRichTextItemRequest = {
  // Always `equation`
  type?: "equation"
  // Notion supports inline LaTeX equations as rich text objects with a type value of
  // `equation`.
  equation: {
    // A KaTeX compatible string.
    expression: string
  }
}

export type EquationRichTextItemResponse = {
  // Always `equation`
  type: "equation"
  // Notion supports inline LaTeX equations as rich text objects with a type value of
  // `equation`.
  equation: {
    // A KaTeX compatible string.
    expression: string
  }
}

type ExistencePropertyFilter = { is_empty: true } | { is_not_empty: true }

type ExpressionObjectResponse = { expression: string }

type ExternalFileRequest = { url: TextRequest }

type ExternalInternalOrExternalFileWithNameResponse = {
  // Type of attachment. In this case, an external URL.
  type: "external"
  // The external URL.
  external: {
    // The URL of the external file or resource.
    url: string
  }
}

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

type ExternalPageCoverRequest = {
  // Always `external`
  type?: "external"
  // External URL for the cover.
  external: {
    // The URL of the external file.
    url: string
  }
}

type ExternalPageCoverResponse = {
  // Type of cover. In this case, an external URL.
  type: "external"
  // The external URL for the cover.
  external: {
    // The URL of the external file or resource.
    url: string
  }
}

type ExternalPageIconRequest = {
  // Always `external`
  type?: "external"
  external: {
    // The URL of the external file.
    url: string
  }
}

type ExternalPageIconResponse = {
  // Type of icon. In this case, an external URL.
  type: "external"
  // The external URL for the icon.
  external: {
    // The URL of the external file or resource.
    url: string
  }
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

type FileInternalOrExternalFileWithNameResponse = {
  // Type of attachment. In this case, a file uploaded to a Notion workspace.
  type: "file"
  // The file URL.
  file: InternalFileResponse
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

type FilePageCoverResponse = {
  // Type of cover. In this case, a file.
  type: "file"
  // The file URL for the cover.
  file: InternalFileResponse
}

type FilePageIconResponse = {
  // Type of icon. In this case, a file.
  type: "file"
  // The file URL for the icon.
  file: InternalFileResponse
}

type FileUploadIdRequest = { id: IdRequest }

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

type FileUploadPageCoverRequest = {
  // Always `file_upload`
  type?: "file_upload"
  // The file upload for the cover.
  file_upload: {
    // ID of a FileUpload object that has the status `uploaded`.
    id: string
  }
}

type FileUploadPageIconRequest = {
  // Always `file_upload`
  type?: "file_upload"
  file_upload: {
    // ID of a FileUpload object that has the status `uploaded`.
    id: string
  }
}

type FileUploadWithOptionalNameRequest = {
  file_upload: FileUploadIdRequest
  type?: "file_upload"
  name?: StringRequest
}

type FilesDatabasePropertyConfigResponse = {
  // Always `files`
  type: "files"
  files: EmptyObject
}

type FilesPropertyConfigurationRequest = {
  // Always `files`
  type?: "files"
  files: EmptyObject
}

export type FilesPropertyItemObjectResponse = {
  type: "files"
  files: Array<InternalOrExternalFileWithNameResponse>
  object: "property_item"
  id: string
}

type FilesSimplePropertyValueResponse = {
  // Always `files`
  type: "files"
  files: Array<InternalOrExternalFileWithNameResponse>
}

type FormulaCheckboxSubGroupByRequest = {
  // The formula result type for grouping.
  type: "checkbox"
  // Sort order for groups.
  sort: GroupSortRequest
}

type FormulaCheckboxSubGroupByResponse = {
  // The formula result type for grouping.
  type: "checkbox"
  // Sort order for groups (only manual for checkbox).
  sort: GroupSortResponse
}

type FormulaDatabasePropertyConfigResponse = {
  // Always `formula`
  type: "formula"
  formula: { expression: string }
}

type FormulaDateSubGroupByRequest = {
  // The formula result type for grouping.
  type: "date"
  // Granularity for date grouping.
  group_by: "relative" | "day" | "week" | "month" | "year"
  // Sort order for groups.
  sort: GroupSortRequest
  // Start day of week for week grouping (0 = Sunday, 1 = Monday).
  start_day_of_week?: 0 | 1
}

type FormulaDateSubGroupByResponse = {
  // The formula result type for grouping.
  type: "date"
  // Granularity for date grouping.
  group_by: "relative" | "day" | "week" | "month" | "year"
  // Sort order for groups.
  sort: GroupSortResponse
  // Start day of week for week grouping (0 = Sunday, 1 = Monday).
  start_day_of_week?: 0 | 1
}

type FormulaGroupByConfigRequest = {
  // The property type for grouping.
  type: "formula"
  // Property ID of the formula to group by.
  property_id: string
  // Sub-group-by configuration based on the formula result type.
  group_by:
    | FormulaDateSubGroupByRequest
    | FormulaTextSubGroupByRequest
    | FormulaNumberSubGroupByRequest
    | FormulaCheckboxSubGroupByRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type FormulaGroupByConfigResponse = {
  // The property type for grouping.
  type: "formula"
  // Property ID of the formula to group by.
  property_id: string
  // Sub-group-by configuration based on the formula result type.
  group_by: FormulaSubGroupByResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type FormulaNumberSubGroupByRequest = {
  // The formula result type for grouping.
  type: "number"
  // Sort order for groups.
  sort: GroupSortRequest
  // Start of the range for number grouping buckets.
  range_start?: number
  // End of the range for number grouping buckets.
  range_end?: number
  // Size of each bucket in number grouping.
  range_size?: number
}

type FormulaNumberSubGroupByResponse = {
  // The formula result type for grouping.
  type: "number"
  // Sort order for groups (ascending or descending only).
  sort: GroupSortResponse
  // Start of the range for number grouping buckets.
  range_start?: number
  // End of the range for number grouping buckets.
  range_end?: number
  // Size of each bucket in number grouping.
  range_size?: number
}

type FormulaPropertyConfigurationRequest = {
  // Always `formula`
  type?: "formula"
  formula: { expression?: string }
}

type FormulaPropertyFilter =
  | { string: TextPropertyFilter }
  | { checkbox: CheckboxPropertyFilter }
  | { number: NumberPropertyFilter }
  | { date: DatePropertyFilter }

export type FormulaPropertyItemObjectResponse = {
  type: "formula"
  formula: FormulaPropertyResponse
  object: "property_item"
  id: string
}

type FormulaPropertyResponse =
  | StringFormulaPropertyResponse
  | DateFormulaPropertyResponse
  | NumberFormulaPropertyResponse
  | BooleanFormulaPropertyResponse

type FormulaPropertyValueResponse =
  | BooleanFormulaPropertyValueResponse
  | DateFormulaPropertyValueResponse
  | NumberFormulaPropertyValueResponse
  | StringFormulaPropertyValueResponse

type FormulaSimplePropertyValueResponse = {
  // Always `formula`
  type: "formula"
  formula: FormulaPropertyValueResponse
}

/**
 * Sub-group-by configuration for formula properties based on result type.
 */
type FormulaSubGroupByResponse =
  | FormulaDateSubGroupByResponse
  | FormulaTextSubGroupByResponse
  | FormulaNumberSubGroupByResponse
  | FormulaCheckboxSubGroupByResponse

type FormulaTextSubGroupByRequest = {
  // The formula result type for grouping.
  type: "text"
  // How to group text values. "exact" = exact match, "alphabet_prefix" = first letter.
  group_by: "exact" | "alphabet_prefix"
  // Sort order for groups.
  sort: GroupSortRequest
}

type FormulaTextSubGroupByResponse = {
  // The formula result type for grouping.
  type: "text"
  // How to group text values. "exact" = exact match, "alphabet_prefix" = first letter.
  group_by: "exact" | "alphabet_prefix"
  // Sort order for groups.
  sort: GroupSortResponse
}

type GalleryViewConfigRequest = {
  // The view type. Must be "gallery".
  type: "gallery"
  // Property visibility and display configuration on gallery cards. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
  // Cover image configuration for cards. Pass null to clear.
  cover?: CoverConfigRequest | null
  // Size of the cover image on cards. Pass null to clear.
  cover_size?: "small" | "medium" | "large" | null
  // Aspect ratio mode for cover images. "contain" fits the image, "cover" fills the area.
  // Pass null to clear.
  cover_aspect?: "contain" | "cover" | null
  // Card layout mode. "list" shows full cards, "compact" shows condensed cards. Pass null
  // to clear.
  card_layout?: "list" | "compact" | null
}

type GalleryViewConfigResponse = {
  // The view configuration type.
  type: "gallery"
  // Properties to display on gallery cards.
  properties?: Array<ViewPropertyConfigResponse>
  // Card cover/preview image configuration.
  cover?: CoverConfigResponse
  // Cover image size.
  cover_size?: "small" | "medium" | "large"
  // Cover image aspect ratio.
  cover_aspect?: "contain" | "cover"
  // Card layout mode (list shows all properties, compact shows inline).
  card_layout?: "list" | "compact"
}

type GetViewQueryResultsRequest = {
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided.
  start_cursor?: string
  // The number of results to return per page. Maximum: 100
  page_size?: number
}

/**
 * Group-by configuration based on property type.
 */
type GroupByConfigRequest =
  | SelectGroupByConfigRequest
  | StatusGroupByConfigRequest
  | PersonGroupByConfigRequest
  | RelationGroupByConfigRequest
  | DateGroupByConfigRequest
  | TextGroupByConfigRequest
  | NumberGroupByConfigRequest
  | CheckboxGroupByConfigRequest
  | FormulaGroupByConfigRequest

/**
 * Group-by configuration based on property type.
 */
type GroupByConfigResponse =
  | SelectGroupByConfigResponse
  | StatusGroupByConfigResponse
  | PersonGroupByConfigResponse
  | RelationGroupByConfigResponse
  | DateGroupByConfigResponse
  | TextGroupByConfigResponse
  | NumberGroupByConfigResponse
  | CheckboxGroupByConfigResponse
  | FormulaGroupByConfigResponse

type GroupFilterOperatorArray = Array<
  | PropertyOrTimestampFilter
  | { or: PropertyOrTimestampFilterArray }
  | { and: PropertyOrTimestampFilterArray }
>

type GroupObjectRequest = {
  id: IdRequest
  name?: string | null
  object?: "group"
}

export type GroupObjectResponse = {
  // The ID of the group.
  id: IdResponse
  // The group object type name.
  object: "group"
  // The name of the group.
  name: string | null
}

type GroupSortRequest = {
  // Sort direction for groups.
  type: "manual" | "ascending" | "descending"
}

type GroupSortResponse = {
  // Sort direction for groups.
  type: "manual" | "ascending" | "descending"
}

type HeaderContentWithRichTextAndColorRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
}

type HeaderContentWithRichTextAndColorResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
  is_toggleable: boolean
}

type HeaderContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
  children?: Array<BlockObjectRequestWithoutChildren>
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

type IdObjectResponse = { id: string }

type IdRequest = string

type IdResponse = string

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

type InitialDataSourceRequest = {
  // Property schema for the initial data source, if you'd like to create one.
  properties?: Record<string, PropertyConfigurationRequest>
}

type InternalFileRequest = { url: string; expiry_time?: string }

type InternalFileResponse = {
  // The URL of the file.
  url: string
  // The time when the URL will expire.
  expiry_time: string
}

type InternalOrExternalFileWithNameRequest =
  | { file: InternalFileRequest; name: StringRequest; type?: "file" }
  | { external: ExternalFileRequest; name: StringRequest; type?: "external" }

type InternalOrExternalFileWithNameResponse =
  InternalOrExternalFileWithNameResponseCommon &
    (
      | FileInternalOrExternalFileWithNameResponse
      | ExternalInternalOrExternalFileWithNameResponse
    )

type InternalOrExternalFileWithNameResponseCommon = {
  // The name of the file.
  name: string
}

type LanguageRequest =
  | "abap"
  | "abc"
  | "agda"
  | "arduino"
  | "ascii art"
  | "assembly"
  | "bash"
  | "basic"
  | "bnf"
  | "c"
  | "c#"
  | "c++"
  | "clojure"
  | "coffeescript"
  | "coq"
  | "css"
  | "dart"
  | "dhall"
  | "diff"
  | "docker"
  | "ebnf"
  | "elixir"
  | "elm"
  | "erlang"
  | "f#"
  | "flow"
  | "fortran"
  | "gherkin"
  | "glsl"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "hcl"
  | "html"
  | "idris"
  | "java"
  | "javascript"
  | "json"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "llvm ir"
  | "lua"
  | "makefile"
  | "markdown"
  | "markup"
  | "matlab"
  | "mathematica"
  | "mermaid"
  | "nix"
  | "notion formula"
  | "objective-c"
  | "ocaml"
  | "pascal"
  | "perl"
  | "php"
  | "plain text"
  | "powershell"
  | "prolog"
  | "protobuf"
  | "purescript"
  | "python"
  | "r"
  | "racket"
  | "reason"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "scss"
  | "shell"
  | "smalltalk"
  | "solidity"
  | "sql"
  | "swift"
  | "toml"
  | "typescript"
  | "vb.net"
  | "verilog"
  | "vhdl"
  | "visual basic"
  | "webassembly"
  | "xml"
  | "yaml"
  | "java/c/c++/c#"

type LastEditedByDatabasePropertyConfigResponse = {
  // Always `last_edited_by`
  type: "last_edited_by"
  last_edited_by: EmptyObject
}

type LastEditedByPropertyConfigurationRequest = {
  // Always `last_edited_by`
  type?: "last_edited_by"
  last_edited_by: EmptyObject
}

export type LastEditedByPropertyItemObjectResponse = {
  type: "last_edited_by"
  last_edited_by: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

type LastEditedBySimplePropertyValueResponse = {
  // Always `last_edited_by`
  type: "last_edited_by"
  last_edited_by: UserValueResponse
}

type LastEditedTimeDatabasePropertyConfigResponse = {
  // Always `last_edited_time`
  type: "last_edited_time"
  last_edited_time: EmptyObject
}

type LastEditedTimePropertyConfigurationRequest = {
  // Always `last_edited_time`
  type?: "last_edited_time"
  last_edited_time: EmptyObject
}

export type LastEditedTimePropertyItemObjectResponse = {
  type: "last_edited_time"
  last_edited_time: string
  object: "property_item"
  id: string
}

type LastEditedTimeSimplePropertyValueResponse = {
  // Always `last_edited_time`
  type: "last_edited_time"
  last_edited_time: string
}

type LastVisitedTimePropertyConfigurationRequest = {
  // Always `last_visited_time`
  type?: "last_visited_time"
  last_visited_time: EmptyObject
}

type LinkMentionResponse = {
  // The href of the link mention.
  href: string
  // The title of the link.
  title?: string
  // The description of the link.
  description?: string
  // The author of the link.
  link_author?: string
  // The provider of the link.
  link_provider?: string
  // The thumbnail URL of the link.
  thumbnail_url?: string
  // The icon URL of the link.
  icon_url?: string
  // The iframe URL of the link.
  iframe_url?: string
  // The height of the link preview iframe.
  height?: number
  // The padding of the link preview iframe.
  padding?: number
  // The top padding of the link preview iframe.
  padding_top?: number
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

type LinkPreviewMentionResponse = {
  // The URL of the link preview mention.
  url: string
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

type ListViewConfigRequest = {
  // The view type. Must be "list".
  type: "list"
  // Property visibility and display configuration. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
}

type ListViewConfigResponse = {
  // The view configuration type.
  type: "list"
  // Properties to display in list items.
  properties?: Array<ViewPropertyConfigResponse>
}

type LocationPropertyConfigurationRequest = {
  // Always `location`
  type?: "location"
  location: EmptyObject
}

type MediaContentWithFileAndCaptionRequest =
  | {
      external: ExternalFileRequest
      type?: "external"
      caption?: Array<RichTextItemRequest>
    }
  | {
      file_upload: FileUploadIdRequest
      type?: "file_upload"
      caption?: Array<RichTextItemRequest>
    }

type MediaContentWithFileAndCaptionResponse =
  | ExternalMediaContentWithFileAndCaptionResponse
  | FileMediaContentWithFileAndCaptionResponse

type MediaContentWithFileNameAndCaptionRequest =
  | {
      external: ExternalFileRequest
      type?: "external"
      caption?: Array<RichTextItemRequest>
      name?: StringRequest
    }
  | {
      file_upload: FileUploadIdRequest
      type?: "file_upload"
      caption?: Array<RichTextItemRequest>
      name?: StringRequest
    }

type MediaContentWithFileNameAndCaptionResponse =
  | ExternalMediaContentWithFileNameAndCaptionResponse
  | FileMediaContentWithFileNameAndCaptionResponse

type MediaContentWithUrlAndCaptionRequest = {
  url: string
  caption?: Array<RichTextItemRequest>
}

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

type MentionRichTextItemRequest = {
  // Always `mention`
  type?: "mention"
  // Mention objects represent an inline mention of a database, date, link preview mention,
  // page, template mention, or user. A mention is created in the Notion UI when a user
  // types `@` followed by the name of the reference.
  mention:
    | {
        // Always `user`
        type?: "user"
        // Details of the user mention.
        user: PartialUserObjectRequest
      }
    | {
        // Always `date`
        type?: "date"
        // Details of the date mention.
        date: DateRequest
      }
    | {
        // Always `page`
        type?: "page"
        // Details of the page mention.
        page: {
          // The ID of the page in the mention.
          id: IdRequest
        }
      }
    | {
        // Always `database`
        type?: "database"
        // Details of the database mention.
        database: {
          // The ID of the database in the mention.
          id: IdRequest
        }
      }
    | {
        // Always `template_mention`
        type?: "template_mention"
        // Details of the template mention.
        template_mention: TemplateMentionRequest
      }
    | {
        // Always `custom_emoji`
        type?: "custom_emoji"
        // Details of the custom emoji mention.
        custom_emoji: {
          // The ID of the custom emoji.
          id: IdRequest
          // The name of the custom emoji.
          name?: string
          // The URL of the custom emoji.
          url?: string
        }
      }
}

export type MentionRichTextItemResponse = {
  // Always `mention`
  type: "mention"
  // Mention objects represent an inline mention of a database, date, link preview mention,
  // page, template mention, or user. A mention is created in the Notion UI when a user
  // types `@` followed by the name of the reference.
  mention:
    | {
        // Always `user`
        type: "user"
        // Details of the user mention.
        user: UserValueResponse
      }
    | {
        // Always `date`
        type: "date"
        // Details of the date mention.
        date: DateResponse
      }
    | {
        // Always `link_preview`
        type: "link_preview"
        // Details of the link preview mention.
        link_preview: LinkPreviewMentionResponse
      }
    | {
        // Always `link_mention`
        type: "link_mention"
        // Details of the link mention.
        link_mention: LinkMentionResponse
      }
    | {
        // Always `page`
        type: "page"
        // Details of the page mention.
        page: {
          // The ID of the page in the mention.
          id: IdResponse
        }
      }
    | {
        // Always `database`
        type: "database"
        // Details of the database mention.
        database: {
          // The ID of the database in the mention.
          id: IdResponse
        }
      }
    | {
        // Always `template_mention`
        type: "template_mention"
        // Details of the template mention.
        template_mention: TemplateMentionResponse
      }
    | {
        // Always `custom_emoji`
        type: "custom_emoji"
        // Details of the custom emoji mention.
        custom_emoji: CustomEmojiResponse
      }
}

type MultiSelectDatabasePropertyConfigResponse = {
  // Always `multi_select`
  type: "multi_select"
  multi_select: { options: Array<SelectPropertyResponse> }
}

type MultiSelectPropertyConfigurationRequest = {
  // Always `multi_select`
  type?: "multi_select"
  multi_select: {
    options?: Array<{
      name: string
      color?: SelectColor
      description?: string | null
    }>
  }
}

type MultiSelectPropertyFilter =
  | { contains: string }
  | { does_not_contain: string }
  | ExistencePropertyFilter

export type MultiSelectPropertyItemObjectResponse = {
  type: "multi_select"
  multi_select: Array<PartialSelectResponse>
  object: "property_item"
  id: string
}

type MultiSelectSimplePropertyValueResponse = {
  // Always `multi_select`
  type: "multi_select"
  multi_select: Array<PartialSelectPropertyValueResponse>
}

type NumberDatabasePropertyConfigResponse = {
  // Always `number`
  type: "number"
  number: {
    // The number format for the property.
    format: NumberFormat
  }
}

type NumberFormat = string

type NumberFormulaPropertyResponse = { type: "number"; number: number | null }

type NumberFormulaPropertyValueResponse = {
  // Always `number`
  type: "number"
  number: number | null
}

type NumberGroupByConfigRequest = {
  // The property type for grouping.
  type: "number"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
  // Start of the range for number grouping buckets.
  range_start?: number
  // End of the range for number grouping buckets.
  range_end?: number
  // Size of each bucket in number grouping.
  range_size?: number
}

type NumberGroupByConfigResponse = {
  // The property type for grouping.
  type: "number"
  // Property ID to group by.
  property_id: string
  // Sort order for groups (ascending or descending only).
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
  // Start of the range for number grouping buckets.
  range_start?: number
  // End of the range for number grouping buckets.
  range_end?: number
  // Size of each bucket in number grouping.
  range_size?: number
}

type NumberPartialRollupValueResponse = {
  // Always `number`
  type: "number"
  number: number | null
}

type NumberPropertyConfigurationRequest = {
  // Always `number`
  type?: "number"
  number: { format?: NumberFormat }
}

type NumberPropertyFilter =
  | { equals: number }
  | { does_not_equal: number }
  | { greater_than: number }
  | { less_than: number }
  | { greater_than_or_equal_to: number }
  | { less_than_or_equal_to: number }
  | ExistencePropertyFilter

export type NumberPropertyItemObjectResponse = {
  type: "number"
  number: number | null
  object: "property_item"
  id: string
}

type NumberSimplePropertyValueResponse = {
  // Always `number`
  type: "number"
  number: number | null
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

type PageCoverRequest = FileUploadPageCoverRequest | ExternalPageCoverRequest

type PageCoverResponse = FilePageCoverResponse | ExternalPageCoverResponse

type PageIconRequest =
  | FileUploadPageIconRequest
  | EmojiPageIconRequest
  | ExternalPageIconRequest
  | CustomEmojiPageIconRequest

type PageIconResponse =
  | EmojiPageIconResponse
  | FilePageIconResponse
  | ExternalPageIconResponse
  | CustomEmojiPageIconResponse

type PageIdCommentParentResponse = {
  // Always `page_id`
  type: "page_id"
  page_id: IdResponse
}

type PageIdParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "page_id"
  // The ID of the parent page.
  page_id: IdResponse
}

type PageMarkdownResponse = {
  // The type of object, always 'page_markdown'.
  object: "page_markdown"
  // The ID of the page or block.
  id: IdResponse
  // The page content rendered as enhanced Markdown.
  markdown: string
  // Whether the content was truncated due to exceeding the record count limit.
  truncated: boolean
  // Block IDs that could not be loaded (appeared as <unknown> tags in the markdown). Pass
  // these IDs back to this endpoint to fetch their content separately.
  unknown_block_ids: Array<IdResponse>
}

export type PageObjectResponse = {
  // The page object type name.
  object: "page"
  // The ID of the page.
  id: IdResponse
  // Date and time when this page was created.
  created_time: string
  // Date and time when this page was last edited.
  last_edited_time: string
  // Whether the page is in trash.
  in_trash: boolean
  /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
  archived: boolean
  // Whether the page is locked from editing in the Notion app UI.
  is_locked: boolean
  // The URL of the Notion page.
  url: string
  // The public URL of the Notion page, if it has been published to the web.
  public_url: string | null
  // Information about the page's parent.
  parent: ParentForBlockBasedObjectResponse
  // Property values of this page.
  properties: Record<string, PagePropertyValueWithIdResponse>
  // Page icon.
  icon: PageIconResponse | null
  // Page cover image.
  cover: PageCoverResponse | null
  // User who created the page.
  created_by: PartialUserObjectResponse
  // User who last edited the page.
  last_edited_by: PartialUserObjectResponse
}

type PagePositionSchema =
  | { type: "after_block"; after_block: { id: IdRequest } }
  | { type: "page_start" }
  | { type: "page_end" }

type PagePropertyValueWithIdResponse = IdObjectResponse &
  (SimpleOrArrayPropertyValueResponse | PartialRollupPropertyResponse)

type PageReferenceResponse = {
  // The object type.
  object: string
  // The object ID.
  id: IdResponse
}

export type ParagraphBlockObjectResponse = {
  type: "paragraph"
  paragraph: ContentWithRichTextAndColorResponse
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

type ParentForBlockBasedObjectResponse =
  | DatabaseParentResponse
  | DataSourceParentResponse
  | PageIdParentForBlockBasedObjectResponse
  | BlockIdParentForBlockBasedObjectResponse
  | WorkspaceParentForBlockBasedObjectResponse

type ParentOfDataSourceRequest = {
  // Always `database_id`
  type?: "database_id"
  // The ID of the parent database (with or without dashes), for example,
  // 195de9221179449fab8075a27c979105
  database_id: IdRequest
}

/**
 * The parent of the data source. This is typically a database (`database_id`), but for
 * externally synced data sources, can be another data source (`data_source_id`).
 */
type ParentOfDataSourceResponse =
  | DatabaseParentResponse
  | DataSourceParentResponse

type ParentOfDatabaseResponse =
  | PageIdParentForBlockBasedObjectResponse
  | WorkspaceParentForBlockBasedObjectResponse
  | DatabaseParentResponse
  | BlockIdParentForBlockBasedObjectResponse

export type PartialBlockObjectResponse = { object: "block"; id: string }

export type PartialCommentObjectResponse = {
  // The comment object type name.
  object: "comment"
  // The ID of the comment.
  id: IdResponse
}

export type PartialDataSourceObjectResponse = {
  // The data source object type name.
  object: "data_source"
  // The ID of the data source.
  id: IdResponse
  // The properties schema of the data source.
  properties: Record<string, DatabasePropertyConfigResponse>
}

type PartialDataSourceViewObjectResponse = {
  // The object type name.
  object: "view"
  // The ID of the view.
  id: IdResponse
  // The parent database of the view.
  parent: DatabaseParentResponse
  // The view type.
  type:
    | "table"
    | "board"
    | "list"
    | "calendar"
    | "timeline"
    | "gallery"
    | "form"
    | "chart"
    | "map"
    | "dashboard"
}

export type PartialDatabaseObjectResponse = {
  // The database object type name.
  object: "database"
  // The ID of the database.
  id: IdResponse
}

export type PartialPageObjectResponse = {
  // The page object type name.
  object: "page"
  // The ID of the page.
  id: IdResponse
}

type PartialRollupPropertyResponse = {
  // Always `rollup`
  type: "rollup"
  rollup: PartialRollupValueResponse
}

type PartialRollupValueResponse = PartialRollupValueResponseCommon &
  (
    | NumberPartialRollupValueResponse
    | DatePartialRollupValueResponse
    | ArrayPartialRollupValueResponse
  )

type PartialRollupValueResponseCommon = {
  // The function used for the rollup, e.g. count, count_values, percent_not_empty, max.
  function: RollupFunction
}

type PartialSelectPropertyValueResponse = {
  id: string
  name: string
  // One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`,
  // `pink`, `red`
  color:
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
}

type PartialSelectResponse = { id: string; name: string; color: SelectColor }

type PartialUserObjectRequest = {
  // The ID of the user.
  id: IdRequest
  // The user object type name.
  object?: "user"
}

export type PartialUserObjectResponse = {
  id: IdResponse
  // Always `user`
  object: "user"
}

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

type PeopleArrayBasedPropertyValueResponse = {
  // Always `people`
  type: "people"
  people: Array<UserValueResponse | GroupObjectResponse>
}

type PeopleDatabasePropertyConfigResponse = {
  // Always `people`
  type: "people"
  people: EmptyObject
}

type PeoplePropertyConfigurationRequest = {
  // Always `people`
  type?: "people"
  people: EmptyObject
}

type PeoplePropertyFilter =
  | { contains: IdRequest }
  | { does_not_contain: IdRequest }
  | ExistencePropertyFilter

export type PeoplePropertyItemObjectResponse = {
  type: "people"
  people: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

type PersonGroupByConfigRequest = {
  // The property type for grouping.
  type: "person" | "created_by" | "last_edited_by"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type PersonGroupByConfigResponse = {
  // The property type for grouping.
  type: "person" | "created_by" | "last_edited_by"
  // Property ID to group by.
  property_id: string
  // Sort order for groups (only manual supported).
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

export type PersonUserObjectResponse = {
  // Indicates this user is a person.
  type: "person"
  // Details about the person, when the `type` of the user is `person`.
  person: {
    // The email of the person.
    email?: string
  }
}

type PhoneNumberDatabasePropertyConfigResponse = {
  // Always `phone_number`
  type: "phone_number"
  phone_number: EmptyObject
}

type PhoneNumberPropertyConfigurationRequest = {
  // Always `phone_number`
  type?: "phone_number"
  phone_number: EmptyObject
}

export type PhoneNumberPropertyItemObjectResponse = {
  type: "phone_number"
  phone_number: string | null
  object: "property_item"
  id: string
}

type PhoneNumberSimplePropertyValueResponse = {
  // Always `phone_number`
  type: "phone_number"
  phone_number: string | null
}

type PlacePropertyConfigurationRequest = {
  // Always `place`
  type?: "place"
  place: EmptyObject
}

export type PlacePropertyItemObjectResponse = {
  type: "place"
  place: {
    lat: number
    lon: number
    name?: string | null
    address?: string | null
    aws_place_id?: string | null
    google_place_id?: string | null
  } | null
  object: "property_item"
  id: string
}

type PlacePropertyValueResponse = {
  lat: number
  lon: number
  name?: string | null
  address?: string | null
  aws_place_id?: string | null
  google_place_id?: string | null
}

type PlaceSimplePropertyValueResponse = {
  // Always `place`
  type: "place"
  place: PlacePropertyValueResponse | null
}

type PropertyConfigurationRequest = PropertyConfigurationRequestCommon &
  (
    | NumberPropertyConfigurationRequest
    | FormulaPropertyConfigurationRequest
    | SelectPropertyConfigurationRequest
    | MultiSelectPropertyConfigurationRequest
    | StatusPropertyConfigurationRequest
    | RelationPropertyConfigurationRequest
    | RollupPropertyConfigurationRequest
    | UniqueIdPropertyConfigurationRequest
    | TitlePropertyConfigurationRequest
    | RichTextPropertyConfigurationRequest
    | UrlPropertyConfigurationRequest
    | PeoplePropertyConfigurationRequest
    | FilesPropertyConfigurationRequest
    | EmailPropertyConfigurationRequest
    | PhoneNumberPropertyConfigurationRequest
    | DatePropertyConfigurationRequest
    | CheckboxPropertyConfigurationRequest
    | CreatedByPropertyConfigurationRequest
    | CreatedTimePropertyConfigurationRequest
    | LastEditedByPropertyConfigurationRequest
    | LastEditedTimePropertyConfigurationRequest
    | ButtonPropertyConfigurationRequest
    | LocationPropertyConfigurationRequest
    | VerificationPropertyConfigurationRequest
    | LastVisitedTimePropertyConfigurationRequest
    | PlacePropertyConfigurationRequest
  )

type PropertyConfigurationRequestCommon = {
  // The description of the property.
  description?: PropertyDescriptionRequest | null
}

type PropertyDescriptionRequest = string

type PropertyFilter =
  | { title: TextPropertyFilter; property: string; type?: "title" }
  | { rich_text: TextPropertyFilter; property: string; type?: "rich_text" }
  | { number: NumberPropertyFilter; property: string; type?: "number" }
  | { checkbox: CheckboxPropertyFilter; property: string; type?: "checkbox" }
  | { select: SelectPropertyFilter; property: string; type?: "select" }
  | {
      multi_select: MultiSelectPropertyFilter
      property: string
      type?: "multi_select"
    }
  | { status: StatusPropertyFilter; property: string; type?: "status" }
  | { date: DatePropertyFilter; property: string; type?: "date" }
  | { people: PeoplePropertyFilter; property: string; type?: "people" }
  | { files: ExistencePropertyFilter; property: string; type?: "files" }
  | { url: TextPropertyFilter; property: string; type?: "url" }
  | { email: TextPropertyFilter; property: string; type?: "email" }
  | {
      phone_number: TextPropertyFilter
      property: string
      type?: "phone_number"
    }
  | { relation: RelationPropertyFilter; property: string; type?: "relation" }
  | { created_by: PeoplePropertyFilter; property: string; type?: "created_by" }
  | {
      created_time: DatePropertyFilter
      property: string
      type?: "created_time"
    }
  | {
      last_edited_by: PeoplePropertyFilter
      property: string
      type?: "last_edited_by"
    }
  | {
      last_edited_time: DatePropertyFilter
      property: string
      type?: "last_edited_time"
    }
  | { formula: FormulaPropertyFilter; property: string; type?: "formula" }
  | { unique_id: NumberPropertyFilter; property: string; type?: "unique_id" }
  | { rollup: RollupPropertyFilter; property: string; type?: "rollup" }
  | {
      verification: VerificationPropertyStatusFilter
      property: string
      type?: "verification"
    }

export type PropertyItemListResponse = PropertyItemPropertyItemListResponse

export type PropertyItemObjectResponse =
  | NumberPropertyItemObjectResponse
  | UrlPropertyItemObjectResponse
  | SelectPropertyItemObjectResponse
  | MultiSelectPropertyItemObjectResponse
  | StatusPropertyItemObjectResponse
  | DatePropertyItemObjectResponse
  | EmailPropertyItemObjectResponse
  | PhoneNumberPropertyItemObjectResponse
  | CheckboxPropertyItemObjectResponse
  | FilesPropertyItemObjectResponse
  | CreatedByPropertyItemObjectResponse
  | CreatedTimePropertyItemObjectResponse
  | LastEditedByPropertyItemObjectResponse
  | LastEditedTimePropertyItemObjectResponse
  | FormulaPropertyItemObjectResponse
  | ButtonPropertyItemObjectResponse
  | UniqueIdPropertyItemObjectResponse
  | VerificationPropertyItemObjectResponse
  | PlacePropertyItemObjectResponse
  | TitlePropertyItemObjectResponse
  | RichTextPropertyItemObjectResponse
  | PeoplePropertyItemObjectResponse
  | RelationPropertyItemObjectResponse
  | RollupPropertyItemObjectResponse

type PropertyItemPropertyItemListResponse = {
  type: "property_item"
  property_item:
    | { type: "title"; title: EmptyObject; next_url: string | null; id: string }
    | {
        type: "rich_text"
        rich_text: EmptyObject
        next_url: string | null
        id: string
      }
    | {
        type: "people"
        people: EmptyObject
        next_url: string | null
        id: string
      }
    | {
        type: "relation"
        relation: EmptyObject
        next_url: string | null
        id: string
      }
    | {
        type: "rollup"
        rollup:
          | { type: "number"; number: number | null; function: RollupFunction }
          | {
              type: "date"
              date: DateResponse | null
              function: RollupFunction
            }
          | {
              type: "array"
              array: Array<EmptyObject>
              function: RollupFunction
            }
          | {
              type: "unsupported"
              unsupported: EmptyObject
              function: RollupFunction
            }
          | {
              type: "incomplete"
              incomplete: EmptyObject
              function: RollupFunction
            }
        next_url: string | null
        id: string
      }
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<PropertyItemObjectResponse>
}

type PropertyOrTimestampFilter = PropertyFilter | TimestampFilter

type PropertyOrTimestampFilterArray = Array<PropertyOrTimestampFilter>

type PropertySortResponse = {
  // The name or ID of the property to sort by.
  property: string
  // Sort direction.
  direction: "ascending" | "descending"
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

type RelationArrayBasedPropertyValueResponse = {
  // Always `relation`
  type: "relation"
  relation: Array<RelationItemPropertyValueResponse>
}

type RelationDatabasePropertyConfigResponse = {
  // Always `relation`
  type: "relation"
  relation: DatabasePropertyRelationConfigResponse
}

type RelationGroupByConfigRequest = {
  // The property type for grouping.
  type: "relation"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type RelationGroupByConfigResponse = {
  // The property type for grouping.
  type: "relation"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type RelationItemPropertyValueResponse = { id: IdRequest }

type RelationPropertyConfigurationRequest = {
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

type RelationPropertyFilter =
  | { contains: IdRequest }
  | { does_not_contain: IdRequest }
  | ExistencePropertyFilter

export type RelationPropertyItemObjectResponse = {
  type: "relation"
  relation: { id: string }
  object: "property_item"
  id: string
}

type RichTextArrayBasedPropertyValueResponse = {
  // Always `rich_text`
  type: "rich_text"
  rich_text: Array<RichTextItemResponse>
}

type RichTextDatabasePropertyConfigResponse = {
  // Always `rich_text`
  type: "rich_text"
  rich_text: EmptyObject
}

type RichTextItemRequest = RichTextItemRequestCommon &
  (
    | TextRichTextItemRequest
    | MentionRichTextItemRequest
    | EquationRichTextItemRequest
  )

type RichTextItemRequestCommon = {
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations?: AnnotationRequest
}

export type RichTextItemResponse = RichTextItemResponseCommon &
  (
    | TextRichTextItemResponse
    | MentionRichTextItemResponse
    | EquationRichTextItemResponse
  )

export type RichTextItemResponseCommon = {
  // The plain text content of the rich text object, without any styling.
  plain_text: string
  // A URL that the rich text object links to or mentions.
  href: string | null
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations: AnnotationResponse
}

type RichTextPropertyConfigurationRequest = {
  // Always `rich_text`
  type?: "rich_text"
  rich_text: EmptyObject
}

export type RichTextPropertyItemObjectResponse = {
  type: "rich_text"
  rich_text: RichTextItemResponse
  object: "property_item"
  id: string
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

type RollupFunction =
  | "count"
  | "count_values"
  | "empty"
  | "not_empty"
  | "unique"
  | "show_unique"
  | "percent_empty"
  | "percent_not_empty"
  | "sum"
  | "average"
  | "median"
  | "min"
  | "max"
  | "range"
  | "earliest_date"
  | "latest_date"
  | "date_range"
  | "checked"
  | "unchecked"
  | "percent_checked"
  | "percent_unchecked"
  | "count_per_group"
  | "percent_per_group"
  | "show_original"

type RollupPropertyConfigurationRequest = {
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

type RollupPropertyFilter =
  | { any: RollupSubfilterPropertyFilter }
  | { none: RollupSubfilterPropertyFilter }
  | { every: RollupSubfilterPropertyFilter }
  | { date: DatePropertyFilter }
  | { number: NumberPropertyFilter }

export type RollupPropertyItemObjectResponse = {
  type: "rollup"
  rollup:
    | { type: "number"; number: number | null; function: RollupFunction }
    | { type: "date"; date: DateResponse | null; function: RollupFunction }
    | { type: "array"; array: Array<EmptyObject>; function: RollupFunction }
    | {
        type: "unsupported"
        unsupported: EmptyObject
        function: RollupFunction
      }
    | { type: "incomplete"; incomplete: EmptyObject; function: RollupFunction }
  object: "property_item"
  id: string
}

type RollupSubfilterPropertyFilter =
  | { rich_text: TextPropertyFilter }
  | { number: NumberPropertyFilter }
  | { checkbox: CheckboxPropertyFilter }
  | { select: SelectPropertyFilter }
  | { multi_select: MultiSelectPropertyFilter }
  | { relation: RelationPropertyFilter }
  | { date: DatePropertyFilter }
  | { people: PeoplePropertyFilter }
  | { files: ExistencePropertyFilter }
  | { status: StatusPropertyFilter }

/**
 * One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`,
 * `pink`, `red`
 */
type SelectColor =
  | "default"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"

type SelectDatabasePropertyConfigResponse = {
  // Always `select`
  type: "select"
  select: { options: Array<SelectPropertyResponse> }
}

type SelectGroupByConfigRequest = {
  // The property type for grouping.
  type: "select" | "multi_select"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type SelectGroupByConfigResponse = {
  // The property type for grouping.
  type: "select" | "multi_select"
  // Property ID to group by.
  property_id: string
  // Sort order for groups.
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type SelectPropertyConfigurationRequest = {
  // Always `select`
  type?: "select"
  select: {
    options?: Array<{
      name: string
      color?: SelectColor
      description?: string | null
    }>
  }
}

type SelectPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

export type SelectPropertyItemObjectResponse = {
  type: "select"
  select: PartialSelectResponse | null
  object: "property_item"
  id: string
}

type SelectPropertyResponse = {
  id: string
  name: string
  color: SelectColor
  description: string | null
}

type SelectSimplePropertyValueResponse = {
  // Always `select`
  type: "select"
  select: PartialSelectPropertyValueResponse | null
}

type SimpleOrArrayPropertyValueResponse =
  | SimplePropertyValueResponse
  | ArrayBasedPropertyValueResponse

type SimplePropertyValueResponse =
  | NumberSimplePropertyValueResponse
  | UrlSimplePropertyValueResponse
  | SelectSimplePropertyValueResponse
  | MultiSelectSimplePropertyValueResponse
  | StatusSimplePropertyValueResponse
  | DateSimplePropertyValueResponse
  | EmailSimplePropertyValueResponse
  | PhoneNumberSimplePropertyValueResponse
  | CheckboxSimplePropertyValueResponse
  | FilesSimplePropertyValueResponse
  | CreatedBySimplePropertyValueResponse
  | CreatedTimeSimplePropertyValueResponse
  | LastEditedBySimplePropertyValueResponse
  | LastEditedTimeSimplePropertyValueResponse
  | FormulaSimplePropertyValueResponse
  | ButtonSimplePropertyValueResponse
  | UniqueIdSimplePropertyValueResponse
  | VerificationSimplePropertyValueResponse
  | PlaceSimplePropertyValueResponse

type SinglePropertyDatabasePropertyRelationConfigResponse = {
  // Always `single_property`
  type: "single_property"
  single_property: EmptyObject
}

/**
 * One of: `ascending`, `descending`
 */
type SortDirectionRequest = "ascending" | "descending"

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

type StatusGroupByConfigRequest = {
  // The property type for grouping.
  type: "status"
  // Property ID to group by.
  property_id: string
  // How to group status values. "group" groups by status group (To Do/In Progress/Done),
  // "option" groups by individual option.
  group_by: "group" | "option"
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type StatusGroupByConfigResponse = {
  // The property type for grouping.
  type: "status"
  // Property ID to group by.
  property_id: string
  // How to group status values. "group" groups by status group (To Do/In Progress/Done),
  // "option" groups by individual option.
  group_by: "group" | "option"
  // Sort order for groups.
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type StatusPropertyConfigurationRequest = {
  // Always `status`
  type?: "status"
  status: EmptyObject
}

type StatusPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

export type StatusPropertyItemObjectResponse = {
  type: "status"
  status: PartialSelectResponse | null
  object: "property_item"
  id: string
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

type StatusSimplePropertyValueResponse = {
  // Always `status`
  type: "status"
  status: PartialSelectPropertyValueResponse | null
}

type StringFormulaPropertyResponse = { type: "string"; string: string | null }

type StringFormulaPropertyValueResponse = {
  // Always `string`
  type: "string"
  string: string | null
}

type StringRequest = string

type SubtaskConfigRequest = {
  // Relation property ID used for parent-child nesting.
  property_id?: string
  // How sub-items are displayed. "show" renders hierarchically with toggles, "hidden"
  // shows parents with a count, "flattened" shows sub-items with a parent indicator,
  // "disabled" turns off sub-item rendering.
  display_mode?: "show" | "hidden" | "flattened" | "disabled"
  // Which items are included when filtering. "parents" includes parent items only,
  // "parents_and_subitems" includes both, "subitems" includes sub-items only.
  filter_scope?: "parents" | "parents_and_subitems" | "subitems"
  // Property ID of the column showing the sub-item expand/collapse toggle.
  toggle_column_id?: string
}

type SubtaskConfigResponse = {
  // Relation property ID used for parent-child nesting.
  property_id?: string
  // How sub-items are displayed. "show" renders hierarchically with toggles, "hidden"
  // shows parents with a count, "flattened" shows sub-items with a parent indicator,
  // "disabled" turns off sub-item rendering.
  display_mode?: "show" | "hidden" | "flattened" | "disabled"
  // Which items are included when filtering. "parents" includes parent items only,
  // "parents_and_subitems" includes both, "subitems" includes sub-items only.
  filter_scope?: "parents" | "parents_and_subitems" | "subitems"
  // Property ID of the column showing the sub-item expand/collapse toggle.
  toggle_column_id?: string
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

type TableRequestWithTableRowChildren = {
  table_width: number
  children: Array<TableRowRequest>
  has_column_header?: boolean
  has_row_header?: boolean
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

type TableRowRequest = {
  table_row: ContentWithTableRowRequest
  type?: "table_row"
  object?: "block"
}

type TableViewConfigRequest = {
  // The view type. Must be "table".
  type: "table"
  // Property visibility and display configuration. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
  // Group-by configuration for the table. Pass null to remove grouping.
  group_by?: GroupByConfigRequest | null
  // Subtask (sub-item) configuration. Pass null to disable subtasks.
  subtasks?: SubtaskConfigRequest | null
  // Whether to wrap cell content in the table.
  wrap_cells?: boolean
  // Number of columns frozen from the left side of the table.
  frozen_column_index?: number
  // Whether to show vertical grid lines between columns.
  show_vertical_lines?: boolean
}

type TableViewConfigResponse = {
  // The view configuration type.
  type: "table"
  // Columns/properties visible in the table view.
  properties?: Array<ViewPropertyConfigResponse>
  // Vertical (row) grouping configuration.
  group_by?: GroupByConfigResponse
  // Sub-item (subtask) display configuration.
  subtasks?: SubtaskConfigResponse
  // Whether to wrap cell content by default.
  wrap_cells?: boolean
  // Index of the last frozen column. Columns up to and including this index are frozen.
  frozen_column_index?: number
  // Whether to show vertical lines between columns.
  show_vertical_lines?: boolean
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

type TemplateMentionDateTemplateMentionRequest = {
  // Always `template_mention_date`
  type?: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionDateTemplateMentionResponse = {
  // Always `template_mention_date`
  type: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionRequest =
  | TemplateMentionDateTemplateMentionRequest
  | TemplateMentionUserTemplateMentionRequest

type TemplateMentionResponse =
  | TemplateMentionDateTemplateMentionResponse
  | TemplateMentionUserTemplateMentionResponse

type TemplateMentionUserTemplateMentionRequest = {
  // Always `template_mention_user`
  type?: "template_mention_user"
  // The user of the template mention.
  template_mention_user: "me"
}

type TemplateMentionUserTemplateMentionResponse = {
  // Always `template_mention_user`
  type: "template_mention_user"
  // The user of the template mention.
  template_mention_user: "me"
}

/**
 * IANA timezone to use when resolving template variables like @now and @today (e.g.
 * 'America/New_York'). Defaults to the authorizing user's timezone for public
 * integrations, or UTC for internal integrations.
 */
type TemplateTimezone = string

type TextGroupByConfigRequest = {
  // The property type for grouping.
  type: "text" | "title" | "url" | "email" | "phone_number"
  // Property ID to group by.
  property_id: string
  // How to group text values. "exact" = exact match, "alphabet_prefix" = first letter.
  group_by: "exact" | "alphabet_prefix"
  // Sort order for groups.
  sort: GroupSortRequest
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type TextGroupByConfigResponse = {
  // The property type for grouping.
  type: "text" | "title" | "url" | "email" | "phone_number"
  // Property ID to group by.
  property_id: string
  // How to group text values. "exact" = exact match, "alphabet_prefix" = first letter.
  group_by: "exact" | "alphabet_prefix"
  // Sort order for groups.
  sort: GroupSortResponse
  // Property name (convenience field).
  property_name?: string
  // Whether to hide groups that have no items.
  hide_empty_groups?: boolean
}

type TextPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | { contains: string }
  | { does_not_contain: string }
  | { starts_with: string }
  | { ends_with: string }
  | ExistencePropertyFilter

type TextRequest = string

type TextRichTextItemRequest = {
  // Always `text`
  type?: "text"
  // If a rich text object's type value is `text`, then the corresponding text field
  // contains an object including the text content and any inline link.
  text: {
    // The actual text content of the text.
    content: string
    // An object with information about any inline link in this text, if included.
    link?: {
      // The URL of the link.
      url: string
    } | null
  }
}

export type TextRichTextItemResponse = {
  // Always `text`
  type: "text"
  // If a rich text object's type value is `text`, then the corresponding text field
  // contains an object including the text content and any inline link.
  text: {
    // The actual text content of the text.
    content: string
    // An object with information about any inline link in this text, if included.
    link: {
      // The URL of the link.
      url: string
    } | null
  }
}

type TimeZoneRequest = string

type TimelineArrowsByRequest = {
  // Relation property ID used for dependency arrows, or null to disable arrows.
  property_id?: string | null
}

type TimelineArrowsByResponse = {
  // Relation property ID used for dependency arrows.
  property_id?: string | null
}

type TimelinePreferenceRequest = {
  // Zoom level for the timeline.
  zoom_level:
    | "hours"
    | "day"
    | "week"
    | "bi_week"
    | "month"
    | "quarter"
    | "year"
    | "5_years"
  // Timestamp (ms) to center the timeline view on.
  center_timestamp?: number
}

type TimelinePreferenceResponse = {
  // Zoom level for the timeline.
  zoom_level:
    | "hours"
    | "day"
    | "week"
    | "bi_week"
    | "month"
    | "quarter"
    | "year"
    | "5_years"
  // Center timestamp for the timeline view (Unix timestamp in ms).
  center_timestamp?: number
}

type TimelineViewConfigRequest = {
  // The view type. Must be "timeline".
  type: "timeline"
  // Property ID of the date property used for the start of timeline items.
  date_property_id: string
  // Property ID of the date property used for the end of timeline items. Pass null to
  // clear.
  end_date_property_id?: string | null
  // Property visibility and display configuration on timeline items. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
  // Whether to show the table panel alongside the timeline. Pass null to clear.
  show_table?: boolean | null
  // Property configuration for the table panel (when show_table is true). Pass null to
  // clear.
  table_properties?: Array<ViewPropertyConfigRequest> | null
  // Timeline display preferences (zoom level and center position). Pass null to clear.
  preference?: TimelinePreferenceRequest | null
  // Configuration for dependency arrows between timeline items. Pass null to clear.
  arrows_by?: TimelineArrowsByRequest | null
  // Whether to color timeline items by a property. Pass null to clear.
  color_by?: boolean | null
}

type TimelineViewConfigResponse = {
  // The view configuration type.
  type: "timeline"
  // Start date property - required.
  date_property_id: string
  // Start date property name (convenience field).
  date_property_name?: string
  // End date property (optional, for items that span a range).
  end_date_property_id?: string
  // End date property name (convenience field).
  end_date_property_name?: string
  // Properties to display on timeline items.
  properties?: Array<ViewPropertyConfigResponse>
  // Whether to show the table panel alongside the timeline.
  show_table?: boolean
  // Properties to display in the table panel (when show_table is true).
  table_properties?: Array<ViewPropertyConfigResponse>
  // Timeline zoom/preference state.
  preference?: TimelinePreferenceResponse
  // Dependency arrows configuration.
  arrows_by?: TimelineArrowsByResponse
  // Whether to color-code items by property.
  color_by?: boolean
}

type TimestampCreatedTimeFilter = {
  created_time: DatePropertyFilter
  timestamp: "created_time"
  type?: "created_time"
}

type TimestampFilter =
  | TimestampCreatedTimeFilter
  | TimestampLastEditedTimeFilter

type TimestampLastEditedTimeFilter = {
  last_edited_time: DatePropertyFilter
  timestamp: "last_edited_time"
  type?: "last_edited_time"
}

type TimestampSortResponse = {
  // The timestamp to sort by.
  timestamp: "created_time" | "last_edited_time"
  // Sort direction.
  direction: "ascending" | "descending"
}

type TitleArrayBasedPropertyValueResponse = {
  // Always `title`
  type: "title"
  title: Array<RichTextItemResponse>
}

type TitleDatabasePropertyConfigResponse = {
  // Always `title`
  type: "title"
  title: EmptyObject
}

type TitleObjectResponse = { title: string }

type TitlePropertyConfigurationRequest = {
  // Always `title`
  type?: "title"
  title: EmptyObject
}

export type TitlePropertyItemObjectResponse = {
  type: "title"
  title: RichTextItemResponse
  object: "property_item"
  id: string
}

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

type UniqueIdDatabasePropertyConfigResponse = {
  // Always `unique_id`
  type: "unique_id"
  unique_id: {
    // The prefix for the unique ID.
    prefix: string | null
  }
}

type UniqueIdPropertyConfigurationRequest = {
  // Always `unique_id`
  type?: "unique_id"
  unique_id: { prefix?: string | null }
}

export type UniqueIdPropertyItemObjectResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null; number: number | null }
  object: "property_item"
  id: string
}

type UniqueIdPropertyValueResponse = {
  prefix: string | null
  number: number | null
}

type UniqueIdSimplePropertyValueResponse = {
  // Always `unique_id`
  type: "unique_id"
  unique_id: UniqueIdPropertyValueResponse
}

export type UnsupportedBlockObjectResponse = {
  type: "unsupported"
  unsupported: {
    // The underlying block type that is not currently supported by the Public API. Example
    // values include: tab, form, button, drive.
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

type UpdateMediaContentWithFileAndCaptionRequest = {
  caption?: Array<RichTextItemRequest>
  external?: ExternalFileRequest
  file_upload?: FileUploadIdRequest
}

type UpdateMediaContentWithFileNameAndCaptionRequest = {
  caption?: Array<RichTextItemRequest>
  external?: ExternalFileRequest
  file_upload?: FileUploadIdRequest
  name?: StringRequest
}

type UpdateMediaContentWithUrlAndCaptionRequest = {
  url?: string
  caption?: Array<RichTextItemRequest>
}

type UpdateViewRequest = {
  // New name for the view.
  name?: string
  // Filter to apply to the view. Uses the same format as the data source query filter.
  // Pass null to clear the filter.
  filter?: ViewFilterRequest | null
  // Property sorts to apply to the view. Only property-based sorts are supported. Pass
  // null to clear the sorts.
  sorts?: ViewPropertySortsRequest | null
  // View presentation configuration. The type field must match the view type. Individual
  // nullable fields within the configuration can be set to null to clear them.
  configuration?: ViewConfigRequest
}

type UrlDatabasePropertyConfigResponse = {
  // Always `url`
  type: "url"
  url: EmptyObject
}

type UrlPropertyConfigurationRequest = {
  // Always `url`
  type?: "url"
  url: EmptyObject
}

export type UrlPropertyItemObjectResponse = {
  type: "url"
  url: string | null
  object: "property_item"
  id: string
}

type UrlSimplePropertyValueResponse = {
  // Always `url`
  type: "url"
  url: string | null
}

export type UserObjectResponse = UserObjectResponseCommon &
  (PersonUserObjectResponse | BotUserObjectResponse)

export type UserObjectResponseCommon = {
  // The ID of the user.
  id: IdResponse
  // The user object type name.
  object: "user"
  // The name of the user.
  name: string | null
  // The avatar URL of the user.
  avatar_url: string | null
}

type UserValueResponse = PartialUserObjectResponse | UserObjectResponse

type VerificationPropertyConfigurationRequest = {
  // Always `verification`
  type?: "verification"
  verification: EmptyObject
}

export type VerificationPropertyItemObjectResponse = {
  type: "verification"
  verification: VerificationPropertyValueResponse | null
  object: "property_item"
  id: string
}

type VerificationPropertyResponse = {
  // One of: `verified`, `expired`
  state: "verified" | "expired"
  date: DateResponse | null
  verified_by: PartialUserObjectResponse | null
}

type VerificationPropertyStatusFilter = {
  status: "verified" | "expired" | "none"
}

type VerificationPropertyUnverifiedResponse = {
  // Always `unverified`
  state: "unverified"
  date: null
  verified_by: null
}

type VerificationPropertyValueResponse =
  | VerificationPropertyUnverifiedResponse
  | VerificationPropertyResponse

type VerificationSimplePropertyValueResponse = {
  // Always `verification`
  type: "verification"
  verification: VerificationPropertyValueResponse | null
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

/**
 * View configuration, discriminated by the type field.
 */
type ViewConfigRequest =
  | TableViewConfigRequest
  | BoardViewConfigRequest
  | CalendarViewConfigRequest
  | TimelineViewConfigRequest
  | GalleryViewConfigRequest
  | ListViewConfigRequest

/**
 * View configuration, typed by view type (table, board, calendar, etc.).
 */
type ViewConfigResponse =
  | TableViewConfigResponse
  | BoardViewConfigResponse
  | CalendarViewConfigResponse
  | TimelineViewConfigResponse
  | GalleryViewConfigResponse
  | ListViewConfigResponse
  | DashboardViewConfigResponse

/**
 * Filter for the view. Uses the same format as the data source query filter (property
 * filters, timestamp filters, or compound and/or filters).
 */
type ViewFilterRequest = Record<string, never>

/**
 * Filter for the view. Can be a property filter (filter by property value), timestamp
 * filter (filter by created_time or last_edited_time), or compound filter (combine
 * filters with and/or logic). Compound filters support up to 2 levels of nesting.
 */
type ViewFilterResponse =
  | (Record<string, unknown> & {
      // The name or ID of the property to filter on.
      property: string
    })
  | (Record<string, unknown> & {
      // The timestamp to filter on.
      timestamp: "created_time" | "last_edited_time"
    })
  | {
      // Filters combined with OR logic.
      or?: Array<
        | (Record<string, unknown> & {
            // The name or ID of the property to filter on.
            property: string
          })
        | (Record<string, unknown> & {
            // The timestamp to filter on.
            timestamp: "created_time" | "last_edited_time"
          })
        | {
            // Filters combined with OR logic.
            or?: Array<
              | (Record<string, unknown> & {
                  // The name or ID of the property to filter on.
                  property: string
                })
              | (Record<string, unknown> & {
                  // The timestamp to filter on.
                  timestamp: "created_time" | "last_edited_time"
                })
            >
            // Filters combined with AND logic.
            and?: Array<
              | (Record<string, unknown> & {
                  // The name or ID of the property to filter on.
                  property: string
                })
              | (Record<string, unknown> & {
                  // The timestamp to filter on.
                  timestamp: "created_time" | "last_edited_time"
                })
            >
          }
      >
      // Filters combined with AND logic.
      and?: Array<
        | (Record<string, unknown> & {
            // The name or ID of the property to filter on.
            property: string
          })
        | (Record<string, unknown> & {
            // The timestamp to filter on.
            timestamp: "created_time" | "last_edited_time"
          })
        | {
            // Filters combined with OR logic.
            or?: Array<
              | (Record<string, unknown> & {
                  // The name or ID of the property to filter on.
                  property: string
                })
              | (Record<string, unknown> & {
                  // The timestamp to filter on.
                  timestamp: "created_time" | "last_edited_time"
                })
            >
            // Filters combined with AND logic.
            and?: Array<
              | (Record<string, unknown> & {
                  // The name or ID of the property to filter on.
                  property: string
                })
              | (Record<string, unknown> & {
                  // The timestamp to filter on.
                  timestamp: "created_time" | "last_edited_time"
                })
            >
          }
      >
    }

type ViewPropertyConfigRequest = {
  // Property ID (stable identifier).
  property_id: string
  // Whether this property is visible in the view.
  visible?: boolean
  // Width of the property column in pixels (table view only).
  width?: number
  // Whether to wrap content in this property cell/card.
  wrap?: boolean
  // How to display status properties (select dropdown or checkbox).
  status_show_as?: "select" | "checkbox"
  // Property width mode in compact card layouts (board/gallery).
  card_property_width_mode?: "full_line" | "inline"
  // Date display format (date properties only).
  date_format?:
    | "full"
    | "short"
    | "month_day_year"
    | "day_month_year"
    | "year_month_day"
    | "relative"
  // Time display format (date properties only).
  time_format?: "12_hour" | "24_hour" | "hidden"
}

type ViewPropertyConfigResponse = {
  // Property ID (stable identifier).
  property_id: string
  // Property name (convenience field, not stable across renames).
  property_name?: string
  // Whether this property is visible in the view.
  visible?: boolean
  // Width of the property column in pixels (table view only).
  width?: number
  // Whether to wrap content in this property cell/card.
  wrap?: boolean
  // How to display status properties (as select dropdown or checkbox).
  status_show_as?: "select" | "checkbox"
  // Property width mode in compact card layouts (board/gallery).
  card_property_width_mode?: "full_line" | "inline"
  // Date display format (date properties only). "full" = localized full date, "short" =
  // month and day, "month_day_year" = MM/DD/YYYY, "day_month_year" = DD/MM/YYYY,
  // "year_month_day" = YYYY/MM/DD, "relative" = relative dates.
  date_format?:
    | "full"
    | "short"
    | "month_day_year"
    | "day_month_year"
    | "year_month_day"
    | "relative"
  // Time display format (date properties only). "12_hour" = 12-hour clock with AM/PM,
  // "24_hour" = 24-hour clock, "hidden" = hide time.
  time_format?: "12_hour" | "24_hour" | "hidden"
}

type ViewPropertySortRequest = {
  // Property name or ID to sort by.
  property: string
  // Sort direction.
  direction: SortDirectionRequest
}

type ViewPropertySortsRequest = Array<ViewPropertySortRequest>

type ViewQueryResponse = {
  // The object type.
  object: "view_query"
  // The query ID.
  id: IdResponse
  // The view this query was executed against.
  view_id: IdResponse
  // When the cached query results expire.
  expires_at: string
  // Total number of results in the query.
  total_count: number
  // The page results for this page.
  results: Array<PageReferenceResponse>
  // Cursor for the next page of results.
  next_cursor: IdResponse | null
  // Whether there are more results.
  has_more: boolean
}

/**
 * Sort for the view. Can be a property sort (with property and direction) or timestamp
 * sort (with timestamp and direction).
 */
type ViewSortRequest = Record<string, never>

/**
 * Sort for the view. Can sort by property or timestamp.
 */
type ViewSortResponse = PropertySortResponse | TimestampSortResponse

type ViewSortsRequest = Array<ViewSortRequest>

/**
 * One of: `table`, `board`, `list`, `calendar`, `timeline`, `gallery`, `form`, `chart`,
 * `map`, `dashboard`
 */
type ViewTypeRequest =
  | "table"
  | "board"
  | "list"
  | "calendar"
  | "timeline"
  | "gallery"
  | "form"
  | "chart"
  | "map"
  | "dashboard"

type WorkspaceParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "workspace"
  // Always true for workspace parent.
  workspace: true
}
export type GetSelfParameters = Record<string, never>

export type GetSelfResponse = UserObjectResponse

/**
 * Retrieve your token's bot user
 */
export const getSelf = {
  method: "get",
  pathParams: [],
  queryParams: [],
  bodyParams: [],

  path: (): string => `users/me`,
} as const

type GetUserPathParameters = {
  user_id: IdRequest
}

export type GetUserParameters = GetUserPathParameters

export type GetUserResponse = UserObjectResponse

/**
 * Retrieve a user
 */
export const getUser = {
  method: "get",
  pathParams: ["user_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetUserPathParameters): string => `users/${p.user_id}`,
} as const

type ListUsersQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListUsersParameters = ListUsersQueryParameters

export type ListUsersResponse = {
  type: "user"
  user: EmptyObject
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<UserObjectResponse>
}

/**
 * List all users
 */
export const listUsers = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `users`,
} as const

type CreatePageBodyParameters = {
  parent?:
    | { page_id: IdRequest; type?: "page_id" }
    | { database_id: IdRequest; type?: "database_id" }
    | { data_source_id: IdRequest; type?: "data_source_id" }
    | { workspace: true; type?: "workspace" }
  properties?: Record<
    string,
    | { title: Array<RichTextItemRequest>; type?: "title" }
    | { rich_text: Array<RichTextItemRequest>; type?: "rich_text" }
    | { number: number | null; type?: "number" }
    | { url: TextRequest | null; type?: "url" }
    | {
        select:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "select"
      }
    | {
        multi_select: Array<
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
        >
        type?: "multi_select"
      }
    | {
        people: Array<PartialUserObjectRequest | GroupObjectRequest>
        type?: "people"
      }
    | { email: StringRequest | null; type?: "email" }
    | { phone_number: StringRequest | null; type?: "phone_number" }
    | { date: DateRequest | null; type?: "date" }
    | { checkbox: boolean; type?: "checkbox" }
    | { relation: Array<RelationItemPropertyValueResponse>; type?: "relation" }
    | {
        files: Array<
          | InternalOrExternalFileWithNameRequest
          | FileUploadWithOptionalNameRequest
        >
        type?: "files"
      }
    | {
        status:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "status"
      }
    | {
        place: {
          lat: number
          lon: number
          name?: string | null
          address?: string | null
          aws_place_id?: string | null
          google_place_id?: string | null
        } | null
        type?: "place"
      }
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  content?: Array<BlockObjectRequest>
  children?: Array<BlockObjectRequest>
  // Page content as Notion-flavored Markdown. Mutually exclusive with content/children.
  markdown?: string
  template?:
    | { type: "none" }
    | { type: "default"; timezone?: TemplateTimezone }
    | {
        type: "template_id"
        template_id: IdRequest
        timezone?: TemplateTimezone
      }
  position?: PagePositionSchema
}

export type CreatePageParameters = CreatePageBodyParameters

export type CreatePageResponse = PageObjectResponse | PartialPageObjectResponse

/**
 * Create a page
 */
export const createPage = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "parent",
    "properties",
    "icon",
    "cover",
    "content",
    "children",
    "markdown",
    "template",
    "position",
  ],

  path: (): string => `pages`,
} as const

type GetPagePathParameters = {
  // The ID of the page to retrieve.
  page_id: IdRequest
}

type GetPageQueryParameters = {
  // Supply a list of property IDs to filter properties in the response. Note that if a
  // page doesn't have a property, it won't be included in the filtered response.
  filter_properties?: Array<string>
}

export type GetPageParameters = GetPagePathParameters & GetPageQueryParameters

export type GetPageResponse = PartialPageObjectResponse | PageObjectResponse

/**
 * Retrieve a page
 */
export const getPage = {
  method: "get",
  pathParams: ["page_id"],
  queryParams: ["filter_properties"],
  bodyParams: [],

  path: (p: GetPagePathParameters): string => `pages/${p.page_id}`,
} as const

type UpdatePagePathParameters = {
  page_id: IdRequest
}

type UpdatePageBodyParameters = {
  properties?: Record<
    string,
    | { title: Array<RichTextItemRequest>; type?: "title" }
    | { rich_text: Array<RichTextItemRequest>; type?: "rich_text" }
    | { number: number | null; type?: "number" }
    | { url: TextRequest | null; type?: "url" }
    | {
        select:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "select"
      }
    | {
        multi_select: Array<
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
        >
        type?: "multi_select"
      }
    | {
        people: Array<PartialUserObjectRequest | GroupObjectRequest>
        type?: "people"
      }
    | { email: StringRequest | null; type?: "email" }
    | { phone_number: StringRequest | null; type?: "phone_number" }
    | { date: DateRequest | null; type?: "date" }
    | { checkbox: boolean; type?: "checkbox" }
    | { relation: Array<RelationItemPropertyValueResponse>; type?: "relation" }
    | {
        files: Array<
          | InternalOrExternalFileWithNameRequest
          | FileUploadWithOptionalNameRequest
        >
        type?: "files"
      }
    | {
        status:
          | {
              id: StringRequest
              name?: TextRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | {
              name: TextRequest
              id?: StringRequest
              color?: SelectColor
              description?: TextRequest | null
            }
          | null
        type?: "status"
      }
    | {
        place: {
          lat: number
          lon: number
          name?: string | null
          address?: string | null
          aws_place_id?: string | null
          google_place_id?: string | null
        } | null
        type?: "place"
      }
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  // Whether the page should be locked from editing in the Notion app UI. If not provided,
  // the locked state will not be updated.
  is_locked?: boolean
  template?:
    | { type: "default"; timezone?: TemplateTimezone }
    | {
        type: "template_id"
        template_id: IdRequest
        timezone?: TemplateTimezone
      }
  // Whether to erase all existing content from the page. When used with a template, the
  // template content replaces the existing content. When used without a template, simply
  // clears the page content.
  erase_content?: boolean
  in_trash?: boolean
  /** @deprecated Use `in_trash` instead. */
  archived?: boolean
}

export type UpdatePageParameters = UpdatePagePathParameters &
  UpdatePageBodyParameters

export type UpdatePageResponse = PageObjectResponse | PartialPageObjectResponse

/**
 * Update page
 */
export const updatePage = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: [
    "archived",
    "properties",
    "icon",
    "cover",
    "is_locked",
    "template",
    "erase_content",
    "in_trash",
  ],

  path: (p: UpdatePagePathParameters): string => `pages/${p.page_id}`,
} as const

type MovePagePathParameters = {
  // The ID of the page to move.
  page_id: IdRequest
}

type MovePageBodyParameters = {
  // The new parent of the page.
  parent:
    | {
        // The ID of the parent page (with or without dashes), for example,
        // 195de9221179449fab8075a27c979105
        page_id: IdRequest
        // Always `page_id`
        type?: "page_id"
      }
    | {
        // The ID of the parent data source (collection), with or without dashes. For example,
        // f336d0bc-b841-465b-8045-024475c079dd
        data_source_id: IdRequest
        // Always `data_source_id`
        type?: "data_source_id"
      }
}

export type MovePageParameters = MovePagePathParameters & MovePageBodyParameters

export type MovePageResponse = PartialPageObjectResponse | PageObjectResponse

/**
 * Move a page
 */
export const movePage = {
  method: "post",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: ["parent"],

  path: (p: MovePagePathParameters): string => `pages/${p.page_id}/move`,
} as const

type GetPagePropertyPathParameters = {
  page_id: IdRequest
  property_id: string
}

type GetPagePropertyQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type GetPagePropertyParameters = GetPagePropertyPathParameters &
  GetPagePropertyQueryParameters

export type GetPagePropertyResponse =
  | PropertyItemObjectResponse
  | PropertyItemListResponse

/**
 * Retrieve a page property item
 */
export const getPageProperty = {
  method: "get",
  pathParams: ["page_id", "property_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (p: GetPagePropertyPathParameters): string =>
    `pages/${p.page_id}/properties/${p.property_id}`,
} as const

type GetPageMarkdownPathParameters = {
  // The ID of the page (or block) to retrieve as markdown. Non-navigable block IDs from
  // truncated responses can be passed here to fetch their subtrees.
  page_id: IdRequest
}

type GetPageMarkdownQueryParameters = {
  // Whether to include meeting note transcripts. Defaults to false. When true, full
  // transcripts are included; when false, a placeholder with the meeting note URL is shown
  // instead.
  include_transcript?: boolean
}

export type GetPageMarkdownParameters = GetPageMarkdownPathParameters &
  GetPageMarkdownQueryParameters

export type GetPageMarkdownResponse = PageMarkdownResponse

/**
 * Retrieve a page as markdown
 */
export const getPageMarkdown = {
  method: "get",
  pathParams: ["page_id"],
  queryParams: ["include_transcript"],
  bodyParams: [],

  path: (p: GetPageMarkdownPathParameters): string =>
    `pages/${p.page_id}/markdown`,
} as const

type UpdatePageMarkdownPathParameters = {
  // The ID of the page to update.
  page_id: IdRequest
}

type UpdatePageMarkdownBodyParameters =
  | {
      // Always `insert_content`
      type: "insert_content"
      // Insert new content into the page.
      insert_content: {
        // The enhanced markdown content to insert into the page.
        content: string
        // Selection of existing content to insert after, using the ellipsis format ("start
        // text...end text"). Omit to append at the end of the page.
        after?: string
      }
    }
  | {
      // Always `replace_content_range`
      type: "replace_content_range"
      // Replace a range of content in the page.
      replace_content_range: {
        // The new enhanced markdown content to replace the matched range.
        content: string
        // Selection of existing content to replace, using the ellipsis format ("start text...end
        // text").
        content_range: string
        // Set to true to allow the operation to delete child pages or databases. Defaults to
        // false.
        allow_deleting_content?: boolean
      }
    }
  | {
      // Always `update_content`
      type: "update_content"
      // Update specific content using search-and-replace operations.
      update_content: {
        // An array of search-and-replace operations, each with old_str (content to find) and
        // new_str (replacement content).
        content_updates: Array<{
          // The existing content string to find and replace. Must exactly match the page content.
          old_str: string
          // The new content string to replace old_str with.
          new_str: string
          // If true, replaces all occurrences of old_str. If false (default), the operation fails
          // if there are multiple matches.
          replace_all_matches?: boolean
        }>
        // Set to true to allow the operation to delete child pages or databases. Defaults to
        // false.
        allow_deleting_content?: boolean
      }
    }
  | {
      // Always `replace_content`
      type: "replace_content"
      // Replace the entire page content with new markdown.
      replace_content: {
        // The new enhanced markdown content to replace the entire page content.
        new_str: string
        // Set to true to allow the operation to delete child pages or databases. Defaults to
        // false.
        allow_deleting_content?: boolean
      }
    }

export type UpdatePageMarkdownParameters = UpdatePageMarkdownPathParameters &
  UpdatePageMarkdownBodyParameters

export type UpdatePageMarkdownResponse = PageMarkdownResponse

/**
 * Update a page's content as markdown
 */
export const updatePageMarkdown = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: [
    "type",
    "insert_content",
    "replace_content_range",
    "update_content",
    "replace_content",
  ],

  path: (p: UpdatePageMarkdownPathParameters): string =>
    `pages/${p.page_id}/markdown`,
} as const

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
      paragraph: ContentWithRichTextAndColorRequest
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
            status: EmptyObject
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

type CreateCommentBodyParameters = {
  // An array of rich text objects that represent the content of the comment.
  rich_text: Array<RichTextItemRequest>
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
    }
  | {
      // The ID of the discussion to comment on.
      discussion_id: IdRequest
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
    "rich_text",
    "attachments",
    "display_name",
    "parent",
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

type CreateFileUploadBodyParameters = {
  // How the file is being sent. Use `multi_part` for files larger than 20MB. Use
  // `external_url` for files that are temporarily hosted publicly elsewhere. Default is
  // `single_part`.
  mode?: "single_part" | "multi_part" | "external_url"
  // Name of the file to be created. Required when `mode` is `multi_part`. Otherwise
  // optional, and used to override the filename. Must include an extension, or have one
  // inferred from the `content_type` parameter.
  filename?: string
  // MIME type of the file to be created. Recommended when sending the file in multiple
  // parts. Must match the content type of the file that's sent, and the extension of the
  // `filename` parameter if any.
  content_type?: string
  // When `mode` is `multi_part`, the number of parts you are uploading. This must match
  // the number of parts as well as the final `part_number` you send.
  number_of_parts?: number
  // When `mode` is `external_url`, provide the HTTPS URL of a publicly accessible file to
  // import into your workspace.
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
  start_cursor?: string
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

type ListDatabaseViewsQueryParameters = {
  // ID of a Notion database (collection view block) to list views for.
  database_id: IdRequest
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
}

export type ListDatabaseViewsParameters = ListDatabaseViewsQueryParameters

export type ListDatabaseViewsResponse = {
  // Always `list`
  object: "list"
  next_cursor: IdResponse | null
  has_more: boolean
  results: Array<DataSourceViewReferenceResponse>
  // Always `view`
  type: "view"
  view: EmptyObject
}

/**
 * List views
 */
export const listDatabaseViews = {
  method: "get",
  pathParams: [],
  queryParams: ["database_id", "start_cursor", "page_size"],
  bodyParams: [],

  path: (): string => `views`,
} as const

type CreateViewBodyParameters = CreateViewRequest

export type CreateViewParameters = CreateViewBodyParameters

export type CreateViewResponse =
  | PartialDataSourceViewObjectResponse
  | DataSourceViewObjectResponse

/**
 * Create a view
 */
export const createView = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [],

  path: (): string => `views`,
} as const

type GetViewPathParameters = {
  // ID of a Notion view.
  view_id: IdRequest
}

export type GetViewParameters = GetViewPathParameters

export type GetViewResponse =
  | PartialDataSourceViewObjectResponse
  | DataSourceViewObjectResponse

/**
 * Retrieve a view
 */
export const getView = {
  method: "get",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetViewPathParameters): string => `views/${p.view_id}`,
} as const

type UpdateViewPathParameters = {
  // ID of a Notion view.
  view_id: IdRequest
}

type UpdateViewBodyParameters = UpdateViewRequest

export type UpdateViewParameters = UpdateViewPathParameters &
  UpdateViewBodyParameters

export type UpdateViewResponse =
  | PartialDataSourceViewObjectResponse
  | DataSourceViewObjectResponse

/**
 * Update a view
 */
export const updateView = {
  method: "patch",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: UpdateViewPathParameters): string => `views/${p.view_id}`,
} as const

type DeleteViewPathParameters = {
  // The ID of the view to delete.
  view_id: IdRequest
}

export type DeleteViewParameters = DeleteViewPathParameters

export type DeleteViewResponse = PartialDataSourceViewObjectResponse

/**
 * Delete a view
 */
export const deleteView = {
  method: "delete",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteViewPathParameters): string => `views/${p.view_id}`,
} as const

type CreateViewQueryPathParameters = {
  // The ID of the view.
  view_id: string
}

type CreateViewQueryBodyParameters = CreateViewQueryRequest

export type CreateViewQueryParameters = CreateViewQueryPathParameters &
  CreateViewQueryBodyParameters

export type CreateViewQueryResponse = ViewQueryResponse

/**
 * Create a view query
 */
export const createViewQuery = {
  method: "post",
  pathParams: ["view_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: CreateViewQueryPathParameters): string =>
    `views/${p.view_id}/queries`,
} as const

type GetViewQueryResultsPathParameters = {
  // The ID of the view.
  view_id: string
  // The ID of the query.
  query_id: string
}

export type GetViewQueryResultsParameters = GetViewQueryResultsPathParameters

export type GetViewQueryResultsResponse = {
  // Always `list`
  object: "list"
  next_cursor: IdResponse | null
  has_more: boolean
  results: Array<PartialPageObjectResponse>
  // Always `page`
  type: "page"
  page: EmptyObject
}

/**
 * Get view query results
 */
export const getViewQueryResults = {
  method: "get",
  pathParams: ["view_id", "query_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetViewQueryResultsPathParameters): string =>
    `views/${p.view_id}/queries/${p.query_id}`,
} as const

type DeleteViewQueryPathParameters = {
  // The ID of the view.
  view_id: string
  // The ID of the query.
  query_id: string
}

export type DeleteViewQueryParameters = DeleteViewQueryPathParameters

export type DeleteViewQueryResponse = DeletedViewQueryResponse

/**
 * Delete a view query
 */
export const deleteViewQuery = {
  method: "delete",
  pathParams: ["view_id", "query_id"],
  queryParams: [],
  bodyParams: [],

  path: (p: DeleteViewQueryPathParameters): string =>
    `views/${p.view_id}/queries/${p.query_id}`,
} as const

type OauthTokenBodyParameters =
  | {
      grant_type: "authorization_code"
      code: string
      redirect_uri?: string
      external_account?: { key: string; name: string }
    }
  | { grant_type: "refresh_token"; refresh_token: string }

export type OauthTokenParameters = OauthTokenBodyParameters

export type OauthTokenResponse = {
  access_token: string
  token_type: "bearer"
  refresh_token: string | null
  bot_id: string
  workspace_icon: string | null
  workspace_name: string | null
  workspace_id: string
  owner:
    | {
        type: "user"
        user:
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | PartialUserObjectResponse
      }
    | { type: "workspace"; workspace: true }
  duplicated_template_id: string | null
  request_id?: string
}

/**
 * Exchange an authorization code for an access and refresh token
 */
export const oauthToken = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "grant_type",
    "code",
    "redirect_uri",
    "external_account",
    "refresh_token",
  ],

  path: (): string => `oauth/token`,
} as const

type OauthRevokeBodyParameters = { token: string }

export type OauthRevokeParameters = OauthRevokeBodyParameters

export type OauthRevokeResponse = { request_id?: string }

/**
 * Revoke a token
 */
export const oauthRevoke = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["token"],

  path: (): string => `oauth/revoke`,
} as const

type OauthIntrospectBodyParameters = { token: string }

export type OauthIntrospectParameters = OauthIntrospectBodyParameters

export type OauthIntrospectResponse = {
  active: boolean
  scope?: string
  iat?: number
  request_id?: string
}

/**
 * Introspect a token
 */
export const oauthIntrospect = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["token"],

  path: (): string => `oauth/introspect`,
} as const
