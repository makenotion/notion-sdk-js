/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * Notion API Endpoints
 *
 * This file contains metadata about each of the API endpoints such as the HTTP method, the parameters, and the types.
 * In the future, the contents of this file will be generated from an API definition.
 */

import {
  PaginatedList,
  PaginationParameters,
  Database,
  Page,
  ParentInput,
  PropertyValue,
  Block,
  BlockBase,
  User,
  UserBase,
  Filter,
  Sort,
  SearchSort,
  SearchFilter,
  InputPropertyValue,
  Property,
  ParentPageInput,
  PropertySchema,
  RichTextInput,
  UpdateBlock,
  UpdatePropertySchema,
  ExternalFileInput,
  EmojiInput,
  FileInput,
} from "./api-types"
import { DistributiveOmit } from "./type-utils"

// TODO: type assertions to verify that each interface is synchronized to the list of keys in the runtime value below.

// TODO: instead of importing interfaces like BlockBase, should i use a type alias to Block?
// TODO: need an input version of Block

/*
 * blocks.retrieve()
 */

interface BlocksRetrievePathParameters {
  block_id: string
}
interface BlocksRetrieveQueryParameters {}
interface BlocksRetrieveBodyParameters {}

export interface BlocksRetrieveParameters
  extends BlocksRetrievePathParameters,
    BlocksRetrieveQueryParameters,
    BlocksRetrieveBodyParameters {}
export interface BlocksRetrieveResponse extends BlockBase {}

export const blocksRetrieve = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: BlocksRetrievePathParameters) => `blocks/${p.block_id}`,
} as const

/*
 * blocks.update()
 */

interface BlocksUpdatePathParameters {
  block_id: string
}
interface BlocksUpdateQueryParameters {}
type BlocksUpdateBodyParameters = UpdateBlock

export type BlocksUpdateParameters = BlocksUpdatePathParameters &
  BlocksUpdateQueryParameters &
  BlocksUpdateBodyParameters
export interface BlocksUpdateResponse extends BlockBase {}

export const blocksUpdate = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "toggle",
    "to_do",
    "archived",
  ],
  path: (p: BlocksUpdatePathParameters) => `blocks/${p.block_id}`,
} as const

/*
 * blocks.delete()
 */

interface BlocksDeletePathParameters {
  block_id: string
}
interface BlocksDeleteQueryParameters {}
interface BlocksDeleteBodyParameters {}

export interface BlocksDeleteParameters
  extends BlocksDeletePathParameters,
    BlocksDeleteQueryParameters,
    BlocksDeleteBodyParameters {}
export interface BlocksDeleteResponse extends BlockBase {}

export const blocksDelete = {
  method: "delete",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: BlocksDeletePathParameters) => `blocks/${p.block_id}`,
} as const

/*
 * blocks.children.append()
 */

interface BlocksChildrenAppendPathParameters {
  block_id: string
}
interface BlocksChildrenAppendQueryParameters {}
interface BlocksChildrenAppendBodyParameters {
  children: Block[]
}

export interface BlocksChildrenAppendParameters
  extends BlocksChildrenAppendPathParameters,
    BlocksChildrenAppendQueryParameters,
    BlocksChildrenAppendBodyParameters {}
export interface BlocksChildrenAppendResponse extends PaginatedList<Block> {}

export const blocksChildrenAppend = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: ["children"],
  path: (p: BlocksChildrenAppendPathParameters) =>
    `blocks/${p.block_id}/children`,
} as const

/*
 * blocks.children.list()
 */

interface BlocksChildrenListPathParameters {
  block_id: string
}
interface BlocksChildrenListQueryParameters extends PaginationParameters {}
interface BlocksChildrenListBodyParameters {}

export interface BlocksChildrenListParameters
  extends BlocksChildrenListPathParameters,
    BlocksChildrenListQueryParameters,
    BlocksChildrenListBodyParameters {}
export interface BlocksChildrenListResponse extends PaginatedList<Block> {}

export const blocksChildrenList = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (p: BlocksChildrenListPathParameters) =>
    `blocks/${p.block_id}/children`,
} as const

/*
 * databases.list()
 */

interface DatabasesListPathParameters {}
interface DatabasesListQueryParameters extends PaginationParameters {}
interface DatabasesListBodyParameters {}

export interface DatabasesListParameters
  extends DatabasesListPathParameters,
    DatabasesListQueryParameters,
    DatabasesListBodyParameters {}
export interface DatabasesListResponse extends PaginatedList<Database> {}

export const databasesList = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: () => `databases`,
} as const

/*
 * databases.query()
 */

interface DatabasesQueryPathParameters {
  database_id: string
}
interface DatabasesQueryQueryParameters {}
interface DatabasesQueryBodyParameters extends PaginationParameters {
  filter?: Filter
  sorts?: Sort[]
}

export interface DatabasesQueryParameters
  extends DatabasesQueryPathParameters,
    DatabasesQueryQueryParameters,
    DatabasesQueryBodyParameters {}
export interface DatabasesQueryResponse extends PaginatedList<Page> {}

export const databasesQuery = {
  method: "post",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: ["filter", "sorts", "start_cursor", "page_size"],
  path: (p: DatabasesQueryPathParameters) => `databases/${p.database_id}/query`,
} as const

/*
 * databases.retrieve()
 */

interface DatabasesRetrievePathParameters {
  database_id: string
}
interface DatabasesRetrieveQueryParameters {}
interface DatabasesRetrieveBodyParameters {}

export interface DatabasesRetrieveParameters
  extends DatabasesRetrievePathParameters,
    DatabasesRetrieveQueryParameters,
    DatabasesRetrieveBodyParameters {}
export interface DatabasesRetrieveResponse extends Database {}

export const databasesRetrieve = {
  method: "get",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: DatabasesRetrievePathParameters) => `databases/${p.database_id}`,
} as const

/*
 * pages.create()
 */

interface PagesCreatePathParameters {}
interface PagesCreateQueryParameters {}

export type PropertyMap = { [propertyName: string]: Property }
export type PropertyValueMap = { [propertyName: string]: PropertyValue }
export type InputPropertyValueMap = {
  [propertyName: string]: InputPropertyValue
}

export type PageIcon = FileInput | ExternalFileInput | EmojiInput

export type PageIconInput =
  | (DistributiveOmit<Exclude<PageIcon, FileInput>, "type"> & {
      type?: string
    })
  | null

export type PageCover = FileInput | ExternalFileInput

export type PageCoverInput =
  | (DistributiveOmit<Exclude<PageCover, FileInput>, "type"> & {
      type?: string
    })
  | null

interface PagesCreateBodyParameters {
  parent: ParentInput
  properties: InputPropertyValueMap
  children?: Block[]
  icon?: PageIconInput
  cover?: PageCoverInput
}

export interface PagesCreateParameters
  extends PagesCreatePathParameters,
    PagesCreateQueryParameters,
    PagesCreateBodyParameters {}
export interface PagesCreateResponse extends Page {}

export const pagesCreate = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "children", "icon", "cover"],
  path: () => `pages`,
} as const

/*
 * databases.create()
 */

interface DatabasesCreatePathParameters {}
interface DatabasesCreateQueryParameters {}

export type InputPropertySchemaMap = {
  [propertyName: string]: PropertySchema
}
interface DatabasesCreateBodyParameters {
  parent: ParentPageInput
  properties: InputPropertySchemaMap
  title?: RichTextInput[]
  icon?: PageIconInput
  cover?: PageCoverInput
}

export interface DatabasesCreateParameters
  extends DatabasesCreatePathParameters,
    DatabasesCreateQueryParameters,
    DatabasesCreateBodyParameters {}
export interface DatabasesCreateResponse extends Database {}

export const databasesCreate = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "title", "icon", "cover"],
  path: () => `databases`,
} as const

/*
 * databases.update()
 */

interface DatabasesUpdatePathParameters {
  database_id: string
}
interface DatabasesUpdateQueryParameters {}

export type UpdatePropertySchemaMap = {
  [propertyName: string]: UpdatePropertySchema
}
interface DatabasesUpdateBodyParameters {
  properties?: UpdatePropertySchemaMap
  title?: RichTextInput[]
  icon?: PageIconInput
  cover?: PageCoverInput
}

export interface DatabasesUpdateParameters
  extends DatabasesUpdatePathParameters,
    DatabasesUpdateQueryParameters,
    DatabasesUpdateBodyParameters {}
export interface DatabasesUpdateResponse extends Database {}

export const databasesUpdate = {
  method: "patch",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: ["properties", "title", "icon", "cover"],
  path: (d: DatabasesUpdatePathParameters) => `databases/${d.database_id}`,
} as const

/*
 * pages.retrieve()
 */

interface PagesRetrievePathParameters {
  page_id: string
}
interface PagesRetrieveQueryParameters {}
interface PagesRetrieveBodyParameters {}

export interface PagesRetrieveParameters
  extends PagesRetrievePathParameters,
    PagesRetrieveQueryParameters,
    PagesRetrieveBodyParameters {}
export interface PagesRetrieveResponse extends Page {}

export const pagesRetrieve = {
  method: "get",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: PagesRetrievePathParameters) => `pages/${p.page_id}`,
} as const

/*
 * pages.update()
 */

interface PagesUpdatePathParameters {
  page_id: string
}
interface PagesUpdateQueryParameters {}

interface PagesUpdateBodyArchiveParameter {
  archived: boolean
}
interface PagesUpdateBodyParameters {
  properties: InputPropertyValueMap
  icon?: PageIconInput
  cover?: PageCoverInput
}

export interface PagesUpdateParameters
  extends PagesUpdatePathParameters,
    PagesUpdateQueryParameters,
    PagesUpdateBodyArchiveParameter,
    PagesUpdateBodyParameters {}
export interface PagesUpdateResponse extends Page {}

export const pagesUpdate = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: ["archived", "properties", "cover", "icon"],
  path: (p: PagesUpdatePathParameters) => `pages/${p.page_id}`,
} as const

/*
 * users.retrieve()
 */

interface UsersRetrievePathParameters {
  user_id: string
}
interface UsersRetrieveQueryParameters {}
interface UsersRetrieveBodyParameters {}

export interface UsersRetrieveParameters
  extends UsersRetrievePathParameters,
    UsersRetrieveQueryParameters,
    UsersRetrieveBodyParameters {}
export interface UsersRetrieveResponse extends UserBase {}

export const usersRetrieve = {
  method: "get",
  pathParams: ["user_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: UsersRetrievePathParameters) => `users/${p.user_id}`,
} as const

/*
 * users.list()
 */

interface UsersListPathParameters {}
interface UsersListQueryParameters extends PaginationParameters {}
interface UsersListBodyParameters {}

export interface UsersListParameters
  extends UsersListPathParameters,
    UsersListQueryParameters,
    UsersListBodyParameters {}
export interface UsersListResponse extends PaginatedList<User> {}

export const usersList = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: () => `users`,
} as const

/*
 * search()
 */

interface SearchPathParameters {}
interface SearchQueryParameters {}
interface SearchBodyParameters extends PaginationParameters {
  query?: string
  sort?: SearchSort
  filter?: SearchFilter
}

export interface SearchParameters
  extends SearchPathParameters,
    SearchQueryParameters,
    SearchBodyParameters {}
export interface SearchResponse extends PaginatedList<Page | Database> {}

export const search = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["query", "sort", "filter", "start_cursor", "page_size"],
  path: () => `search`,
} as const
