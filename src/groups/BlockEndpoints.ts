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

export class BlockEndpoints {
  constructor(private readonly client: Client) {}

  /**
   * Retrieve a block.
   *
   * Retrieves a block object using the ID specified.
   */
  retrieve(args: WithAuth<GetBlockParameters>): Promise<GetBlockResponse> {
    return this.client.request<GetBlockResponse>({
      path: getBlock.path(args),
      method: getBlock.method,
      query: pick(args, getBlock.queryParams),
      body: pick(args, getBlock.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Update a block.
   *
   * Updates the content for the specified block_id based on the block type.
   */
  update(args: WithAuth<UpdateBlockParameters>): Promise<UpdateBlockResponse> {
    return this.client.request<UpdateBlockResponse>({
      path: updateBlock.path(args),
      method: updateBlock.method,
      query: pick(args, updateBlock.queryParams),
      body: pick(args, updateBlock.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Delete a block.
   */
  delete(args: WithAuth<DeleteBlockParameters>): Promise<DeleteBlockResponse> {
    return this.client.request<DeleteBlockResponse>({
      path: deleteBlock.path(args),
      method: deleteBlock.method,
      query: pick(args, deleteBlock.queryParams),
      body: pick(args, deleteBlock.bodyParams),
      auth: args?.auth,
    })
  }

  /**
   * Endpoints related to a block's children.
   */
  public readonly children = new BlockChildrenEndpoints(this.client)
}
