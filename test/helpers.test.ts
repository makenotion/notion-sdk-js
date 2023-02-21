import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { iteratePaginatedAPI } from "../src/helpers.ts"

Deno.test("Notion API helpers", async (c) => {
  await c.step("iteratePaginatedAPI", async (c) => {

    await c.step("Paginates over two pages", async () => {
      const mockPaginatedEndpoint = new MockPaginatedEndpoint([{
        object: "list",
        results: [1, 2],
        has_more: true,
        next_cursor: "abc",
      }, {
        object: "list",
        results: [3, 4],
        has_more: false,
        next_cursor: null,
      }])
      const results: number[] = []
      for await (const item of iteratePaginatedAPI(mockPaginatedEndpoint.nextPage, {})) {
        results.push(item)
      }
      assertEquals(results, [1, 2, 3, 4])
      assertEquals(mockPaginatedEndpoint.startCursors, [undefined, "abc"])
    })

    await c.step("Works when there's only one page", async () => {
      const mockPaginatedEndpoint = new MockPaginatedEndpoint([{
        object: "list",
        results: [1, 2],
        has_more: false,
        next_cursor: null,
      }])
      const results: number[] = []
      for await (const item of iteratePaginatedAPI(mockPaginatedEndpoint.nextPage, {})) {
        results.push(item)
      }
      assertEquals(results, [1, 2])
      assertEquals(mockPaginatedEndpoint.startCursors, [undefined])
    })
  })
})

class MockPaginatedEndpoint<T extends {object: "list"}> {
  constructor(
    private readonly remainingPages: Array<T>,
  ) {}
  public readonly startCursors = new Array<string|undefined>;
  nextPage = async (opts: { start_cursor?: string }) => {
    this.startCursors.push(opts.start_cursor);
    const page = this.remainingPages.shift();
    if (!page) throw new Error(`Out of pages`);
    return page;
  };
}
