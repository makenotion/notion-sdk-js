import type { Agent } from "http"

// The `Supported` types should be kept up to date in order to exactly match what we use in the client. This ensures maximal compatibility with other `fetch` implementations.
export type SupportedRequestInfo = string

export type SupportedRequestInit = {
  agent?: Agent
  body?: string | FormData
  headers?: Record<string, string>
  method?: string
}

export type SupportedResponseBody = {
  getReader: () => {
    cancel?: () => Promise<void>
    read: () => Promise<{ done: boolean; value?: Uint8Array }>
    releaseLock: () => void
  }
}

export type SupportedResponse = {
  body?: SupportedResponseBody | null
  ok: boolean
  text: () => Promise<string>
  headers: unknown
  status: number
}

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>
