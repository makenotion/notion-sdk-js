// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

type ListMemoriesQueryParameters = {
  // Selected native memory store kind.
  store_type: "personal" | "custom"
  // Memory store ID.
  store_id: string
  // Memories per page. Defaults to 25.
  page_size?: number
  // Opaque cursor returned by a prior list call.
  cursor?: string
}

export type ListMemoriesParameters = ListMemoriesQueryParameters

export type ListMemoriesResponse = {
  // Stable page of memories from the selected store.
  results: Array<{
    // Memory page ID.
    id: string
    // Owning memory store ID.
    store_id: string
    // Memory title.
    title: string
    // Memory category.
    category: "Preference" | "Profile" | "Workstream" | "Notes"
    // Whether the requested content token bound truncated the body.
    truncated: boolean
    // Creation time in Unix milliseconds.
    created_time: number
    // Last edit time in Unix milliseconds.
    last_edited_time: number
    // Opaque version of the row and its loaded child blocks. Pass it to update or archive.
    content_version: string
    // Notion memory page URL.
    url: string
    // Bounded preview of the memory body.
    content_preview: string
    // Stored page creator. This is not inferred provenance.
    created_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
    // Stored last editor.
    last_edited_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
  }>
  // True when a continuation cursor is present.
  has_more: boolean
  // Opaque cursor for the next page.
  next_cursor?: string
}

/**
 * List memories
 */
export const listMemories = {
  method: "get",
  pathParams: [],
  queryParams: ["store_type", "store_id", "page_size", "cursor"],
  bodyParams: [],

  path: (): string => `memories`,
} as const

type CreateMemoryBodyParameters = {
  // Selected native memory store kind.
  store_type: "personal" | "custom"
  // Memory store ID.
  store_id: string
  // Caller-stable retry key scoped to the integration and store.
  idempotency_key: string
  // Memory title.
  title: string
  // Memory category.
  category: "Preference" | "Profile" | "Workstream" | "Notes"
  // Notion-flavored Markdown body.
  content: string
}

export type CreateMemoryParameters = CreateMemoryBodyParameters

export type CreateMemoryResponse = {
  // Created or retried memory.
  memory: {
    // Memory page ID.
    id: string
    // Owning memory store ID.
    store_id: string
    // Memory title.
    title: string
    // Memory category.
    category: "Preference" | "Profile" | "Workstream" | "Notes"
    // Full memory page body as Notion-flavored Markdown.
    content: string
    // Whether the requested content token bound truncated the body.
    truncated: boolean
    // Creation time in Unix milliseconds.
    created_time: number
    // Last edit time in Unix milliseconds.
    last_edited_time: number
    // Opaque version of the row and its loaded child blocks. Pass it to update or archive.
    content_version: string
    // Notion memory page URL.
    url: string
    // Stored page creator. This is not inferred provenance.
    created_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
    // Stored last editor.
    last_edited_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
  }
  // False when the same idempotency key replayed the same create.
  created: boolean
}

/**
 * Create a memory
 */
export const createMemory = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "store_type",
    "store_id",
    "idempotency_key",
    "title",
    "category",
    "content",
  ],

  path: (): string => `memories`,
} as const

type SearchMemoriesQueryParameters = {
  // Selected native memory store kind.
  store_type: "personal" | "custom"
  // Memory store ID.
  store_id: string
  // Keywords to search inside this memory store.
  query: string
  // Maximum matches. Defaults to 10.
  limit?: number
  // Maximum approximate result tokens. Defaults to 1000.
  max_tokens?: number
}

export type SearchMemoriesParameters = SearchMemoriesQueryParameters

export type SearchMemoriesResponse = {
  // Matches from the selected memory store.
  results: Array<{
    // Memory page ID.
    id: string
    // Memory title.
    title: string
    // Memory page URL.
    url: string
    // Memory category.
    category: string
    // Bounded matching content.
    content: string
  }>
  // Whether more matches or content were available.
  truncated: boolean
}

/**
 * Search memories
 */
export const searchMemories = {
  method: "get",
  pathParams: [],
  queryParams: ["store_type", "store_id", "query", "limit", "max_tokens"],
  bodyParams: [],

  path: (): string => `memories/search`,
} as const

type GetMemoryPathParameters = {
  // Memory page ID.
  memory_id: string
}

type GetMemoryQueryParameters = {
  // Memory store kind.
  store_type: "personal" | "custom"
  // Memory store ID.
  store_id: string
  // Maximum approximate body tokens returned.
  max_tokens?: number
}

export type GetMemoryParameters = GetMemoryPathParameters &
  GetMemoryQueryParameters

export type GetMemoryResponse = {
  // Full memory page.
  memory: {
    // Memory page ID.
    id: string
    // Owning memory store ID.
    store_id: string
    // Memory title.
    title: string
    // Memory category.
    category: "Preference" | "Profile" | "Workstream" | "Notes"
    // Full memory page body as Notion-flavored Markdown.
    content: string
    // Whether the requested content token bound truncated the body.
    truncated: boolean
    // Creation time in Unix milliseconds.
    created_time: number
    // Last edit time in Unix milliseconds.
    last_edited_time: number
    // Opaque version of the row and its loaded child blocks. Pass it to update or archive.
    content_version: string
    // Notion memory page URL.
    url: string
    // Stored page creator. This is not inferred provenance.
    created_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
    // Stored last editor.
    last_edited_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
  }
}

/**
 * Retrieve a memory
 */
export const getMemory = {
  method: "get",
  pathParams: ["memory_id"],
  queryParams: ["store_type", "store_id", "max_tokens"],
  bodyParams: [],

  path: (p: GetMemoryPathParameters): string => `memories/${p.memory_id}`,
} as const

type UpdateMemoryPathParameters = {
  // Memory page ID.
  memory_id: string
}

type UpdateMemoryBodyParameters = {
  // Memory store ID.
  store_id: string
  // Memory store kind.
  store_type: "personal" | "custom"
  // Full-content version returned by a read.
  content_version: string
  // Replacement title.
  title?: string
  // Replacement category.
  category?: "Preference" | "Profile" | "Workstream" | "Notes"
  // Replacement Notion-flavored Markdown body.
  content?: string
}

export type UpdateMemoryParameters = UpdateMemoryPathParameters &
  UpdateMemoryBodyParameters

export type UpdateMemoryResponse = {
  // Updated memory.
  memory: {
    // Memory page ID.
    id: string
    // Owning memory store ID.
    store_id: string
    // Memory title.
    title: string
    // Memory category.
    category: "Preference" | "Profile" | "Workstream" | "Notes"
    // Full memory page body as Notion-flavored Markdown.
    content: string
    // Whether the requested content token bound truncated the body.
    truncated: boolean
    // Creation time in Unix milliseconds.
    created_time: number
    // Last edit time in Unix milliseconds.
    last_edited_time: number
    // Opaque version of the row and its loaded child blocks. Pass it to update or archive.
    content_version: string
    // Notion memory page URL.
    url: string
    // Stored page creator. This is not inferred provenance.
    created_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
    // Stored last editor.
    last_edited_by?: {
      // Notion actor table.
      table: string
      // Notion actor ID.
      id: string
    }
  }
}

/**
 * Update a memory
 */
export const updateMemory = {
  method: "patch",
  pathParams: ["memory_id"],
  queryParams: [],
  bodyParams: [
    "store_id",
    "store_type",
    "content_version",
    "title",
    "category",
    "content",
  ],

  path: (p: UpdateMemoryPathParameters): string => `memories/${p.memory_id}`,
} as const

type ArchiveMemoryPathParameters = {
  // Memory page ID.
  memory_id: string
}

type ArchiveMemoryQueryParameters = {
  // Memory store ID.
  store_id: string
  // Memory store kind.
  store_type: "personal" | "custom"
  // Full-content version returned by a read.
  content_version: string
}

export type ArchiveMemoryParameters = ArchiveMemoryPathParameters &
  ArchiveMemoryQueryParameters

export type ArchiveMemoryResponse = {
  // Archived memory page ID.
  id: string
  // Always true. Archive is not durable forget or erasure.
  archived: true
}

/**
 * Archive a memory
 */
export const archiveMemory = {
  method: "delete",
  pathParams: ["memory_id"],
  queryParams: ["store_id", "store_type", "content_version"],
  bodyParams: [],

  path: (p: ArchiveMemoryPathParameters): string => `memories/${p.memory_id}`,
} as const
