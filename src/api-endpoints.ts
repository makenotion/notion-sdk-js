// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

type IdResponse = string

export type PersonUserObjectResponse = {
  // Indicates this user is a person.
  type: "person"
  // Details about the person, when the `type` of the user is `person`.
  person: {
    // The email of the person.
    email?: string
  }
}

type EmptyObject = Record<string, never>

type IdRequest = string

export type PartialUserObjectResponse = {
  id: IdResponse
  // Always `user`
  object: "user"
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
  // The name of the bot's workspace.
  workspace_name: string | null
  // Limits and restrictions that apply to the bot's workspace
  workspace_limits: {
    // The maximum allowable size of a file upload, in bytes
    max_file_upload_size_in_bytes: number
  }
}

export type BotUserObjectResponse = {
  // Indicates this user is a bot.
  type: "bot"
  // Details about the bot, when the `type` of the user is `bot`.
  bot: EmptyObject | BotInfoResponse
}

export type UserObjectResponse = UserObjectResponseCommon &
  (PersonUserObjectResponse | BotUserObjectResponse)

export type GroupObjectResponse = {
  name: string | null
  id: IdResponse
  object: "group"
}

type DatabaseParentResponse = {
  // The parent type.
  type: "database_id"
  // The ID of the parent database.
  database_id: IdResponse
}

type DataSourceParentResponse = {
  // The parent type.
  type: "data_source_id"
  // The ID of the parent data source.
  data_source_id: IdResponse
  // The ID of the data source's parent database.
  database_id: IdResponse
}

type PageIdParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "page_id"
  // The ID of the parent page.
  page_id: IdResponse
}

type BlockIdParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "block_id"
  // The ID of the parent block.
  block_id: IdResponse
}

type WorkspaceParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "workspace"
  // Always true for workspace parent.
  workspace: true
}

type ParentForBlockBasedObjectResponse =
  | DatabaseParentResponse
  | DataSourceParentResponse
  | PageIdParentForBlockBasedObjectResponse
  | BlockIdParentForBlockBasedObjectResponse
  | WorkspaceParentForBlockBasedObjectResponse

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

type PartialSelectResponse = { id: string; name: string; color: SelectColor }

type TimeZoneRequest = string

type DateResponse = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end: string | null
  // The time zone of the date object.
  time_zone: TimeZoneRequest | null
}

type InternalFileResponse = {
  // The URL of the file.
  url: string
  // The time when the URL will expire.
  expiry_time: string
}

type StringRequest = string

type FileInternalOrExternalFileWithNameResponse = {
  type: "file"
  file: InternalFileResponse
  name: StringRequest
}

type TextRequest = string

type ExternalInternalOrExternalFileWithNameResponse = {
  type: "external"
  external: { url: TextRequest }
  name: StringRequest
}

type InternalOrExternalFileWithNameResponse =
  | FileInternalOrExternalFileWithNameResponse
  | ExternalInternalOrExternalFileWithNameResponse

type StringFormulaPropertyResponse = { type: "string"; string: string | null }

type DateFormulaPropertyResponse = { type: "date"; date: DateResponse | null }

type NumberFormulaPropertyResponse = { type: "number"; number: number | null }

type BooleanFormulaPropertyResponse = {
  type: "boolean"
  boolean: boolean | null
}

type FormulaPropertyResponse =
  | StringFormulaPropertyResponse
  | DateFormulaPropertyResponse
  | NumberFormulaPropertyResponse
  | BooleanFormulaPropertyResponse

type VerificationPropertyUnverifiedResponse = {
  state: "unverified"
  date: null
  verified_by: null
}

type VerificationPropertyResponse = {
  state: "verified" | "expired"
  date: DateResponse | null
  verified_by: PartialUserObjectResponse | null
}

type VerificationPropertyValueResponse =
  | VerificationPropertyUnverifiedResponse
  | VerificationPropertyResponse

type AnnotationResponse = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: ApiColor
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

type LinkPreviewMentionResponse = {
  // The URL of the link preview mention.
  url: string
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

type TemplateMentionDateTemplateMentionResponse = {
  // Always `template_mention_date`
  type: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionUserTemplateMentionResponse = {
  // Always `template_mention_user`
  type: "template_mention_user"
  // The user of the template mention.
  template_mention_user: "me"
}

type TemplateMentionResponse =
  | TemplateMentionDateTemplateMentionResponse
  | TemplateMentionUserTemplateMentionResponse

type CustomEmojiResponse = {
  // The ID of the custom emoji.
  id: IdResponse
  // The name of the custom emoji.
  name: string
  // The URL of the custom emoji.
  url: string
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
        user: PartialUserObjectResponse | UserObjectResponse
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

export type RichTextItemResponse = RichTextItemResponseCommon &
  (
    | TextRichTextItemResponse
    | MentionRichTextItemResponse
    | EquationRichTextItemResponse
  )

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

type EmojiRequest = string

type EmojiPageIconResponse = {
  // Type of icon. In this case, an emoji.
  type: "emoji"
  // The emoji character used as the icon.
  emoji: EmojiRequest
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

type FilePageIconResponse = {
  // Type of icon. In this case, a file.
  type: "file"
  // The file URL for the icon.
  file: InternalFileResponse
}

type CustomEmojiPageIconResponse = {
  // Type of icon. In this case, a custom emoji.
  type: "custom_emoji"
  // The custom emoji details for the icon.
  custom_emoji: CustomEmojiResponse
}

type PageIconResponse =
  | EmojiPageIconResponse
  | FilePageIconResponse
  | ExternalPageIconResponse
  | CustomEmojiPageIconResponse

type ExternalPageCoverResponse = {
  // Type of cover. In this case, an external URL.
  type: "external"
  // The external URL for the cover.
  external: {
    // The URL of the external file or resource.
    url: string
  }
}

type FilePageCoverResponse = {
  // Type of cover. In this case, a file.
  type: "file"
  // The file URL for the cover.
  file: InternalFileResponse
}

type PageCoverResponse = FilePageCoverResponse | ExternalPageCoverResponse

export type PageObjectResponse = {
  parent: ParentForBlockBasedObjectResponse
  properties: Record<
    string,
    | { type: "number"; number: number | null; id: string }
    | { type: "url"; url: string | null; id: string }
    | { type: "select"; select: PartialSelectResponse | null; id: string }
    | {
        type: "multi_select"
        multi_select: Array<PartialSelectResponse>
        id: string
      }
    | { type: "status"; status: PartialSelectResponse | null; id: string }
    | { type: "date"; date: DateResponse | null; id: string }
    | { type: "email"; email: string | null; id: string }
    | { type: "phone_number"; phone_number: string | null; id: string }
    | { type: "checkbox"; checkbox: boolean; id: string }
    | {
        type: "files"
        files: Array<InternalOrExternalFileWithNameResponse>
        id: string
      }
    | {
        type: "created_by"
        created_by: PartialUserObjectResponse | UserObjectResponse
        id: string
      }
    | { type: "created_time"; created_time: string; id: string }
    | {
        type: "last_edited_by"
        last_edited_by: PartialUserObjectResponse | UserObjectResponse
        id: string
      }
    | { type: "last_edited_time"; last_edited_time: string; id: string }
    | { type: "formula"; formula: FormulaPropertyResponse; id: string }
    | { type: "button"; button: EmptyObject; id: string }
    | {
        type: "unique_id"
        unique_id: { prefix: string | null; number: number | null }
        id: string
      }
    | {
        type: "verification"
        verification: VerificationPropertyValueResponse | null
        id: string
      }
    | { type: "title"; title: Array<RichTextItemResponse>; id: string }
    | { type: "rich_text"; rich_text: Array<RichTextItemResponse>; id: string }
    | {
        type: "people"
        people: Array<
          PartialUserObjectResponse | UserObjectResponse | GroupObjectResponse
        >
        id: string
      }
    | { type: "relation"; relation: Array<{ id: string }>; id: string }
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
              array: Array<
                | { type: "number"; number: number | null }
                | { type: "url"; url: string | null }
                | { type: "select"; select: PartialSelectResponse | null }
                | {
                    type: "multi_select"
                    multi_select: Array<PartialSelectResponse>
                  }
                | { type: "status"; status: PartialSelectResponse | null }
                | { type: "date"; date: DateResponse | null }
                | { type: "email"; email: string | null }
                | { type: "phone_number"; phone_number: string | null }
                | { type: "checkbox"; checkbox: boolean }
                | {
                    type: "files"
                    files: Array<InternalOrExternalFileWithNameResponse>
                  }
                | {
                    type: "created_by"
                    created_by: PartialUserObjectResponse | UserObjectResponse
                  }
                | { type: "created_time"; created_time: string }
                | {
                    type: "last_edited_by"
                    last_edited_by:
                      | PartialUserObjectResponse
                      | UserObjectResponse
                  }
                | { type: "last_edited_time"; last_edited_time: string }
                | { type: "formula"; formula: FormulaPropertyResponse }
                | { type: "button"; button: EmptyObject }
                | {
                    type: "unique_id"
                    unique_id: { prefix: string | null; number: number | null }
                  }
                | {
                    type: "verification"
                    verification: VerificationPropertyValueResponse | null
                  }
                | { type: "title"; title: Array<RichTextItemResponse> }
                | { type: "rich_text"; rich_text: Array<RichTextItemResponse> }
                | {
                    type: "people"
                    people: Array<
                      | PartialUserObjectResponse
                      | UserObjectResponse
                      | GroupObjectResponse
                    >
                  }
                | { type: "relation"; relation: Array<{ id: string }> }
              >
              function: RollupFunction
            }
        id: string
      }
  >
  icon: PageIconResponse | null
  cover: PageCoverResponse | null
  created_by: PartialUserObjectResponse
  last_edited_by: PartialUserObjectResponse
  // Whether the page is locked from editing in the Notion app UI.
  is_locked: boolean
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  in_trash: boolean
  url: string
  public_url: string | null
}

export type PartialPageObjectResponse = { object: "page"; id: string }

type NumberFormat = string

type PropertyDescriptionRequest = string

type NumberDatabasePropertyConfigResponse = {
  // Always `number`
  type: "number"
  number: {
    // The number format for the property.
    format: NumberFormat
  }
}

type FormulaDatabasePropertyConfigResponse = {
  // Always `formula`
  type: "formula"
  formula: { expression: string }
}

type SelectPropertyResponse = {
  id: string
  name: string
  color: SelectColor
  description: string | null
}

type SelectDatabasePropertyConfigResponse = {
  // Always `select`
  type: "select"
  select: { options: Array<SelectPropertyResponse> }
}

type MultiSelectDatabasePropertyConfigResponse = {
  // Always `multi_select`
  type: "multi_select"
  multi_select: { options: Array<SelectPropertyResponse> }
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

type SinglePropertyDatabasePropertyRelationConfigResponse = {
  // Always `single_property`
  type: "single_property"
  single_property: EmptyObject
}

type DualPropertyDatabasePropertyRelationConfigResponse = {
  // Always `dual_property`
  type?: "dual_property"
  dual_property: { synced_property_id: string; synced_property_name: string }
}

type DatabasePropertyRelationConfigResponse =
  DatabasePropertyRelationConfigResponseCommon &
    (
      | SinglePropertyDatabasePropertyRelationConfigResponse
      | DualPropertyDatabasePropertyRelationConfigResponse
    )

type RelationDatabasePropertyConfigResponse = {
  // Always `relation`
  type: "relation"
  relation: DatabasePropertyRelationConfigResponse
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

type UniqueIdDatabasePropertyConfigResponse = {
  // Always `unique_id`
  type: "unique_id"
  unique_id: {
    // The prefix for the unique ID.
    prefix: string | null
  }
}

type TitleDatabasePropertyConfigResponse = {
  // Always `title`
  type: "title"
  title: EmptyObject
}

type RichTextDatabasePropertyConfigResponse = {
  // Always `rich_text`
  type: "rich_text"
  rich_text: EmptyObject
}

type UrlDatabasePropertyConfigResponse = {
  // Always `url`
  type: "url"
  url: EmptyObject
}

type PeopleDatabasePropertyConfigResponse = {
  // Always `people`
  type: "people"
  people: EmptyObject
}

type FilesDatabasePropertyConfigResponse = {
  // Always `files`
  type: "files"
  files: EmptyObject
}

type EmailDatabasePropertyConfigResponse = {
  // Always `email`
  type: "email"
  email: EmptyObject
}

type PhoneNumberDatabasePropertyConfigResponse = {
  // Always `phone_number`
  type: "phone_number"
  phone_number: EmptyObject
}

type DateDatabasePropertyConfigResponse = {
  // Always `date`
  type: "date"
  date: EmptyObject
}

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

export type PartialDataSourceObjectResponse = {
  // The data source object type name.
  object: "data_source"
  // The ID of the data source.
  id: IdResponse
  // The properties schema of the data source.
  properties: Record<string, DatabasePropertyConfigResponse>
}

/**
 * The parent of the data source. This is typically a database (`database_id`), but for
 * externally synced data sources, can be another data source (`data_source_id`).
 */
type ParentOfDataSourceResponse =
  | DatabaseParentResponse
  | DataSourceParentResponse

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
  // Whether the data source is archived.
  archived: boolean
  // Whether the data source is in the trash.
  in_trash: boolean
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

export type PartialBlockObjectResponse = { object: "block"; id: string }

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

type ContentWithRichTextAndColorResponse = {
  rich_text: Array<RichTextItemResponse>
  color: ApiColor
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

export type NumberedListItemBlockObjectResponse = {
  type: "numbered_list_item"
  numbered_list_item: ContentWithRichTextAndColorResponse
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type TitleObjectResponse = { title: string }

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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type ExpressionObjectResponse = { expression: string }

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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type ColumnResponse = {
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type ContentWithTableResponse = {
  has_column_header: boolean
  has_row_header: boolean
  table_width: number
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
  archived: boolean
  in_trash: boolean
}

type ContentWithTableRowResponse = { cells: Array<Array<RichTextItemResponse>> }

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
  archived: boolean
  in_trash: boolean
}

type MediaContentWithUrlAndCaptionResponse = {
  url: string
  caption: Array<RichTextItemResponse>
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type ExternalMediaContentWithFileAndCaptionResponse = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
}

type FileMediaContentWithFileAndCaptionResponse = {
  type: "file"
  file: InternalFileResponse
  caption: Array<RichTextItemResponse>
}

type MediaContentWithFileAndCaptionResponse =
  | ExternalMediaContentWithFileAndCaptionResponse
  | FileMediaContentWithFileAndCaptionResponse

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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type ExternalMediaContentWithFileNameAndCaptionResponse = {
  type: "external"
  external: { url: TextRequest }
  caption: Array<RichTextItemResponse>
  name: string
}

type FileMediaContentWithFileNameAndCaptionResponse = {
  type: "file"
  file: InternalFileResponse
  caption: Array<RichTextItemResponse>
  name: string
}

type MediaContentWithFileNameAndCaptionResponse =
  | ExternalMediaContentWithFileNameAndCaptionResponse
  | FileMediaContentWithFileNameAndCaptionResponse

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
  archived: boolean
  in_trash: boolean
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
  archived: boolean
  in_trash: boolean
}

type MediaContentWithUrlResponse = { url: TextRequest }

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
  archived: boolean
  in_trash: boolean
}

export type UnsupportedBlockObjectResponse = {
  type: "unsupported"
  unsupported: EmptyObject
  parent: ParentForBlockBasedObjectResponse
  object: "block"
  id: string
  created_time: string
  created_by: PartialUserObjectResponse
  last_edited_time: string
  last_edited_by: PartialUserObjectResponse
  has_children: boolean
  archived: boolean
  in_trash: boolean
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
  | EmbedBlockObjectResponse
  | BookmarkBlockObjectResponse
  | ImageBlockObjectResponse
  | VideoBlockObjectResponse
  | PdfBlockObjectResponse
  | FileBlockObjectResponse
  | AudioBlockObjectResponse
  | LinkPreviewBlockObjectResponse
  | UnsupportedBlockObjectResponse

export type NumberPropertyItemObjectResponse = {
  type: "number"
  number: number | null
  object: "property_item"
  id: string
}

export type UrlPropertyItemObjectResponse = {
  type: "url"
  url: string | null
  object: "property_item"
  id: string
}

export type SelectPropertyItemObjectResponse = {
  type: "select"
  select: PartialSelectResponse | null
  object: "property_item"
  id: string
}

export type MultiSelectPropertyItemObjectResponse = {
  type: "multi_select"
  multi_select: Array<PartialSelectResponse>
  object: "property_item"
  id: string
}

export type StatusPropertyItemObjectResponse = {
  type: "status"
  status: PartialSelectResponse | null
  object: "property_item"
  id: string
}

export type DatePropertyItemObjectResponse = {
  type: "date"
  date: DateResponse | null
  object: "property_item"
  id: string
}

export type EmailPropertyItemObjectResponse = {
  type: "email"
  email: string | null
  object: "property_item"
  id: string
}

export type PhoneNumberPropertyItemObjectResponse = {
  type: "phone_number"
  phone_number: string | null
  object: "property_item"
  id: string
}

export type CheckboxPropertyItemObjectResponse = {
  type: "checkbox"
  checkbox: boolean
  object: "property_item"
  id: string
}

export type FilesPropertyItemObjectResponse = {
  type: "files"
  files: Array<InternalOrExternalFileWithNameResponse>
  object: "property_item"
  id: string
}

export type CreatedByPropertyItemObjectResponse = {
  type: "created_by"
  created_by: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type CreatedTimePropertyItemObjectResponse = {
  type: "created_time"
  created_time: string
  object: "property_item"
  id: string
}

export type LastEditedByPropertyItemObjectResponse = {
  type: "last_edited_by"
  last_edited_by: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type LastEditedTimePropertyItemObjectResponse = {
  type: "last_edited_time"
  last_edited_time: string
  object: "property_item"
  id: string
}

export type FormulaPropertyItemObjectResponse = {
  type: "formula"
  formula: FormulaPropertyResponse
  object: "property_item"
  id: string
}

export type ButtonPropertyItemObjectResponse = {
  type: "button"
  button: EmptyObject
  object: "property_item"
  id: string
}

export type UniqueIdPropertyItemObjectResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null; number: number | null }
  object: "property_item"
  id: string
}

export type VerificationPropertyItemObjectResponse = {
  type: "verification"
  verification: VerificationPropertyValueResponse | null
  object: "property_item"
  id: string
}

export type TitlePropertyItemObjectResponse = {
  type: "title"
  title: RichTextItemResponse
  object: "property_item"
  id: string
}

export type RichTextPropertyItemObjectResponse = {
  type: "rich_text"
  rich_text: RichTextItemResponse
  object: "property_item"
  id: string
}

export type PeoplePropertyItemObjectResponse = {
  type: "people"
  people: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type RelationPropertyItemObjectResponse = {
  type: "relation"
  relation: { id: string }
  object: "property_item"
  id: string
}

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

export type PropertyItemListResponse = PropertyItemPropertyItemListResponse

type DatabasePropertyRelationConfigResponseCommon = {
  database_id: IdResponse
  data_source_id: IdResponse
}

type DatabasePropertyConfigResponseCommon = {
  // The ID of the property.
  id: string
  // The name of the property.
  name: string
  // The description of the property.
  description: PropertyDescriptionRequest | null
}

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

export type RichTextItemResponseCommon = {
  // The plain text content of the rich text object, without any styling.
  plain_text: string
  // A URL that the rich text object links to or mentions.
  href: string | null
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations: AnnotationResponse
}

type ParentOfDatabaseResponse =
  | PageIdParentForBlockBasedObjectResponse
  | WorkspaceParentForBlockBasedObjectResponse
  | DatabaseParentResponse
  | BlockIdParentForBlockBasedObjectResponse

export type PartialCommentObjectResponse = {
  // The comment object type name.
  object: "comment"
  // The ID of the comment.
  id: IdResponse
}

type PageIdCommentParentResponse = {
  // Always `page_id`
  type: "page_id"
  page_id: IdResponse
}

type BlockIdCommentParentResponse = {
  // Always `block_id`
  type: "block_id"
  block_id: IdResponse
}

type CommentParentResponse =
  | PageIdCommentParentResponse
  | BlockIdCommentParentResponse

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

export type PartialDatabaseObjectResponse = {
  // The database object type name.
  object: "database"
  // The ID of the database.
  id: IdResponse
}

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

type PartialUserObjectRequest = {
  // The ID of the user.
  id: IdRequest
  // The user object type name.
  object?: "user"
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

type TemplateMentionRequest =
  | TemplateMentionDateTemplateMentionRequest
  | TemplateMentionUserTemplateMentionRequest

type RichTextItemRequest = RichTextItemRequestCommon &
  (
    | TextRichTextItemRequest
    | MentionRichTextItemRequest
    | EquationRichTextItemRequest
  )

type GroupObjectRequest = {
  id: IdRequest
  name?: string | null
  object?: "group"
}

type RelationItemPropertyValueResponse = { id: IdRequest }

type InternalFileRequest = { url: string; expiry_time?: string }

type ExternalFileRequest = { url: TextRequest }

type InternalOrExternalFileWithNameRequest =
  | { file: InternalFileRequest; name: StringRequest; type?: "file" }
  | { external: ExternalFileRequest; name: StringRequest; type?: "external" }

type FileUploadIdRequest = { id: IdRequest }

type FileUploadWithOptionalNameRequest = {
  file_upload: FileUploadIdRequest
  type?: "file_upload"
  name?: StringRequest
}

type PageIconRequest =
  | FileUploadPageIconRequest
  | EmojiPageIconRequest
  | ExternalPageIconRequest
  | CustomEmojiPageIconRequest

type PageCoverRequest = FileUploadPageCoverRequest | ExternalPageCoverRequest

type MediaContentWithUrlAndCaptionRequest = {
  url: string
  caption?: Array<RichTextItemRequest>
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

type ContentWithExpressionRequest = { expression: string }

type ContentWithTableRowRequest = { cells: Array<Array<RichTextItemRequest>> }

type TableRowRequest = {
  table_row: ContentWithTableRowRequest
  type?: "table_row"
  object?: "block"
}

type TableRequestWithTableRowChildren = {
  table_width: number
  children: Array<TableRowRequest>
  has_column_header?: boolean
  has_row_header?: boolean
}

type HeaderContentWithRichTextAndColorRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
}

type ContentWithRichTextAndColorRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
}

type ContentWithRichTextRequest = { rich_text: Array<RichTextItemRequest> }

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

type HeaderContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
  children?: Array<BlockObjectRequestWithoutChildren>
}

type ContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  children?: Array<BlockObjectRequestWithoutChildren>
}

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

type ColumnWithChildrenRequest = {
  children: Array<BlockObjectWithSingleLevelOfChildrenRequest>
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
}

type ColumnBlockWithChildrenRequest = {
  column: ColumnWithChildrenRequest
  type?: "column"
  object?: "block"
}

type ColumnListRequest = { children: Array<ColumnBlockWithChildrenRequest> }

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

type UpdateMediaContentWithUrlAndCaptionRequest = {
  url?: string
  caption?: Array<RichTextItemRequest>
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

type ExistencePropertyFilter = { is_empty: true } | { is_not_empty: true }

type TextPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | { contains: string }
  | { does_not_contain: string }
  | { starts_with: string }
  | { ends_with: string }
  | ExistencePropertyFilter

type NumberPropertyFilter =
  | { equals: number }
  | { does_not_equal: number }
  | { greater_than: number }
  | { less_than: number }
  | { greater_than_or_equal_to: number }
  | { less_than_or_equal_to: number }
  | ExistencePropertyFilter

type CheckboxPropertyFilter = { equals: boolean } | { does_not_equal: boolean }

type SelectPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

type MultiSelectPropertyFilter =
  | { contains: string }
  | { does_not_contain: string }
  | ExistencePropertyFilter

type StatusPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

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

type PeoplePropertyFilter =
  | { contains: IdRequest }
  | { does_not_contain: IdRequest }
  | ExistencePropertyFilter

type RelationPropertyFilter =
  | { contains: IdRequest }
  | { does_not_contain: IdRequest }
  | ExistencePropertyFilter

type FormulaPropertyFilter =
  | { string: TextPropertyFilter }
  | { checkbox: CheckboxPropertyFilter }
  | { number: NumberPropertyFilter }
  | { date: DatePropertyFilter }

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

type RollupPropertyFilter =
  | { any: RollupSubfilterPropertyFilter }
  | { none: RollupSubfilterPropertyFilter }
  | { every: RollupSubfilterPropertyFilter }
  | { date: DatePropertyFilter }
  | { number: NumberPropertyFilter }

type VerificationPropertyStatusFilter = {
  status: "verified" | "expired" | "none"
}

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

type TimestampCreatedTimeFilter = {
  created_time: DatePropertyFilter
  timestamp: "created_time"
  type?: "created_time"
}

type TimestampLastEditedTimeFilter = {
  last_edited_time: DatePropertyFilter
  timestamp: "last_edited_time"
  type?: "last_edited_time"
}

type TimestampFilter =
  | TimestampCreatedTimeFilter
  | TimestampLastEditedTimeFilter

type PropertyOrTimestampFilter = PropertyFilter | TimestampFilter

type PropertyOrTimestampFilterArray = Array<PropertyOrTimestampFilter>

type GroupFilterOperatorArray = Array<
  | PropertyOrTimestampFilter
  | { or: PropertyOrTimestampFilterArray }
  | { and: PropertyOrTimestampFilterArray }
>

type ParentOfDataSourceRequest = {
  // Always `database_id`
  type?: "database_id"
  // The ID of the parent database (with or without dashes), for example,
  // 195de9221179449fab8075a27c979105
  database_id: IdRequest
}

type NumberPropertyConfigurationRequest = {
  // Always `number`
  type?: "number"
  number: { format?: NumberFormat }
}

type FormulaPropertyConfigurationRequest = {
  // Always `formula`
  type?: "formula"
  formula: { expression?: string }
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

type StatusPropertyConfigurationRequest = {
  // Always `status`
  type?: "status"
  status: EmptyObject
}

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

type UniqueIdPropertyConfigurationRequest = {
  // Always `unique_id`
  type?: "unique_id"
  unique_id: { prefix?: string | null }
}

type TitlePropertyConfigurationRequest = {
  // Always `title`
  type?: "title"
  title: EmptyObject
}

type RichTextPropertyConfigurationRequest = {
  // Always `rich_text`
  type?: "rich_text"
  rich_text: EmptyObject
}

type UrlPropertyConfigurationRequest = {
  // Always `url`
  type?: "url"
  url: EmptyObject
}

type PeoplePropertyConfigurationRequest = {
  // Always `people`
  type?: "people"
  people: EmptyObject
}

type FilesPropertyConfigurationRequest = {
  // Always `files`
  type?: "files"
  files: EmptyObject
}

type EmailPropertyConfigurationRequest = {
  // Always `email`
  type?: "email"
  email: EmptyObject
}

type PhoneNumberPropertyConfigurationRequest = {
  // Always `phone_number`
  type?: "phone_number"
  phone_number: EmptyObject
}

type DatePropertyConfigurationRequest = {
  // Always `date`
  type?: "date"
  date: EmptyObject
}

type CheckboxPropertyConfigurationRequest = {
  // Always `checkbox`
  type?: "checkbox"
  checkbox: EmptyObject
}

type CreatedByPropertyConfigurationRequest = {
  // Always `created_by`
  type?: "created_by"
  created_by: EmptyObject
}

type CreatedTimePropertyConfigurationRequest = {
  // Always `created_time`
  type?: "created_time"
  created_time: EmptyObject
}

type LastEditedByPropertyConfigurationRequest = {
  // Always `last_edited_by`
  type?: "last_edited_by"
  last_edited_by: EmptyObject
}

type LastEditedTimePropertyConfigurationRequest = {
  // Always `last_edited_time`
  type?: "last_edited_time"
  last_edited_time: EmptyObject
}

type ButtonPropertyConfigurationRequest = {
  // Always `button`
  type?: "button"
  button: EmptyObject
}

type LocationPropertyConfigurationRequest = {
  // Always `location`
  type?: "location"
  location: EmptyObject
}

type VerificationPropertyConfigurationRequest = {
  // Always `verification`
  type?: "verification"
  verification: EmptyObject
}

type LastVisitedTimePropertyConfigurationRequest = {
  // Always `last_visited_time`
  type?: "last_visited_time"
  last_visited_time: EmptyObject
}

type PlacePropertyConfigurationRequest = {
  // Always `place`
  type?: "place"
  place: EmptyObject
}

type PropertyConfigurationRequestCommon = {
  // The description of the property.
  description?: PropertyDescriptionRequest | null
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

type TemplateMentionDateTemplateMentionRequest = {
  // Always `template_mention_date`
  type?: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionUserTemplateMentionRequest = {
  // Always `template_mention_user`
  type?: "template_mention_user"
  // The user of the template mention.
  template_mention_user: "me"
}

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

type RichTextItemRequestCommon = {
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations?: AnnotationRequest
}

type FileUploadPageIconRequest = {
  // Always `file_upload`
  type?: "file_upload"
  file_upload: {
    // ID of a FileUpload object that has the status `uploaded`.
    id: string
  }
}

type EmojiPageIconRequest = {
  // Always `emoji`
  type?: "emoji"
  // An emoji character.
  emoji: EmojiRequest
}

type ExternalPageIconRequest = {
  // Always `external`
  type?: "external"
  external: {
    // The URL of the external file.
    url: string
  }
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

type InitialDataSourceRequest = {
  // Property schema for the initial data source, if you'd like to create one.
  properties?: Record<string, PropertyConfigurationRequest>
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

type ExternalPageCoverRequest = {
  // Always `external`
  type?: "external"
  // External URL for the cover.
  external: {
    // The URL of the external file.
    url: string
  }
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
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  content?: Array<BlockObjectRequest>
  children?: Array<BlockObjectRequest>
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
  bodyParams: ["parent", "properties", "icon", "cover", "content", "children"],

  path: (): string => `pages`,
} as const

type GetPagePathParameters = {
  page_id: IdRequest
}

type GetPageQueryParameters = {
  filter_properties?: Array<string>
}

export type GetPageParameters = GetPagePathParameters & GetPageQueryParameters

export type GetPageResponse = PageObjectResponse | PartialPageObjectResponse

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
  >
  icon?: PageIconRequest | null
  cover?: PageCoverRequest | null
  // Whether the page should be locked from editing in the Notion app UI. If not provided,
  // the locked state will not be updated.
  is_locked?: boolean
  archived?: boolean
  in_trash?: boolean
}

export type UpdatePageParameters = UpdatePagePathParameters &
  UpdatePageBodyParameters

export type UpdatePageResponse = PageObjectResponse | PartialPageObjectResponse

/**
 * Update page properties
 */
export const updatePage = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: [
    "properties",
    "icon",
    "cover",
    "is_locked",
    "archived",
    "in_trash",
  ],

  path: (p: UpdatePagePathParameters): string => `pages/${p.page_id}`,
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
      archived?: boolean
      in_trash?: boolean
    }
  | {
      bookmark: UpdateMediaContentWithUrlAndCaptionRequest
      type?: "bookmark"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      image: UpdateMediaContentWithFileAndCaptionRequest
      type?: "image"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      video: UpdateMediaContentWithFileAndCaptionRequest
      type?: "video"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      pdf: UpdateMediaContentWithFileAndCaptionRequest
      type?: "pdf"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      file: UpdateMediaContentWithFileNameAndCaptionRequest
      type?: "file"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      audio: UpdateMediaContentWithFileAndCaptionRequest
      type?: "audio"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      code: {
        rich_text?: Array<RichTextItemRequest>
        language?: LanguageRequest
        caption?: Array<RichTextItemRequest>
      }
      type?: "code"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      equation: ContentWithExpressionRequest
      type?: "equation"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      divider: EmptyObject
      type?: "divider"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      breadcrumb: EmptyObject
      type?: "breadcrumb"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      table_of_contents: { color?: ApiColor }
      type?: "table_of_contents"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      link_to_page:
        | { page_id: IdRequest; type?: "page_id" }
        | { database_id: IdRequest; type?: "database_id" }
        | { comment_id: IdRequest; type?: "comment_id" }
      type?: "link_to_page"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      table_row: ContentWithTableRowRequest
      type?: "table_row"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      heading_1: HeaderContentWithRichTextAndColorRequest
      type?: "heading_1"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      heading_2: HeaderContentWithRichTextAndColorRequest
      type?: "heading_2"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      heading_3: HeaderContentWithRichTextAndColorRequest
      type?: "heading_3"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      paragraph: ContentWithRichTextAndColorRequest
      type?: "paragraph"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      bulleted_list_item: ContentWithRichTextAndColorRequest
      type?: "bulleted_list_item"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      numbered_list_item: ContentWithRichTextAndColorRequest
      type?: "numbered_list_item"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      quote: ContentWithRichTextAndColorRequest
      type?: "quote"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      to_do: {
        rich_text?: Array<RichTextItemRequest>
        checked?: boolean
        color?: ApiColor
      }
      type?: "to_do"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      toggle: ContentWithRichTextAndColorRequest
      type?: "toggle"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      template: ContentWithRichTextRequest
      type?: "template"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      callout: {
        rich_text?: Array<RichTextItemRequest>
        icon?: PageIconRequest
        color?: ApiColor
      }
      type?: "callout"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      synced_block: {
        synced_from: { block_id: IdRequest; type?: "block_id" } | null
      }
      type?: "synced_block"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      table: { has_column_header?: boolean; has_row_header?: boolean }
      type?: "table"
      archived?: boolean
      in_trash?: boolean
    }
  | {
      column: {
        // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
        // If not provided, uses an equal width.
        width_ratio?: number
      }
      type?: "column"
      archived?: boolean
      in_trash?: boolean
    }
  | { archived?: boolean; in_trash?: boolean }

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
    "embed",
    "type",
    "archived",
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
  after?: IdRequest
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
  bodyParams: ["children", "after"],

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
  // Whether the database should be moved to or from the trash. If not provided, the trash
  // status will not be updated. Equivalent to `in_trash`.
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
  bodyParams: ["title", "icon", "properties", "in_trash", "archived", "parent"],

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
  archived?: boolean
  in_trash?: boolean
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
    "sorts",
    "filter",
    "start_cursor",
    "page_size",
    "archived",
    "in_trash",
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
