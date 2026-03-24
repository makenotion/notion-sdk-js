// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

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
export type ApiColor =
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

type BlockIdParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "block_id"
  // The ID of the parent block.
  block_id: IdResponse
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

type ButtonPropertyConfigurationRequest = {
  // Always `button`
  type?: "button"
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

type ChartAggregationRequest = {
  // The aggregation operator. "count" counts all rows and does not require a property_id.
  // All other operators require a property_id.
  aggregator:
    | "count"
    | "count_values"
    | "sum"
    | "average"
    | "median"
    | "min"
    | "max"
    | "range"
    | "unique"
    | "empty"
    | "not_empty"
    | "percent_empty"
    | "percent_not_empty"
    | "checked"
    | "unchecked"
    | "percent_checked"
    | "percent_unchecked"
    | "earliest_date"
    | "latest_date"
    | "date_range"
  // The property to aggregate on. Required for all operators except "count".
  property_id?: string
}

type ChartReferenceLineRequest = {
  // The y-axis value where the reference line is drawn.
  value: number
  // Label displayed alongside the reference line.
  label: string
  // Color of the reference line.
  color:
    | "gray"
    | "lightgray"
    | "brown"
    | "yellow"
    | "orange"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
  // Line style: "solid" for a continuous line, "dash" for a dashed line.
  dash_style: "solid" | "dash"
  // Unique identifier for the reference line. Auto-generated if omitted.
  id?: string
}

type ChartViewConfigRequest = {
  // The view type. Must be "chart".
  type: "chart"
  // The chart type.
  chart_type: "column" | "bar" | "line" | "donut" | "number"
  // X-axis grouping configuration for grouped data mode. Pass null to clear.
  x_axis?: GroupByConfigRequest | null
  // Y-axis aggregation for grouped data mode. Pass null to clear.
  y_axis?: ChartAggregationRequest | null
  // Property ID for x-axis values in results mode. Pass null to clear.
  x_axis_property_id?: string | null
  // Property ID for y-axis values in results mode. Pass null to clear.
  y_axis_property_id?: string | null
  // Aggregation for number charts. Pass null to clear.
  value?: ChartAggregationRequest | null
  // Sort order for chart data. Pass null to clear.
  sort?:
    | "manual"
    | "x_ascending"
    | "x_descending"
    | "y_ascending"
    | "y_descending"
    | null
  // Color theme. Pass null to clear.
  color_theme?:
    | "gray"
    | "blue"
    | "yellow"
    | "green"
    | "purple"
    | "teal"
    | "orange"
    | "pink"
    | "red"
    | "auto"
    | "colorful"
    | null
  // Chart height. Pass null to clear.
  height?: "small" | "medium" | "large" | "extra_large" | null
  // Whether to hide groups with no data. Pass null to clear.
  hide_empty_groups?: boolean | null
  // Legend position. Pass null to clear.
  legend_position?: "off" | "bottom" | "side" | null
  // Whether to show data labels. Pass null to clear.
  show_data_labels?: boolean | null
  // Which axis labels to show. Pass null to clear.
  axis_labels?: "none" | "x_axis" | "y_axis" | "both" | null
  // Which grid lines to show. Pass null to clear.
  grid_lines?: "none" | "horizontal" | "vertical" | "both" | null
  // Cumulative values (line only). Pass null to clear.
  cumulative?: boolean | null
  // Smooth line curves (line only). Pass null to clear.
  smooth_line?: boolean | null
  // Hide area fill (line only). Pass null to clear.
  hide_line_fill_area?: boolean | null
  // Grouped/stacked bar display style. Pass null to clear.
  group_style?: "normal" | "percent" | "side_by_side" | null
  // Custom y-axis minimum. Pass null to clear.
  y_axis_min?: number | null
  // Custom y-axis maximum. Pass null to clear.
  y_axis_max?: number | null
  // Donut slice labels. Pass null to clear.
  donut_labels?: "none" | "value" | "name" | "name_and_value" | null
  // Hide title (number only). Pass null to clear.
  hide_title?: boolean | null
  // Stack-by grouping for stacked/grouped bar charts. Pass null to clear.
  stack_by?: GroupByConfigRequest | null
  // Reference lines on the chart. Pass null to clear.
  reference_lines?: Array<ChartReferenceLineRequest> | null
  // Chart caption text. Pass null to clear.
  caption?: string | null
  // Whether to color chart elements by their numeric value (gradient coloring). Pass null
  // to clear.
  color_by_value?: boolean | null
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

type CheckboxPropertyConfigurationRequest = {
  // Always `checkbox`
  type?: "checkbox"
  checkbox: EmptyObject
}

type CheckboxPropertyFilter = { equals: boolean } | { does_not_equal: boolean }

export type ContentPositionSchema =
  | { type: "after_block"; after_block: { id: IdRequest } }
  | { type: "start" }
  | { type: "end" }

type CoverConfigRequest = {
  // Source of the cover image.
  type: "page_cover" | "page_content" | "property"
  // Property ID when type is "property".
  property_id?: string
}

type CreateDatabaseForViewRequest = {
  // The parent page for the new linked database block.
  parent: {
    // The parent type. Must be "page_id".
    type: "page_id"
    // The ID of the page to create the database on.
    page_id: IdRequest
  }
  // Where to place the new database block within the parent page. Defaults to appending at
  // the end.
  position?: {
    // Position type. "after_block" places the new database after the specified block in the
    // page.
    type: "after_block"
    // The ID of an existing block in the page. The new database will be placed after this
    // block.
    block_id: IdRequest
  }
}

export type CreateViewQueryRequest = {
  // The number of results to return per page. Maximum: 100
  page_size?: number
}

export type CreateViewRequest = {
  // The ID of the data source this view should be scoped to.
  data_source_id: IdRequest
  // The name of the view.
  name: string
  // The type of view to create.
  type: ViewTypeRequest
  // The ID of the database to create a view in. Mutually exclusive with view_id and
  // create_database.
  database_id?: IdRequest
  // The ID of a dashboard view to add this view to as a widget. Mutually exclusive with
  // database_id and create_database.
  view_id?: IdRequest
  // Filter to apply to the view. Uses the same format as the data source query filter.
  filter?: ViewFilterRequest
  // Sorts to apply to the view. Uses the same format as the data source query sorts.
  sorts?: ViewSortsRequest
  // Quick filters to pin in the view's filter bar. Keys are property names or IDs. Values
  // are filter conditions (same shape as a property filter but without the property
  // field). Each quick filter appears as a clickable pill above the view, independent of
  // the advanced filter.
  quick_filters?: Record<string, QuickFilterConditionRequest>
  // Create a new linked database block on a page and add the view to it. Mutually
  // exclusive with database_id and view_id.
  create_database?: CreateDatabaseForViewRequest
  // View presentation configuration. The type field must match the view type.
  configuration?: ViewConfigRequest
  // Where to place the new view in the database's view tab bar. Only applicable when
  // database_id is provided. Defaults to "end" (append).
  position?: ViewPositionRequest
  // Where to place the new widget in a dashboard view. Only applicable when view_id is
  // provided. Defaults to creating a new row at the end.
  placement?: WidgetPlacementRequest
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

type CustomEmojiPageIconResponse = {
  // Type of icon. In this case, a custom emoji.
  type: "custom_emoji"
  // The custom emoji details for the icon.
  custom_emoji: CustomEmojiResponse
}

export type CustomEmojiResponse = {
  // The ID of the custom emoji.
  id: IdResponse
  // The name of the custom emoji.
  name: string
  // The URL of the custom emoji.
  url: string
}

export type DataSourceParentResponse = {
  // The parent type.
  type: "data_source_id"
  // The ID of the parent data source.
  data_source_id: IdResponse
  // The ID of the data source's parent database.
  database_id: IdResponse
}

export type DataSourceViewReferenceResponse = {
  // The object type name.
  object: "view"
  // The ID of the view.
  id: IdResponse
}

export type DatabaseParentResponse = {
  // The parent type.
  type: "database_id"
  // The ID of the parent database.
  database_id: IdResponse
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

export type DateResponse = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end: string | null
  // The time zone of the date object.
  time_zone: TimeZoneRequest | null
}

type EmailPropertyConfigurationRequest = {
  // Always `email`
  type?: "email"
  email: EmptyObject
}

type EmojiPageIconResponse = {
  // Type of icon. In this case, an emoji.
  type: "emoji"
  // The emoji character used as the icon.
  emoji: EmojiRequest
}

type EmojiRequest = string

export type EmptyObject = Record<string, never>

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

type ExternalPageIconResponse = {
  // Type of icon. In this case, an external URL.
  type: "external"
  // The external URL for the icon.
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

type FilePageIconResponse = {
  // Type of icon. In this case, a file.
  type: "file"
  // The file URL for the icon.
  file: InternalFileResponse
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

export type FileUploadWithOptionalNameRequest = {
  file_upload: FileUploadIdRequest
  type?: "file_upload"
  name?: StringRequest
}

type FilesPropertyConfigurationRequest = {
  // Always `files`
  type?: "files"
  files: EmptyObject
}

type FormViewConfigRequest = {
  // The view type. Must be "form".
  type: "form"
  // Whether the form is closed for submissions. Pass null to clear.
  is_form_closed?: boolean | null
  // Whether anonymous (non-logged-in) submissions are allowed. Pass null to clear.
  anonymous_submissions?: boolean | null
  // Permission level granted to the submitter on the created page after form submission.
  // Pass null to clear.
  submission_permissions?:
    | "none"
    | "comment_only"
    | "reader"
    | "read_and_write"
    | "editor"
    | null
}

type FormulaCheckboxSubGroupByRequest = {
  // The formula result type for grouping.
  type: "checkbox"
  // Sort order for groups.
  sort: GroupSortRequest
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

type FormulaTextSubGroupByRequest = {
  // The formula result type for grouping.
  type: "text"
  // How to group text values. "exact" = exact match, "alphabet_prefix" = first letter.
  group_by: "exact" | "alphabet_prefix"
  // Sort order for groups.
  sort: GroupSortRequest
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

export type GroupFilterOperatorArray = Array<
  | PropertyOrTimestampFilter
  | { or: PropertyOrTimestampFilterArray }
  | { and: PropertyOrTimestampFilterArray }
>

export type GroupObjectRequest = {
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

type IconPageIconResponse = {
  // Type of icon. In this case, a Notion native icon.
  type: "icon"
  // The Notion native icon, specified by name and color.
  icon: NoticonIconResponse
}

export type IdRequest = string

export type IdResponse = string

export type InitialDataSourceRequest = {
  // Property schema for the initial data source, if you'd like to create one.
  properties?: Record<string, PropertyConfigurationRequest>
}

type InternalFileRequest = { url: string; expiry_time?: string }

export type InternalFileResponse = {
  // The URL of the file.
  url: string
  // The time when the URL will expire.
  expiry_time: string
}

export type InternalOrExternalFileWithNameRequest =
  | { file: InternalFileRequest; name: StringRequest; type?: "file" }
  | { external: ExternalFileRequest; name: StringRequest; type?: "external" }

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

type LinkPreviewMentionResponse = {
  // The URL of the link preview mention.
  url: string
}

type ListViewConfigRequest = {
  // The view type. Must be "list".
  type: "list"
  // Property visibility and display configuration. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
}

type LocationPropertyConfigurationRequest = {
  // Always `location`
  type?: "location"
  location: EmptyObject
}

type MapViewConfigRequest = {
  // The view type. Must be "map".
  type: "map"
  // Map display height. Pass null to clear.
  height?: "small" | "medium" | "large" | "extra_large" | null
  // Property ID of the location property used to position items on the map. Pass null to
  // clear.
  map_by?: string | null
  // Property visibility and display configuration on map pin cards. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
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

/**
 * One of: `gray`, `lightgray`, `brown`, `yellow`, `orange`, `green`, `blue`, `purple`,
 * `pink`, `red`
 */
type NoticonColor =
  | "gray"
  | "lightgray"
  | "brown"
  | "yellow"
  | "orange"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"

type NoticonIconResponse = {
  // The name of the Notion icon (e.g. pizza, meeting, home). See the Notion icon picker
  // for valid names.
  name: NoticonName
  // The color variant of the icon. Valid values: gray, lightgray, brown, yellow, orange,
  // green, blue, purple, pink, red.
  color: NoticonColor
}

type NoticonName = string

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

export type PageCoverRequest =
  | FileUploadPageCoverRequest
  | ExternalPageCoverRequest

export type PageCoverResponse =
  | FilePageCoverResponse
  | ExternalPageCoverResponse

export type PageIconResponse =
  | EmojiPageIconResponse
  | FilePageIconResponse
  | ExternalPageIconResponse
  | CustomEmojiPageIconResponse
  | IconPageIconResponse

type PageIdParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "page_id"
  // The ID of the parent page.
  page_id: IdResponse
}

export type PageMarkdownResponse = {
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

export type PagePositionSchema =
  | { type: "after_block"; after_block: { id: IdRequest } }
  | { type: "page_start" }
  | { type: "page_end" }

export type ParentForBlockBasedObjectResponse =
  | DatabaseParentResponse
  | DataSourceParentResponse
  | PageIdParentForBlockBasedObjectResponse
  | BlockIdParentForBlockBasedObjectResponse
  | WorkspaceParentForBlockBasedObjectResponse

export type ParentOfDataSourceRequest = {
  // Always `database_id`
  type?: "database_id"
  // The ID of the parent database (with or without dashes), for example,
  // 195de9221179449fab8075a27c979105
  database_id: IdRequest
}

export type ParentOfDatabaseResponse =
  | PageIdParentForBlockBasedObjectResponse
  | WorkspaceParentForBlockBasedObjectResponse
  | DatabaseParentResponse
  | BlockIdParentForBlockBasedObjectResponse

export type PartialUserObjectResponse = {
  id: IdResponse
  // Always `user`
  object: "user"
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

export type PersonUserObjectResponse = {
  // Indicates this user is a person.
  type: "person"
  // Details about the person, when the `type` of the user is `person`.
  person: {
    // The email of the person.
    email?: string
  }
}

type PhoneNumberPropertyConfigurationRequest = {
  // Always `phone_number`
  type?: "phone_number"
  phone_number: EmptyObject
}

type PlacePropertyConfigurationRequest = {
  // Always `place`
  type?: "place"
  place: EmptyObject
}

export type PropertyConfigurationRequest = PropertyConfigurationRequestCommon &
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

export type PropertyFilter =
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

type PropertyOrTimestampFilter = PropertyFilter | TimestampFilter

type PropertyOrTimestampFilterArray = Array<PropertyOrTimestampFilter>

/**
 * A property filter condition. Same shape as a property filter but without the
 * "property" field (the hashmap key identifies the property). For example: { "select": {
 * "equals": "High" } }.
 */
type QuickFilterConditionRequest = Record<string, never>

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

export type RollupFunction =
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
export type SelectColor =
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

/**
 * One of: `ascending`, `descending`
 */
type SortDirectionRequest = "ascending" | "descending"

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

type StatusPropertyConfigRequest = {
  // The initial status options. If not provided, defaults are created.
  options?: Array<{
    name: string
    color?: SelectColor
    description?: string | null
  }>
}

export type StatusPropertyConfigUpdateRequest = {
  // Status options to add or update. New options are assigned to the To-do group.
  options?: Array<
    { color?: SelectColor; description?: string | null } & (
      | { name: string; id?: string }
      | { id: string; name?: string }
    )
  >
}

type StatusPropertyConfigurationRequest = {
  // Always `status`
  type?: "status"
  status: StatusPropertyConfigRequest
}

type StatusPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | ExistencePropertyFilter

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

type TableViewConfigRequest = {
  // The view type. Must be "table".
  type: "table"
  // Property visibility and display configuration. Pass null to clear.
  properties?: Array<ViewPropertyConfigRequest> | null
  // Group-by configuration for the table. Pass null to remove grouping.
  group_by?: GroupByConfigRequest | null
  // Subtask (sub-item) configuration. Pass null to reset subtask config to defaults (which
  // may show subtasks). Use `{ "display_mode": "disabled" }` to explicitly disable
  // subtasks.
  subtasks?: SubtaskConfigRequest | null
  // Whether to wrap cell content in the table.
  wrap_cells?: boolean
  // Number of columns frozen from the left side of the table.
  frozen_column_index?: number
  // Whether to show vertical grid lines between columns.
  show_vertical_lines?: boolean
}

type TemplateMentionDateTemplateMentionResponse = {
  // Always `template_mention_date`
  type: "template_mention_date"
  // The date of the template mention.
  template_mention_date: "today" | "now"
}

type TemplateMentionResponse =
  | TemplateMentionDateTemplateMentionResponse
  | TemplateMentionUserTemplateMentionResponse

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
export type TemplateTimezone = string

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

type TextPropertyFilter =
  | { equals: string }
  | { does_not_equal: string }
  | { contains: string }
  | { does_not_contain: string }
  | { starts_with: string }
  | { ends_with: string }
  | ExistencePropertyFilter

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

type TimestampCreatedTimeFilter = {
  created_time: DatePropertyFilter
  timestamp: "created_time"
  type?: "created_time"
}

export type TimestampFilter =
  | TimestampCreatedTimeFilter
  | TimestampLastEditedTimeFilter

type TimestampLastEditedTimeFilter = {
  last_edited_time: DatePropertyFilter
  timestamp: "last_edited_time"
  type?: "last_edited_time"
}

type TitlePropertyConfigurationRequest = {
  // Always `title`
  type?: "title"
  title: EmptyObject
}

type UniqueIdPropertyConfigurationRequest = {
  // Always `unique_id`
  type?: "unique_id"
  unique_id: { prefix?: string | null }
}

export type UpdateMediaContentWithFileAndCaptionRequest = {
  caption?: Array<RichTextItemRequest>
  external?: ExternalFileRequest
  file_upload?: FileUploadIdRequest
}

export type UpdateMediaContentWithFileNameAndCaptionRequest = {
  caption?: Array<RichTextItemRequest>
  external?: ExternalFileRequest
  file_upload?: FileUploadIdRequest
  name?: StringRequest
}

export type UpdateMediaContentWithUrlAndCaptionRequest = {
  url?: string
  caption?: Array<RichTextItemRequest>
}

export type UpdateViewRequest = {
  // New name for the view.
  name?: string
  // Filter to apply to the view. Uses the same format as the data source query filter.
  // Pass null to clear the filter.
  filter?: ViewFilterRequest | null
  // Property sorts to apply to the view. Only property-based sorts are supported. Pass
  // null to clear the sorts.
  sorts?: ViewPropertySortsRequest | null
  // Quick filters for the view's filter bar. Keys are property names or IDs. Set a key to
  // a filter condition to add/update that quick filter. Set a key to null to remove it.
  // Pass null for the entire field to clear all quick filters. Unmentioned quick filters
  // are preserved.
  quick_filters?: Record<string, QuickFilterConditionRequest | null> | null
  // View presentation configuration. The type field must match the view type. Individual
  // nullable fields within the configuration can be set to null to clear them.
  configuration?: ViewConfigRequest
}

type UrlPropertyConfigurationRequest = {
  // Always `url`
  type?: "url"
  url: EmptyObject
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

type VerificationPropertyStatusFilter = {
  status: "verified" | "expired" | "none"
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
  | MapViewConfigRequest
  | FormViewConfigRequest
  | ChartViewConfigRequest

/**
 * Filter for the view. Uses the same format as the data source query filter (property
 * filters, timestamp filters, or compound and/or filters). Simple property filters appear
 * in the view's filter bar in the Notion UI. To filter by multiple values on a select or
 * status property, use a compound "or" filter with separate "equals" conditions for each
 * value.
 */
type ViewFilterRequest = Record<string, never>

/**
 * Position of the new view in the database's view tab bar.
 */
type ViewPositionRequest =
  | {
      // Position type. "start" places the view as the first tab.
      type: "start"
    }
  | {
      // Position type. "end" places the view as the last tab.
      type: "end"
    }
  | {
      // Position type. "after_view" places the new view immediately after the specified view.
      type: "after_view"
      // The ID of an existing view in the database. The new view will be placed after this
      // view.
      view_id: IdRequest
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

type ViewPropertySortRequest = {
  // Property name or ID to sort by.
  property: string
  // Sort direction.
  direction: SortDirectionRequest
}

type ViewPropertySortsRequest = Array<ViewPropertySortRequest>

/**
 * Sort for the view. Can be a property sort (with property and direction) or timestamp
 * sort (with timestamp and direction).
 */
type ViewSortRequest = Record<string, never>

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

/**
 * Where to place the new widget in the dashboard. "new_row" creates a new row,
 * "existing_row" adds to an existing row side-by-side with other widgets.
 */
type WidgetPlacementRequest =
  | {
      // Placement type. "new_row" creates a new row containing the widget.
      type: "new_row"
      // The 0-based row position to insert the new row at. If omitted, the new row is appended
      // at the end.
      row_index?: number
    }
  | {
      // Placement type. "existing_row" adds the widget to an existing row (side-by-side with
      // other widgets).
      type: "existing_row"
      // The 0-based index of the existing row to add the widget to.
      row_index: number
    }

type WorkspaceParentForBlockBasedObjectResponse = {
  // The parent type.
  type: "workspace"
  // Always true for workspace parent.
  workspace: true
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
  | { tab: TabRequestWithNestedTabItemChildren; type?: "tab"; object?: "block" }
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

export type DateRequest = {
  // The start date of the date object.
  start: string
  // The end date of the date object, if any.
  end?: string | null
  // The time zone of the date object, if any. E.g. America/Los_Angeles, Europe/London,
  // etc.
  time_zone?: TimeZoneRequest | null
}

export type PageIconRequest =
  | FileUploadPageIconRequest
  | EmojiPageIconRequest
  | ExternalPageIconRequest
  | CustomEmojiPageIconRequest
  | IconPageIconRequest

export type PartialUserObjectRequest = {
  // The ID of the user.
  id: IdRequest
  // The user object type name.
  object?: "user"
}

export type RichTextItemRequest = RichTextItemRequestCommon &
  (
    | TextRichTextItemRequest
    | MentionRichTextItemRequest
    | EquationRichTextItemRequest
  )

export type StringRequest = string

export type TextRequest = string

export type PartialPageObjectResponse = {
  // The page object type name.
  object: "page"
  // The ID of the page.
  id: IdResponse
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
  // Whether the page has been archived.
  is_archived: boolean
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
  | { tab: TabRequestWithTabItemChildren; type?: "tab"; object?: "block" }
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

type ColumnListRequest = { children: Array<ColumnBlockWithChildrenRequest> }

type ColumnWithChildrenRequest = {
  children: Array<BlockObjectWithSingleLevelOfChildrenRequest>
  // Ratio between 0 and 1 of the width of this column relative to all columns in the list.
  // If not provided, uses an equal width.
  width_ratio?: number
}

export type ContentWithExpressionRequest = { expression: string }

export type ContentWithTableRowRequest = {
  cells: Array<Array<RichTextItemRequest>>
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

type EmojiPageIconRequest = {
  // Always `emoji`
  type?: "emoji"
  // An emoji character.
  emoji: EmojiRequest
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

type ExternalFileRequest = { url: TextRequest }

type ExternalPageIconRequest = {
  // Always `external`
  type?: "external"
  external: {
    // The URL of the external file.
    url: string
  }
}

type FileUploadIdRequest = { id: IdRequest }

type FileUploadPageIconRequest = {
  // Always `file_upload`
  type?: "file_upload"
  file_upload: {
    // ID of a FileUpload object that has the status `uploaded`.
    id: string
  }
}

type IconPageIconRequest = {
  // Always `icon`
  type?: "icon"
  // A Notion native icon, specified by name and optional color.
  icon: {
    // The name of the Notion icon (e.g. pizza, meeting, home). See the Notion icon picker
    // for valid names.
    name: NoticonName
    // The color variant of the icon. Defaults to gray if not specified. Valid values: gray,
    // lightgray, brown, yellow, orange, green, blue, purple, pink, red.
    color?: NoticonColor
  }
}

export type LanguageRequest =
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

type MediaContentWithUrlAndCaptionRequest = {
  url: string
  caption?: Array<RichTextItemRequest>
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

type RichTextItemRequestCommon = {
  // All rich text objects contain an annotations object that sets the styling for the rich
  // text.
  annotations?: AnnotationRequest
}

type TabRequestWithNestedTabItemChildren = {
  children: Array<TabItemRequestWithSingleLevelOfChildren>
}

type TableRequestWithTableRowChildren = {
  table_width: number
  children: Array<TableRowRequest>
  has_column_header?: boolean
  has_row_header?: boolean
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

type PagePropertyValueWithIdResponse = IdObjectResponse &
  (SimpleOrArrayPropertyValueResponse | PartialRollupPropertyResponse)

export type NumberFormat = string

export type PropertyDescriptionRequest = string

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
  | { tab: EmptyObject; type?: "tab"; object?: "block" }
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

type ColumnBlockWithChildrenRequest = {
  column: ColumnWithChildrenRequest
  type?: "column"
  object?: "block"
}

type ContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  children?: Array<BlockObjectRequestWithoutChildren>
}

type HeaderContentWithSingleLevelOfChildrenRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
  children?: Array<BlockObjectRequestWithoutChildren>
}

type TabItemRequestWithSingleLevelOfChildren = {
  paragraph: ContentWithSingleLevelOfChildrenRequest
  type?: "paragraph"
  object?: "block"
}

type TabRequestWithTabItemChildren = {
  children: Array<TabItemRequestWithoutChildren>
}

type TableRowRequest = {
  table_row: ContentWithTableRowRequest
  type?: "table_row"
  object?: "block"
}

type TemplateMentionRequest =
  | TemplateMentionDateTemplateMentionRequest
  | TemplateMentionUserTemplateMentionRequest

type IdObjectResponse = { id: string }

type PartialRollupPropertyResponse = {
  // Always `rollup`
  type: "rollup"
  rollup: PartialRollupValueResponse
}

type SimpleOrArrayPropertyValueResponse =
  | SimplePropertyValueResponse
  | ArrayBasedPropertyValueResponse

export type ContentWithRichTextAndColorRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
}

export type ContentWithRichTextRequest = {
  rich_text: Array<RichTextItemRequest>
}

export type HeaderContentWithRichTextAndColorRequest = {
  rich_text: Array<RichTextItemRequest>
  color?: ApiColor
  is_toggleable?: boolean
}

type TabItemRequestWithoutChildren = {
  paragraph: ContentWithRichTextAndColorRequest
  type?: "paragraph"
  object?: "block"
}

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

type ArrayBasedPropertyValueResponse =
  | TitleArrayBasedPropertyValueResponse
  | RichTextArrayBasedPropertyValueResponse
  | PeopleArrayBasedPropertyValueResponse
  | RelationArrayBasedPropertyValueResponse

type PartialRollupValueResponse = PartialRollupValueResponseCommon &
  (
    | NumberPartialRollupValueResponse
    | DatePartialRollupValueResponse
    | ArrayPartialRollupValueResponse
  )

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

type ArrayPartialRollupValueResponse = {
  // Always `array`
  type: "array"
  array: Array<SimpleOrArrayPropertyValueResponse>
}

type ButtonSimplePropertyValueResponse = {
  // Always `button`
  type: "button"
  button: EmptyObject
}

type CheckboxSimplePropertyValueResponse = {
  // Always `checkbox`
  type: "checkbox"
  checkbox: boolean
}

type CreatedBySimplePropertyValueResponse = {
  // Always `created_by`
  type: "created_by"
  created_by: UserValueResponse
}

type CreatedTimeSimplePropertyValueResponse = {
  // Always `created_time`
  type: "created_time"
  created_time: string
}

type DatePartialRollupValueResponse = {
  // Always `date`
  type: "date"
  date: DateResponse | null
}

type DateSimplePropertyValueResponse = {
  // Always `date`
  type: "date"
  date: DateResponse | null
}

type EmailSimplePropertyValueResponse = {
  // Always `email`
  type: "email"
  email: string | null
}

type FilesSimplePropertyValueResponse = {
  // Always `files`
  type: "files"
  files: Array<InternalOrExternalFileWithNameResponse>
}

type FormulaSimplePropertyValueResponse = {
  // Always `formula`
  type: "formula"
  formula: FormulaPropertyValueResponse
}

type LastEditedBySimplePropertyValueResponse = {
  // Always `last_edited_by`
  type: "last_edited_by"
  last_edited_by: UserValueResponse
}

type LastEditedTimeSimplePropertyValueResponse = {
  // Always `last_edited_time`
  type: "last_edited_time"
  last_edited_time: string
}

type MultiSelectSimplePropertyValueResponse = {
  // Always `multi_select`
  type: "multi_select"
  multi_select: Array<PartialSelectPropertyValueResponse>
}

type NumberPartialRollupValueResponse = {
  // Always `number`
  type: "number"
  number: number | null
}

type NumberSimplePropertyValueResponse = {
  // Always `number`
  type: "number"
  number: number | null
}

type PartialRollupValueResponseCommon = {
  // The function used for the rollup, e.g. count, count_values, percent_not_empty, max.
  function: RollupFunction
}

type PeopleArrayBasedPropertyValueResponse = {
  // Always `people`
  type: "people"
  people: Array<UserValueResponse | GroupObjectResponse>
}

type PhoneNumberSimplePropertyValueResponse = {
  // Always `phone_number`
  type: "phone_number"
  phone_number: string | null
}

type PlaceSimplePropertyValueResponse = {
  // Always `place`
  type: "place"
  place: PlacePropertyValueResponse | null
}

type RelationArrayBasedPropertyValueResponse = {
  // Always `relation`
  type: "relation"
  relation: Array<RelationItemPropertyValueResponse>
}

type RichTextArrayBasedPropertyValueResponse = {
  // Always `rich_text`
  type: "rich_text"
  rich_text: Array<RichTextItemResponse>
}

type SelectSimplePropertyValueResponse = {
  // Always `select`
  type: "select"
  select: PartialSelectPropertyValueResponse | null
}

type StatusSimplePropertyValueResponse = {
  // Always `status`
  type: "status"
  status: PartialSelectPropertyValueResponse | null
}

type TitleArrayBasedPropertyValueResponse = {
  // Always `title`
  type: "title"
  title: Array<RichTextItemResponse>
}

type UniqueIdSimplePropertyValueResponse = {
  // Always `unique_id`
  type: "unique_id"
  unique_id: UniqueIdPropertyValueResponse
}

type UrlSimplePropertyValueResponse = {
  // Always `url`
  type: "url"
  url: string | null
}

type VerificationSimplePropertyValueResponse = {
  // Always `verification`
  type: "verification"
  verification: VerificationPropertyValueResponse | null
}

type FormulaPropertyValueResponse =
  | BooleanFormulaPropertyValueResponse
  | DateFormulaPropertyValueResponse
  | NumberFormulaPropertyValueResponse
  | StringFormulaPropertyValueResponse

export type InternalOrExternalFileWithNameResponse =
  InternalOrExternalFileWithNameResponseCommon &
    (
      | FileInternalOrExternalFileWithNameResponse
      | ExternalInternalOrExternalFileWithNameResponse
    )

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

type PlacePropertyValueResponse = {
  lat: number
  lon: number
  name?: string | null
  address?: string | null
  aws_place_id?: string | null
  google_place_id?: string | null
}

export type RelationItemPropertyValueResponse = { id: IdRequest }

type UniqueIdPropertyValueResponse = {
  prefix: string | null
  number: number | null
}

export type VerificationPropertyValueResponse =
  | VerificationPropertyUnverifiedResponse
  | VerificationPropertyResponse

type BooleanFormulaPropertyValueResponse = {
  // Always `boolean`
  type: "boolean"
  boolean: boolean | null
}

type DateFormulaPropertyValueResponse = {
  // Always `date`
  type: "date"
  date: DateResponse | null
}

type ExternalInternalOrExternalFileWithNameResponse = {
  // Type of attachment. In this case, an external URL.
  type: "external"
  // The external URL.
  external: {
    // The URL of the external file or resource.
    url: string
  }
}

type FileInternalOrExternalFileWithNameResponse = {
  // Type of attachment. In this case, a file uploaded to a Notion workspace.
  type: "file"
  // The file URL.
  file: InternalFileResponse
}

type InternalOrExternalFileWithNameResponseCommon = {
  // The name of the file.
  name: string
}

type NumberFormulaPropertyValueResponse = {
  // Always `number`
  type: "number"
  number: number | null
}

type StringFormulaPropertyValueResponse = {
  // Always `string`
  type: "string"
  string: string | null
}

type VerificationPropertyResponse = {
  // One of: `verified`, `expired`
  state: "verified" | "expired"
  date: DateResponse | null
  verified_by: UserValueResponse | null
}

type VerificationPropertyUnverifiedResponse = {
  // Always `unverified`
  state: "unverified"
  date: null
  verified_by: null
}
