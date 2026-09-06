import assert = require("assert")
import {
  APIResponseError,
  Client,
  InvalidPathParameterError,
  LogLevel,
  UnknownHTTPResponseError,
  isHTTPResponseError,
} from "../src"
import type { UpdateSessionStreamResponse } from "../src"
import {
  TEST_BLOCK_ID,
  mockRawResponse,
  mockResponse,
  setupMockSequence,
  createMockFetch,
} from "./test-utils"
import type { SupportedFetch } from "../src/fetch-types"

const documentedAgentClientMethods = [
  "batch",
  "delete",
  "query",
  "retrieve",
  "retrieveInsights",
  "updateCreditLimit",
  "updateStatus",
]

describe("Notion SDK Client", () => {
  it("Constructs without throwing", () => {
    new Client({ auth: "foo" })
  })

  describe("browser token warning", () => {
    const globalWithWindow = globalThis as { window?: unknown }

    afterEach(() => {
      delete globalWithWindow.window
    })

    it("warns once when constructed with a token inside a browser page", () => {
      globalWithWindow.window = { document: {} }
      const logger = jest.fn()

      new Client({ auth: "ntn_test_token", logger })

      expect(logger).toHaveBeenCalledTimes(1)
      expect(logger).toHaveBeenCalledWith(
        LogLevel.WARN,
        expect.stringContaining("dangerouslyAllowBrowser"),
        {}
      )
    })

    it("stays quiet when dangerouslyAllowBrowser is set", () => {
      globalWithWindow.window = { document: {} }
      const logger = jest.fn()

      new Client({
        auth: "ntn_test_token",
        logger,
        dangerouslyAllowBrowser: true,
      })

      expect(logger).not.toHaveBeenCalled()
    })

    it("stays quiet in a browser page without a token", () => {
      globalWithWindow.window = { document: {} }
      const logger = jest.fn()

      new Client({ logger, baseUrl: "https://proxy.example.com" })

      expect(logger).not.toHaveBeenCalled()
    })

    it("stays quiet outside a browser page", () => {
      const logger = jest.fn()

      new Client({ auth: "ntn_test_token", logger })

      expect(logger).not.toHaveBeenCalled()
    })

    it("warns once for per-request tokens in a browser page", async () => {
      globalWithWindow.window = { document: {} }
      const logger = jest.fn()
      const client = new Client({ logger, fetch: createMockFetch() })

      await client.users.me({ auth: "ntn_test_token" })
      await client.users.me({ auth: "ntn_test_token" })

      const warnings = logger.mock.calls.filter(
        ([level, message]) =>
          level === LogLevel.WARN &&
          typeof message === "string" &&
          message.includes("dangerouslyAllowBrowser")
      )
      expect(warnings).toHaveLength(1)
    })

    it("warns inside a web worker scope", () => {
      const globalWithWorkerScope = globalThis as {
        WorkerGlobalScope?: unknown
      }
      globalWithWorkerScope.WorkerGlobalScope = class {}
      const logger = jest.fn()

      try {
        new Client({ auth: "ntn_test_token", logger })
      } finally {
        delete globalWithWorkerScope.WorkerGlobalScope
      }

      expect(logger).toHaveBeenCalledTimes(1)
    })

    it("is silenced by logLevel ERROR", () => {
      globalWithWindow.window = { document: {} }
      const logger = jest.fn()

      new Client({ auth: "ntn_test_token", logger, logLevel: LogLevel.ERROR })

      expect(logger).not.toHaveBeenCalled()
    })
  })

  it("keeps detached generated methods bound to the current request implementation", async () => {
    const mockFetch = createMockFetch()
    const client = new Client({ auth: "default-token", fetch: mockFetch })
    const retrieve = client.blocks.retrieve
    const request = jest.spyOn(client, "request")

    await retrieve({ block_id: TEST_BLOCK_ID, auth: "override-token" })

    expect(request).toHaveBeenCalledWith({
      path: `blocks/${TEST_BLOCK_ID}`,
      method: "get",
      query: {},
      body: {},
      auth: "override-token",
    })
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.notion.com/v1/blocks/${TEST_BLOCK_ID}`,
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer override-token",
        }),
      })
    )
  })

  it("warns once and omits unknown parameters in generated methods", async () => {
    const mockFetch = createMockFetch()
    const logger = jest.fn()
    const client = new Client({ fetch: mockFetch, logger })
    const args = { query: "Release notes", typo: "ignored" }

    await client.search(args)

    expect(logger).toHaveBeenCalledTimes(1)
    expect(logger).toHaveBeenCalledWith(
      LogLevel.WARN,
      "unknown parameters were ignored",
      expect.objectContaining({ unknownParams: ["typo"] })
    )
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.notion.com/v1/search",
      expect.objectContaining({ body: JSON.stringify({ query: args.query }) })
    )
  })

  it("keeps auth overrides optional on generated methods without parameters", async () => {
    const client = new Client({ fetch: createMockFetch() })
    const request = jest.spyOn(client, "request")

    await client.users.me()
    await client.users.me({ auth: "override-token" })

    expect(request).toHaveBeenNthCalledWith(1, {
      path: "users/me",
      method: "get",
      query: {},
      body: {},
      auth: undefined,
    })
    expect(request).toHaveBeenNthCalledWith(2, {
      path: "users/me",
      method: "get",
      query: {},
      body: {},
      auth: "override-token",
    })
  })

  describe("request param building", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = createMockFetch()
      notion = new Client({ fetch: mockFetch })
    })

    function getFirstRequestBody() {
      const firstCall = mockFetch.mock.calls[0]
      const firstCallParams = firstCall?.[1]
      return JSON.parse(String(firstCallParams?.body) ?? "{}")
    }

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

      const requestBody = getFirstRequestBody()
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

      const firstCall = mockFetch.mock.calls[0]
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

    it("calls create meeting note API", async () => {
      await notion.blocks.meetingNotes.create({
        source: {
          type: "file_upload",
          file_upload_id: "a02fc1d3-db8b-45c5-a222-27595b15aea7",
        },
        parent: {
          type: "page_id",
          page_id: "c02fc1d3-db8b-45c5-a222-27595b15aea7",
        },
        title: "Weekly sync",
        language: "en",
        options: {
          kickoff_summary: true,
        },
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/blocks/meeting_notes",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2025-09-03",
            "user-agent": expect.stringContaining("notionhq-client"),
            "content-type": "application/json",
          }),
        })
      )

      const requestBody = getFirstRequestBody()
      expect(requestBody).toEqual({
        source: {
          type: "file_upload",
          file_upload_id: "a02fc1d3-db8b-45c5-a222-27595b15aea7",
        },
        parent: {
          type: "page_id",
          page_id: "c02fc1d3-db8b-45c5-a222-27595b15aea7",
        },
        title: "Weekly sync",
        language: "en",
        options: {
          kickoff_summary: true,
        },
      })
    })

    it("calls query meeting notes API without filter", async () => {
      await notion.blocks.meetingNotes.query({})

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/blocks/meeting_notes/query",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2025-09-03",
            "user-agent": expect.stringContaining("notionhq-client"),
            "content-type": "application/json",
          }),
        })
      )

      const requestBody = getFirstRequestBody()
      expect(requestBody).toEqual({})
    })

    it("calls query meeting notes API with filter", async () => {
      await notion.blocks.meetingNotes.query({
        filter: {
          operator: "and",
          filters: [
            {
              property: "attendees",
              filter: {
                operator: "person_contains",
                value: [
                  {
                    type: "exact",
                    value: {
                      table: "notion_user",
                      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                    },
                  },
                ],
              },
            },
          ],
        },
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/blocks/meeting_notes/query",
        expect.objectContaining({ method: "POST" })
      )

      const requestBody = getFirstRequestBody()
      expect(requestBody).toMatchObject({
        filter: {
          operator: "and",
          filters: [
            {
              property: "attendees",
              filter: { operator: "person_contains" },
            },
          ],
        },
      })
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

  describe("async tasks endpoints", () => {
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

    it("calls asyncTasks.retrieve with correct URL and method", async () => {
      const taskId = "abc123"
      await notion.asyncTasks.retrieve({ task_id: taskId })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/v1/async_tasks/${taskId}`),
        expect.objectContaining({ method: "GET" })
      )
    })
  })

  describe("agent endpoints", () => {
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

    it("calls agents.batch with correct URL, method and body", async () => {
      await notion.agents.batch({
        operations: [
          {
            action: "update_status",
            agent_id: "notion_ai",
            fields: { status: "disabled" },
          },
        ],
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/v1/agents/batch"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            operations: [
              {
                action: "update_status",
                agent_id: "notion_ai",
                fields: { status: "disabled" },
              },
            ],
          }),
        })
      )
    })
  })

  describe("agent client surface", () => {
    const agentId = "11111111-1111-1111-1111-111111111111"
    let mockFetch: jest.MockedFunction<SupportedFetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = jest.fn()
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve("{}"),
        headers: new Headers(),
        status: 200,
      })

      notion = new Client({ fetch: mockFetch })
    })

    it("exposes the complete documented custom-agent REST surface", () => {
      expect(Object.keys(notion.agents).sort()).toEqual(
        [...documentedAgentClientMethods].sort()
      )
    })

    it("calls agent discovery and governance endpoints", async () => {
      await notion.agents.retrieve({ agent_id: agentId })
      await notion.agents.query({})
      await notion.agents.retrieveInsights({ agent_id: agentId })
      await notion.agents.updateCreditLimit({
        agent_id: agentId,
        credit_limit: 1000,
      })
      await notion.agents.updateStatus({
        agent_id: agentId,
        status: "disabled",
      })
      await notion.agents.delete({ agent_id: agentId })

      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining(`/v1/agents/${agentId}`),
        expect.objectContaining({ method: "GET" })
      )
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining("/v1/agents/query"),
        expect.objectContaining({ method: "POST" })
      )
      expect(mockFetch).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining(`/v1/agents/${agentId}/insights`),
        expect.objectContaining({ method: "GET" })
      )
      expect(mockFetch).toHaveBeenNthCalledWith(
        4,
        expect.stringContaining(`/v1/agents/${agentId}/credit_limit`),
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify({ credit_limit: 1000 }),
        })
      )
      expect(mockFetch).toHaveBeenNthCalledWith(
        5,
        expect.stringContaining(`/v1/agents/${agentId}/status`),
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify({ status: "disabled" }),
        })
      )
      expect(mockFetch).toHaveBeenNthCalledWith(
        6,
        expect.stringContaining(`/v1/agents/${agentId}`),
        expect.objectContaining({ method: "DELETE" })
      )
    })
  })

  describe("session endpoints", () => {
    const sessionId = "11111111-1111-1111-1111-111111111111"
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

    it("calls sessions.retrieve with correct URL and method", async () => {
      await notion.sessions.retrieve({ session_id: sessionId })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/v1/sessions/${sessionId}`),
        expect.objectContaining({ method: "GET" })
      )
    })

    it("calls sessions.update with correct URL and body", async () => {
      await notion.sessions.update({
        session_id: sessionId,
        message: "hello",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/v1/sessions"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ message: "hello", session_id: sessionId }),
        })
      )
    })

    it("streams session events as SSE frames arrive", async () => {
      const encoder = new TextEncoder()
      const responseBody = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              'event: stream.error\ndata: {"type":"stream.error","error":{"code":"agent_error","message":"Retry later","retryable":false}}\n\n'
            )
          )
          controller.enqueue(
            encoder.encode(
              'event: stream.end\ndata: {"type":"stream.end","session_id":"11111111-1111-1111-1111-111111111111","status":"completed","last_sequence":2}\n\n'
            )
          )
          controller.close()
        },
      })
      mockFetch.mockResolvedValue(new Response(responseBody))

      const eventTypes: string[] = []
      for await (const event of notion.sessions.stream({ message: "hello" })) {
        eventTypes.push(event.type)
      }

      expect(eventTypes).toEqual(["stream.error", "stream.end"])
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/v1/sessions"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Accept: "text/event-stream",
            "content-type": "application/json",
          }),
          body: JSON.stringify({ message: "hello" }),
        })
      )
    })

    it("types streamed tool lifecycle events without tool payloads", async () => {
      mockFetch.mockResolvedValue(
        new Response(
          'event: event.provisional\ndata: {"type":"event.provisional","event":{"object":"session_event","id":"tool-1:use","session_id":"11111111-1111-1111-1111-111111111111","created_at":"2026-08-15T03:36:28.649Z","type":"agent.tool_use","tool_name":"callFunction"}}\n\n'
        )
      )

      const events: UpdateSessionStreamResponse[] = []
      for await (const event of notion.sessions.stream({ message: "hello" })) {
        events.push(event)
      }

      expect(events).toHaveLength(1)
      const event = events[0]
      if (event?.type !== "event.provisional") {
        throw new Error("Expected a provisional session event")
      }
      if (event.event.type !== "agent.tool_use") {
        throw new Error("Expected a provisional tool-use event")
      }
      const toolName: string = event.event.tool_name
      expect(event.event).toEqual({
        object: "session_event",
        id: "tool-1:use",
        session_id: sessionId,
        created_at: "2026-08-15T03:36:28.649Z",
        type: "agent.tool_use",
        tool_name: toolName,
      })
      expect(event.event).not.toHaveProperty("input")
      expect(event.event).not.toHaveProperty("output")
    })

    it("types streamed user messages and session status metadata", async () => {
      mockFetch.mockResolvedValue(
        new Response(
          'event: event.committed\ndata: {"type":"event.committed","event":{"object":"session_event","id":"event-1","session_id":"11111111-1111-1111-1111-111111111111","sequence":1,"created_at":"2026-08-15T03:36:28.649Z","type":"user.message","content":[{"type":"text","text":"hello"},{"type":"file","file_id":"22222222-2222-2222-2222-222222222222"}],"metadata":{"source":"test"}}}\n\n' +
            'event: event.committed\ndata: {"type":"event.committed","event":{"object":"session_event","id":"event-2","session_id":"11111111-1111-1111-1111-111111111111","sequence":2,"created_at":"2026-08-15T03:36:29.649Z","type":"session.status","status":"completed","usage":{"input_tokens":10,"output_tokens":20,"total_tokens":30},"artifacts":[{"type":"page","url":"https://notion.so/page","title":"Plan"}]}}\n\n'
        )
      )

      const events: UpdateSessionStreamResponse[] = []
      for await (const event of notion.sessions.stream({ message: "hello" })) {
        events.push(event)
      }

      expect(events).toHaveLength(2)
      const userMessage = events[0]
      if (userMessage?.type !== "event.committed") {
        throw new Error("Expected a committed session event")
      }
      if (userMessage.event.type !== "user.message") {
        throw new Error("Expected a committed user-message event")
      }
      expect(userMessage.event.content).toEqual([
        { type: "text", text: "hello" },
        { type: "file", file_id: "22222222-2222-2222-2222-222222222222" },
      ])
      expect(userMessage.event.metadata).toEqual({ source: "test" })

      const status = events[1]
      if (status?.type !== "event.committed") {
        throw new Error("Expected a committed session event")
      }
      if (status.event.type !== "session.status") {
        throw new Error("Expected a committed session-status event")
      }
      expect(status.event.usage).toEqual({
        input_tokens: 10,
        output_tokens: 20,
        total_tokens: 30,
      })
      expect(status.event.artifacts).toEqual([
        { type: "page", url: "https://notion.so/page", title: "Plan" },
      ])
    })

    it("supports text-only fetch implementations for session streams", async () => {
      const textOnlyFetch: jest.MockedFunction<SupportedFetch> = jest.fn()
      textOnlyFetch.mockResolvedValue({
        ok: true,
        text: () =>
          Promise.resolve(
            'event: stream.end\ndata: {"type":"stream.end","session_id":"11111111-1111-1111-1111-111111111111","status":"completed","last_sequence":2}\n\n'
          ),
        headers: new Headers(),
        status: 200,
      })
      const textOnlyClient = new Client({ fetch: textOnlyFetch })

      const eventTypes: string[] = []
      for await (const event of textOnlyClient.sessions.stream({
        message: "hello",
      })) {
        eventTypes.push(event.type)
      }

      expect(eventTypes).toEqual(["stream.end"])
    })

    it("cancels an open session stream when the consumer stops early", async () => {
      const encoder = new TextEncoder()
      const cancel = jest.fn().mockResolvedValue(undefined)
      const reader = {
        cancel,
        read: jest.fn().mockResolvedValue({
          done: false,
          value: encoder.encode(
            'event: stream.end\ndata: {"type":"stream.end","session_id":"11111111-1111-1111-1111-111111111111","status":"completed","last_sequence":2}\n\n'
          ),
        }),
        releaseLock: jest.fn(),
      }
      const streamingFetch: jest.MockedFunction<SupportedFetch> = jest.fn()
      streamingFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(""),
        headers: new Headers(),
        status: 200,
        body: { getReader: () => reader },
      })
      const streamingClient = new Client({ fetch: streamingFetch })

      for await (const event of streamingClient.sessions.stream({
        message: "hello",
      })) {
        expect(event.type).toBe("stream.end")
        break
      }

      expect(cancel).toHaveBeenCalledTimes(1)
      expect(reader.releaseLock).toHaveBeenCalledTimes(1)
    })

    it("calls sessions.cancel with correct URL and body", async () => {
      await notion.sessions.cancel({
        session_id: sessionId,
        event_id: "event-1",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/v1/sessions/${sessionId}/cancel`),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ event_id: "event-1" }),
        })
      )
    })

    it("calls sessions.query with correct URL and body", async () => {
      await notion.sessions.query({ query: "standup", page_size: 10 })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/v1/sessions/query"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ query: "standup", page_size: 10 }),
        })
      )
    })

    it("calls sessions.queryEvents with correct URL and body", async () => {
      await notion.sessions.queryEvents({
        session_id: sessionId,
        page_size: 25,
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/v1/sessions/${sessionId}/events/query`),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ page_size: 25 }),
        })
      )
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

  describe("response diagnostics", () => {
    const BLOCK_PAGE_HTML =
      "<!DOCTYPE html><html><head><title>Access denied</title></head>" +
      "<body>Cloudflare Ray ID: 9a1b2c3d4e5f6789</body></html>"

    let mockFetch: jest.MockedFn<typeof fetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = jest.fn()
      notion = new Client({ fetch: mockFetch, retry: false })
    })

    async function getResponseError(request: () => Promise<unknown>) {
      try {
        await request()
      } catch (error) {
        assert(isHTTPResponseError(error))
        return error
      }
      return assert.fail("Expected error to be thrown")
    }

    it("surfaces edge metadata for an HTML block page", async () => {
      mockFetch.mockResolvedValue(
        mockRawResponse({
          status: 403,
          body: BLOCK_PAGE_HTML,
          headers: {
            "content-type": "text/html; charset=UTF-8",
            "cf-ray": "9a1b2c3d4e5f6789-SJC",
          },
        })
      )

      const error = await getResponseError(() =>
        notion.comments.list({ block_id: TEST_BLOCK_ID })
      )

      assert(error instanceof UnknownHTTPResponseError)
      expect(error.status).toEqual(403)
      expect(error.ray_id).toEqual("9a1b2c3d4e5f6789-SJC")
      expect(error.message).toContain(
        "was returned by Notion's edge proxy before reaching the Notion API (content-type: text/html; charset=UTF-8)"
      )
      expect(error.message).toContain(
        "may mean the request was blocked by a network security rule"
      )
      expect(error.message).toContain("Cloudflare Ray ID: 9a1b2c3d4e5f6789-SJC")
      // The raw page stays available for debugging but is not the message.
      expect(error.body).toEqual(BLOCK_PAGE_HTML)
    })

    it("does not attribute an origin response to the edge proxy", async () => {
      mockFetch.mockResolvedValue(
        mockRawResponse({
          status: 401,
          body: JSON.stringify({
            error: "invalid_client",
            request_id: "origin-body-request-id",
          }),
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cf-ray": "9a1b2c3d4e5f6789-SJC",
            "x-notion-request-id": "origin-header-request-id",
          },
        })
      )

      const error = await getResponseError(() =>
        notion.oauth.token({
          client_id: "client_id",
          client_secret: "invalid_secret",
          grant_type: "authorization_code",
          code: "code",
          redirect_uri: "https://example.com/callback",
        })
      )

      assert(error instanceof UnknownHTTPResponseError)
      expect(error.request_id).toEqual("origin-header-request-id")
      expect(error.ray_id).toEqual("9a1b2c3d4e5f6789-SJC")
      expect(error.message).toEqual(
        "Request to Notion API failed with status: 401"
      )
    })

    it("keeps the generic message without edge metadata", async () => {
      mockFetch.mockResolvedValue(
        mockRawResponse({
          status: 502,
          body: "upstream unavailable",
          headers: { "content-type": "text/plain" },
        })
      )

      const error = await getResponseError(() =>
        notion.comments.list({ block_id: TEST_BLOCK_ID })
      )

      assert(error instanceof UnknownHTTPResponseError)
      expect(error.request_id).toBeUndefined()
      expect(error.ray_id).toBeUndefined()
      expect(error.message).toEqual(
        "Request to Notion API failed with status: 502"
      )
    })

    it("does not attribute an edge-generated server error to a security rule", async () => {
      mockFetch.mockResolvedValue(
        mockRawResponse({
          status: 522,
          body: BLOCK_PAGE_HTML,
          headers: {
            "content-type": "text/html; charset=UTF-8",
            "cf-ray": "9a1b2c3d4e5f6789-SJC",
          },
        })
      )

      const error = await getResponseError(() =>
        notion.comments.list({ block_id: TEST_BLOCK_ID })
      )

      assert(error instanceof UnknownHTTPResponseError)
      expect(error.message).toContain(
        "was returned by Notion's edge proxy before reaching the Notion API"
      )
      expect(error.message).not.toContain("network security rule")
    })

    it("prefers a Notion error body and exposes response metadata", async () => {
      mockFetch.mockResolvedValue(
        mockRawResponse({
          status: 403,
          body: JSON.stringify({
            object: "error",
            status: 403,
            code: "restricted_resource",
            message: "Insufficient permissions for this endpoint.",
          }),
          headers: {
            "content-type": "application/json",
            "cf-ray": "9a1b2c3d4e5f6789-SJC",
            "x-notion-request-id": "origin-header-request-id",
          },
        })
      )

      const error = await getResponseError(() =>
        notion.comments.list({ block_id: TEST_BLOCK_ID })
      )

      assert(error instanceof APIResponseError)
      expect(error.code).toEqual("restricted_resource")
      expect(error.message).toEqual(
        "Insufficient permissions for this endpoint."
      )
      expect(error.request_id).toEqual("origin-header-request-id")
      expect(error.ray_id).toEqual("9a1b2c3d4e5f6789-SJC")
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

    it("retries on service overload (529) and succeeds", async () => {
      setupMockSequence(mockFetch, [
        { type: "service_overload", options: { retryAfter: "5" } },
        "success",
      ])

      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 2 } })
      const promise = notion.blocks.retrieve({ block_id: TEST_BLOCK_ID })

      await jest.advanceTimersByTimeAsync(5000)
      await promise

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it("retries opening a session stream on rate limit", async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse("rate_limited", { retryAfter: "1" })
      )
      mockFetch.mockResolvedValueOnce(
        new Response(
          'event: stream.end\ndata: {"type":"stream.end","session_id":"11111111-1111-1111-1111-111111111111","status":"completed","last_sequence":2}\n\n'
        )
      )
      const notion = new Client({ fetch: mockFetch, retry: { maxRetries: 1 } })

      const eventTypes: string[] = []
      const stream = (async () => {
        for await (const event of notion.sessions.stream({
          message: "hello",
        })) {
          eventTypes.push(event.type)
        }
      })()

      await jest.advanceTimersByTimeAsync(1000)
      await stream

      expect(eventTypes).toEqual(["stream.end"])
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

      it("retries POST on service overload (529)", async () => {
        setupMockSequence(mockFetch, [
          { type: "service_overload", options: { retryAfter: "1" } },
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

    function getFirstRequestBody() {
      const firstCall = mockFetch.mock.calls[0]
      const firstCallParams = firstCall?.[1]
      return JSON.parse(String(firstCallParams?.body) ?? "{}")
    }

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

    it("omits null query parameters", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "blocks/123/children",
        method: "get",
        query: { start_cursor: null, page_size: 10 },
      })

      const url = mockFetch.mock.calls[0]?.[0] as string
      expect(url).not.toContain("start_cursor")
      expect(url).toContain("page_size=10")
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

    it("omits null start_cursor from JSON body", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "search",
        method: "post",
        body: { start_cursor: null, page_size: 10 },
      })

      const requestBody = getFirstRequestBody()
      expect(requestBody).toEqual({ page_size: 10 })
    })

    it("omits body when JSON body only has null start_cursor", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "search",
        method: "post",
        body: { start_cursor: null },
      })

      const requestInit = mockFetch.mock.calls[0]?.[1]
      expect(requestInit?.body).toBeUndefined()
    })

    it("preserves other null JSON body fields", async () => {
      const notion = new Client({ fetch: mockFetch })

      await notion.request({
        path: "search",
        method: "post",
        body: { start_cursor: null, filter: null },
      })

      const requestBody = getFirstRequestBody()
      expect(requestBody).toEqual({ filter: null })
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
