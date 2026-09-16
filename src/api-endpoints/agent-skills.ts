// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type { IdRequest } from "./common"

type ListSkillsPluginsQueryParameters = {
  // The number of items to return. Maximum: 100.
  page_size?: number
  // An opaque cursor returned by the previous page of results.
  start_cursor?: string | null
}

export type ListSkillsPluginsParameters = ListSkillsPluginsQueryParameters

export type ListSkillsPluginsResponse = {
  // Always `list`
  object: "list"
  results: Array<{
    id: string
    name: string
    description: string
    // Opaque version identifier for the plugin. Compare this value for equality to determine
    // whether the plugin has changed.
    version_id: string
  }>
  next_cursor: string | null
  has_more: boolean
  // Always `plugin`
  type: "plugin"
}

/**
 * List skills plugins
 */
export const listSkillsPlugins = {
  method: "get",
  pathParams: [],
  queryParams: ["page_size", "start_cursor"],
  bodyParams: [],

  path: (): string => `ai/plugins`,
} as const

type GetPluginDirectoryPathParameters = {
  id: string
}

export type GetPluginDirectoryParameters = GetPluginDirectoryPathParameters

export type GetPluginDirectoryResponse = {
  id: string
  // Opaque version identifier for the plugin directory. Compare this value for equality to
  // determine whether the directory has changed. This matches the version_id in the
  // corresponding plugin summary.
  version_id: string
  // Temporary signed URL for downloading the plugin directory as a gzipped tar archive.
  url: string
}

/**
 * Get a plugin directory
 */
export const getPluginDirectory = {
  method: "get",
  pathParams: ["id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetPluginDirectoryPathParameters): string => `ai/plugins/${p.id}`,
} as const

type GetSkillDirectoryPathParameters = {
  // Identifier for a Notion skill page.
  id: IdRequest
}

export type GetSkillDirectoryParameters = GetSkillDirectoryPathParameters

export type GetSkillDirectoryResponse = {
  // Identifier for the skill page.
  id: string
  // Stable content version for the generated skill directory.
  version_id: string
  // Temporary signed URL for downloading the skill directory archive.
  url: string
}

/**
 * Get a skill directory
 */
export const getSkillDirectory = {
  method: "get",
  pathParams: ["id"],
  queryParams: [],
  bodyParams: [],

  path: (p: GetSkillDirectoryPathParameters): string => `ai/skills/${p.id}`,
} as const
