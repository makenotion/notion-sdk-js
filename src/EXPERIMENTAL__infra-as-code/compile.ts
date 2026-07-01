import { execFile } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { promisify } from "node:util"
import path = require("node:path")
import ts = require("typescript")

import { createInfraAsCodeStubRuntime } from "./runtime"
import { isEnoentError } from "./utils"

const execFileAsync = promisify(execFile)

/**
 * Runs a user's infra as code TypeScript file and returns the intents it emits.
 *
 * The compiler wraps the script with the local runtime from `runtime.ts`,
 * converts that temporary wrapper to JavaScript, and executes it in a child
 * Node process. The child process prints the collected intents as JSON.
 */
export async function compileInfraAsCodeScriptToIntents({
  filePathToScript,
}: {
  filePathToScript: string
}): Promise<{
  intents: InfraAsCodeIntent[]
}> {
  const scriptPath = path.resolve(filePathToScript)
  const script = await readScript(scriptPath)
  const tempDir = await mkdtemp(path.join(tmpdir(), "notion-iac-"))

  try {
    const executableScriptPath = path.join(tempDir, "script.executable.js")
    await writeFile(
      executableScriptPath,
      transpileExecutableScriptSource(buildExecutableScriptSource(script)),
      "utf8"
    )

    const { stdout } = await execFileAsync(
      process.execPath,
      [executableScriptPath],
      { cwd: path.dirname(scriptPath) }
    )
    const parsed = JSON.parse(stdout.toString().trim())

    return {
      intents: parsed.intents,
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

/**
 * Reads the user script and turns missing-file errors into a clearer message.
 */
async function readScript(scriptPath: string): Promise<string> {
  try {
    return await readFile(scriptPath, "utf8")
  } catch (error) {
    if (isEnoentError(error)) {
      throw new Error(`Infra as code script not found: ${scriptPath}`)
    }

    throw new Error(
      `Unable to read infra as code script at ${scriptPath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

/**
 * Creates the temporary program that the child Node process runs.
 *
 * `createInfraAsCodeStubRuntime` is embedded as source so the child process does
 * not need to import SDK internals while evaluating the user's script.
 */
function buildExecutableScriptSource(script: string): string {
  return `const createInfraAsCodeStubRuntime = ${createInfraAsCodeStubRuntime.toString()}
const infraAsCodeRuntime = createInfraAsCodeStubRuntime()
const notion = infraAsCodeRuntime.notion

;(async () => {
${script}
})()
  .then(() => {
    console.log(JSON.stringify({
      intents: infraAsCodeRuntime.intents,
    }))
  })
  .catch(error => {
  const message = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack : undefined
  console.error(JSON.stringify({ type: "ERROR", message, stack }))
  process.exit(1)
})
`
}

/**
 * Converts the generated TypeScript wrapper into JavaScript for Node.
 *
 * The SDK runs this wrapper with Node, so it cannot execute the temporary
 * TypeScript file directly and needs to be transpiled. The original Bun-base flow 
 * does not need this extra transpile step.
 */
function transpileExecutableScriptSource(scriptSource: string): string {
  const result = ts.transpileModule(scriptSource, {
    fileName: "script.executable.ts",
    reportDiagnostics: true,
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.ES2020,
    },
  })
  const diagnostics =
    result.diagnostics?.filter(
      diagnostic => diagnostic.category === ts.DiagnosticCategory.Error
    ) ?? []

  if (diagnostics.length > 0) {
    const message = ts.flattenDiagnosticMessageText(
      diagnostics[0]?.messageText ?? "Unknown TypeScript error",
      "\n"
    )
    throw new Error(
      `Unable to transpile infra as code script before running it with Node: ${message}`
    )
  }

  return result.outputText
}
