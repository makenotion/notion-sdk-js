/* =============================================================================

	GENERATED FILE - DO NOT EDIT MANUALLY
	Ambient type declarations for Infrastructure as Code scripts.

  TODO: Some things in this file were temporarily edited manually to
  match sdk types, we would need to update the source file to match.
  [tag: update-infra-as-code-generated-types]

============================================================================= */

// Type definitions for infra as code scripts (external SDK)
// This file is self-contained with no external imports.

declare const notionIconColors: [
  "gray",
  "lightgray",
  "brown",
  "yellow",
  "orange",
  "green",
  "blue",
  "purple",
  "pink",
  "red",
]

type NotionIconColor = (typeof notionIconColors)[number]

declare const selectColors: [
  "default",
  "gray",
  "brown",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "red",
]

type SelectColor = (typeof selectColors)[number]

// Opaque types - external consumers should not construct these directly
// They are returned by the notion helper functions

/**
 * Represents formatted text content in Notion.
 * This is an opaque type - use notion.text(), notion.date(), etc. to create values.
 * [ref: update-infra-as-code-generated-types]
 */
type TextValue = SimpleTextValue

type SimpleTextToken = [string] | [string, ...unknown[]]

type SimpleTextValue = Array<SimpleTextToken>

/**
 * Represents a mention token in Notion text.
 * This is an opaque type returned by mention helper functions.
 */
type MentionToken = unknown

// Internal helper generic used by PropertiesInputForSchema
type ExtractByName<
  P extends PropertySchemaDefinition[],
  N extends string,
> = Extract<P[number], { name: N }>

type ResourceId = string

/**
 * Emoji icon - uses a standard emoji character.
 *
 * @example
 * icon: { type: "emoji", emoji: "📊" }
 */
type EmojiIcon = {
  type: "emoji"
  emoji: string
}

/**
 * Notion icon - uses a Notion custom icon.
 *
 * Resolution is two-stage:
 * 1. If `description` is already an exact internal Notion icon slug (e.g.
 *    `"rocket"`, `"arrow-down-basic"`), it is used directly with no
 *    network round-trip. This is the fastest path — prefer it when you
 *    already know the slug.
 * 2. Otherwise the description is treated as a natural-language query and
 *    used to look up the most relevant icon via semantic search against
 *    the turbopuffer icon index.
 *
 * @example exact slug (no semantic search, fastest)
 * icon: { type: "notion_icon", description: "rocket" }
 *
 * @example natural-language description (semantic search)
 * icon: { type: "notion_icon", description: "project management tasks" }
 *
 * @example with color
 * icon: { type: "notion_icon", description: "calendar", color: "blue" }
 */
type NotionIcon = {
  type: "notion_icon"
  /**
   * Either an exact Notion icon slug (preferred when known) or a
   * natural-language description used for semantic search.
   */
  description: string
  /**
   * Optional color for the icon. Defaults to "gray" if not specified.
   * Available colors: gray, lightgray, brown, yellow, orange, green, blue, purple, pink, red
   */
  color?: NotionIconColor
}

/**
 * Icon type for infra as code resources.
 * Can be either an emoji, a Notion custom icon (resolved by exact slug match
 * or semantic search description — see `NotionIcon`), or a file reference.
 *
 * File references must be created via `notion.file()` and then referenced in the icon field.
 *
 * @example Emoji icon
 * icon: { type: "emoji", emoji: "📊" }
 *
 * @example Notion custom icon by exact slug (no semantic search)
 * icon: { type: "notion_icon", description: "rocket" }
 *
 * @example Notion custom icon by description (semantic search)
 * icon: { type: "notion_icon", description: "project management" }
 */
type InfraAsCodeIcon = EmojiIcon | NotionIcon | FileReference

type Parent = {
  type: "resourceId"
  resourceId: ResourceId
}

/**
 * Arguments for creating a page.
 *
 * Note: For pages not in a database (e.g., regular pages in teamspaces),
 * set the page title via properties.title using notion.text("Your Title").
 * For database pages, use the database's title property name.
 *
 * RESTRICTION: Pages can only be parented to resources created within the same
 * Infra as Code script. Parenting to existing records outside the script is not supported
 * for permission safety reasons.
 */
type PageIntent = {
  resourceId: ResourceId
  parent: Parent
  /**
   * Internal: update an existing block pointer pre-seeded in the resource registry
   * instead of creating and linking a new page block.
   */
  updateExisting?: boolean
  /**
   * Page properties including the title.
   * - For pages not in a database: Use `properties.title` to set the page title
   * - For database pages: Use property names matching the database schema
   *
   * Person property values are not supported.
   *
   * @example
   * // Regular page
   * properties: { title: notion.text("My Page Title") }
   *
   * // Database page
   * properties: { Name: notion.text("Task Name"), Status: "In Progress" }
   */
  properties?: Record<string, PropertyValue | undefined>
  /**
   * Icon for the page. Can be an emoji or a notion_icon (resolved by exact slug match or semantic search description).
   */
  icon?: InfraAsCodeIcon
  /**
   * Optional page content in Notion flavored markdown format.
   * When provided, the markdown will be parsed into blocks and added as children of the page.
   *
   * NOTE: The page title should be set via `properties.title`, NOT extracted from content.
   * Content markdown is only used to generate child blocks, not the page title.
   *
   * INLINE PAGES: To place another in-script page inline within this content
   * (a real child subpage at a chosen position, rather than appended at the
   * end), create that page with its `parent` set to THIS page's resourceId,
   * then reference it in this content with a
   * `<page url="{{that-resource-id}}">Title</page>` tag. The tag controls only
   * the placement; the child page's `parent` is the source of truth for
   * containment. The referenced page must be created in the same script and may
   * be referenced at most once per content body.
   *
   * The `<page url="{{...}}">` tag may appear anywhere in the content — at the
   * top level, or nested inside a column, callout, toggle, or other container
   * block (ideal for multi-column hub layouts). When nested, the child page is
   * re-parented into that container while remaining a real page.
   *
   * @example
   * // Hub page that lists a real child subpage under a heading:
   * content: '# Team\n<page url="{{getting-started}}">Getting Started</page>'
   * // ...elsewhere in the same script:
   * notion.page.create({
   *   resourceId: "getting-started",
   *   parent: { type: "resourceId", resourceId: "hub-page" },
   *   properties: { title: notion.text("Getting Started") },
   * })
   */
  content?: string
  /**
   * Whether this page should be created as a data source template.
   *
   * Template pages must be parented to a data source.
   */
  template?: boolean
  /**
   * Optional cover image for the page.
   */
  cover?: FileReference
}

/**
 * Base property schema definition shared by all property types.
 */
type BasePropertySchemaDefinition = {
  /** Display name of the property in the database */
  name: string
  /**
   * Unique identifier for this property within the infra as code script.
   * Required for all properties to enable unambiguous references (e.g., for rollups).
   *
   * For two-way relations, use this to reference the property
   * from the other side of the relation via targetDataSourcePropertyResourceId.
   *
   * @example
   * // Projects database
   * {
   *   name: "Related Issues",
   *   type: "relation",
   *   resourceId: "related-issues-prop",  // Required identifier
   *   targetDataSourceResourceId: "issues-datasource",
   *   targetDataSourcePropertyResourceId: "project-prop"  // Points to other side
   * }
   */
  resourceId: ResourceId
}

/**
 * Title property - the primary name/title of database pages.
 * Every database must have exactly one title property.
 *
 * @example
 * { resourceId: "name-prop", name: "Name", type: "title" }
 */
type TitlePropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "title"
}

/**
 * Text property - stores rich text content.
 *
 * @example
 * { resourceId: "desc-prop", name: "Description", type: "text" }
 */
type TextPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "text"
}

/**
 * Number property - stores numeric values.
 *
 * @example
 * { resourceId: "budget-prop", name: "Budget", type: "number" }
 */
type NumberPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "number"
}

/**
 * Select property - single choice from predefined options.
 *
 * @example
 * {
 *   resourceId: "priority-prop",
 *   name: "Priority",
 *   type: "select",
 *   options: [
 *     { name: "High", color: "red" },
 *     { name: "Medium", color: "yellow" },
 *     { name: "Low", color: "green" },
 *   ],
 * }
 */
type SelectPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "select"
  options?: Array<SelectOptionDefinition>
}

/**
 * Multi-select property - multiple choices from predefined options.
 *
 * @example
 * {
 *   resourceId: "tags-prop",
 *   name: "Tags",
 *   type: "multi_select",
 *   options: [
 *     { name: "Frontend", color: "blue" },
 *     { name: "Backend", color: "purple" },
 *     { name: "Design", color: "pink" },
 *   ],
 * }
 */
type MultiSelectPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "multi_select"
  options?: Array<SelectOptionDefinition>
}

/**
 * Available colors for select, multi-select, and status options.
 * These map to Notion's standard option colors.
 */

declare const selectOptionColors: typeof selectColors

type SelectOptionColor = SelectColor

/**
 * Definition for a select or multi-select option with name and optional color.
 *
 * @example
 * { name: "High", color: "red" }
 */
type SelectOptionDefinition = {
  /** Display name of the option */
  name: string
  /** Color for the option. If not specified, Notion's default color is used. */
  color?: SelectOptionColor
}

declare const statusOptionColors: typeof selectColors

type StatusOptionColor = SelectColor

/**
 * Definition for a status option with name and optional color.
 *
 * @example
 * { name: "In Progress", color: "blue" }
 */
type StatusOptionDefinition = {
  /** Display name of the option */
  name: string
  /** Color for the option. If not specified, the status group's default color is used. */
  color?: StatusOptionColor
  /** Whether this option should be the status property's default. Only one option can be set to default. */
  default?: boolean
}

/**
 * Status property schema definition for tracking workflow states.
 *
 * Status properties have three groups: To-do, In progress, and Complete.
 * Options are organized directly under their respective group keys.
 *
 * @example
 * {
 *   resourceId: "status-prop",
 *   name: "Status",
 *   type: "status",
 *   options: {
 *     todo: [
 *       { name: "Backlog", color: "gray", default: true },
 *       { name: "Not Started", color: "gray" },
 *     ],
 *     inProgress: [
 *       { name: "In Progress", color: "blue" },
 *       { name: "In Review", color: "purple" },
 *     ],
 *     complete: [
 *       { name: "Done", color: "green" },
 *       { name: "Archived", color: "brown" },
 *     ],
 *   },
 * }
 */
type StatusPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "status"
  /**
   * Status options organized by workflow group.
   * All three groups (todo, inProgress, complete) are required.
   */
  options: {
    /** Options in the "To-do" group (not started) */
    todo: Array<StatusOptionDefinition>
    /** Options in the "In progress" group (actively being worked on) */
    inProgress: Array<StatusOptionDefinition>
    /** Options in the "Complete" group (finished) */
    complete: Array<StatusOptionDefinition>
  }
}

/**
 * Date property - stores dates or date ranges.
 *
 * @example
 * { resourceId: "due-date-prop", name: "Due Date", type: "date" }
 */
type DatePropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "date"
}

/**
 * Checkbox property - stores boolean yes/no values.
 *
 * @example
 * { resourceId: "completed-prop", name: "Completed", type: "checkbox" }
 */
type CheckboxPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "checkbox"
}

/**
 * URL property - stores web URLs with clickable links.
 *
 * @example
 * { resourceId: "website-prop", name: "Website", type: "url" }
 */
type UrlPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "url"
}

/**
 * Email property - stores email addresses with mailto links.
 *
 * @example
 * { resourceId: "email-prop", name: "Contact Email", type: "email" }
 */
type EmailPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "email"
}

/**
 * Phone number property - stores phone numbers.
 *
 * @example
 * { resourceId: "phone-prop", name: "Phone", type: "phone_number" }
 */
type PhoneNumberPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "phone_number"
}

/**
 * Relation property schema definition for linking to other databases.
 *
 * Relations can be one-way or two-way:
 * - One-way: Only the source database has the relation property
 * - Two-way: Both databases have relation properties that point to each other,
 *   and changes automatically sync between them
 *
 * @example One-way relation
 * // Issues database has a relation to Projects
 * {
 *   resourceId: "project-prop",
 *   name: "Project",
 *   type: "relation",
 *   targetDataSourceResourceId: "projects-datasource"
 * }
 *
 * @example Two-way relation
 * // Projects database
 * {
 *   name: "Related Issues",
 *   type: "relation",
 *   resourceId: "related-issues-prop",
 *   targetDataSourceResourceId: "issues-datasource",
 *   targetDataSourcePropertyResourceId: "project-prop"  // Points to Issues' property
 * }
 *
 * // Issues database
 * {
 *   name: "Project",
 *   type: "relation",
 *   resourceId: "project-prop",
 *   targetDataSourceResourceId: "projects-datasource",
 *   targetDataSourcePropertyResourceId: "related-issues-prop"  // Points back to Projects' property
 * }
 *
 * With two-way relations, when you link an Issue to a Project:
 * - The Issue shows the Project in its "Project" property
 * - The Project automatically shows that Issue in its "Related Issues" property
 * - Both sides stay in sync automatically
 */
type RelationPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "relation"
  /**
   * ResourceId of the target data source to create relations to.
   * This identifies which database this relation points to.
   */
  targetDataSourceResourceId: ResourceId
  /**
   * ResourceId of the relation property on the target data source for two-way relations.
   * When specified, changes on either side automatically sync to the other side.
   *
   * To create a two-way relation:
   * 1. Give both relation properties a resourceId
   * 2. Set each property's targetDataSourcePropertyResourceId to point to the other's resourceId
   *
   * Leave undefined for one-way relations where only the source database tracks the relationship.
   */
  targetDataSourcePropertyResourceId?: ResourceId
  /** Limit the relation to a single item (makes it a 1:1 relation instead of 1:many) */
  limit?: 1
}

/**
 * Formula property schema definition.
 *
 * Formula expressions can reference properties by resourceId using `prop(...)`:
 * - `prop("my-property-resource-id")` for a property on the current data source
 *
 * During database creation, these resourceId references are rewritten to Notion's
 * internal formula token syntax using the resolved property IDs and collection IDs.
 *
 * If omitted, `expression` creates an empty formula property.
 *
 * @example
 * {
 *   resourceId: "hours-left-prop",
 *   name: "Hours Left",
 *   type: "formula",
 *   expression: 'prop("hours-estimate-prop") - prop("hours-spent-prop")'
 * }
 */
type FormulaPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "formula"
  expression?: string
}

/**
 * Aggregation types for rollup properties.
 *
 * Available aggregations depend on the target property type:
 * - All types: count_values, unique, empty, not_empty, percent_empty, percent_not_empty, show_unique
 * - Numbers: sum, average, median, min, max, range
 * - Dates: earliest_date, latest_date, date_range
 */
type RollupAggregationType =
  // Default/property aggregations (available for all types)
  | "count_values"
  | "unique"
  | "empty"
  | "not_empty"
  | "percent_empty"
  | "percent_not_empty"
  | "show_unique"
  // Numeric aggregations (only for number properties)
  | "sum"
  | "average"
  | "median"
  | "min"
  | "max"
  | "range"
  // Date aggregations (only for date properties)
  | "earliest_date"
  | "latest_date"
  | "date_range"

/**
 * Target property types that can be rolled up.
 * Note: rollup of rollup is NOT supported.
 */
type RollupTargetPropertyType =
  | "title"
  | "text"
  | "number"
  | "select"
  | "multi_select"
  | "status"
  | "date"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "relation"
  | "person"
  | "created_time"
  | "last_edited_time"
  | "created_by"
  | "last_edited_by"

/**
 * Rollup property schema definition for aggregating data from related records.
 *
 * Rollups require:
 * 1. A source relation property in the same database (referenced by resourceId)
 * 2. A target property in the related database to aggregate (referenced by resourceId)
 * 3. Optionally, an aggregation function
 *
 * Without aggregation, rollups show all related values (lookup mode).
 * With aggregation, rollups compute a single value (sum, count, etc.).
 *
 * IMPORTANT: Rollup properties are read-only. Do NOT include them in page `properties`
 * when calling `addPage()`. If you attempt to set values for rollup properties, an error
 * will be thrown.
 *
 * @example Rollup via relation (lookup mode - no aggregation)
 * {
 *   resourceId: "proj-names-rollup",
 *   name: "Project Names",
 *   type: "rollup",
 *   relationPropertyResourceId: "projects-rel",  // resourceId of relation property in same database
 *   targetPropertyResourceId: "proj-name",       // resourceId of property in target database
 *   targetPropertyType: "title"                  // Type for validation
 * }
 *
 * @example Rollup with aggregation (sum of numbers)
 * {
 *   resourceId: "total-budget-rollup",
 *   name: "Total Budget",
 *   type: "rollup",
 *   relationPropertyResourceId: "tasks-rel",
 *   targetPropertyResourceId: "task-estimate",
 *   targetPropertyType: "number",
 *   aggregation: "sum"
 * }
 *
 * @example Rollup with date aggregation
 * {
 *   resourceId: "latest-due-rollup",
 *   name: "Latest Due Date",
 *   type: "rollup",
 *   relationPropertyResourceId: "tasks-rel",
 *   targetPropertyResourceId: "task-due-date",
 *   targetPropertyType: "date",
 *   aggregation: "latest_date"
 * }
 */
type RollupPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "rollup"
  /**
   * ResourceId of the relation property in the same database that provides the related records.
   * This must match the `resourceId` of a relation property defined earlier in the same data source.
   *
   * Note: The relation property must be defined BEFORE the rollup property in the properties array.
   */
  relationPropertyResourceId: ResourceId
  /**
   * ResourceId of the property in the target database to aggregate.
   * Must match a property resourceId in the database that the relation points to.
   */
  targetPropertyResourceId: ResourceId
  /**
   * Type of the target property. Required because:
   * 1. It's part of Notion's rollup schema that gets persisted to the database
   * 2. It enables early validation of aggregation compatibility
   * 3. It catches mismatches if the target property type changes later
   *
   * Must match the actual type of the target property in the target database.
   * We validate this at runtime and throw a helpful error if there's a mismatch.
   */
  targetPropertyType: RollupTargetPropertyType
  /**
   * Aggregation function to apply to the related values.
   * If omitted, the rollup acts as a lookup, showing all related values.
   *
   * Available aggregations depend on targetPropertyType:
   * - Numbers: sum, average, median, min, max, range
   * - Dates: earliest_date, latest_date, date_range
   * - All types: count_values, unique, empty, not_empty, percent_empty, percent_not_empty, show_unique
   */
  aggregation?: RollupAggregationType
}

/**
 * Created time property schema definition.
 *
 * This property automatically tracks when a page was created.
 * Values are set automatically by Notion and cannot be manually set.
 *
 * @example
 * { resourceId: "created-prop", name: "Created", type: "created_time" }
 */
type CreatedTimePropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "created_time"
}

/**
 * Last edited time property schema definition.
 *
 * This property automatically tracks when a page was last modified.
 * Values are set automatically by Notion and cannot be manually set.
 *
 * @example
 * { resourceId: "last-modified-prop", name: "Last Modified", type: "last_edited_time" }
 */
type LastEditedTimePropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "last_edited_time"
}

/**
 * Created by property schema definition.
 *
 * This property automatically tracks who created a page.
 * Values are set automatically by Notion and cannot be manually set.
 *
 * @example
 * { resourceId: "author-prop", name: "Author", type: "created_by" }
 */
type CreatedByPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "created_by"
}

/**
 * Last edited by property schema definition.
 *
 * This property automatically tracks who last modified a page.
 * Values are set automatically by Notion and cannot be manually set.
 *
 * @example
 * { resourceId: "editor-prop", name: "Editor", type: "last_edited_by" }
 */
type LastEditedByPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "last_edited_by"
}

/**
 * Auto-increment ID property schema definition.
 *
 * This property automatically assigns incrementing IDs to pages (e.g., TASK-1, TASK-2).
 * Values are set automatically by Notion and cannot be manually set.
 * An optional prefix can be specified to prepend to the numeric ID. This prefix must be unique within the workspace.
 *
 * @example
 * { resourceId: "task-id-prop", name: "Task ID", type: "auto_increment_id" }
 * @example
 * { resourceId: "task-id-prop", name: "Task ID", type: "auto_increment_id", prefix: "TASK" }
 */
type AutoIncrementIdPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "auto_increment_id"
  /**
   * Optional prefix for the auto-increment ID (e.g., "TASK" produces TASK-1, TASK-2, ...)
   *
   * This must be unique within the workspace
   */
  prefix?: string
}

/**
 * File property - stores file attachments and media.
 * Values are set using `notion.file("resource-id")` referencing uploaded files.
 *
 * @example
 * { resourceId: "attachments-prop", name: "Attachments", type: "file" }
 */
type FilePropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "file"
}

/**
 * Person property - stores references to Notion users.
 */
type PersonPropertySchemaDefinition = BasePropertySchemaDefinition & {
  type: "person"
  /** Limit the property to a single user (omit for unlimited). */
  limit?: 1
}

type PropertySchemaDefinition =
  | TitlePropertySchemaDefinition
  | TextPropertySchemaDefinition
  | NumberPropertySchemaDefinition
  | SelectPropertySchemaDefinition
  | MultiSelectPropertySchemaDefinition
  | StatusPropertySchemaDefinition
  | DatePropertySchemaDefinition
  | CheckboxPropertySchemaDefinition
  | UrlPropertySchemaDefinition
  | EmailPropertySchemaDefinition
  | PhoneNumberPropertySchemaDefinition
  | RelationPropertySchemaDefinition
  | FormulaPropertySchemaDefinition
  | RollupPropertySchemaDefinition
  | CreatedTimePropertySchemaDefinition
  | LastEditedTimePropertySchemaDefinition
  | CreatedByPropertySchemaDefinition
  | LastEditedByPropertySchemaDefinition
  | AutoIncrementIdPropertySchemaDefinition
  | FilePropertySchemaDefinition
  | PersonPropertySchemaDefinition

type DataSourceSchema = {
  resourceId: ResourceId
  name: string
  /**
   * Icon for the data source. Can be an emoji or a notion_icon (looked up via semantic search).
   */
  icon?: InfraAsCodeIcon
  /**
   * Optional resource ID of a template page in this data source to use as the
   * data source default template.
   *
   * The referenced page must be created with `template: true` and be parented to
   * this same data source.
   */
  defaultTemplate?: ResourceId
  properties: Array<PropertySchemaDefinition>
}

/**
 * A reference to an uploaded file, returned by `notion.file()`.
 * Used in database file property values.
 * @generateValidator
 */
type FileReference = {
  type: "file"
  resourceId: ResourceId
}

/**
 * Property values can be:
 * - SimpleTextValue (array format from runtime helpers - includes annotations)
 * - Array<string> (relation values)
 * - string (single relation reference)
 * - Array<FileReference> (from notion.file() for file properties)
 * - undefined
 */
type PropertyValue =
  | string
  | SimpleTextValue
  | string[]
  | FileReference[]
  | undefined

/**
 * Maps a literal properties tuple to the union of property names.
 */
type PropertyNameUnion<P extends PropertySchemaDefinition[]> =
  P[number] extends { name: infer N } ? (N extends string ? N : never) : never

/**
 * Allowed input value type for a particular property schema definition.
 * Person properties are filter-only and map to `never`.
 * [ref: update-infra-as-code-generated-types]
 */
type PropertyInputForDefinition<S extends PropertySchemaDefinition> =
  S extends RelationPropertySchemaDefinition
    ? string | string[]
    : S extends FilePropertySchemaDefinition
      ? FileReference[]
      : S extends
            | SelectPropertySchemaDefinition
            | MultiSelectPropertySchemaDefinition
            | StatusPropertySchemaDefinition
        ? string
        : S extends
              | FormulaPropertySchemaDefinition
              | RollupPropertySchemaDefinition
              | CreatedTimePropertySchemaDefinition
              | LastEditedTimePropertySchemaDefinition
              | CreatedByPropertySchemaDefinition
              | LastEditedByPropertySchemaDefinition
              | AutoIncrementIdPropertySchemaDefinition
              | PersonPropertySchemaDefinition
          ? never
          : SimpleTextValue

/**
 * Shape of the properties object accepted by DataSourceHandle.addPage based on a
 * literal schema snapshot provided at database creation time.
 */
type PropertiesInputForSchema<P extends PropertySchemaDefinition[]> = {
  [K in PropertyNameUnion<P>]?:
    | PropertyInputForDefinition<Extract<P[number], { name: K }>>
    | undefined
}

type ViewType = "table" | "board" | "calendar" | "list" | "gallery" | "timeline"

type PropertyVisibility = "show" | "hide" | "hide_if_empty"

/**
 * Format for a single visible column entry in a view (table / board / list /
 * gallery / timeline).
 *
 * `property` must be the `resourceId` of a property in the view's data
 * source, matching the same convention used by board `groupBy.property`,
 * `calendarBy`, and `timelineBy`.
 *
 */
type PropertyFormat = {
  /** ResourceId of the property in the view's data source. */
  property: ResourceId
  visible?: boolean
  width?: number
  visibility?: PropertyVisibility
}

/**
 * Format for a single column entry in a board view.
 *
 * `property` must be the `resourceId` of a property in the view's data
 * source, matching the same convention used by `PropertyFormat.property`
 * and board `groupBy.property`.
 *
 */
type GroupFormat = {
  /** ResourceId of the property in the view's data source. */
  property: ResourceId
  hidden?: boolean | undefined
  value?: {
    type: string
    value?: string | boolean | number | null
  }
}

/**
 * Board view group-by configuration.
 *
 * `property` must be the `resourceId` of a property in the view's data
 * source, matching the same convention used by `PropertyFormat.property`,
 * `CalendarViewSchema.calendarBy`, and `TimelineViewSchema.timelineBy`.
 *
 */
type GroupByFormat = {
  /** ResourceId of the property in the view's data source. */
  property: ResourceId
  type?:
    | "number"
    | "select"
    | "multi_select"
    | "status"
    | "person"
    | "created_by"
    | "last_edited_by"
    | "date"
    | "created_time"
    | "last_edited_time"
    | "last_visited_time"
    | "text"
    | "title"
    | "url"
    | "email"
    | "phone_number"
    | "checkbox"
    | "relation"
    | "location"
    | "formula"
    | undefined
}

type CoverFormat =
  | { type: "page_cover" }
  | { type: "page_content" }
  | { type: "page_content_first" }
  | { type: "property"; property: string }

type CoverSizeFormat = "small" | "medium" | "large"

type CoverAspectFormat = "contain" | "cover"

type DatabaseViewSortDirection = "ascending" | "descending"

/**
 * Sort schema for ordering database view results.
 * Sorts are applied in order — all pages are first sorted by the first sort,
 * then ties are broken by the second sort, and so on.
 */
type PropertyViewSortSchema = {
  propertyId: string
  direction: DatabaseViewSortDirection
}

type BasePropertyFilter = {
  propertyId: string
}

type TextPropertyFilter = {
  propertyType: "text" | "title" | "url" | "email" | "phone_number"
  operator:
    | "string_is"
    | "string_is_not"
    | "string_contains"
    | "string_does_not_contain"
    | "string_starts_with"
    | "string_ends_with"
  value: string
} & BasePropertyFilter

type NumberPropertyFilter = {
  propertyType: Extract<PropertyType, "number">
  operator:
    | "number_equals"
    | "number_does_not_equal"
    | "number_greater_than"
    | "number_less_than"
    | "number_greater_than_or_equal_to"
    | "number_less_than_or_equal_to"
  value: number
} & BasePropertyFilter

type CheckboxPropertyFilter = {
  propertyType: Extract<PropertyType, "checkbox">
  operator: "checkbox_is" | "checkbox_is_not"
  value: boolean
} & BasePropertyFilter

type SelectPropertyFilter = {
  propertyType: Extract<PropertyType, "select">
  operator: "enum_is" | "enum_is_not"
  value: string
} & BasePropertyFilter

type MultiSelectPropertyFilter = {
  propertyType: Extract<PropertyType, "multi_select">
  operator: "enum_contains" | "enum_does_not_contain" | "enum_contains_all"
  value: string
} & BasePropertyFilter

type StatusPropertyFilter = {
  propertyType: Extract<PropertyType, "status">
  operator: "status_is" | "status_is_not"
  value: string
} & BasePropertyFilter

type DatePropertyFilter = {
  propertyType: "date" | "created_time" | "last_edited_time"
  operator:
    | "date_is"
    | "date_is_before"
    | "date_is_after"
    | "date_is_on_or_before"
    | "date_is_on_or_after"
  /** Date value in YYYY-MM-DD format */
  value: string
} & BasePropertyFilter

type RelationPropertyFilter = {
  propertyType: Extract<PropertyType, "relation">
  operator: "relation_contains" | "relation_does_not_contain"
  /** Resource ID of the related page (must reference a page created in the same script) */
  value: string
} & BasePropertyFilter

/**
 * Person property filter — matches rows whose person property contains (or
 * does not contain) the viewer (the `"me"` template variable, resolved at
 * read time).
 */
type PersonPropertyFilter = {
  propertyType: "person" | "created_by" | "last_edited_by"
  operator: "person_contains" | "person_does_not_contain"
  value: { type: "relative"; value: "me" }
} & BasePropertyFilter

/**
 * Filter schema for filtering database views by property values.
 * Used in view definitions to specify which pages should be visible.
 *
 * Each filter targets a specific property by ID and applies a type-appropriate
 * filter operator with a comparison value.
 *
 * @example Text property filter
 * {
 *   propertyId: "name-prop",
 *   propertyType: "text",
 *   operator: "string_contains",
 *   value: "Project"
 * }
 */
type PropertyViewFilterSchema =
  | TextPropertyFilter
  | NumberPropertyFilter
  | CheckboxPropertyFilter
  | SelectPropertyFilter
  | MultiSelectPropertyFilter
  | StatusPropertyFilter
  | DatePropertyFilter
  | RelationPropertyFilter
  | PersonPropertyFilter

/**
 * Base view schema shared by all view types.
 *
 * IMPORTANT: dataSourceResourceId is REQUIRED for all views.
 * This must match the resourceId of one of the database's data sources.
 *
 * @example
 * // When creating a database with a data source
 * const db = await notion.database.create({
 *   resourceId: "my-database",
 *   dataSources: [{ resourceId: "my-datasource", name: "Main", properties: [...] }]
 * })
 *
 * // Views must reference that data source
 * await db.addView({
 *   resourceId: "my-table-view",
 *   type: "table",
 *   dataSourceResourceId: "my-datasource"  // REQUIRED: matches data source above
 * })
 */
type BaseViewSchema = {
  resourceId: ResourceId
  name?: string
  type: ViewType
  /** REQUIRED: Must match an existing data source's resourceId */
  dataSourceResourceId: ResourceId
  /**
   * Optional resource ID of a template page in this view's data source to use as
   * the view default template.
   *
   * The referenced page must be created with `template: true` and be parented to
   * this same data source.
   */
  defaultTemplate?: ResourceId
  /**
   * Optional: create this view to be used as a linked views referenced by
   * `<database>` tags in page content markdown. Does not attach the view to the
   * database block's.
   */
  ephemeral?: boolean
  sorts?: Array<PropertyViewSortSchema>
  /** Optional filter to control which pages appear in this view. */
  filters?: PropertyViewFilterSchema[]
}

type TableViewSchema = BaseViewSchema & {
  type: "table"
  properties?: Array<PropertyFormat>
  wrap?: boolean
}

type BoardViewSchema = BaseViewSchema & {
  type: "board"
  properties?: Array<PropertyFormat>
  groupBy?: GroupByFormat
  columns?: Array<GroupFormat>
  cover?: CoverFormat
  coverSize?: CoverSizeFormat
  coverAspect?: CoverAspectFormat
  wrap?: boolean
}

type CalendarViewSchema = BaseViewSchema & {
  type: "calendar"
  properties?: Array<PropertyFormat>
  /**
   * REQUIRED: ResourceId of the date property to use for the calendar.
   * Must match the `resourceId` of a date property in the database schema.
   *
   * @example
   * calendarBy: "due-date-prop"  // resourceId of a property of type "date"
   */
  calendarBy: ResourceId
  showWeekends?: boolean
}

type ListViewSchema = BaseViewSchema & {
  type: "list"
  properties?: Array<PropertyFormat>
}

type GalleryViewSchema = BaseViewSchema & {
  type: "gallery"
  properties?: Array<PropertyFormat>
  cover?: CoverFormat
  coverSize?: CoverSizeFormat
  coverAspect?: CoverAspectFormat
}

type TimelineViewSchema = BaseViewSchema & {
  type: "timeline"
  properties?: Array<PropertyFormat>
  tableProperties?: Array<PropertyFormat>
  /**
   * REQUIRED: ResourceId of the date property to use for the timeline start.
   * Must match the `resourceId` of a date property in the database schema.
   *
   * @example
   * timelineBy: "start-date-prop"  // resourceId of a property of type "date"
   */
  timelineBy: ResourceId
  /**
   * Optional: ResourceId of the date property to use for the timeline end
   * (for date ranges). Must match the `resourceId` of a date property in
   * the database schema.
   */
  timelineByEnd?: ResourceId
  showTable?: boolean
}

type ViewSchema =
  | TableViewSchema
  | BoardViewSchema
  | CalendarViewSchema
  | ListViewSchema
  | GalleryViewSchema
  | TimelineViewSchema

/**
 * Arguments for creating a database.
 *
 * RESTRICTION: Databases can only be parented to resources created within the same
 * Infra as Code script. Parenting to existing records outside the script is not supported
 * for permission safety reasons.
 */
type DatabaseIntent = {
  resourceId: ResourceId
  parent: Parent
  dataSources: Array<DataSourceSchema>
  views?: Array<ViewSchema>
  /**
   * Icon for the database. Can be an emoji or a notion_icon (looked up via semantic search).
   */
  icon?: InfraAsCodeIcon
  name?: string
  /**
   * Optional description for the database. A database with a description must
   * have at least one data source, i.e. a purely linked database should not
   * have a description set on it.
   */
  description?: string
}

type SpaceUserMember = {
  role: "page_guest" | "restricted_member" | "member" | "owner"
} & ({ userId: string } | { email: string })

/**
 * Arguments for creating a space.
 *
 * NOTE: Infra as Code scripts are required to create a new space - you cannot work within
 * an existing space. This restriction exists for permission safety: all operations
 * run in a freshly created space where the executing user has full ownership.
 */
type SpaceIntent = {
  resourceId: ResourceId
  name: string
  /**
   * Icon for the space. Can be an emoji or a notion_icon (resolved by exact slug match or semantic search description).
   */
  icon?: InfraAsCodeIcon
  /**
   * Additional members to add to the workspace.
   * The executing actor is always added automatically as an owner.
   */
  members?: SpaceUserMember[]
}

type TeamspaceMember = {
  userId: string
  role: "owner" | "member"
}

type TeamspaceAccessLevel = "default" | "open" | "closed" | "private"

/**
 * Arguments for creating a teamspace.
 *
 * RESTRICTION: Teamspaces can only be created within spaces created in the same
 * Infra as Code script. Creating teamspaces in existing spaces is not supported for
 * permission safety reasons.
 */
type TeamspaceIntent = {
  resourceId: ResourceId
  name: string
  accessLevel: TeamspaceAccessLevel
  parent?: Parent
  /**
   * Icon for the teamspace. Can be an emoji or a notion_icon (resolved by exact slug match or semantic search description).
   */
  icon?: InfraAsCodeIcon
  description?: string
}

/**
 * Arguments for creating a custom agent.
 *
 * Custom agents are AI agents scoped to a Notion workspace.
 *
 */
type CustomAgentIntent = {
  resourceId: ResourceId
  name: string
  /**
   * Icon shown next to the agent in the sidebar, agents list, mentions,
   * and settings. Accepts the two shapes Notion's `data.icon` field
   * actually persists for workflow rows:
   * - `{ type: "emoji", emoji: "🛟" }` — written verbatim to `data.icon`.
   * - `{ type: "notion_icon", description: "rocket", color: "purple" }` —
   *   resolved to a `/icons/<slug>_<color>.svg` path; exact slug matches
   *   skip the embeddings round-trip.
   *
   * `FileReference` (the third `InfraAsCodeIcon` variant) is intentionally
   * NOT supported here yet.
   * [ref:custom_agent_file_uploads]
   *
   * When omitted, the workflow row is created without an icon and the
   * Notion UI renders the default agent avatar.
   */
  icon?: EmojiIcon | NotionIcon
  /**
   * Markdown instructions that tell the agent how to behave. The string
   * is parsed as markdown and materialized into a hidden instruction
   * page (a block tree under the agent's own space), and
   * `workflow.data.instructions` is set to a `block_page` pointer to
   * that page rather than to the raw text.
   *
   * Use standard markdown — headings, lists, bold, links, etc. — and
   * the agent runtime will see the rendered page content. Plain text
   * also works: it becomes a single paragraph block on the instruction
   * page.
   *
   * When omitted, the workflow row is created without instructions.
   */
  instructions?: string
  /**
   * Inference model identifier for this agent. Currently supports a
   * curated subset:
   * - `"ambrosia-tart-high"` — Opus 4.8 (High)
   * - `"opal-quince-medium"` — GPT 5.5 (Medium)
   * - `"almond-croissant-low"` — Sonnet 4.6 (Low)
   *
   * When omitted the agent inherits the workspace default model.
   *
   * TODO: Externalize the model names. These are internal codename
   * slugs that rotate with model releases; we need a stable external
   * naming scheme before this becomes a real public surface.
   * [ref:custom_agent_model_externalize]
   */
  model?: "ambrosia-tart-high" | "opal-quince-medium" | "almond-croissant-low"
  /**
   * ResourceIds of pages and databases the agent should have access to.
   *
   * Each entry must reference a page or database that is either created
   * earlier in the same script or pre-seeded as an existing resource.
   * Entries are materialized as `pageOrCollectionViewBlock` permissions on
   * the agent's Notion module with `["editor"]` actions (read + write).
   *
   * Referencing a resource that is not a page or database (e.g. a teamspace
   * or workspace) throws at finalize time.
   */
  sharedResources?: Array<ResourceId>
}

/**
 * Handle returned when creating a custom agent.
 *
 * Mirrors PageHandle / TeamspaceHandle: only the resourceId is exposed so
 * downstream IaC primitives (e.g. sharedResources) can reference the agent
 * by its forward-declared ID.
 */
type CustomAgentHandle = {
  resourceId: ResourceId
}

/**
 * Handle returned when creating a page.
 *
 * IMPORTANT: When using pages in relations, you must use the page resourceId, not the full PageHandle.
 *
 * @example Correct usage in relations
 * const projectPage = await projectsDS.addPage({ ... })
 * const issueProps = {
 *   Project: notion.relation([projectPage.resourceId])  // Use resourceId, not projectPage directly
 * }
 *
 * @example Incorrect usage (will cause type error)
 * const issueProps = {
 *   Project: notion.relation([projectPage])  // ERROR: PageHandle is not assignable to string
 * }
 */
type PageHandle = {
  resourceId: ResourceId
}

type DataSourceHandle<P extends PropertySchemaDefinition[]> = {
  resourceId: ResourceId
  /** Literal snapshot of the data source's properties at database creation */
  schema: P
  addPage(args: {
    resourceId: ResourceId
    /**
     * Icon for the page. Can be an emoji or a notion_icon (resolved by exact slug match or semantic search description).
     */
    icon?: InfraAsCodeIcon
    /**
     * Properties for the database page, matching the schema defined in the data source.
     * Must include values for required properties (e.g., the title property).
     * @example
     * properties: { Name: notion.text("Task"), Status: "Done" }
     */
    properties: PropertiesInputForSchema<P>
    /**
     * Optional page content in Notion flavored markdown format.
     * When provided, the markdown will be parsed into blocks and added as children of the page.
     *
     * NOTE: The page title must be set via the title property in `properties`, NOT from content.
     * Content markdown is only used to generate child blocks.
     */
    content?: string
    /**
     * Whether this page should be created as a data source template.
     */
    template?: boolean
    /**
     * Optional cover image referencing a file resource ID from the file manifest.
     * The file must be an image type (png, jpg, gif, svg, webp).
     */
    cover?: FileReference
  }): PageHandle
}

/**
 * Handle returned when creating a database.
 */
type DatabaseHandle<
  DS extends {
    resourceId: ResourceId
    properties: PropertySchemaDefinition[]
  }[],
> = {
  resourceId: ResourceId
  dataSources: Record<ResourceId, DataSourceHandle<PropertySchemaDefinition[]>>
  /** Get a data source handle by id with schema-aware typing */
  getDataSource: <K extends DS[number]>(
    id: K["resourceId"]
  ) => DataSourceHandle<K["properties"]>
  /**
   * Record view intent.
   * Views require a dataSourceResourceId that matches one of the database's data sources.
   */
  addView: (view: ViewSchema) => void
}

/**
 * Handle returned when creating a teamspace.
 *
 * @example Creating a page in a teamspace
 * const teamspace = await notion.teamspace.create({ ... })
 *
 * // Using the addPage convenience method
 * const page = await teamspace.addPage({
 *   resourceId: "my-page",
 *   properties: { title: notion.text("Page Title") }
 * })
 *
 * // Or using notion.page.create() directly
 * const page = await notion.page.create({
 *   resourceId: "my-page",
 *   parent: { type: "resourceId", resourceId: teamspace.resourceId },
 *   properties: { title: notion.text("Page Title") }
 * })
 */
type TeamspaceHandle = {
  resourceId: ResourceId
  /** Add a database to this teamspace */
  addDatabase<
    DS extends {
      resourceId: ResourceId
      name: string
      properties: PropertySchemaDefinition[]
    }[],
  >(
    args: Omit<DatabaseIntent, "parent" | "dataSources"> & {
      dataSources: DS
    }
  ): DatabaseHandle<DS>
  /** Add a page to this teamspace */
  addPage(args: {
    resourceId: ResourceId
    /**
     * Icon for the page. Can be an emoji or a notion_icon (resolved by exact slug match or semantic search description).
     */
    icon?: InfraAsCodeIcon
    /**
     * Page properties including the title.
     * Use `properties.title` to set the page title.
     * @example
     * properties: { title: notion.text("My Page Title") }
     */
    properties?: Record<string, PropertyValue | undefined>
    /**
     * Optional page content in Notion flavored markdown format.
     * When provided, the markdown will be parsed into blocks and added as children of the page.
     *
     * NOTE: The page title must be set via `properties.title`, NOT from content.
     * Content markdown is only used to generate child blocks.
     */
    content?: string
    /**
     * Optional cover image referencing a file resource ID from the file manifest.
     * The file must be an image type (png, jpg, gif, svg, webp).
     */
    cover?: FileReference
  }): PageHandle
}

type SpaceHandle = {
  resourceId: ResourceId
  addTeamspace(args: Omit<TeamspaceIntent, "parent">): TeamspaceHandle
}

// Property value helper functions

/**
 * Property types supported by infra as code scripts.
 */
type PropertyType =
  | "title"
  | "text"
  | "number"
  | "select"
  | "multi_select"
  | "status"
  | "date"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "relation"
  | "rollup"
  | "created_time"
  | "last_edited_time"
  | "created_by"
  | "last_edited_by"

declare const notion: {
  /**
   * Page operations - create pages in your workspace.
   * Pages are the basic content units in Notion that can contain rich content.
   */
  page: {
    /**
     * Creates a new page under a page, database, or teamspace.
     */
    create: (args: PageIntent) => PageHandle
  }

  /**
   * Database operations - create databases with custom schemas.
   * Databases contain structured data with properties and views.
   */
  database: {
    /**
     * Creates a new database and returns a typed DatabaseHandle for quick addPage().
     */
    create<
      DS extends Array<{
        resourceId: ResourceId
        name: string
        properties: Array<PropertySchemaDefinition>
      }>,
    >(
      args: Omit<DatabaseIntent, "dataSources"> & { dataSources: DS }
    ): DatabaseHandle<DS>
  }

  /**
   * Teamspace operations - create teamspaces.
   */
  teamspace: {
    /**
     * Creates a new teamspace and returns a TeamspaceHandle for adding databases.
     */
    create: (args: TeamspaceIntent) => TeamspaceHandle
  }

  /**
   * Space operations - create Notion workspaces.
   */
  space: {
    /**
     * Creates a new Notion workspace and returns a SpaceHandle for adding teamspaces.
     */
    create: (args: SpaceIntent) => SpaceHandle
  }

  /**
   * Custom agent operations - create AI agents scoped to a workspace.
   */
  customAgent: {
    /**
     * Creates a new custom agent and returns a CustomAgentHandle.
     */
    create: (args: CustomAgentIntent) => CustomAgentHandle
  }

  date: (startDate: string, endDate?: string) => TextValue
  text: (value: string) => TextValue
  number: (value: number) => TextValue
  select: (value: string) => string
  status: (value: string) => string
  multiSelect: (values: Array<string>) => string
  checkbox: (value: boolean) => TextValue
  url: (value: string) => TextValue
  email: (value: string) => TextValue
  phone: (value: string) => TextValue
  relation: (items: Array<ResourceId>) => Array<ResourceId>
  file: (resourceId: ResourceId) => FileReference
}

/**
 * Complete specification for Notion's enhanced Markdown format.
 * This includes all block types, rich text formatting, and XML elements.
 * Used for the content parameter in page creation and database page creation.
 */
declare const INFRA_AS_CODE_MARKDOWN_SPEC = `
### Notion-flavored Markdown
Notion-flavored Markdown is a variant of standard Markdown with additional features to support all Block and Rich text types.
Use tabs for indentation.
Use backslashes to escape characters. For example, \* will render as * and not as a bold delimiter.
These are the characters that should be escaped: \ * ~ \` $ [ ] < > { } | ^
Block types:
Markdown blocks use a {color="Color"} attribute list to set a block color.
Text:
Rich text {color="Color"}
	Children
Headings:
# Rich text {color="Color"}
## Rich text {color="Color"}
### Rich text {color="Color"}
#### Rich text {color="Color"}
(Headings 5 and 6 are not supported in Notion and will be converted to heading 4.)
Bulleted list:
- Rich text {color="Color"}
	Children
Numbered list:
1. Rich text {color="Color"}
	Children
	
Bulleted and numbered list items should contain inline rich text -- otherwise they will render as empty list items, which look awkward in the Notion UI. (The inline text should be rich text -- any other block type will not be rendered inline, but as a child to an empty list item.)
Empty line:
<empty-block/>
Notion renders blocks with appropriate spacing, so there is almost never a need to use empty lines.
To render correctly as an empty line, <empty-block/> must be on its own line with no other text.
Empty lines without <empty-block/> will be stripped out.
Rich text types:
Bold:
**Rich text**
Italic:
*Rich text*
Strikethrough:
~~Rich text~~
Underline:
<span underline="true">Rich text</span>
Inline code:
\`Code\`
Multi-line inline code:
\`Line 1<br>Line 2<br>Line 3\`
Unlike in standard markdown, never use ordinary newlines inside inline code -- this will break the code span and render backticks as literal text:
\`Line 1
Line 2\` <-- BAD: newline breaks the inline code
Link:
[Link text](URL)
Citation:
[^URL]
To create a citation, you can either reference a compressed URL like this,[^{{1}}] or a full URL like this.[^example.com]
Inline colors:
<span color?="Color">Rich text</span>
Inline math:
$\`Equation\`$
The equation must be enclosed in backticks.
Inline line breaks within a block (this is mostly useful in multi-line quote blocks, where an ordinary newline character should not be used since it will break up the block structure):
<br>
Quote:
> Rich text {color="Color"}
	Children
Multi-line quote:
> Line 1<br>Line 2<br>Line 3 {color="Color"}
Unlike in standard markdown, never use ordinary newlines anywhere mid-quote -- this will render as multiple separate quote blocks, not a single multi-line quote:
> This is a quote
> This is a different, unrelated quote
> This is a third quote
Use of a single > on a line without any other text should be avoided -- this will render as an empty blockquote, which is not visually appealing.
To-do:
- [ ] Rich text {color="Color"}
	Children
- [x] Rich text {color="Color"}
	Children
Divider:
---
Table:
<table fit-page-width?="true|false" header-row?="true|false" header-column?="true|false">
	<colgroup>
		<col color?="Color">
		<col color?="Color">
	</colgroup>
	<tr color?="Color">
		<td>Data cell</td>
		<td color?="Color">Data cell</td>
	</tr>
	<tr>
		<td>Data cell</td>
		<td>Data cell</td>
	</tr>
</table>
Note: All table attributes are optional. If omitted, they default to "false".
Table structure:
- <table>: Root element with optional attributes:
  - fit-page-width: Whether the table should fill the page width
  - header-row: Whether the first row is a header
  - header-column: Whether the first column is a header
- <colgroup>: Optional element defining column-wide styles. Do not include a <colgroup> element if you do not want to set any column colors or widths.
- <col>: Column definition with optional attributes:
  - color: The color of the column
  - width: The width of the column. Leave empty to auto-size.
- <tr>: Table row with optional color attribute
- <td>: Data cell with optional color attribute
Color precedence (highest to lowest):
1. Cell color (<td color="red">)
2. Row color (<tr color="blue_bg">)
3. Column color (<col color="gray">)
Contents of table cells:
- Table cells can only contain rich text. Other block types (headings, lists, images, etc.) are not supported.
- Never use raw HTML formatting tags inside table cells; use the equivalent Notion-flavored Markdown instead, for example **bold** instead of <strong> or <b>.
Cell merging:
- Notion supports merging rectangular groups of cells into a single cell.
- You cannot create or modify cell merges through this format. If the user asks you to merge cells, tell them Notion supports it but they must do it in the UI: select the cells, right-click, and choose "Merge cells". To unmerge, use "Unmerge cells" from the same menu.
Equation:
$$
Equation
$$
		Code:
\`\`\`language
Code
\`\`\`
Note: Set the language if known (e.g. mermaid). Do NOT escape special characters inside code blocks. Code block content is literal - write it exactly as it should appear. For example, write \`const arr = [1, 2, 3]\` NOT \`const arr = \[1, 2, 3\]\`. Backslash escaping rules only apply outside of code blocks.
Mermaid diagrams: Use \`\`\`mermaid as the language. Enclose node text in double quotes when it contains special characters like parentheses, e.g. \`A["Notion (App + API)"]\`. Use \`<br>\` for line breaks inside node labels, not \n. Do not use \( or \) inside Mermaid — instead just wrap the whole label in double quotes.
XML blocks use the 'color' attribute to set a block color.
Mentions:
Users, pages, databases, data sources, agents, dates, and datetimes can be mentioned:
<mention-user url="{{URL}}">User name</mention-user>
<mention-page url="{{URL}}">Page title</mention-page>
<mention-database url="{{URL}}">Database name</mention-database>
<mention-data-source url="{{URL}}">Data source name</mention-data-source>
<mention-agent url="{{URL}}">Agent name</mention-agent>
<mention-date start="YYYY-MM-DD" end="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" startTime="HH:mm" timeZone="IANA_TIMEZONE"/>
<mention-date start="YYYY-MM-DD" startTime="HH:mm" end="YYYY-MM-DD" endTime="HH:mm" timeZone="IANA_TIMEZONE"/>
The URL must always be provided, and refer to an existing user, page, database, data source, agent, date, or datetime.
The inner text (name/title) is optional. The UI always displays the resolved name. So an alternative self-closing format is also supported: <mention-user url="{{URL}}"/>
Mentions are clickable and link to the entity.
For dates and datetimes, omit the 'end' attribute to mention a single date or datetime.
<mention-page> is an inline reference only. Do NOT use it to replace a <page> block — removing a <page> block deletes the child page.
Colors:
Text colors (colored text with transparent background):
gray, brown, orange, yellow, green, blue, purple, pink, red
Background colors (colored background with contrasting text):
gray_bg, brown_bg, orange_bg, yellow_bg, green_bg, blue_bg, purple_bg, pink_bg, red_bg
Usage:
- Block colors: Add color="Color" to the first line of any block
- Inline rich text colors (text colors and background colors are both supported): Use <span color="Color">Rich text</span>
#### Advanced Block types for Page content
The following block types may only be used in page content, not in the chat UI.
<advanced-blocks>
Toggle:
<details color?="Color">
<summary>Rich text</summary>
Children
</details>
Toggle headings use the {toggle="true"} attribute on a heading:
Toggle heading 1:
# Rich text {toggle="true" color?="Color"}
	Children
Toggle heading 2:
## Rich text {toggle="true" color?="Color"}
	Children
Toggle heading 3:
### Rich text {toggle="true" color?="Color"}
	Children
For toggles and toggle headings, the children must be indented in order for them to be toggleable. If you do not indent the children, they will not be contained within the toggle or toggle heading.
Callout:
<callout icon?="emoji or Notion Icon" color?="Color">
	Rich text
	Children
</callout>
Callouts can contain multiple blocks and nested children, not just inline rich text. Each child block should be indented.
For any formatting inside of callout blocks, use Notion-flavored Markdown, not HTML. For instance, bold text in a callout should be wrapped in **, not <strong>.
Columns:
<columns>
	<column>
		Children
	</column>
	<column>
		Children
	</column>
</columns>
Custom emoji:
:emoji_name:
Page:
<page url="{{URL}}" color?="Color">Title</page>
IMPORTANT: A <page> tag represents a subpage (child page) on the current page.
WARNING: Using <page> with an existing page URL will MOVE that page into this page as a subpage. Removing that <page> tag from the content will REMOVE that child page from the current page. If moving is not intended use the <mention-page> block instead.
Database:
<database url?="{{URL}}" inline?="true|false" icon?="Emoji" color?="Color" data-source-url?="{{URL}}" wiki?="true|false">Title</database>
Provide either url or data-source-url attribute:
- If 'url' is an existing database URL, including it here will MOVE that database into the current page. If you just want to mention an existing database, use <mention-database> instead.
- If 'data-source-url' is an existing data source URL, creates a linked database view.
The 'inline' attribute toggles how the database is displayed in the UI. If set to "true", the database is fully visible and interactive on the page. If set to "false", the database is displayed as a sub-page. If you try to set inline to an invalid value, it will default to "false".
The 'wiki' attribute indicates whether this database is a wiki. Wiki databases have wiki="true". When creating pages in a wiki database, you MUST use parent type "page" with the wiki's page URL instead of parent type "dataSource". Wiki pages must be created under the database page, not the data source directly.
There is no 'Data Source' block type. Data Sources are always inside a Database, and only Databases can be inserted into a Page.
Audio:
<audio src="{{URL}}" color?="Color">Caption</audio>
File:
<file src="{{URL}}" color?="Color">Caption</file>
Image:
![Caption](URL) {color?="Color"}
PDF:
<pdf src="{{URL}}" color?="Color">Caption</pdf>
Video:
<video src="{{URL}}" color?="Color">Caption</video>
(Note that source URLs can either be compressed URLs, such as src="{{1}}", or full URLs, such as src="example.com". Full URLs enclosed in curly brackets, like src="{{https://example.com}}" or src="{{example.com}}", do not work.)
Table of contents:
<table_of_contents color?="Color"/>
Synced block:
The original source for a synced block.
When creating a new synced block, do not provide the URL. After inserting the synced block into a page, the URL will be provided.
<synced_block url?="{{URL}}">
	Children
</synced_block>
Note: When creating new synced blocks, omit the url attribute - it will be auto-generated. When reading existing synced blocks, the url attribute will be present.
Synced block reference:
A reference to a synced block.
The synced block must already exist and url must be provided.
You can directly update the children of the synced block reference and it will update both the original synced block and the synced block reference.
If content is unavailable due to permissions, a non-editable notice may be included via the optional notice attribute.
<synced_block_reference url="{{URL}}" notice="{{OPTIONAL_NOTICE}}">
	Children
</synced_block_reference>
Meeting notes:
<meeting-notes>
	Rich text (meeting title)
	<summary>
		AI-generated summary of the notes + transcript
	</summary>
	<notes>
		User notes
	</notes>
	<transcript>
		Transcript of the audio (cannot be edited)
	</transcript>
</meeting-notes>
- The <transcript> tag contains a raw transcript and cannot be edited by AI, but it can be edited by a user.
- When creating new meeting notes blocks, you must omit the <summary> and <transcript> tags.
- Only include <notes> in a new meeting notes block if the user is SPECIFICALLY requesting note content.
- Attempting to include or edit <transcript> will result in an error.
- All content within <summary>, <notes>, and <transcript> tags must be indented at least one level deeper than the <meeting-notes> tag.
Unknown (a block type that is not supported in the API yet):
<unknown url="{{URL}}" alt="Alt"/>
</advanced-blocks>
`

// ===============================
// Sandbox Output Types
// ===============================

/**
 * Intent for adding a view to a database.
 * Emitted separately from the database intent to allow streaming output
 * without needing to buffer views until the database is finalized.
 */
type ViewIntent = {
  /** The resourceId of the database to add the view to */
  databaseResourceId: ResourceId
  /** The view configuration */
  view: ViewSchema
}

/**
 * Intent for attaching a file to a parent block, database page property, teamspace icon, or space icon.
 * Used for database file property values where the file
 * is not embedded inline via markdown content.
 */
type FileAttachmentIntent = {
  /** Resource ID of the file from the file manifest */
  resourceId: ResourceId
  /** Resource ID of the parent page to attach the file to */
  parentResourceId: ResourceId
  /**
   * Property name on the parent page to set the file as value.
   * Only applicable when the parent is a database page with a file property.
   */
  propertyName?: string
}

/**
 * Discriminated union of all intent types for sandbox output.
 * Each intent includes a `type` discriminator and the corresponding args.
 */
type InfraAsCodeIntent =
  | ({ type: "space" } & SpaceIntent)
  | ({ type: "teamspace" } & TeamspaceIntent)
  | ({ type: "database" } & DatabaseIntent)
  | ({ type: "page" } & PageIntent)
  | ({ type: "view" } & ViewIntent)
  | ({ type: "file_attachment" } & FileAttachmentIntent)
  | ({ type: "custom_agent" } & CustomAgentIntent)
