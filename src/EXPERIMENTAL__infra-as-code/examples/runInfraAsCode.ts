/**
 * EXPERIMENTAL!
 *
 * This example runs the SDK's infra as code entry point against one Notion
 * space. Use a scratch space while testing: the script can create or update
 * resources in whichever workspace you map in sessionState.json. Resource IDs in
 * sessionState.json target existing resources in your workspace; unmapped
 * resource IDs create new resources.
 *
 * Infra as code requires a Personal Access Token:
 * https://developers.notion.com/guides/get-started/personal-access-tokens
 *
 * To try it out:
 * 1. Set NOTION_TOKEN in your shell, or paste your token into NOTION_TOKEN below.
 * 2. Replace <INSERT_YOUR_SPACE_ID_HERE> with your workspace id in sessionState.json.
 *    To find your workspace id, go to Settings > General, scroll all the way down, and copy the workspace id.
 * 3. Run the following commands from the repository root:
 *       npm run build
 *       node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
 *
 * To test your own script, change scriptFilePath. To target a different
 * existing workspace or reuse known resources, change sessionStateFilePath.
 */
import { Client } from "../.."

// The token must have access to the workspace in sessionState.json.
const NOTION_TOKEN = ""
// const notion = new Client({ auth: NOTION_TOKEN || process.env["NOTION_TOKEN"] })
const notionLocal = new Client({ auth: NOTION_TOKEN || process.env["NOTION_TOKEN"], baseUrl: "http://localhost:3000" })

notionLocal.EXPERIMENTAL__infraAsCode.run({
  // The TypeScript infra as code script to compile and run.
  scriptFilePath: "./src/EXPERIMENTAL__infra-as-code/examples/testDontCommitScript.ts",
  // Reads and writes existing resources and their mappings for this run.
  sessionStateFilePath:
    "./src/EXPERIMENTAL__infra-as-code/examples/testDontCommitExistingResources.json",
})
  .then(result => console.dir(result, { depth: null }))
  .catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
