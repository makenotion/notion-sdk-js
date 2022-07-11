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
