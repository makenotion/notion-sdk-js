/**
 * EXPERIMENTAL!
 *
 * This example runs the SDK's infra as code entry point against one Notion
 * space. Use a scratch space while testing: the script can create or update
 * resources in whichever space you map in sessionState.json.
 *
 * To try it out:
 * 1. Set NOTION_TOKEN in your shell, or paste your token into NOTION_TOKEN below.
 * 2. Replace <INSERT_YOUR_SPACE_ID_HERE> with your workspace id in sessionState.json.
 * 3. Run the following commands from the repository root:
 *       npm run build
 *       node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
 *
 * To test your own script, change scriptFilePath. To target a different
 * existing space or reuse known resources, change sessionStateFilePath.
 */
import { Client } from "../.."

// The token must have access to the space in sessionState.json.
const NOTION_TOKEN = ""
const notion = new Client({ auth: NOTION_TOKEN || process.env["NOTION_TOKEN"] })

notion.EXPERIMENTAL__infraAsCode.run({
  // The TypeScript infra as code script to compile and run.
  scriptFilePath: "./src/EXPERIMENTAL__infra-as-code/examples/testDontCommitScript.ts",
  // Reads and writes resource mappings for this run.
  sessionStateFilePath:
    "./src/EXPERIMENTAL__infra-as-code/examples/testDontCommitExistingResources.json",
})
  .then(result => console.dir(result, { depth: null }))
  .catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
