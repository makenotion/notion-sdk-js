import type { Agent } from "http"

// The `Supported` types should be kept up to date in order to exactly match what we use in the client. This ensures maximal compatibility with other `fetch` implementations.
export type SupportedRequestInfo = string

export type SupportedRequestInit = {
  agent?: Agent
  body?: string | FormData
  headers?: Record<string, string>
  method?: string
}

export type SupportedResponse = {
  ok: boolean
  text: () => Promise<string>
  headers: unknown
  status: number
}

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>
