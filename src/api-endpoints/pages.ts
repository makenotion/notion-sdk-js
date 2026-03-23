// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  BlockObjectRequest,
  DateRequest,
  DateResponse,
  EmptyObject,
  FileUploadWithOptionalNameRequest,
  GroupObjectRequest,
  IdRequest,
  InternalOrExternalFileWithNameRequest,
  InternalOrExternalFileWithNameResponse,
  PageCoverRequest,
  PageIconRequest,
  PageMarkdownResponse,
  PageObjectResponse,
  PagePositionSchema,
  PartialPageObjectResponse,
  PartialUserObjectRequest,
  PartialUserObjectResponse,
  RelationItemPropertyValueResponse,
  RichTextItemRequest,
  RichTextItemResponse,
  RollupFunction,
  SelectColor,
  StringRequest,
  TemplateTimezone,
  TextRequest,
  UserObjectResponse,
  VerificationPropertyValueResponse,
} from "./common"

type BooleanFormulaPropertyResponse = {
  type: "boolean"
  boolean: boolean | null
}

export type ButtonPropertyItemObjectResponse = {
  type: "button"
  button: EmptyObject
  object: "property_item"
  id: string
}

export type CheckboxPropertyItemObjectResponse = {
  type: "checkbox"
  checkbox: boolean
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

type DateFormulaPropertyResponse = { type: "date"; date: DateResponse | null }

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

export type FilesPropertyItemObjectResponse = {
  type: "files"
  files: Array<InternalOrExternalFileWithNameResponse>
  object: "property_item"
  id: string
}

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

export type MultiSelectPropertyItemObjectResponse = {
  type: "multi_select"
  multi_select: Array<PartialSelectResponse>
  object: "property_item"
  id: string
}

type NumberFormulaPropertyResponse = { type: "number"; number: number | null }

export type NumberPropertyItemObjectResponse = {
  type: "number"
  number: number | null
  object: "property_item"
  id: string
}

type PartialSelectResponse = { id: string; name: string; color: SelectColor }

export type PeoplePropertyItemObjectResponse = {
  type: "people"
  people: PartialUserObjectResponse | UserObjectResponse
  object: "property_item"
  id: string
}

export type PhoneNumberPropertyItemObjectResponse = {
  type: "phone_number"
  phone_number: string | null
  object: "property_item"
  id: string
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

export type RelationPropertyItemObjectResponse = {
  type: "relation"
  relation: { id: string }
  object: "property_item"
  id: string
}

export type RichTextPropertyItemObjectResponse = {
  type: "rich_text"
  rich_text: RichTextItemResponse
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

export type SelectPropertyItemObjectResponse = {
  type: "select"
  select: PartialSelectResponse | null
  object: "property_item"
  id: string
}

export type StatusPropertyItemObjectResponse = {
  type: "status"
  status: PartialSelectResponse | null
  object: "property_item"
  id: string
}

type StringFormulaPropertyResponse = { type: "string"; string: string | null }

export type TitlePropertyItemObjectResponse = {
  type: "title"
  title: RichTextItemResponse
  object: "property_item"
  id: string
}

export type UniqueIdPropertyItemObjectResponse = {
  type: "unique_id"
  unique_id: { prefix: string | null; number: number | null }
  object: "property_item"
  id: string
}

export type UrlPropertyItemObjectResponse = {
  type: "url"
  url: string | null
  object: "property_item"
  id: string
}

export type VerificationPropertyItemObjectResponse = {
  type: "verification"
  verification: VerificationPropertyValueResponse | null
  object: "property_item"
  id: string
}

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
    | {
        verification:
          | { state: "verified"; date?: DateRequest }
          | { state: "unverified" }
        type?: "verification"
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
    | {
        verification:
          | { state: "verified"; date?: DateRequest }
          | { state: "unverified" }
        type?: "verification"
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
  is_archived?: boolean
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
    "is_archived",
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
