import {
  GetBlockParameters,
  GetBlockResponse,
  getBlock,
  UpdateBlockParameters,
  UpdateBlockResponse,
  updateBlock,
  DeleteBlockParameters,
  DeleteBlockResponse,
  deleteBlock,
  AppendBlockChildrenParameters,
  AppendBlockChildrenResponse,
  appendBlockChildren,
  ListBlockChildrenParameters,
  ListBlockChildrenResponse,
  listBlockChildren,
  ListDatabasesParameters,
  ListDatabasesResponse,
  listDatabases,
  GetDatabaseParameters,
  GetDatabaseResponse,
  getDatabase,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  queryDatabase,
  CreateDatabaseParameters,
  CreateDatabaseResponse,
  createDatabase,
  UpdateDatabaseParameters,
  UpdateDatabaseResponse,
  updateDatabase,
  CreatePageParameters,
  CreatePageResponse,
  createPage,
  GetPageParameters,
  GetPageResponse,
  getPage,
  UpdatePageParameters,
  UpdatePageResponse,
  updatePage,
  GetUserParameters,
  GetUserResponse,
  getUser,
  ListUsersParameters,
  ListUsersResponse,
  listUsers,
  SearchParameters,
  SearchResponse,
  search,
  GetSelfParameters,
  GetSelfResponse,
  getSelf,
  GetPagePropertyParameters,
  GetPagePropertyResponse,
  getPageProperty,
} from "../api-endpoints"
import Client from "../Client"
import { pick, WithAuth } from "../utils"

export class BlockChildrenEndpoints {
  constructor(private readonly client: Client) {}

  /**
   * Append block children
   */
  append(
    args: WithAuth<AppendBlockChildrenParameters>
  ): Promise<AppendBlockChildrenResponse> {
    return this.client.request<AppendBlockChildrenResponse>({
      path: appendBlockChildren.path(args),
      method: appendBlockChildren.method,
      query: pick(args, appendBlockChildren.queryParams),
      body: pick(args, appendBlockChildren.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Retrieve block children
   */
  list(
    args: WithAuth<ListBlockChildrenParameters>
  ): Promise<ListBlockChildrenResponse> {
    return this.client.request<ListBlockChildrenResponse>({
      path: listBlockChildren.path(args),
      method: listBlockChildren.method,
      query: pick(args, listBlockChildren.queryParams),
      body: pick(args, listBlockChildren.bodyParams),
      auth: args?.auth,
    })
  }
}
