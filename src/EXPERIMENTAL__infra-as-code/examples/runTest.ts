/**
 * Exact command from the repository root:
 *   npm run build
 *   NOTION_TOKEN=secret_... node build/src/EXPERIMENTAL__infra-as-code/examples/runTest.js
 */
import { Client } from "../.."

const notion = new Client({ auth: process.env["NOTION_TOKEN"] })

notion.infraAsCode
  .run({
    scriptFilePath: "./src/EXPERIMENTAL__infra-as-code/examples/testScript.ts",
    existingResourcesFilePath:
      "./src/EXPERIMENTAL__infra-as-code/examples/testExistingResources.json",
  })
  .then(result => console.dir(result, { depth: null }))
  .catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
