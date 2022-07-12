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
import { pick, WithAuth } from "../helpers"
import { BlockChildrenEndpoints } from "./BlockChildrenEndpoints"

export class DatabaseEndpoints {
  constructor(private readonly client: Client) {}

  /**
   * List databases.
   *
   * @deprecated Please use `search`
   */
  list(
    args: WithAuth<ListDatabasesParameters>
  ): Promise<ListDatabasesResponse> {
    return this.client.request<ListDatabasesResponse>({
      path: listDatabases.path(),
      method: listDatabases.method,
      query: pick(args, listDatabases.queryParams),
      body: pick(args, listDatabases.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Retrieve a database.
   */
  retrieve(
    args: WithAuth<GetDatabaseParameters>
  ): Promise<GetDatabaseResponse> {
    return this.client.request<GetDatabaseResponse>({
      path: getDatabase.path(args),
      method: getDatabase.method,
      query: pick(args, getDatabase.queryParams),
      body: pick(args, getDatabase.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Query a database.
   */
  query(
    args: WithAuth<QueryDatabaseParameters>
  ): Promise<QueryDatabaseResponse> {
    return this.client.request<QueryDatabaseResponse>({
      path: queryDatabase.path(args),
      method: queryDatabase.method,
      query: pick(args, queryDatabase.queryParams),
      body: pick(args, queryDatabase.bodyParams),
      auth: args?.auth,
    })
  }
}
