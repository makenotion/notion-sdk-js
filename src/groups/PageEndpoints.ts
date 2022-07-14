import {
  CreatePageParameters,
  CreatePageResponse,
  createPage,
  GetPageParameters,
  GetPageResponse,
  getPage,
  UpdatePageParameters,
  UpdatePageResponse,
  updatePage,
} from "../api-endpoints"
import Client from "../Client"
import { pick, WithAuth } from "../utils"
import { PagePropertyEndpoints } from "./PagePropertyEndpoints"

export class PageEndpoints {
  constructor(private readonly client: Client) {}

  /**
   * Create a page.
   */
  create(args: WithAuth<CreatePageParameters>): Promise<CreatePageResponse> {
    return this.client.request<CreatePageResponse>({
      path: createPage.path(),
      method: createPage.method,
      query: pick(args, createPage.queryParams),
      body: pick(args, createPage.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Retrieve a page.
   */
  retrieve(args: WithAuth<GetPageParameters>): Promise<GetPageResponse> {
    return this.client.request<GetPageResponse>({
      path: getPage.path(args),
      method: getPage.method,
      query: pick(args, getPage.queryParams),
      body: pick(args, getPage.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Update page properties.
   */
  update(args: WithAuth<UpdatePageParameters>): Promise<UpdatePageResponse> {
    return this.client.request<UpdatePageResponse>({
      path: updatePage.path(args),
      method: updatePage.method,
      query: pick(args, updatePage.queryParams),
      body: pick(args, updatePage.bodyParams),
      auth: args?.auth,
    })
  }

  public readonly properties = new PagePropertyEndpoints(this.client)
}
