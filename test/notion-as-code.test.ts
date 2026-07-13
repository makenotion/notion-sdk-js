import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path = require("node:path")

import { Client, compileNotionAsCodeScriptToIntents } from "../src"
import type { RequestParameters } from "../src/Client"
import {
  pollNotionAsCodeTask,
  submitNotionAsCodeRunToApi,
  type NotionAsCodeApiResult,
} from "../src/EXPERIMENTAL__notion-as-code/utils/api"
import { writeSessionState } from "../src/EXPERIMENTAL__notion-as-code/utils/session"
import { buildRunArgsFromCommandLineArgs } from "../src/EXPERIMENTAL__notion-as-code/utils/utils"
import { mockResponse } from "./test-utils"

const TEST_SCRIPT_SOURCE = `
const properties = {
  title: notion.text("Test page"),
} as const

notion.page({
  resourceId: "test-page",
  parent: {
    type: "resourceId",
    resourceId: "test-teamspace",
  },
  properties,
  content: "# Test page",
})

export {}
`

const EXPECTED_INTENTS = [
  {
    type: "page",
    resourceId: "test-page",
    parent: {
      type: "resourceId",
      resourceId: "test-teamspace",
    },
    properties: {
      title: [["Test page"]],
    },
    content: "# Test page",
  },
]

const SPACE_SCRIPT_SOURCE = `
notion.space({
  resourceId: "test-space",
  name: "Test space",
})

export {}
`

const EXPECTED_SPACE_INTENTS = [
  {
    type: "space",
    resourceId: "test-space",
    name: "Test space",
  },
]

const TEAMSPACE_SCRIPT_SOURCE = `
notion.teamspace({
  resourceId: "test-teamspace",
  parent: {
    type: "resourceId",
    resourceId: "test-space",
  },
  name: "Test teamspace",
  accessLevel: "open",
})

export {}
`

const EXPECTED_TEAMSPACE_INTENTS = [
  {
    type: "teamspace",
    resourceId: "test-teamspace",
    parent: {
      type: "resourceId",
      resourceId: "test-space",
    },
    name: "Test teamspace",
    accessLevel: "open",
  },
]

const GENERATED_SPACE_SESSION_STATE_FILE_PATH =
  "./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_20260707T173944Z.json"
const GENERATED_TEAMSPACE_SESSION_STATE_FILE_PATH =
  "./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_20260707T174044Z.json"

const EXPECTED_API_RESULT: NotionAsCodeApiResult = {
  object: "infra_as_code_result",
  resourceIdToPointerMappings: {
    "test-page": {
      table: "block",
      id: "created-page-id",
      spaceId: "test-space-id",
    },
  },
  resourceIdToPropertyIdMappings: {
    "title-property": "title",
  },
  createdRecordCounts: {
    block: 1,
  },
}

describe("compileNotionAsCodeScriptToIntents", () => {
  it("runs a TypeScript Notion as Code script with Node", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(tempDir)

    try {
      const result = await compileNotionAsCodeScriptToIntents({
        filePathToScript: scriptPath,
      })

      expect(result).toEqual(EXPECTED_INTENTS)
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("demonstrates the starter script workspace anchor", async () => {
    const result = await compileNotionAsCodeScriptToIntents({
      filePathToScript:
        "./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts",
    })

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "space",
          resourceId: "example-space",
          name: "My Space",
        }),
        expect.objectContaining({
          type: "teamspace",
          resourceId: "general-teamspace",
          parent: { type: "resourceId", resourceId: "example-space" },
        }),
      ])
    )
  })
})

describe("Notion as Code API helpers", () => {
  it("submits a Notion as Code run to the REST API", async () => {
    const request = mockClientRequest({ id: "task-id" })
    const existingResources = {
      "existing-page": { type: "block", id: "existing-page-id" },
    }
    const existingProperties = {
      "name-property": "title",
    }
    const intents: InfraAsCodeIntent[] = []

    const result = await submitNotionAsCodeRunToApi({
      request: request as Client["request"],
      intents,
      existingResources,
      existingProperties,
    })

    expect(result).toEqual({ id: "task-id" })
    expect(request).toHaveBeenCalledWith({
      path: "infra_as_code",
      method: "post",
      body: {
        intents,
        existingResources,
        existingProperties,
      },
    })
  })

  it("returns the Notion as Code result on immediate task success", async () => {
    const request = mockClientRequest({
      status: "succeeded",
      result: EXPECTED_API_RESULT,
    })

    await expect(
      pollNotionAsCodeTask({
        request: request as Client["request"],
        taskId: "task-id",
      })
    ).resolves.toEqual(EXPECTED_API_RESULT)
    expect(request).toHaveBeenCalledWith({
      path: "async_tasks/task-id",
      method: "get",
    })
  })

  it("polls again after a non-terminal task response", async () => {
    const request = mockClientRequest(
      {
        status: "running",
        poll_after_seconds: 0,
      },
      {
        status: "succeeded",
        result: EXPECTED_API_RESULT,
      }
    )

    await expect(
      pollNotionAsCodeTask({
        request: request as Client["request"],
        taskId: "task-id",
      })
    ).resolves.toEqual(EXPECTED_API_RESULT)
    expect(request).toHaveBeenCalledTimes(2)
  })

  it("throws a clear error for a failed task", async () => {
    const request = mockClientRequest({
      status: "failed",
      error: {
        code: "validation_error",
        message: "The script is invalid.",
      },
    })

    await expect(
      pollNotionAsCodeTask({
        request: request as Client["request"],
        taskId: "task-id",
      })
    ).rejects.toThrow(
      "Notion as Code async task task-id failed: validation_error: The script is invalid."
    )
  })

  it("throws when a succeeded task has no Notion as Code result", async () => {
    const request = mockClientRequest({
      status: "succeeded",
      result: {
        object: "not_the_result",
      },
    })

    await expect(
      pollNotionAsCodeTask({
        request: request as Client["request"],
        taskId: "task-id",
      })
    ).rejects.toThrow(
      "Notion as Code async task task-id succeeded with a malformed result"
    )
  })

  it("throws when a task returns an unknown status", async () => {
    const request = mockClientRequest({
      status: "paused",
    })

    await expect(
      pollNotionAsCodeTask({
        request: request as Client["request"],
        taskId: "task-id",
      })
    ).rejects.toThrow(
      "Notion as Code async task task-id returned unknown status: paused"
    )
  })

  it("throws after the poll limit when a task stays active", async () => {
    const request = mockClientRequest()
    request.mockResolvedValue({
      status: "queued",
      poll_after_seconds: 0,
    })

    await expect(
      pollNotionAsCodeTask({
        request: request as Client["request"],
        taskId: "task-id",
      })
    ).rejects.toThrow(
      "Notion as Code async task task-id did not finish after 600 polls"
    )
    expect(request).toHaveBeenCalledTimes(600)
  })
})

describe("Notion as Code session-state helpers", () => {
  it("throws a friendly error when session-state writing fails", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const blockedDirectoryPath = path.join(tempDir, "not-a-directory")
    const sessionStateFilePath = path.join(blockedDirectoryPath, "state.json")

    try {
      await writeFile(blockedDirectoryPath, "not a directory", "utf8")

      await expect(
        writeSessionState(
          sessionStateFilePath,
          {
            resourceIdToPointerMappings: {},
            resourceIdToPropertyIdMappings: {},
          },
          EXPECTED_API_RESULT
        )
      ).rejects.toThrow(
        `Unable to write Notion as Code session state at ${sessionStateFilePath}:`
      )
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})

describe("Notion as Code command-line helpers", () => {
  it("prints a friendly error when spaceId is missing", () => {
    const error = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined)
    const priorExitCode = process.exitCode
    process.exitCode = undefined

    try {
      expect(
        buildRunArgsFromCommandLineArgs({
          scriptFilePath: "src/EXPERIMENTAL__notion-as-code/scripts/script.ts",
        })
      ).toBeUndefined()
      expect(process.exitCode).toBe(1)
      expect(error).toHaveBeenCalledWith(
        expect.stringContaining(
          "Make sure to attach your workspace ID with --spaceId"
        )
      )
    } finally {
      error.mockRestore()
      process.exitCode = priorExitCode
    }
  })
})

describe("Client.notionAsCode.run", () => {
  it("compiles a script and writes spaceId into session state", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const sessionStateFilePath = path.join(
      tempDir,
      "notion-as-code-session.json"
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)
    const notion = new Client({ fetch: mockFetch })

    try {
      await writeSessionStateFile(sessionStateFilePath)

      const result = await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        sessionStateFilePath,
        spaceId: "existing-space-id",
      })

      expectNotionAsCodeSubmit(
        mockFetch,
        {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
        },
        {},
        EXPECTED_SPACE_INTENTS
      )
      expectNotionAsCodePoll(mockFetch)
      expect(result).toEqual({
        ...EXPECTED_API_RESULT,
        sessionStateFilePath,
      })
      expect(JSON.parse(await readFile(sessionStateFilePath, "utf8"))).toEqual({
        resourceIdToPointerMappings: {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          ...EXPECTED_API_RESULT.resourceIdToPointerMappings,
        },
        resourceIdToPropertyIdMappings:
          EXPECTED_API_RESULT.resourceIdToPropertyIdMappings,
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("uses spaceId as an existing space for a space intent", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)
    const notion = new Client({ fetch: mockFetch })

    try {
      jest.useFakeTimers().setSystemTime(new Date("2026-07-07T17:39:44Z"))

      const result = await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        spaceId: "existing-space-id",
      })

      expectNotionAsCodeSubmit(
        mockFetch,
        {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
        },
        {},
        EXPECTED_SPACE_INTENTS
      )
      expectNotionAsCodePoll(mockFetch)
      expect(result).toEqual({
        ...EXPECTED_API_RESULT,
        sessionStateFilePath: GENERATED_SPACE_SESSION_STATE_FILE_PATH,
      })
      expect(
        JSON.parse(
          await readFile(GENERATED_SPACE_SESSION_STATE_FILE_PATH, "utf8")
        )
      ).toEqual({
        resourceIdToPointerMappings: {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          ...EXPECTED_API_RESULT.resourceIdToPointerMappings,
        },
        resourceIdToPropertyIdMappings:
          EXPECTED_API_RESULT.resourceIdToPropertyIdMappings,
      })
    } finally {
      jest.useRealTimers()
      await rm(GENERATED_SPACE_SESSION_STATE_FILE_PATH, { force: true })
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("uses spaceId as the parent space for a teamspace intent", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      TEAMSPACE_SCRIPT_SOURCE
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)
    const notion = new Client({ fetch: mockFetch })

    try {
      jest.useFakeTimers().setSystemTime(new Date("2026-07-07T17:40:44Z"))

      const result = await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        spaceId: "existing-space-id",
      })

      expectNotionAsCodeSubmit(
        mockFetch,
        {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
        },
        {},
        EXPECTED_TEAMSPACE_INTENTS
      )
      expectNotionAsCodePoll(mockFetch)
      expect(result).toEqual({
        ...EXPECTED_API_RESULT,
        sessionStateFilePath: GENERATED_TEAMSPACE_SESSION_STATE_FILE_PATH,
      })
      expect(
        JSON.parse(
          await readFile(GENERATED_TEAMSPACE_SESSION_STATE_FILE_PATH, "utf8")
        )
      ).toEqual({
        resourceIdToPointerMappings: {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          ...EXPECTED_API_RESULT.resourceIdToPointerMappings,
        },
        resourceIdToPropertyIdMappings:
          EXPECTED_API_RESULT.resourceIdToPropertyIdMappings,
      })
    } finally {
      jest.useRealTimers()
      await rm(GENERATED_TEAMSPACE_SESSION_STATE_FILE_PATH, { force: true })
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("reads a session-state file for request maps", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const sessionStateFilePath = path.join(
      tempDir,
      "notion-as-code-session.json"
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)
    const sessionState = {
      resourceIdToPointerMappings: {
        "test-space": {
          table: "space",
          id: "existing-space-id",
          spaceId: "existing-space-id",
        },
        "existing-page": { type: "block", id: "existing-page-id" },
      },
      resourceIdToPropertyIdMappings: {
        "name-property": "title",
      },
    }

    try {
      await writeFile(
        sessionStateFilePath,
        JSON.stringify(sessionState),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        sessionStateFilePath,
        spaceId: "existing-space-id",
      })

      expectNotionAsCodeSubmit(
        mockFetch,
        {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          "existing-page": { type: "block", id: "existing-page-id" },
        },
        {
          "name-property": "title",
        },
        EXPECTED_SPACE_INTENTS
      )
      expectNotionAsCodePoll(mockFetch)
      expect(JSON.parse(await readFile(sessionStateFilePath, "utf8"))).toEqual({
        resourceIdToPointerMappings: {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          "existing-page": { type: "block", id: "existing-page-id" },
          ...EXPECTED_API_RESULT.resourceIdToPointerMappings,
        },
        resourceIdToPropertyIdMappings: {
          "name-property": "title",
          ...EXPECTED_API_RESULT.resourceIdToPropertyIdMappings,
        },
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("accepts matching session-state and argument space IDs", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const sessionStateFilePath = path.join(
      tempDir,
      "notion-as-code-session.json"
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)

    try {
      await writeFile(
        sessionStateFilePath,
        JSON.stringify({
          resourceIdToPointerMappings: {
            "test-space": {
              table: "space",
              id: "existing-space-id",
              spaceId: "existing-space-id",
            },
          },
          resourceIdToPropertyIdMappings: {},
        }),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        sessionStateFilePath,
        spaceId: "existing-space-id",
      })

      expectNotionAsCodeSubmit(
        mockFetch,
        {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
        },
        {},
        EXPECTED_SPACE_INTENTS
      )
      expectNotionAsCodePoll(mockFetch)
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("throws when argument space ID conflicts with session state", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const sessionStateFilePath = path.join(
      tempDir,
      "notion-as-code-session.json"
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)

    try {
      await writeFile(
        sessionStateFilePath,
        JSON.stringify({
          resourceIdToPointerMappings: {
            "test-space": {
              table: "space",
              id: "other-space-id",
              spaceId: "other-space-id",
            },
          },
          resourceIdToPropertyIdMappings: {},
        }),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await expect(
        notion.EXPERIMENTAL__notionAsCode.run({
          scriptFilePath: scriptPath,
          sessionStateFilePath,
          spaceId: "existing-space-id",
        })
      ).rejects.toThrow(
        'The provided spaceId "existing-space-id" does not match the session state mapping for resourceId "test-space" (found "other-space-id").'
      )
      expect(mockFetch).not.toHaveBeenCalled()
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("reads an existing-resources wrapper file for request maps", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const sessionStateFilePath = path.join(
      tempDir,
      "notion-as-code-session.json"
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)
    const existingResourcesState = {
      existingResources: {
        "test-space": {
          table: "space",
          id: "existing-space-id",
          spaceId: "existing-space-id",
        },
        "existing-page": { type: "block", id: "existing-page-id" },
      },
      existingProperties: {
        "name-property": "title",
      },
    }

    try {
      await writeFile(
        sessionStateFilePath,
        JSON.stringify(existingResourcesState),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        sessionStateFilePath,
        spaceId: "existing-space-id",
      })

      expectNotionAsCodeSubmit(
        mockFetch,
        {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          "existing-page": { type: "block", id: "existing-page-id" },
        },
        {
          "name-property": "title",
        },
        EXPECTED_SPACE_INTENTS
      )
      expectNotionAsCodePoll(mockFetch)
      expect(JSON.parse(await readFile(sessionStateFilePath, "utf8"))).toEqual({
        resourceIdToPointerMappings: {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          "existing-page": { type: "block", id: "existing-page-id" },
          ...EXPECTED_API_RESULT.resourceIdToPointerMappings,
        },
        resourceIdToPropertyIdMappings: {
          "name-property": "title",
          ...EXPECTED_API_RESULT.resourceIdToPropertyIdMappings,
        },
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("writes session state after a local logged run", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(
      tempDir,
      SPACE_SCRIPT_SOURCE
    )
    const sessionStateFilePath = path.join(
      tempDir,
      "notion-as-code-session.json"
    )
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    const sessionState = {
      resourceIdToPointerMappings: {
        "test-space": {
          table: "space",
          id: "existing-space-id",
          spaceId: "existing-space-id",
        },
        "existing-page": { type: "block", id: "existing-page-id" },
        shared: { type: "block", id: "old-shared-id" },
      },
      resourceIdToPropertyIdMappings: {
        "existing-property": "existing-property-id",
        shared: "old-shared-property-id",
      },
    }
    const apiResult: NotionAsCodeApiResult = {
      ...EXPECTED_API_RESULT,
      resourceIdToPointerMappings: {
        "new-page": { type: "block", id: "new-page-id" },
        shared: { type: "block", id: "new-shared-id" },
      },
      resourceIdToPropertyIdMappings: {
        "new-property": "new-property-id",
        shared: "new-shared-property-id",
      },
    }
    mockNotionAsCodeRun(mockFetch, apiResult)

    try {
      await writeFile(
        sessionStateFilePath,
        JSON.stringify(sessionState),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await notion.EXPERIMENTAL__notionAsCode.run({
        scriptFilePath: scriptPath,
        sessionStateFilePath,
        spaceId: "existing-space-id",
      })

      const writtenState = JSON.parse(
        await readFile(sessionStateFilePath, "utf8")
      )
      expect(writtenState).toEqual({
        resourceIdToPointerMappings: {
          "test-space": {
            table: "space",
            id: "existing-space-id",
            spaceId: "existing-space-id",
          },
          "existing-page": { type: "block", id: "existing-page-id" },
          "new-page": { type: "block", id: "new-page-id" },
          shared: { type: "block", id: "new-shared-id" },
        },
        resourceIdToPropertyIdMappings: {
          "existing-property": "existing-property-id",
          "new-property": "new-property-id",
          shared: "new-shared-property-id",
        },
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("throws when the session-state file does not exist", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(tempDir)
    const sessionStateFilePath = path.join(tempDir, "missing-session.json")
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)

    try {
      const notion = new Client({ fetch: mockFetch })
      await expect(
        notion.EXPERIMENTAL__notionAsCode.run({
          scriptFilePath: scriptPath,
          sessionStateFilePath,
          spaceId: "existing-space-id",
        })
      ).rejects.toThrow(
        `Notion as Code session state not found: ${sessionStateFilePath}`
      )
      expect(mockFetch).not.toHaveBeenCalled()
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("throws when spaceId is not provided", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(tempDir)
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)

    try {
      const notion = new Client({ fetch: mockFetch })
      await expect(
        // @ts-expect-error Testing runtime validation for missing spaceId.
        notion.EXPERIMENTAL__notionAsCode.run({
          scriptFilePath: scriptPath,
        })
      ).rejects.toThrow("Notion as Code requires spaceId")
      expect(mockFetch).not.toHaveBeenCalled()
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("throws when spaceId cannot be mapped to a script resourceId", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-test-"))
    const scriptPath = await writeNotionAsCodeScript(tempDir)
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    mockNotionAsCodeRun(mockFetch)

    try {
      const notion = new Client({ fetch: mockFetch })
      await expect(
        notion.EXPERIMENTAL__notionAsCode.run({
          scriptFilePath: scriptPath,
          spaceId: "existing-space-id",
        })
      ).rejects.toThrow(
        "Unable to use spaceId because the script does not declare a space or a teamspace parent resourceId. Add one workspace anchor to the script."
      )
      expect(mockFetch).not.toHaveBeenCalled()
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})

async function writeNotionAsCodeScript(
  tempDir: string,
  source: string = TEST_SCRIPT_SOURCE
): Promise<string> {
  const scriptPath = path.join(tempDir, "script.ts")
  await writeFile(scriptPath, source, "utf8")
  return scriptPath
}

async function writeSessionStateFile(
  sessionStateFilePath: string
): Promise<void> {
  await writeFile(
    sessionStateFilePath,
    JSON.stringify({
      resourceIdToPointerMappings: {},
      resourceIdToPropertyIdMappings: {},
    }),
    "utf8"
  )
}

function mockClientRequest(
  ...responses: object[]
): jest.Mock<Promise<object>, [RequestParameters]> {
  const request = jest.fn<Promise<object>, [RequestParameters]>()

  for (const response of responses) {
    request.mockResolvedValueOnce(response)
  }

  return request
}

function mockNotionAsCodeRun(
  mockFetch: jest.MockedFn<typeof fetch>,
  result: NotionAsCodeApiResult = EXPECTED_API_RESULT
): void {
  mockFetch
    .mockResolvedValueOnce(mockResponse("success", { body: { id: "task-id" } }))
    .mockResolvedValueOnce(
      mockResponse("success", {
        body: {
          status: "succeeded",
          result,
        },
      })
    )
}

function expectNotionAsCodeSubmit(
  mockFetch: jest.MockedFn<typeof fetch>,
  existingResources: Record<string, unknown>,
  existingProperties: Record<string, string>,
  intents: object[] = EXPECTED_INTENTS
): void {
  expect(mockFetch).toHaveBeenNthCalledWith(
    1,
    "https://api.notion.com/v1/infra_as_code",
    expect.objectContaining({
      method: "POST",
    })
  )
  expect(JSON.parse(String(mockFetch.mock.calls[0]?.[1]?.body))).toEqual({
    intents,
    existingResources,
    existingProperties,
  })
}

function expectNotionAsCodePoll(mockFetch: jest.MockedFn<typeof fetch>): void {
  expect(mockFetch).toHaveBeenNthCalledWith(
    2,
    "https://api.notion.com/v1/async_tasks/task-id",
    expect.objectContaining({
      method: "GET",
    })
  )
}
