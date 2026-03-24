export type CustomEmojiObjectResponse = {
  id: string
  name: string
  url: string
}

type ListCustomEmojisQueryParameters = {
  start_cursor?: string
  page_size?: number
  name?: string
}

export type ListCustomEmojisParameters = ListCustomEmojisQueryParameters

export type ListCustomEmojisResponse = {
  type: "custom_emoji"
  object: "list"
  next_cursor: string | null
  has_more: boolean
  results: Array<CustomEmojiObjectResponse>
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
