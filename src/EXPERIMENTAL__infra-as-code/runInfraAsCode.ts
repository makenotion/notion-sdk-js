/**
 * EXPERIMENTAL!
 *
 * This file runs the SDK's infra as code entry point against an existing Notion workspace.
 *
 * To try it out:
 * 1. Set NOTION_TOKEN in your shell, or paste your Personal Access Token into NOTION_TOKEN below.
 * 2. Run the following command from the repository root, and replace <YOUR_WORKSPACE_ID> with your workspace id.
 *       npm run build && node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
 *
 * Optional flags use camelCase and a leading `--`:
 *       --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
 *       --sessionStateFilePath=./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_example.json
 *       --spaceId=<workspace-id>
 *
 * If `--spaceId` is provided without `--sessionStateFilePath`, the SDK infers
 * the script resourceId for that workspace from the compiled script.
 * 
 * If `--sessionStateFilePath` is not passed in, expect that the calls in the script will create new resources.
 */

import Client from "../Client"
import { InfraAsCodeRunResponse } from "./utils/run"
import { parseCommandLineArgs } from "./utils/utils"

// The token must have access to the workspace in sessionState.json.
const NOTION_TOKEN = ""

// You can either edit the script file path here, or pass it as an optional flag (as shown above).
const SCRIPT_FILE_PATH =
  "./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts"

const auth = NOTION_TOKEN || process.env["NOTION_TOKEN"]
const notion = new Client({ auth })

const { scriptFilePath, sessionStateFilePath, spaceId } = parseCommandLineArgs(
  process.argv.slice(2)
)
const runArgs = {
  scriptFilePath: scriptFilePath ?? SCRIPT_FILE_PATH,
  sessionStateFilePath,
  spaceId,
}

notion.EXPERIMENTAL__infraAsCode.run(runArgs)
  .then((result: InfraAsCodeRunResponse) =>
    console.dir(result, { depth: null })
  )
  .catch((error: Error | string) => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
