/// <reference lib="dom" />
import type { Assert, Await } from "./type-utils"
import type {
  RequestInit as NodeRequestInit,
  Response as NodeResponse,
} from "node-fetch"

type FetchFn = typeof fetch
type FetchResponse = Await<ReturnType<FetchFn>>
type RequestInfo = Parameters<FetchFn>[0]
type RequestInit = NonNullable<Parameters<FetchFn>[1]>

export type SupportedRequestInfo = string
type _assertSupportedInfoIsSubtype = Assert<RequestInfo, SupportedRequestInfo>

export type SupportedRequestInit = {
  agent?: NodeRequestInit["agent"]
  body?: NonNullable<RequestInit["body"]> & NonNullable<NodeRequestInit["body"]>
  headers?: NonNullable<RequestInit["headers"]> &
    NonNullable<NodeRequestInit["headers"]>
  method?: RequestInit["method"]
  redirect?: RequestInit["redirect"]
}
type _assertSupportedInitIsSubtype = Assert<RequestInit, SupportedRequestInit>

export type SupportedResponse = FetchResponse | NodeResponse

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>
