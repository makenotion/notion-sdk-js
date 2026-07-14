/**
 * EXPERIMENTAL!
 *
 * This file runs the SDK's Notion as Code entry point against an existing Notion workspace.
 *
 * To try it out:
 * 1. Set NOTION_TOKEN in your shell, or paste your Personal Access Token into NOTION_TOKEN below.
 * 2. Run the following command from the repository root, and replace <YOUR_WORKSPACE_ID> with your workspace id.
 *       npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
 *
 * Supported flags use camelCase and a leading `--`:
 *       --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
 *       --sessionStateFilePath=./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_example.json
 *       --spaceId=<YOUR_WORKSPACE_ID>
 *
 * If `--sessionStateFilePath` is not passed in, the SDK uses `--spaceId` to
 * create the initial workspace mapping and writes a timestamped session-state
 * file.
 *
 * Pass that file with `--sessionStateFilePath` on future runs to update the
 * same resources instead of creating duplicates.
 */

import Client from "../Client"
import chalk = require("chalk")
import {
  buildRunArgsFromCommandLineArgs,
  isDefined,
  parseCommandLineArgs,
  printNotionAsCodeRunSuccessMessage,
} from "./utils/utils"

// The token must have access to the workspace in sessionState.json.
const NOTION_TOKEN = ""

const auth = NOTION_TOKEN || process.env["NOTION_TOKEN"]
const notion = new Client({ auth })

const runArgs = buildRunArgsFromCommandLineArgs(
  parseCommandLineArgs(process.argv.slice(2))
)

if (isDefined(runArgs)) {
  notion.EXPERIMENTAL__notionAsCode.run(runArgs)
    .then(result => printNotionAsCodeRunSuccessMessage({ result, runArgs }))
    .catch((error: Error | string) => {
      console.error(
        chalk.red(error instanceof Error ? error.message : String(error))
      )
      process.exitCode = 1
    })
}
