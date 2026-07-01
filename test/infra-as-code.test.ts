import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path = require("node:path")

import { Client, compileInfraAsCodeScriptToIntents } from "../src"
import {
  DEFAULT_SESSION_STATE_FILE_DIRECTORY,
  DEFAULT_SESSION_STATE_FILE_PREFIX,
} from "../src/EXPERIMENTAL__infra-as-code/session"

const TEST_SCRIPT_SOURCE = `
const properties = {
  title: notion.text("Test page"),
} as const

notion.page.create({
  resourceId: "test-page",
  parent: {
    type: "resourceId",
    resourceId: "test-teamspace",
  },
  properties,
  content: "# Test page",
})
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

describe("compileInfraAsCodeScriptToIntents", () => {
  it("runs a TypeScript infra as code script with Node", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-test-"))
    const scriptPath = await writeInfraAsCodeScript(tempDir)

    try {
      const result = await compileInfraAsCodeScriptToIntents({
        filePathToScript: scriptPath,
      })

      expect(result).toEqual({
        intents: EXPECTED_INTENTS,
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})

describe("Client.infraAsCode.run", () => {
  let consoleDir: jest.SpyInstance

  beforeEach(() => {
    consoleDir = jest.spyOn(console, "dir").mockImplementation()
  })

  afterEach(() => {
    consoleDir.mockRestore()
  })

  it("compiles a script and logs intents with empty maps", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-test-"))
    const scriptPath = await writeInfraAsCodeScript(tempDir)
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    const notion = new Client({ fetch: mockFetch })

    try {
      const result = await notion.infraAsCode.run({
        scriptFilePath: scriptPath,
      })

      expect(mockFetch).not.toHaveBeenCalled()
      expect(consoleDir).toHaveBeenCalledWith(
        {
          intents: EXPECTED_INTENTS,
          existingResources: {},
          existingProperties: {},
        },
        { depth: null }
      )
      expect(result).toEqual({
        resourceIdToPointerMappings: {},
        resourceIdToPropertyIdMappings: {},
        sessionStateFilePath: expect.any(String),
      })
      const expectedSessionStateDirectoryPrefix = path.join(
        DEFAULT_SESSION_STATE_FILE_DIRECTORY,
        `${DEFAULT_SESSION_STATE_FILE_PREFIX}-`
      )
      expect(
        path
          .dirname(result.sessionStateFilePath)
          .startsWith(expectedSessionStateDirectoryPrefix)
      ).toBe(true)
      expect(
        JSON.parse(await readFile(result.sessionStateFilePath, "utf8"))
      ).toEqual({
        resourceIdToPointerMappings: {},
        resourceIdToPropertyIdMappings: {},
      })
    } finally {
      await rm(DEFAULT_SESSION_STATE_FILE_DIRECTORY, {
        recursive: true,
        force: true,
      })
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("reads an existing resources file for request maps", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-test-"))
    const scriptPath = await writeInfraAsCodeScript(tempDir)
    const existingResourcesFilePath = path.join(
      tempDir,
      "existing-resources.json"
    )
    const sessionStateFilePath = path.join(tempDir, "iac-session.json")
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    const existingResourcesState = {
      existingResources: {
        "existing-page": { type: "block", id: "existing-page-id" },
      },
      existingProperties: {
        "name-property": "title",
      },
    }

    try {
      await writeFile(
        existingResourcesFilePath,
        JSON.stringify(existingResourcesState),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await notion.infraAsCode.run({
        scriptFilePath: scriptPath,
        existingResourcesFilePath,
        sessionStateFilePath,
      })

      expect(consoleDir).toHaveBeenCalledWith(
        {
          intents: EXPECTED_INTENTS,
          existingResources: {
            "existing-page": { type: "block", id: "existing-page-id" },
          },
          existingProperties: {
            "name-property": "title",
          },
        },
        { depth: null }
      )
      expect(mockFetch).not.toHaveBeenCalled()
      expect(
        JSON.parse(await readFile(existingResourcesFilePath, "utf8"))
      ).toEqual(existingResourcesState)
      expect(JSON.parse(await readFile(sessionStateFilePath, "utf8"))).toEqual({
        resourceIdToPointerMappings: {
          "existing-page": { type: "block", id: "existing-page-id" },
        },
        resourceIdToPropertyIdMappings: {
          "name-property": "title",
        },
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("writes session state after a local logged run", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-test-"))
    const scriptPath = await writeInfraAsCodeScript(tempDir)
    const existingResourcesFilePath = path.join(
      tempDir,
      "existing-resources.json"
    )
    const sessionStateFilePath = path.join(tempDir, "iac-session.json")
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()
    const existingResourcesState = {
      existingResources: {
        "existing-page": { type: "block", id: "existing-page-id" },
        shared: { type: "block", id: "old-shared-id" },
      },
      existingProperties: {
        "existing-property": "existing-property-id",
        shared: "old-shared-property-id",
      },
    }

    try {
      await writeFile(
        existingResourcesFilePath,
        JSON.stringify(existingResourcesState),
        "utf8"
      )

      const notion = new Client({ fetch: mockFetch })
      await notion.infraAsCode.run({
        scriptFilePath: scriptPath,
        existingResourcesFilePath,
        sessionStateFilePath,
      })

      const writtenState = JSON.parse(
        await readFile(sessionStateFilePath, "utf8")
      )
      expect(writtenState).toEqual({
        resourceIdToPointerMappings: {
          "existing-page": { type: "block", id: "existing-page-id" },
          shared: { type: "block", id: "old-shared-id" },
        },
        resourceIdToPropertyIdMappings: {
          "existing-property": "existing-property-id",
          shared: "old-shared-property-id",
        },
      })
      expect(
        JSON.parse(await readFile(existingResourcesFilePath, "utf8"))
      ).toEqual(existingResourcesState)
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })

  it("treats a missing existing-resources file as empty state", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-test-"))
    const scriptPath = await writeInfraAsCodeScript(tempDir)
    const existingResourcesFilePath = path.join(
      tempDir,
      "missing-existing-resources.json"
    )
    const sessionStateFilePath = path.join(tempDir, "missing-session.json")
    const mockFetch: jest.MockedFn<typeof fetch> = jest.fn()

    try {
      const notion = new Client({ fetch: mockFetch })
      await notion.infraAsCode.run({
        scriptFilePath: scriptPath,
        existingResourcesFilePath,
        sessionStateFilePath,
      })

      expect(consoleDir).toHaveBeenCalledWith(
        {
          intents: EXPECTED_INTENTS,
          existingResources: {},
          existingProperties: {},
        },
        { depth: null }
      )
      expect(JSON.parse(await readFile(sessionStateFilePath, "utf8"))).toEqual({
        resourceIdToPointerMappings: {},
        resourceIdToPropertyIdMappings: {},
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})

async function writeInfraAsCodeScript(tempDir: string): Promise<string> {
  const scriptPath = path.join(tempDir, "script.ts")
  await writeFile(scriptPath, TEST_SCRIPT_SOURCE, "utf8")
  return scriptPath
}
