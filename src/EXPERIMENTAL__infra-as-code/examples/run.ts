/**
 * Local infra as code compiler example.
 *
 * Run from the repository root:
 *   npm run build
 *   node build/src/EXPERIMENTAL__infra-as-code/examples/run.js
 *
 * Expected result:
 *   Prints the compileInfraAsCodeScriptToIntents result for
 *   src/EXPERIMENTAL__infra-as-code/examples/defaultTemplate.ts. You should
 *   see space, teamspace, database, and page intents, plus logs.
 */
import path = require("node:path")

import { compileInfraAsCodeScriptToIntents } from "../compile"

async function main(): Promise<void> {
  const filePathToScript = path.resolve(
    __dirname,
    "../../../../src/EXPERIMENTAL__infra-as-code/examples/defaultTemplate.ts"
  )
  const intents = await compileInfraAsCodeScriptToIntents({ filePathToScript })
  // next step: pass intents to the public api, polling

  console.dir(intents, { depth: null })
}

if (require.main === module) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
}
