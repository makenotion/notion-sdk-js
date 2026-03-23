// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type { IdRequest, PartialUserObjectResponse } from "./common"

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
