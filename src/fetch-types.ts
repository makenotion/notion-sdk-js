import type { Agent } from "http"
import type { Assert } from "./type-utils"
import type NodeFetchFn from "node-fetch"
import type {
  RequestInfo as NodeFetchRequestInfo,
  RequestInit as NodeFetchRequestInit,
  Response as NodeFetchResponse,
} from "node-fetch"

// The `Supported` types should be kept up to date in order to exactly match what we use in the client. This ensures maximal compatibility with other `fetch` implementations.
export type SupportedRequestInfo = string
// We can't assert against the browser or native Node fetch types without complicating the package structure (see #401), so perform a best effort against `node-fetch`, which we use by default.
type _assertSupportedInfoIsSubtypeOfNodeFetch = Assert<
  NodeFetchRequestInfo,
  SupportedRequestInfo
>

export type SupportedRequestInit = {
  agent?: Agent
  body?: string
  headers?: Record<string, string>
  method?: string
}
type _assertSupportedInitIsSubtypeOfNodeFetch = Assert<
  NodeFetchRequestInit,
  SupportedRequestInit
>

export type SupportedResponse = {
  ok: boolean
  text: () => Promise<string>
  headers: unknown
  status: number
}
type _assertSupportedResponseIsSubtypeOfNodeFetch = Assert<
  SupportedResponse,
  NodeFetchResponse
>

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>
type _assertSupportedFetchIsSubtypeOfNodeFetch = Assert<
  SupportedFetch,
  typeof NodeFetchFn
>
