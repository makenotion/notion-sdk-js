import {
  GetPagePropertyParameters,
  GetPagePropertyResponse,
  getPageProperty,
} from "../api-endpoints"
import Client from "../Client"
import { pick, WithAuth } from "../helpers"

export class PagePropertyEndpoints {
  constructor(private readonly client: Client) {}

  /**
   * Retrieve a page property.
   */
  retrieve(
    args: WithAuth<GetPagePropertyParameters>
  ): Promise<GetPagePropertyResponse> {
    return this.client.request<GetPagePropertyResponse>({
      path: getPageProperty.path(args),
      method: getPageProperty.method,
      query: pick(args, getPageProperty.queryParams),
      body: pick(args, getPageProperty.bodyParams),
      auth: args?.auth,
    })
  }
}
