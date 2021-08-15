import type { Assert, Await } from "./type-utils.ts"

type FetchFn = typeof fetch
type FetchResponse = Await<ReturnType<FetchFn>>
type RequestInfo = Parameters<FetchFn>[0]
type RequestInit = NonNullable<Parameters<FetchFn>[1]>

export type SupportedRequestInfo = string
type _assertSupportedInfoIsSubtype = Assert<RequestInfo, SupportedRequestInfo>

export type SupportedRequestInit = {
  body?: NonNullable<RequestInit["body"]>
  headers?: NonNullable<RequestInit["headers"]>
  method?: RequestInit["method"]
  redirect?: RequestInit["redirect"]
}
type _assertSupportedInitIsSubtype = Assert<RequestInit, SupportedRequestInit>

export type SupportedResponse = FetchResponse

export type SupportedFetch = (
  url: SupportedRequestInfo,
  init?: SupportedRequestInit
) => Promise<SupportedResponse>
