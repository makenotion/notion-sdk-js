import type { Agent } from "http"
import type { Assert } from "./type-utils"
import type NodeFetchFn from "node-fetch"
import type {
  RequestInfo as NodeFetchRequestInfo,
  RequestInit as NodeFetchRequestInit,
  Response as NodeFetchResponse,
} from "node-fetch"
import type {
  RequestInfo as CloudflareRequestInfo,
  RequestInit as CloudflareRequestInit,
  Response as CloudflareResponse,
  fetch as CloudflareFetchFn,
} from "@cloudflare/workers-types"

type FetchFn = typeof fetch

export type SupportedRequestInfo = string
type _assertSupportedInfoIsSubtypeOfNative = Assert<
  RequestInfo,
  SupportedRequestInfo
>
type _assertSupportedInfoIsSubtypeOfNodeFetch = Assert<
  NodeFetchRequestInfo,
  SupportedRequestInfo
>
type _assertSupportedInfoIsSubtypeOfCloudflare = Assert<
  CloudflareRequestInfo,
  SupportedRequestInfo
>

export type SupportedRequestInit = {
  agent?: Agent
  body?: string
  headers?: Record<string, string>
  method?: string
}
type _assertSupportedInitIsSubtypeOfNative = Assert<
  RequestInit,
  SupportedRequestInit
>
type _assertSupportedInitIsSubtypeOfNodeFetch = Assert<
  NodeFetchRequestInit,
  SupportedRequestInit
>
type _assertSupportedInitIsSubtypeOfCloudflare = Assert<
  CloudflareRequestInit,
  SupportedRequestInit
>

export type SupportedResponse = {
  ok: boolean
  text: () => Promise<string>
  headers: unknown
  status: number
}
type _assertSupportedResponseIsSubtypeOfNative = Assert<
  SupportedResponse,
  Response
>
type _assertSupportedResponseIsSubtypeOfNodeFetch = Assert<
  SupportedResponse,
  NodeFetchResponse
>
type _assertSupportedResponseIsSubtypeOfCloudflare = Assert<
  SupportedResponse,
  CloudflareResponse
>

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>
type _assertSupportedFetchIsSubtypeOfNative = Assert<SupportedFetch, FetchFn>
type _assertSupportedFetchIsSubtypeOfNodeFetch = Assert<
  SupportedFetch,
  typeof NodeFetchFn
>
type _assertSupportedFetchIsSubtypeOfCloudflare = Assert<
  SupportedFetch,
  typeof CloudflareFetchFn
>
