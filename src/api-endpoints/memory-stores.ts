// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

type DiscoverMemoryStorePathParameters = {
  // Native memory store kind.
  type: "personal" | "custom"
}

type DiscoverMemoryStoreQueryParameters = {
  // Concrete custom memory database ID.
  store_id?: string
  // Public custom-agent workflow ID.
  workflow_id?: string
}

export type DiscoverMemoryStoreParameters = DiscoverMemoryStorePathParameters &
  DiscoverMemoryStoreQueryParameters

export type DiscoverMemoryStoreResponse = {
  // Whether the selected native memory store exists.
  status: "ready" | "not_provisioned"
  // The ready native memory store.
  store?: {
    // Stable memory store ID.
    id: string
    // Native personal or custom-agent memory store.
    type: "personal" | "custom"
    // Native Memory DB schema version.
    schema_version: number
    // Store creation time in Unix milliseconds.
    created_time?: number
    // Owning workflow ID for a custom-agent store.
    workflow_id?: string
  }
}

/**
 * Discover a memory store
 */
export const discoverMemoryStore = {
  method: "get",
  pathParams: ["type"],
  queryParams: ["store_id", "workflow_id"],
  bodyParams: [],

  path: (p: DiscoverMemoryStorePathParameters): string =>
    `memory_stores/${p.type}`,
} as const

type BootstrapMemoryStoreBodyParameters = {
  // Bootstrap the authenticated user's personal store.
  type: "personal"
}

export type BootstrapMemoryStoreParameters = BootstrapMemoryStoreBodyParameters

export type BootstrapMemoryStoreResponse = {
  // The user's ready personal memory store.
  store: {
    // Stable memory store ID.
    id: string
    // Native personal or custom-agent memory store.
    type: "personal" | "custom"
    // Native Memory DB schema version.
    schema_version: number
    // Store creation time in Unix milliseconds.
    created_time?: number
    // Owning workflow ID for a custom-agent store.
    workflow_id?: string
  }
  // True when bootstrap created a missing artifact.
  created: boolean
}

/**
 * Bootstrap a personal memory store
 */
export const bootstrapMemoryStore = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["type"],

  path: (): string => `memory_stores`,
} as const

type GetMemoryContextPathParameters = {
  // Memory store ID.
  store_id: string
}

type GetMemoryContextQueryParameters = {
  // Memory store kind.
  store_type: "personal" | "custom"
  // Maximum approximate tokens returned.
  max_tokens?: number
}

export type GetMemoryContextParameters = GetMemoryContextPathParameters &
  GetMemoryContextQueryParameters

export type GetMemoryContextResponse = {
  // Bounded Memory Summary body.
  content: string
  // Native Notion source pointer.
  source: {
    // Native summary page source type.
    type: "memory_summary_page"
    // Summary page ID.
    page_id: string
    // Summary page URL.
    url: string
  }
  // Whether the token bound truncated the body.
  truncated: boolean
  // Freshest rendered child edit time in Unix milliseconds.
  last_edited_time?: number
}

/**
 * Retrieve memory context
 */
export const getMemoryContext = {
  method: "get",
  pathParams: ["store_id"],
  queryParams: ["store_type", "max_tokens"],
  bodyParams: [],

  path: (p: GetMemoryContextPathParameters): string =>
    `memory_stores/${p.store_id}/context`,
} as const
