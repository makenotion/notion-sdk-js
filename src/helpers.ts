import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  PartialUserObjectResponse,
  UserObjectResponse,
} from "./api-endpoints"

interface PaginatedArgs {
  start_cursor?: string
}

interface PaginatedList<T> {
  object: "list"
  results: T[]
  next_cursor: string | null
  has_more: boolean
}

export async function* iteratePaginatedAPI<Args extends PaginatedArgs, Item>(
  listFn: (args: Args) => Promise<PaginatedList<Item>>,
  firstPageArgs: Args
): AsyncIterableIterator<Item> {
  let nextCursor: string | null | undefined = firstPageArgs.start_cursor
  do {
    const response: PaginatedList<Item> = await listFn({
      ...firstPageArgs,
      start_cursor: nextCursor,
    })
    yield* response.results
    nextCursor = response.next_cursor
  } while (nextCursor)
}

export async function collectPaginatedAPI<Args extends PaginatedArgs, Item>(
  listFn: (args: Args) => Promise<PaginatedList<Item>>,
  firstPageArgs: Args
): Promise<Item[]> {
  const results: Item[] = []
  for await (const item of iteratePaginatedAPI(listFn, firstPageArgs)) {
    results.push(item)
  }
  return results
}

export function isFullBlock(
  response: BlockObjectResponse | PartialBlockObjectResponse
): response is BlockObjectResponse {
  return "type" in response
}

export function isFullPage(
  response: PageObjectResponse | PartialPageObjectResponse
): response is PageObjectResponse {
  return "url" in response
}

export function isFullDatabase(
  response: DatabaseObjectResponse | PartialDatabaseObjectResponse
): response is DatabaseObjectResponse {
  return "title" in response
}

export function isFullUser(
  response: UserObjectResponse | PartialUserObjectResponse
): response is UserObjectResponse {
  return "type" in response
}
