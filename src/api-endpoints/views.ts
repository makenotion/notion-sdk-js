// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  CreateViewQueryRequest,
  CreateViewRequest,
  DataSourceViewReferenceResponse,
  DatabaseParentResponse,
  EmptyObject,
  IdRequest,
  IdResponse,
  PartialPageObjectResponse,
  PartialUserObjectResponse,
  UpdateViewRequest,
} from "./common"

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

type ChartAggregationResponse = {
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

type ChartReferenceLineResponse = {
  // Unique identifier for the reference line.
  id: string
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
}

type ChartViewConfigResponse = {
  // The view configuration type.
  type: "chart"
  // The chart type: column (vertical bars), bar (horizontal bars), line, donut, or number
  // (single value display).
  chart_type: "column" | "bar" | "line" | "donut" | "number"
  // X-axis grouping configuration for column/bar/line/donut charts using grouped data.
  // Null when using results (raw property values) mode.
  x_axis?: GroupByConfigResponse | null
  // Y-axis aggregation for column/bar/line/donut charts using grouped data. Null when
  // using results mode.
  y_axis?: ChartAggregationResponse | null
  // Property ID for the x-axis name values when using results (raw property values) mode.
  x_axis_property_id?: string
  // Property ID for the y-axis numeric values when using results (raw property values)
  // mode.
  y_axis_property_id?: string
  // Aggregation configuration for number charts (single value display).
  value?: ChartAggregationResponse
  // Sort order for chart data.
  sort?:
    | "manual"
    | "x_ascending"
    | "x_descending"
    | "y_ascending"
    | "y_descending"
  // Color theme for the chart.
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
  // Chart height.
  height?: "small" | "medium" | "large" | "extra_large"
  // Whether to hide groups with no data on the x-axis.
  hide_empty_groups?: boolean
  // Legend display position. "off" hides the legend.
  legend_position?: "off" | "bottom" | "side"
  // Whether to show data value labels on chart elements.
  show_data_labels?: boolean
  // Which axis labels to display.
  axis_labels?: "none" | "x_axis" | "y_axis" | "both"
  // Which grid lines to display.
  grid_lines?: "none" | "horizontal" | "vertical" | "both"
  // Whether to show cumulative values (line charts only).
  cumulative?: boolean
  // Whether to use smooth curves (line charts only).
  smooth_line?: boolean
  // Whether to hide the shaded area under the line (line charts only).
  hide_line_fill_area?: boolean
  // How grouped/stacked bars are displayed. "normal" stacks values, "percent" normalizes
  // to 100%, "side_by_side" places bars next to each other.
  group_style?: "normal" | "percent" | "side_by_side"
  // Custom minimum value for the y-axis. Null clears the override.
  y_axis_min?: number | null
  // Custom maximum value for the y-axis. Null clears the override.
  y_axis_max?: number | null
  // What to display on donut chart slices.
  donut_labels?: "none" | "value" | "name" | "name_and_value"
  // Whether to hide the title label (number charts only).
  hide_title?: boolean
  // Stack-by grouping configuration for stacked/grouped bar charts (column/bar/line only).
  // Null when not stacked.
  stack_by?: GroupByConfigResponse | null
  // Reference lines drawn on the chart. Null when no reference lines are configured.
  reference_lines?: Array<ChartReferenceLineResponse> | null
  // Text caption displayed below the chart. Null when no caption is shown.
  caption?: string | null
  // Whether chart elements are colored by their numeric value (gradient coloring).
  color_by_value?: boolean
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

type CoverConfigResponse = {
  // Source of the cover image.
  type: "page_cover" | "page_content" | "page_content_first" | "property"
  // Property ID when type is "property".
  property_id?: string
}

export type DashboardRowResponse = {
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

export type DashboardWidgetResponse = {
  // The ID of this widget module.
  id: string
  // The ID of the collection view rendered by this widget.
  view_id: string
  // Width of the widget in a 12-column grid (1-12). 12 means full width.
  width?: number
  // The 0-based index of the row this widget belongs to. Widgets in the same row share the
  // same row_index.
  row_index?: number
}

export type DataSourceViewObjectResponse = {
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
  // Quick filters pinned to the view's filter bar. Keys are property IDs. Values are
  // filter conditions (same shape as a property filter without the property field). Null
  // when no quick filters are set.
  quick_filters?: Record<string, QuickFilterConditionResponse> | null
  // View presentation configuration.
  configuration?: ViewConfigResponse | null
  // For dashboard widget views, the ID of the parent dashboard view. Only present when
  // this view is a widget inside a dashboard.
  dashboard_view_id?: string
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

export type DeletedViewQueryResponse = {
  // The object type.
  object: "view_query"
  // The ID of the deleted view query.
  id: IdResponse
  // Whether the view query was deleted.
  deleted: boolean
}

type FormViewConfigResponse = {
  // The view configuration type.
  type: "form"
  // Whether the form is closed for submissions.
  is_form_closed?: boolean
  // Whether anonymous (non-logged-in) submissions are allowed.
  anonymous_submissions?: boolean
  // Permission level granted to the submitter on the created page after form submission.
  submission_permissions?:
    | "none"
    | "comment_only"
    | "reader"
    | "read_and_write"
    | "editor"
}

type FormulaCheckboxSubGroupByResponse = {
  // The formula result type for grouping.
  type: "checkbox"
  // Sort order for groups (only manual for checkbox).
  sort: GroupSortResponse
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

/**
 * Sub-group-by configuration for formula properties based on result type.
 */
type FormulaSubGroupByResponse =
  | FormulaDateSubGroupByResponse
  | FormulaTextSubGroupByResponse
  | FormulaNumberSubGroupByResponse
  | FormulaCheckboxSubGroupByResponse

type FormulaTextSubGroupByResponse = {
  // The formula result type for grouping.
  type: "text"
  // How to group text values. "exact" = exact match, "alphabet_prefix" = first letter.
  group_by: "exact" | "alphabet_prefix"
  // Sort order for groups.
  sort: GroupSortResponse
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

type GroupSortResponse = {
  // Sort direction for groups.
  type: "manual" | "ascending" | "descending"
}

type ListViewConfigResponse = {
  // The view configuration type.
  type: "list"
  // Properties to display in list items.
  properties?: Array<ViewPropertyConfigResponse>
}

type MapViewConfigResponse = {
  // The view configuration type.
  type: "map"
  // Map display height.
  height?: "small" | "medium" | "large" | "extra_large"
  // Property ID of the location property used to position items on the map.
  map_by?: string
  // Map-by property name (convenience field).
  map_by_property_name?: string
  // Properties to display on map pin cards.
  properties?: Array<ViewPropertyConfigResponse>
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

type PageReferenceResponse = {
  // The object type.
  object: string
  // The object ID.
  id: IdResponse
}

export type PartialDataSourceViewObjectResponse = {
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

type PropertySortResponse = {
  // The name or ID of the property to sort by.
  property: string
  // Sort direction.
  direction: "ascending" | "descending"
}

/**
 * A property filter condition. Same shape as a property filter but without the
 * "property" field. For example: { "select": { "equals": "High" } }.
 */
type QuickFilterConditionResponse = Record<string, never>

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

type TimelineArrowsByResponse = {
  // Relation property ID used for dependency arrows.
  property_id?: string | null
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

type TimestampSortResponse = {
  // The timestamp to sort by.
  timestamp: "created_time" | "last_edited_time"
  // Sort direction.
  direction: "ascending" | "descending"
}

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
  | MapViewConfigResponse
  | FormViewConfigResponse
  | ChartViewConfigResponse
  | DashboardViewConfigResponse

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

export type ViewQueryResponse = {
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
 * Sort for the view. Can sort by property or timestamp.
 */
type ViewSortResponse = PropertySortResponse | TimestampSortResponse

type ListDatabaseViewsQueryParameters = {
  // ID of a Notion database (collection view block) to list views for. At least one of
  // database_id or data_source_id is required.
  database_id?: IdRequest
  // ID of a data source (collection) to list all views for, including linked views across
  // the workspace. At least one of database_id or data_source_id is required.
  data_source_id?: IdRequest
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
  queryParams: ["database_id", "data_source_id", "start_cursor", "page_size"],
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
  view_id: IdRequest
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
  view_id: IdRequest
  // The ID of the query.
  query_id: IdRequest
}

type GetViewQueryResultsQueryParameters = {
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided.
  start_cursor?: string
  // The number of results to return per page. Maximum: 100
  page_size?: number
}

export type GetViewQueryResultsParameters = GetViewQueryResultsPathParameters &
  GetViewQueryResultsQueryParameters

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
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],

  path: (p: GetViewQueryResultsPathParameters): string =>
    `views/${p.view_id}/queries/${p.query_id}`,
} as const

type DeleteViewQueryPathParameters = {
  // The ID of the view.
  view_id: IdRequest
  // The ID of the query.
  query_id: IdRequest
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
