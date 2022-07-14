import * as fs from "fs-extra"
import * as childProcess from "child_process"
import * as path from "path"

const rootDir = path.join(__dirname, "..")
const apiEndpointsFile = path.join(rootDir, "src/api-endpoints.ts")

function exportAllTypes(typescriptSource: string) {
  /*
  const lines = typescriptSource.split("\n")
  const transformedLines = lines.map(line =>
    line.replace(
      /^type ([a-zA-Z0-9_-]+)/,
      (_match, pattern1) => `export type ${pattern1}`
    )
  )
  return transformedLines.join("\n")
  */
  return typescriptSource
}

async function withModifiedFile(
  path: string,
  modifier: (contents: string) => string,
  body: () => Promise<void>
) {
  const originalContents = await fs.readFile(path, "utf8")
  fs.writeFile(path, modifier(originalContents))
  try {
    await body()
  } finally {
    await fs.writeFile(path, originalContents)
  }
}

async function runCommand(command: string) {
  const proc = childProcess.spawn(command, {
    shell: true,
    stdio: "inherit",
  })
  await new Promise<void>((resolve, reject) => {
    proc.on("error", err => reject(err))
    proc.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Command exited with non-zero code: ${code}`))
      } else {
        resolve()
      }
    })
  })
}

async function main() {
  await withModifiedFile(apiEndpointsFile, exportAllTypes, async () => {
    await runCommand(`
      npm run build && \
        npx api-extractor run --local && \
        npx api-documenter markdown -i docs-build/input -o docs-build/markdown
    `)
  })
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
  })
