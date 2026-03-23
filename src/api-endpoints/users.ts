// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type { EmptyObject, IdRequest, UserObjectResponse } from "./common"

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
