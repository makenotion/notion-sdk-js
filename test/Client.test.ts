import assert = require("assert")
import { APIResponseError, Client, InvalidPathParameterError } from "../src"
import {
  TEST_BLOCK_ID,
  mockResponse,
  setupMockSequence,
  createMockFetch,
} from "./test-utils"

describe("Notion SDK Client", () => {
  it("Constructs without throwing", () => {
    new Client({ auth: "foo" })
  })

  describe("request param building", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = createMockFetch()
      notion = new Client({ fetch: mockFetch })
    })

    it("calls revoke API with basic auth", async () => {
      await notion.oauth.revoke({
        client_id: "client_id",
        client_secret: "client_secret",
        token: "token",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/oauth/revoke",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2025-09-03",
            "user-agent": expect.stringContaining("notionhq-client"),
            authorization: `Basic ${Buffer.from(
              "client_id:client_secret"
            ).toString("base64")}`,
          }),
        })
      )
    })

    it("calls create file upload API", async () => {
      await notion.fileUploads.create({
        filename: "test.txt",
        content_type: "text/plain",
        mode: "single_part",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/file_uploads",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2025-09-03",
            "user-agent": expect.stringContaining("notionhq-client"),
            "content-type": "application/json",
          }),
        })
      )

      const calls = mockFetch.mock.calls
      const firstCall = calls[0]
      const firstCallParams = firstCall?.[1]
      const requestBody = JSON.parse(String(firstCallParams?.body) ?? "{}")

      expect(requestBody).toMatchObject({
        filename: "test.txt",
        content_type: "text/plain",
        mode: "single_part",
      })
    })

    it("calls send file upload API", async () => {
      const fileUploadId = "62af0fc3-efaa-4c48-bf2a-7d6ce510fa59"

      await notion.fileUploads.send({
        file_upload_id: fileUploadId,
        file: {
          filename: "test.txt",
          data: "test",
        },
        part_number: "2",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.notion.com/v1/file_uploads/${fileUploadId}/send`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2025-09-03",
            "user-agent": expect.stringContaining("notionhq-client"),
          }),
        })
      )

      const calls = mockFetch.mock.calls
      const firstCall = calls[0]
      const firstCallParams = firstCall?.[1]

      expect(firstCallParams?.headers).not.toContain("content-type")
      expect(firstCallParams?.headers).not.toContain("Content-Type")

      const body = firstCallParams?.body as FormData
      const formData = Object.fromEntries(body.entries())

      expect(formData["part_number"]).toEqual("2")

      assert(typeof formData["file"] === "object")
      assert("size" in formData["file"])
      expect(formData["file"].size).toEqual(4)
    })

    it("accepts custom request-level headers", async () => {
      await notion.request({
        path: "comments",
        method: "get",
        headers: {
          "X-Custom-Header": "custom-value",
        },
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/comments",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Notion-Version": expect.any(String),
            "user-agent": expect.stringContaining("notionhq-client"),
            "X-Custom-Header": "custom-value",
          }),
        })
      )
    })

    it("parses additional_data from API validation error response", async () => {
      mockFetch.mockResolvedValue(
        mockResponse("validation_error", {
          body: {
            message:
              "Databases with multiple data sources are not supported in this API version.",
            object: "error",
            status: 400,
            additional_data: {
              error_type: "multiple_data_sources_for_database",
              database_id: "123",
              child_data_source_ids: ["456", "789"],
              minimum_api_version: "2025-09-03",
            },
          },
        })
      )

      try {
        await notion.databases.retrieve({
          database_id: "123",
        })
        assert.fail("Expected error to be thrown")
      } catch (error) {
        assert(error instanceof APIResponseError)
        expect(error.code).toEqual("validation_error")
        expect(error.status).toEqual(400)
        expect(error.message).toEqual(
          "Databases with multiple data sources are not supported in this API version."
        )
        expect(error.additional_data).toEqual({
          error_type: "multiple_data_sources_for_database",
          database_id: "123",
          child_data_source_ids: ["456", "789"],
          minimum_api_version: "2025-09-03",
        })
      }
    })
  })

  describe("pages markdown endpoints", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = jest.fn()
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve("{}"),
        headers: new Headers(),
        status: 200,
      } as Response)

      notion = new Client({ fetch: mockFetch })
    })

    it("calls retrieveMarkdown with correct URL and query params", async () => {
      const pageId = "abc123"
      await notion.pages.retrieveMarkdown({
        page_id: pageId,
        include_transcript: true,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/v1/pages/${pageId}/markdown`),
        expect.objectContaining({ method: "GET" })
      )

      const url = mockFetch.mock.calls[0]?.[0] as string
      expect(url).toContain("include_transcript=true")
    })

    it("calls updateMarkdown with insert_content body", async () => {
      const pageId = "def456"
      await notion.pages.updateMarkdown({
        page_id: pageId,
        type: "insert_content",
        insert_content: {
          content: "## New Section",
          after: "# Heading...end text",
        },
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/v1/pages/${pageId}/markdown`),
        expect.objectContaining({ method: "PATCH" })
      )

      const body = JSON.parse(
        String(mockFetch.mock.calls[0]?.[1]?.body) ?? "{}"
      )
      expect(body).toMatchObject({
        type: "insert_content",
        insert_content: {
          content: "## New Section",
          after: "# Heading...end text",
        },
      })
    })

    it("calls updateMarkdown with replace_content_range body", async () => {
      const pageId = "ghi789"
      await notion.pages.updateMarkdown({
        page_id: pageId,
        type: "replace_content_range",
        replace_content_range: {
          content: "Updated content.",
          content_range: "## Old...end",
          allow_deleting_content: true,
        },
      })

      const body = JSON.parse(
        String(mockFetch.mock.calls[0]?.[1]?.body) ?? "{}"
      )
      expect(body).toMatchObject({
        type: "replace_content_range",
        replace_content_range: {
          content: "Updated content.",
          content_range: "## Old...end",
          allow_deleting_content: true,
        },
      })
    })
  })

  describe("path traversal prevention", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = createMockFetch()
      notion = new Client({ fetch: mockFetch })
    })

    it("rejects block_id containing path traversal", async () => {
      await expect(
        notion.blocks.retrieve({
          block_id: "../databases/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects page_id containing path traversal", async () => {
      await expect(
        notion.pages.retrieve({
          page_id: "../blocks/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects database_id containing path traversal", async () => {
      await expect(
        notion.databases.retrieve({
          database_id: "../pages/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects user_id containing path traversal", async () => {
      await expect(
        notion.users.retrieve({
          user_id: "../blocks/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects data_source_id containing path traversal", async () => {
      await expect(
        notion.dataSources.retrieve({
          data_source_id: "../pages/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects comment_id containing path traversal", async () => {
      await expect(
        notion.comments.retrieve({
          comment_id: "../blocks/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects file_upload_id containing path traversal", async () => {
      await expect(
        notion.fileUploads.retrieve({
          file_upload_id: "../pages/9f96555b-cf98-4889-83b0-bd6bbe53911e",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects paths with .. in the middle", async () => {
      await expect(
        notion.blocks.retrieve({
          block_id: "foo/../bar",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects URL-encoded path traversal (%2e%2e)", async () => {
      await expect(
        notion.blocks.retrieve({
          block_id: "%2e%2e/databases/xyz",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects mixed-case URL-encoded path traversal (%2E%2e)", async () => {
      await expect(
        notion.blocks.retrieve({
          block_id: "%2E%2e/databases/xyz",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("rejects fully encoded path traversal (%2e%2e%2f)", async () => {
      // cspell:ignore fdatabases
      await expect(
        notion.blocks.retrieve({
          block_id: "%2e%2e%2f" + "databases/xyz",
        })
      ).rejects.toThrow(InvalidPathParameterError)

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("allows valid UUIDs", async () => {
      await notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.notion.com/v1/blocks/${TEST_BLOCK_ID}`,
        expect.anything()
      )
    })

    it("error message includes the offending path", async () => {
      try {
        await notion.blocks.retrieve({
          block_id: "../databases/xyz",
        })
        assert.fail("Expected error to be thrown")
      } catch (error) {
        assert(error instanceof InvalidPathParameterError)
        expect(error.message).toContain("blocks/../databases/xyz")
        expect(error.message).toContain("..")
      }
    })
  })

  describe("retry behavior", () => {
    let mockFetch: jest.MockedFn<typeof fetch>

    beforeEach(() => {
      jest.useFakeTimers()
      mockFetch = jest.fn()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it("retries on rate limit (429) and succeeds", async () => {
      setupMockSequence(mockFetch, [
        { type: "rate_limited", options: { retryAfter: "5" } },
        "success",
      ])

      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 2 } })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(5000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("does not retry when retry is disabled", async () => {
      mockFetch.mockResolvedValue(mockResponse("rate_limited"))

      const notion = new Client({ fetch: mockFetch, retry: false })

      await expect(
        notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })
      ).rejects.toThrow(APIResponseError)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("retries on internal server error (500)", async () => {
      setupMockSequence(mockFetch, ["internal_server_error", "success"])

      const notion = new Client({
        fetch: mockFetch,
        retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
      })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(2000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("retries on service unavailable (503)", async () => {
      setupMockSequence(mockFetch, ["service_unavailable", "success"])

      const notion = new Client({
        fetch: mockFetch,
        retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
      })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(2000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("does not retry on validation error (400)", async () => {
      mockFetch.mockResolvedValue(mockResponse("validation_error"))

      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 2 } })

      await expect(
        notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })
      ).rejects.toThrow(APIResponseError)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("does not retry on unauthorized (401)", async () => {
      mockFetch.mockResolvedValue(mockResponse("unauthorized"))

      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 2 } })

      await expect(
        notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })
      ).rejects.toThrow(APIResponseError)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("respects maxRetries limit", async () => {
      mockFetch.mockResolvedValue(
        mockResponse("rate_limited", { retryAfter: "1" })
      )

      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 3 } })
      const promise = notion.blocks
        .retrieve({ block_id: TEST_BLOCK_ID })
        .catch(e => e)

      // Advance through all 3 retry delays
      await jest.advanceTimersByTimeAsync(3000)
      const error = await promise

      expect(error).toBeInstanceOf(APIResponseError)
      expect(mockFetch).toHaveBeenCalledTimes(4) // 1 initial + 3 retries
    })

    it("uses default retry settings when not specified", async () => {
      setupMockSequence(mockFetch, [
        { type: "rate_limited", options: { retryAfter: "1" } },
        { type: "rate_limited", options: { retryAfter: "1" } },
        "success",
      ])

      const notion = new Client({ fetch: mockFetch })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(2000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(3) // 1 initial + 2 retries (default)
    })

    it("respects retry-after header with delta-seconds format", async () => {
      setupMockSequence(mockFetch, [
        { type: "rate_limited", options: { retryAfter: "10" } },
        "success",
      ])

      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 1 } })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      expect(mockFetch).toHaveBeenCalledTimes(1)
      await jest.advanceTimersByTimeAsync(10000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("falls back to exponential back-off when retry-after is invalid", async () => {
      setupMockSequence(mockFetch, [
        { type: "rate_limited", options: { retryAfter: "invalid" } },
        "success",
      ])

      const notion = new Client({
        fetch: mockFetch,
        retry: { maxRetries: 1, initialRetryDelayMs: 1000 },
      })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(2000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("uses exponential back-off when no retry-after header", async () => {
      setupMockSequence(mockFetch, ["rate_limited", "success"])

      const notion = new Client({
        fetch: mockFetch,
        retry: { maxRetries: 1, initialRetryDelayMs: 1000 },
      })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(2000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("ignores negative retry-after values and uses back-off", async () => {
      setupMockSequence(mockFetch, [
        { type: "rate_limited", options: { retryAfter: "-5" } },
        "success",
      ])

      const notion = new Client({
        fetch: mockFetch,
        retry: { maxRetries: 1, initialRetryDelayMs: 1000 },
      })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(2000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("caps retry delay at maxRetryDelayMs", async () => {
      setupMockSequence(mockFetch, [
        { type: "rate_limited", options: { retryAfter: "300" } }, // Server requests 5 minutes
        "success",
      ])

      const notion = new Client({
        fetch: mockFetch,
        retry: { maxRetries: 1, maxRetryDelayMs: 5000 },
      })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      // Should retry after maxRetryDelayMs (5s), not retry-after (300s)
      await jest.advanceTimersByTimeAsync(5000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    describe("idempotent method restrictions", () => {
      it("does not retry POST on internal server error (500)", async () => {
        mockFetch.mockResolvedValue(mockResponse("internal_server_error"))

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })

        await expect(
          notion.pages.create({
            parent: { page_id: TEST_BLOCK_ID },
            properties: {},
          })
        ).rejects.toThrow(APIResponseError)

        expect(mockFetch).toHaveBeenCalledTimes(1)
      })

      it("does not retry POST on service unavailable (503)", async () => {
        mockFetch.mockResolvedValue(mockResponse("service_unavailable"))

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })

        await expect(
          notion.pages.create({
            parent: { page_id: TEST_BLOCK_ID },
            properties: {},
          })
        ).rejects.toThrow(APIResponseError)

        expect(mockFetch).toHaveBeenCalledTimes(1)
      })

      it("does not retry PATCH on internal server error (500)", async () => {
        mockFetch.mockResolvedValue(mockResponse("internal_server_error"))

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })

        await expect(
          notion.pages.update({
            page_id: TEST_BLOCK_ID,
            properties: {},
          })
        ).rejects.toThrow(APIResponseError)

        expect(mockFetch).toHaveBeenCalledTimes(1)
      })

      it("retries POST on rate limit (429)", async () => {
        setupMockSequence(mockFetch, [
          { type: "rate_limited", options: { retryAfter: "1" } },
          "success",
        ])

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })
        const promise = notion.pages.create({
          parent: { page_id: TEST_BLOCK_ID },
          properties: {},
        })

        await jest.advanceTimersByTimeAsync(1000)
        await promise

        expect(mockFetch).toHaveBeenCalledTimes(2)
      })

      it("retries DELETE on internal server error (500)", async () => {
        setupMockSequence(mockFetch, ["internal_server_error", "success"])

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })
        const promise = notion.blocks.delete({ block_id: TEST_BLOCK_ID })

        await jest.advanceTimersByTimeAsync(2000)
        await promise

        expect(mockFetch).toHaveBeenCalledTimes(2)
      })

      it("retries DELETE on service unavailable (503)", async () => {
        setupMockSequence(mockFetch, ["service_unavailable", "success"])

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })
        const promise = notion.blocks.delete({ block_id: TEST_BLOCK_ID })

        await jest.advanceTimersByTimeAsync(2000)
        await promise

        expect(mockFetch).toHaveBeenCalledTimes(2)
      })

      it("retries GET on internal server error (500)", async () => {
        setupMockSequence(mockFetch, ["internal_server_error", "success"])

        const notion = new Client({
          fetch: mockFetch,
          retry: { maxRetries: 2, initialRetryDelayMs: 1000 },
        })
        const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

        await jest.advanceTimersByTimeAsync(2000)
        await promise

        expect(mockFetch).toHaveBeenCalledTimes(2)
      })
    })
  })

  describe("request building", () => {
    let mockFetch: jest.MockedFn<typeof fetch>

    beforeEach(() => {
      mockFetch = createMockFetch()
    })

    it("handles empty query parameters", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "blocks/123",
        method: "get",
        query: {},
      })

      const url = mockFetch.mock.calls[0]?.[0] as string
      expect(url).toBe("https://api.notion.com/v1/blocks/123")
      expect(url).not.toContain("?")
    })

    it("handles single query parameters", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "blocks/123",
        method: "get",
        query: { filter: "page" },
      })

      const url = mockFetch.mock.calls[0]?.[0] as string
      expect(url).toBe("https://api.notion.com/v1/blocks/123?filter=page")
    })

    it("handles array query parameters", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "search",
        method: "post",
        query: { filter: ["page", "database"] },
      })

      const url = mockFetch.mock.calls[0]?.[0] as string
      expect(url).toContain("filter=page")
      expect(url).toContain("filter=database")
    })

    it("omits body when empty object provided", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "blocks/123",
        method: "get",
        body: {},
      })

      const requestInit = mockFetch.mock.calls[0]?.[1]
      expect(requestInit?.body).toBeUndefined()
    })

    it("includes content-type header only when body is provided", async () => {
      const notion = new Client({ fetch: mockFetch })

      // Request without body
      await notion.request({
        path: "blocks/123",
        method: "get",
      })

      const headersWithoutBody = mockFetch.mock.calls[0]?.[1]
        ?.headers as Record<string, string>
      expect(headersWithoutBody["content-type"]).toBeUndefined()

      // Request with body
      await notion.request({
        path: "blocks/123",
        method: "patch",
        body: { archived: true },
      })

      const headersWithBody = mockFetch.mock.calls[1]?.[1]?.headers as Record<
        string,
        string
      >
      expect(headersWithBody["content-type"]).toBe("application/json")
    })
  })
})
