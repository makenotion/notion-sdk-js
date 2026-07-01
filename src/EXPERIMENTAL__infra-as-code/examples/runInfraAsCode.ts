/**
 * EXPERIMENTAL!
 * Be careful what space you run this script in.
 *
 * To try it out:
 * 1. Add your Personal Access Token to the NOTION_TOKEN variable below
 * 2. Update your space id in the existingResources.json file
 * 3. Run the following commands from the repository root:
 *       npm run build
 *       node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
 *
 * 4. If you want to test out your own scripts, edit the scriptFilePath and
 *    existingResourcesFilePath variables below to point to your own files.
 */
import { Client } from "../.."

// Fill out your Personal Access Token here
const NOTION_TOKEN = ""
const notion = new Client({ auth: NOTION_TOKEN })

notion.EXPERIMENTAL__infraAsCode
  .run({
    // Edit this to the path of your infra as code script
    scriptFilePath: "./src/EXPERIMENTAL__infra-as-code/examples/script.ts",
    // Edit this to the path of your existing resources file
    existingResourcesFilePath:
      "./src/EXPERIMENTAL__infra-as-code/examples/existingResources.json",
  })
  .then(result => console.dir(result, { depth: null }))
  .catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
