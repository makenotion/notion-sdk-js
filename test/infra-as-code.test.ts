import { mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path = require("node:path")

import { compileInfraAsCodeScriptToIntents } from "../src"

describe("compileInfraAsCodeScriptToIntents", () => {
  it("runs a TypeScript infra as code script with Node", async () => {
    const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-test-"))
    const scriptPath = path.join(tempDir, "script.ts")

    try {
      await writeFile(
        scriptPath,
        `
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
`,
        "utf8"
      )

      const result = await compileInfraAsCodeScriptToIntents({
        filePathToScript: scriptPath,
      })

      expect(result).toEqual({
        intents: [
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
        ],
        logs: [],
      })
    } finally {
      await rm(tempDir, { recursive: true, force: true })
    }
  })
})
