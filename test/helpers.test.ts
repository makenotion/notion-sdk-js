import { iteratePaginatedAPI } from "../src/helpers"

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
})
