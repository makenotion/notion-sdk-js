import { execFile } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { promisify } from "node:util"
import path = require("node:path")
import ts = require("typescript")

import { createInfraAsCodeRuntime } from "./runtime"

const execFileAsync = promisify(execFile)

type CompileInfraAsCodeScriptToIntentsResult = {
  intents: InfraAsCodeIntent[]
  logs: string[]
}

export async function compileInfraAsCodeScriptToIntents({
  filePathToScript,
}: {
  filePathToScript: string
}): Promise<CompileInfraAsCodeScriptToIntentsResult> {
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
      logs: parsed.logs,
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
}

async function readScript(scriptPath: string): Promise<string> {
  try {
    return await readFile(scriptPath, "utf8")
  } catch (error) {
    const code =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined

    if (code === "ENOENT") {
      throw new Error(`Infra as code script not found: ${scriptPath}`)
    }

    throw new Error(
      `Unable to read infra as code script at ${scriptPath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

function buildExecutableScriptSource(script: string): string {
  return `const createInfraAsCodeRuntime = ${createInfraAsCodeRuntime.toString()}
const infraAsCodeRuntime = createInfraAsCodeRuntime()
const notion = infraAsCodeRuntime.notion

;(async () => {
${script}
})()
  .then(() => {
    console.log(JSON.stringify({
      intents: infraAsCodeRuntime.intents,
      logs: infraAsCodeRuntime.logs,
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
