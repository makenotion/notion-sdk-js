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

export class UserEndpoints {
  constructor(private readonly client: Client) {}

  /**
   * Retrieve a user
   */
  retrieve(args: WithAuth<GetUserParameters>): Promise<GetUserResponse> {
    return this.client.request<GetUserResponse>({
      path: getUser.path(args),
      method: getUser.method,
      query: pick(args, getUser.queryParams),
      body: pick(args, getUser.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * List all users
   */
  list(args: WithAuth<ListUsersParameters>): Promise<ListUsersResponse> {
    return this.client.request<ListUsersResponse>({
      path: listUsers.path(),
      method: listUsers.method,
      query: pick(args, listUsers.queryParams),
      body: pick(args, listUsers.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Get details about bot
   */
  me(args: WithAuth<GetSelfParameters>): Promise<GetSelfResponse> {
    return this.client.request<GetSelfResponse>({
      path: getSelf.path(),
      method: getSelf.method,
      query: pick(args, getSelf.queryParams),
      body: pick(args, getSelf.bodyParams),
      auth: args?.auth,
    })
  }
}
