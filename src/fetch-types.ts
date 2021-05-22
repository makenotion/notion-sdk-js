import type crossFetch from "cross-fetch"
import type { Await } from "./type-utils"
import type { RequestInit as NodeRequestInit } from "node-fetch"

export type CrossRequestInfo = Parameters<typeof crossFetch>[0]
export type CrossRequestInit = NonNullable<Parameters<typeof crossFetch>[1]>
export type CrossResponse = Await<ReturnType<typeof crossFetch>>

export type SupportedRequestInit = Pick<NodeRequestInit, "agent"> &
  Pick<CrossRequestInit, "body" | "headers" | "method" | "redirect" | "signal">
export type SupportedFetch = (
  request: CrossRequestInfo,
  init?: SupportedRequestInit
) => Promise<CrossResponse>
