import {
  collectDataSourceTemplates,
  collectPaginatedAPI,
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
})
