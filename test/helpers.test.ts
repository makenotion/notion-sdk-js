import {
  collectAllDataSourceRows,
  collectDataSourceTemplates,
  collectPaginatedAPI,
  iterateAllDataSourceRows,
  iterateDataSourceTemplates,
  iteratePaginatedAPI,
} from "../src/helpers"
import { Client } from "../src"

describe("Notion API helpers", () => {
  describe(iteratePaginatedAPI, () => {
    const mockPaginatedEndpoint = jest.fn<
      Promise<{
        object: "list"
        results: number[]
        next_cursor: string | null
        has_more: boolean
      }>,
      [{ start_cursor?: string }]
    >()

    beforeEach(() => {
      mockPaginatedEndpoint.mockClear()
    })

    it("Paginates over two pages", async () => {
      mockPaginatedEndpoint.mockImplementationOnce(async () => ({
        object: "list",
        results: [1, 2],
        has_more: true,
        next_cursor: "abc",
      }))
      mockPaginatedEndpoint.mockImplementationOnce(async () => ({
        object: "list",
        results: [3, 4],
        has_more: false,
        next_cursor: null,
      }))
      const results: number[] = []
      for await (const item of iteratePaginatedAPI(mockPaginatedEndpoint, {})) {
        results.push(item)
      }
      expect(results).toEqual([1, 2, 3, 4])
      expect(mockPaginatedEndpoint).toHaveBeenCalledTimes(2)
      expect(mockPaginatedEndpoint.mock.calls[0]?.[0].start_cursor).toBeFalsy()
      expect(mockPaginatedEndpoint.mock.calls[1]?.[0].start_cursor).toEqual(
        "abc"
      )
    })

    it("Works when there's only one page", async () => {
      mockPaginatedEndpoint.mockImplementationOnce(async () => ({
        object: "list",
        results: [1, 2],
        has_more: false,
        next_cursor: null,
      }))
      const results: number[] = []
      for await (const item of iteratePaginatedAPI(mockPaginatedEndpoint, {})) {
        results.push(item)
      }
      expect(results).toEqual([1, 2])
      expect(mockPaginatedEndpoint).toHaveBeenCalledTimes(1)
      expect(mockPaginatedEndpoint.mock.calls[0]?.[0].start_cursor).toBeFalsy()
    })
  })

  describe(collectPaginatedAPI, () => {
    const mockPaginatedEndpoint = jest.fn<
      Promise<{
        object: "list"
        results: number[]
        next_cursor: string | null
        has_more: boolean
      }>,
      [{ start_cursor?: string }]
    >()

    beforeEach(() => {
      mockPaginatedEndpoint.mockClear()
    })

    it("Collects all pages into an array", async () => {
      mockPaginatedEndpoint.mockImplementationOnce(async () => ({
        object: "list",
        results: [1, 2],
        has_more: true,
        next_cursor: "abc",
      }))
      mockPaginatedEndpoint.mockImplementationOnce(async () => ({
        object: "list",
        results: [3, 4, 5],
        has_more: false,
        next_cursor: null,
      }))

      const results = await collectPaginatedAPI(mockPaginatedEndpoint, {})

      expect(results).toEqual([1, 2, 3, 4, 5])
      expect(mockPaginatedEndpoint).toHaveBeenCalledTimes(2)
    })

    // Regression test: endpoint methods whose `start_cursor` accepts
    // `string | null` (e.g. `dataSources.query`) must satisfy the
    // `Args extends PaginatedArgs` constraint. This is primarily a
    // compile-time check.
    it("Accepts client endpoint methods with nullable start_cursor", async () => {
      const mockFetch = jest.fn<
        ReturnType<typeof fetch>,
        Parameters<typeof fetch>
      >()
      const client = new Client({ auth: "test-token", fetch: mockFetch })
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: new Headers(),
        text: () =>
          Promise.resolve(
            JSON.stringify({
              object: "list",
              type: "page_or_data_source",
              page_or_data_source: {},
              results: [],
              has_more: false,
              next_cursor: null,
            })
          ),
      } as Response)

      const results = await collectPaginatedAPI(client.dataSources.query, {
        data_source_id: "data-source-123",
      })

      expect(results).toEqual([])
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe("Data source template helpers", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let client: Client

    beforeEach(() => {
      mockFetch = jest.fn()
      client = new Client({ auth: "test-token", fetch: mockFetch })
    })

    describe(iterateDataSourceTemplates, () => {
      it("Iterates over data source templates", async () => {
        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers(),
            text: () =>
              Promise.resolve(
                JSON.stringify({
                  templates: [
                    { id: "template-1", name: "Template 1", is_default: true },
                    {
                      id: "template-2",
                      name: "Template 2",
                      is_default: false,
                    },
                  ],
                  has_more: true,
                  next_cursor: "cursor-123",
                })
              ),
          } as Response)
          .mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers(),
            text: () =>
              Promise.resolve(
                JSON.stringify({
                  templates: [
                    {
                      id: "template-3",
                      name: "Template 3",
                      is_default: false,
                    },
                  ],
                  has_more: false,
                  next_cursor: null,
                })
              ),
          } as Response)

        const templates: Array<{
          id: string
          name: string
          is_default: boolean
        }> = []
        for await (const template of iterateDataSourceTemplates(client, {
          data_source_id: "data-source-123",
        })) {
          templates.push(template)
        }

        expect(templates).toEqual([
          { id: "template-1", name: "Template 1", is_default: true },
          { id: "template-2", name: "Template 2", is_default: false },
          { id: "template-3", name: "Template 3", is_default: false },
        ])
        expect(mockFetch).toHaveBeenCalledTimes(2)

        const firstCall = mockFetch.mock.calls[0]
        expect(firstCall?.[0]).toContain(
          "/v1/data_sources/data-source-123/templates"
        )

        const secondCall = mockFetch.mock.calls[1]
        expect(secondCall?.[0]).toContain("start_cursor=cursor-123")
      })
    })

    describe(collectDataSourceTemplates, () => {
      it("Collects all data source templates", async () => {
        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers(),
            text: () =>
              Promise.resolve(
                JSON.stringify({
                  templates: [
                    { id: "template-1", name: "Template 1", is_default: true },
                  ],
                  has_more: true,
                  next_cursor: "cursor-abc",
                })
              ),
          } as Response)
          .mockResolvedValueOnce({
            ok: true,
            status: 200,
            headers: new Headers(),
            text: () =>
              Promise.resolve(
                JSON.stringify({
                  templates: [
                    {
                      id: "template-2",
                      name: "Template 2",
                      is_default: false,
                    },
                    {
                      id: "template-3",
                      name: "Template 3",
                      is_default: false,
                    },
                  ],
                  has_more: false,
                  next_cursor: null,
                })
              ),
          } as Response)

        const templates = await collectDataSourceTemplates(client, {
          data_source_id: "data-source-456",
        })

        expect(templates).toEqual([
          { id: "template-1", name: "Template 1", is_default: true },
          { id: "template-2", name: "Template 2", is_default: false },
          { id: "template-3", name: "Template 3", is_default: false },
        ])
        expect(mockFetch).toHaveBeenCalledTimes(2)
      })

      it("Handles single page response", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers(),
          text: () =>
            Promise.resolve(
              JSON.stringify({
                templates: [
                  { id: "template-1", name: "Only Template", is_default: true },
                ],
                has_more: false,
                next_cursor: null,
              })
            ),
        } as Response)

        const templates = await collectDataSourceTemplates(client, {
          data_source_id: "data-source-789",
        })

        expect(templates).toEqual([
          { id: "template-1", name: "Only Template", is_default: true },
        ])
        expect(mockFetch).toHaveBeenCalledTimes(1)
      })

      it("Passes start_cursor from args", async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          headers: new Headers(),
          text: () =>
            Promise.resolve(
              JSON.stringify({
                templates: [
                  { id: "template-5", name: "Template 5", is_default: false },
                ],
                has_more: false,
                next_cursor: null,
              })
            ),
        } as Response)

        await collectDataSourceTemplates(client, {
          data_source_id: "data-source-999",
          start_cursor: "initial-cursor",
        })

        const call = mockFetch.mock.calls[0]
        expect(call?.[0]).toContain("start_cursor=initial-cursor")
      })
    })
  })

  describe("Full data source query helpers", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let client: Client

    beforeEach(() => {
      mockFetch = jest.fn()
      client = new Client({ auth: "test-token", fetch: mockFetch })
    })

    function page(id: string, createdTime: string) {
      return {
        object: "page",
        id,
        url: `https://notion.so/${id}`,
        created_time: createdTime,
      }
    }

    // A child data-source row, as returned when querying a wiki data source.
    function dataSource(id: string, createdTime: string) {
      return {
        object: "data_source",
        id,
        created_time: createdTime,
      }
    }

    function queryResponse(
      results: Array<ReturnType<typeof page> | ReturnType<typeof dataSource>>,
      opts: { nextCursor?: string | null; incomplete?: boolean } = {}
    ): Response {
      const nextCursor = opts.nextCursor ?? null
      const body: Record<string, unknown> = {
        object: "list",
        type: "page_or_data_source",
        page_or_data_source: {},
        results,
        has_more: nextCursor !== null,
        next_cursor: nextCursor,
      }
      if (opts.incomplete) {
        body["request_status"] = {
          type: "incomplete",
          incomplete_reason: "query_result_limit_reached",
        }
      }
      return {
        ok: true,
        status: 200,
        headers: new Headers(),
        text: () => Promise.resolve(JSON.stringify(body)),
      } as Response
    }

    function bodyOf(call: Parameters<typeof fetch> | undefined) {
      return JSON.parse(String(call?.[1]?.body))
    }

    describe(iterateAllDataSourceRows, () => {
      it("Returns a single complete window without re-querying", async () => {
        mockFetch.mockResolvedValueOnce(
          queryResponse([
            page("r1", "2024-01-01T00:00:00.000Z"),
            page("r2", "2024-01-02T00:00:00.000Z"),
          ])
        )

        const ids: string[] = []
        for await (const row of iterateAllDataSourceRows(client, {
          data_source_id: "ds-1",
        })) {
          ids.push(row.id)
        }

        expect(ids).toEqual(["r1", "r2"])
        expect(mockFetch).toHaveBeenCalledTimes(1)
        const body = bodyOf(mockFetch.mock.calls[0])
        expect(body.sorts).toEqual([
          { timestamp: "created_time", direction: "ascending" },
        ])
        expect(body.filter).toBeUndefined()
        expect(body.start_cursor).toBeFalsy()
      })

      it("Advances past the per-query limit and de-duplicates boundaries", async () => {
        // Window 1: two pages, the second hits the limit (incomplete).
        mockFetch
          .mockResolvedValueOnce(
            queryResponse(
              [
                page("r1", "2024-01-01T00:00:00.000Z"),
                page("r2", "2024-01-02T00:00:00.000Z"),
              ],
              { nextCursor: "c1" }
            )
          )
          .mockResolvedValueOnce(
            queryResponse(
              [
                page("r3", "2024-01-03T00:00:00.000Z"),
                page("r4", "2024-01-04T00:00:00.000Z"),
              ],
              { incomplete: true }
            )
          )
          // Window 2: starts at the last created_time, re-sees r4, then finishes.
          .mockResolvedValueOnce(
            queryResponse([
              page("r4", "2024-01-04T00:00:00.000Z"),
              page("r5", "2024-01-05T00:00:00.000Z"),
            ])
          )

        const ids: string[] = []
        for await (const row of iterateAllDataSourceRows(client, {
          data_source_id: "ds-1",
        })) {
          ids.push(row.id)
        }

        expect(ids).toEqual(["r1", "r2", "r3", "r4", "r5"])
        expect(mockFetch).toHaveBeenCalledTimes(3)
        // Inner pagination carried the cursor within window 1.
        expect(bodyOf(mockFetch.mock.calls[1]).start_cursor).toEqual("c1")
        // Window 2 reset the cursor and added the created_time lower bound.
        expect(bodyOf(mockFetch.mock.calls[2]).start_cursor).toBeFalsy()
        expect(bodyOf(mockFetch.mock.calls[2]).filter).toEqual({
          timestamp: "created_time",
          created_time: { on_or_after: "2024-01-04T00:00:00.000Z" },
        })
      })

      it("Combines a caller filter with the window bound using and", async () => {
        const filter = { property: "Status", status: { equals: "Done" } }
        mockFetch
          .mockResolvedValueOnce(
            queryResponse([page("r1", "2024-01-01T00:00:00.000Z")], {
              incomplete: true,
            })
          )
          .mockResolvedValueOnce(
            queryResponse([
              page("r1", "2024-01-01T00:00:00.000Z"),
              page("r2", "2024-02-01T00:00:00.000Z"),
            ])
          )

        const ids: string[] = []
        for await (const row of iterateAllDataSourceRows(client, {
          data_source_id: "ds-1",
          filter,
        })) {
          ids.push(row.id)
        }

        expect(ids).toEqual(["r1", "r2"])
        // First window: caller filter only.
        expect(bodyOf(mockFetch.mock.calls[0]).filter).toEqual(filter)
        // Second window: caller filter AND created_time bound.
        expect(bodyOf(mockFetch.mock.calls[1]).filter).toEqual({
          and: [
            filter,
            {
              timestamp: "created_time",
              created_time: { on_or_after: "2024-01-01T00:00:00.000Z" },
            },
          ],
        })
      })

      it("Advances on a data-source boundary row, not only pages", async () => {
        // Window 1 ends at the limit on a child data-source row (wiki data
        // source). The window must advance from that row's created_time, even
        // though it is not a page.
        mockFetch
          .mockResolvedValueOnce(
            queryResponse(
              [
                page("r1", "2024-01-01T00:00:00.000Z"),
                dataSource("ds-child", "2024-01-02T00:00:00.000Z"),
              ],
              { incomplete: true }
            )
          )
          .mockResolvedValueOnce(
            queryResponse([
              dataSource("ds-child", "2024-01-02T00:00:00.000Z"),
              page("r2", "2024-01-03T00:00:00.000Z"),
            ])
          )

        const ids: string[] = []
        for await (const row of iterateAllDataSourceRows(client, {
          data_source_id: "ds-1",
        })) {
          ids.push(row.id)
        }

        expect(ids).toEqual(["r1", "ds-child", "r2"])
        expect(mockFetch).toHaveBeenCalledTimes(2)
        // The second window advanced from the data-source row's created_time.
        expect(bodyOf(mockFetch.mock.calls[1]).filter).toEqual({
          timestamp: "created_time",
          created_time: { on_or_after: "2024-01-02T00:00:00.000Z" },
        })
      })

      it("Throws when one created_time holds more rows than the limit", async () => {
        const sameTime = "2024-01-01T00:00:00.000Z"
        mockFetch
          .mockResolvedValueOnce(
            queryResponse([page("r1", sameTime), page("r2", sameTime)], {
              incomplete: true,
            })
          )
          .mockResolvedValueOnce(
            queryResponse([page("r1", sameTime), page("r2", sameTime)], {
              incomplete: true,
            })
          )

        await expect(
          collectAllDataSourceRows(client, { data_source_id: "ds-1" })
        ).rejects.toThrow("cannot make progress")
      })
    })

    describe(collectAllDataSourceRows, () => {
      it("Collects every row across windows into an array", async () => {
        mockFetch
          .mockResolvedValueOnce(
            queryResponse([page("r1", "2024-01-01T00:00:00.000Z")], {
              incomplete: true,
            })
          )
          .mockResolvedValueOnce(
            queryResponse([
              page("r1", "2024-01-01T00:00:00.000Z"),
              page("r2", "2024-01-02T00:00:00.000Z"),
            ])
          )

        const rows = await collectAllDataSourceRows(client, {
          data_source_id: "ds-1",
        })

        expect(rows.map(r => r.id)).toEqual(["r1", "r2"])
        expect(mockFetch).toHaveBeenCalledTimes(2)
      })
    })
  })
})
