import { execFile } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { promisify } from "node:util"
import path = require("node:path")
import ts = require("typescript")

import { createNotionAsCodeStubRuntime } from "./runtime"
import { isFileNotFoundError } from "./utils"

const execFileAsync = promisify(execFile)

/**
 * Executes a user's Notion as Code TypeScript file and returns the intents it emits.
 *
 * The compiler wraps the script with the local runtime from `runtime.ts`,
 * converts that temporary wrapper to JavaScript, and executes it in a child
 * Node process. The child process prints the collected intents as JSON.
 */
export async function compileNotionAsCodeScriptToIntents({
  filePathToScript,
}: {
  filePathToScript: string
}): Promise<InfraAsCodeIntent[]> {
  const scriptPath = path.resolve(filePathToScript)
  const script = await readScript(scriptPath)
  const tempDir = await mkdtemp(path.join(tmpdir(), "notion-as-code-"))

  try {
    const executableScriptPath = path.join(tempDir, "script.executable.js")
    await writeFile(
      executableScriptPath,
      transpileExecutableScriptSource(buildExecutableScriptSource(script)),
      "utf8"
    )

    // Run the temporary JavaScript file in a separate Node process. It prints
    // the actions the user's script asked for, and we read them back as JSON.
    const { stdout } = await execFileAsync(
      process.execPath,
      [executableScriptPath],
      { cwd: path.dirname(scriptPath) }
    )
    const parsed = JSON.parse(stdout.toString().trim())

    return parsed.intents
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
    if (isFileNotFoundError(error)) {
      throw new Error(`Notion as Code script not found: ${scriptPath}`)
    }

    throw new Error(
      `Unable to read Notion as Code script at ${scriptPath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

/**
 * Creates the temporary program that the child Node process runs.
 *
 * `createNotionAsCodeStubRuntime` is embedded as source so the child process
 * can evaluate the user's script without importing SDK internals.
 *
 
 */
function buildExecutableScriptSource(script: string): string {
  const executableScript = stripEmptyExportDeclaration(script)

  return `// tsx uses esbuild to execute TypeScript directly. esbuild may rewrite
// functions in the embedded runtime to call its __name helper, which sets a
// function's name for debugging. Since toString() captures only the runtime
// function body and not esbuild's surrounding module helpers, the generated
// script defines a compatible __name helper before it evaluates the runtime.
const __name = (target, value) => Object.defineProperty(target, "name", { value, configurable: true })

// Embed the runtime so the temporary Node process can run without SDK imports.
const createNotionAsCodeStubRuntime = ${createNotionAsCodeStubRuntime.toString()}

// Initialize the runtime that owns the intents array. Calls to notion.* append
// intents here while the user's script runs.
const notionAsCodeRuntime = createNotionAsCodeStubRuntime()

// Put the notion helper object in scope for calls like notion.page().
const notion = notionAsCodeRuntime.notion

;(async () => {
${executableScript}
})()
  .then(() => {
    console.log(JSON.stringify({
      intents: notionAsCodeRuntime.intents,
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

function stripEmptyExportDeclaration(script: string): string {
  return script.replace(/\s*export\s*\{\s*\}\s*;?\s*$/u, "")
}

/**
 * Converts the generated TypeScript wrapper into JavaScript for Node.
 *
 * The SDK runs this wrapper with Node, so the temporary TypeScript program
 * needs this transpile step before execution.
 */
function transpileExecutableScriptSource(scriptSource: string): string {
  const result = ts.transpileModule(scriptSource, {
    fileName: "script.executable.ts",
    // Ask TypeScript to report problems while converting this file to
    // JavaScript, so we can show a clear error before Node runs it.
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
      `Unable to transpile Notion as Code script before running it with Node: ${message}`
    )
  }

  return result.outputText
}
