// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type { CustomEmojiResponse, IdResponse } from "./common"

type ListCustomEmojisQueryParameters = {
  // If supplied, this endpoint will return a page of results starting after the cursor
  // provided. If not supplied, this endpoint will return the first page of results.
  start_cursor?: string
  // The number of items from the full list desired in the response. Maximum: 100
  page_size?: number
  // If supplied, filters custom emojis by exact name match. Useful for resolving a custom
  // emoji name to its ID.
  name?: string
}

export type ListCustomEmojisParameters = ListCustomEmojisQueryParameters

export type ListCustomEmojisResponse = {
  // Always `list`
  object: "list"
  // Always `custom_emoji`
  type: "custom_emoji"
  // The list of custom emojis.
  results: Array<CustomEmojiResponse>
  // Whether there are more results available.
  has_more: boolean
  // The cursor to use for the next page of results, or null if there are no more results.
  next_cursor: IdResponse | null
}

/**
 * List custom emojis
 */
export const listCustomEmojis = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size", "name"],
  bodyParams: [],

  path: (): string => `custom_emojis`,
} as const
