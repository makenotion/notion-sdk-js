/**
 * EXPERIMENTAL!
 *
 * This example runs the SDK's infra as code entry point against one Notion
 * space. Use a scratch space while testing: the script can create or update
 * resources in whichever space you map in existingResources.json.
 *
 * To try it out:
 * 1. Set NOTION_TOKEN in your shell, or paste your token into the "" below.
 * 2. Replace <INSERT_YOUR_SPACE_ID_HERE> in existingResources.json.
 * 3. Run the following commands from the repository root:
 *       npm run build
 *       node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
 *
 * To test your own script, change scriptFilePath. To target a different
 * existing space or reuse known resources, change existingResourcesFilePath.
 */
import { Client } from "../.."

// The token must have access to the space in existingResources.json.
const NOTION_TOKEN = ""
const notion = new Client({ auth: NOTION_TOKEN ?? process.env["NOTION_TOKEN"] })

notion.EXPERIMENTAL__infraAsCode.run({
  // The TypeScript infra as code script to compile and run.
  scriptFilePath: "./src/EXPERIMENTAL__infra-as-code/examples/script.ts",
  // Maps script resource IDs, such as "my-space", to existing Notion resources.
  existingResourcesFilePath:
    "./src/EXPERIMENTAL__infra-as-code/examples/existingResources.json",
})
  .then(result => console.dir(result, { depth: null }))
  .catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
