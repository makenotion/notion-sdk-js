import fs from "fs-extra"

function exportAllTypes(typescriptSource: string) {
  const lines = typescriptSource.split("\n")
  const transformedLines = lines.map(line => {
    const m = line.match(/^type [a-zA-Z0-9_\-]+/)
  })
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
  } catch (err) {
    await fs.writeFile(path, originalContents)
    throw err
  }
}

async function main() {}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
  })
