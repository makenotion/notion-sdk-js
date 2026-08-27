import * as ts from "typescript"
import { readFileSync } from "fs"
import { dirname, resolve } from "path"

// Private fields have different identities in separate checkouts. Compare the
// emitted public declarations so implementation changes do not fail this check.
export function checkCompatibility(before: string, after: string): string[] {
  const sourceProgram = ts.createProgram([before, after], {
    strict: true,
    declaration: true,
    emitDeclarationOnly: true,
    outDir: "/__notion_sdk_contracts__",
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2019,
    module: ts.ModuleKind.CommonJS,
    resolveJsonModule: true,
    typeRoots: [resolve("node_modules/@types")],
  })
  const failures = ts
    .getPreEmitDiagnostics(sourceProgram)
    .map(diagnostic =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
    )
  if (failures.length) return failures
  const files = new Map<string, string>()
  const declarations = new Map<string, string>()
  sourceProgram.emit(
    undefined,
    (fileName, content, _byteOrderMark, _onError, sources) => {
      if (!fileName.endsWith(".d.ts")) return
      const source = ts.createSourceFile(
        fileName,
        content,
        ts.ScriptTarget.ES2019,
        true
      )
      const publicSource = ts.factory.updateSourceFile(
        source,
        source.statements.map(statement =>
          ts.isClassDeclaration(statement)
            ? ts.factory.updateClassDeclaration(
                statement,
                statement.modifiers,
                statement.name,
                statement.typeParameters,
                statement.heritageClauses,
                publicMembers(statement)
              )
            : statement
        )
      )
      files.set(fileName, ts.createPrinter().printFile(publicSource))
      for (const input of sources ?? [])
        declarations.set(input.fileName, fileName)
    }
  )
  const beforeDeclaration = declarations.get(before)
  const afterDeclaration = declarations.get(after)
  if (!beforeDeclaration || !afterDeclaration)
    throw new Error("Could not emit package declarations")
  const options = {
    ...sourceProgram.getCompilerOptions(),
    noEmit: true,
    skipLibCheck: false,
  }
  const host = ts.createCompilerHost(options)
  const readSource = host.getSourceFile
  const fileExists = host.fileExists
  const directoryExists = host.directoryExists
  host.fileExists = path => files.has(path) || fileExists(path)
  host.directoryExists = path =>
    path.startsWith("/__notion_sdk_contracts__") ||
    (directoryExists?.(path) ?? false)
  host.getSourceFile = (
    path,
    languageVersion,
    onError,
    shouldCreateNewSourceFile
  ) => {
    const content = files.get(path)
    return content === undefined
      ? readSource(path, languageVersion, onError, shouldCreateNewSourceFile)
      : ts.createSourceFile(path, content, languageVersion, true)
  }
  const program = ts.createProgram(
    [beforeDeclaration, afterDeclaration],
    options,
    host
  )
  const declarationErrors = ts.getPreEmitDiagnostics(program)
  if (declarationErrors.length)
    return declarationErrors.map(diagnostic =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
    )
  const checker = program.getTypeChecker()

  function exportsAt(path: string) {
    const file = program.getSourceFile(path)
    const symbol = file && checker.getSymbolAtLocation(file)
    if (!symbol) throw new Error(`Cannot read package exports: ${path}`)
    return new Map(
      checker.getExportsOfModule(symbol).map(symbol => [symbol.name, symbol])
    )
  }

  const previous = exportsAt(beforeDeclaration)
  const current = exportsAt(afterDeclaration)
  for (const [name, previousExport] of previous) {
    const currentExport = current.get(name)
    if (!currentExport) {
      failures.push(`Removed export: ${name}`)
      continue
    }
    const oldSymbol = resolveAlias(previousExport)
    const newSymbol = resolveAlias(currentExport)
    if (oldSymbol.flags & ts.SymbolFlags.Type) {
      if (!(newSymbol.flags & ts.SymbolFlags.Type)) {
        failures.push(`Removed type export: ${name}`)
        continue
      }
      compatible(
        name,
        checker.getDeclaredTypeOfSymbol(newSymbol),
        checker.getDeclaredTypeOfSymbol(oldSymbol)
      )
    }
    if (oldSymbol.flags & ts.SymbolFlags.Value) {
      if (!(newSymbol.flags & ts.SymbolFlags.Value)) {
        failures.push(`Removed value export: ${name}`)
        continue
      }
      compatible(`typeof ${name}`, valueType(newSymbol), valueType(oldSymbol))
    }
  }
  return failures

  function resolveAlias(symbol: ts.Symbol): ts.Symbol {
    return symbol.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(symbol)
      : symbol
  }

  function valueType(symbol: ts.Symbol): ts.Type {
    const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0]
    if (!declaration) throw new Error(`Missing declaration: ${symbol.name}`)
    return checker.getTypeOfSymbolAtLocation(symbol, declaration)
  }

  function compatible(
    name: string,
    currentType: ts.Type,
    previousType: ts.Type
  ) {
    if (!checker.isTypeAssignableTo(currentType, previousType)) {
      failures.push(`Incompatible export: ${name}`)
    }
  }
}

export function allowsContractChanges(before: string, after: string): boolean {
  const previous = releaseVersion(before)
  const current = releaseVersion(after)
  return (
    current.major > previous.major ||
    (current.major === previous.major && current.minor > previous.minor)
  )
}

function releaseVersion(version: string): { major: number; minor: number } {
  const match = /^(\d+)\.(\d+)\.\d+(?:-[\w.-]+)?(?:\+[\w.-]+)?$/.exec(version)
  if (!match) throw new Error(`Invalid package version: ${version}`)
  return { major: Number(match[1]), minor: Number(match[2]) }
}

function publicMembers(declaration: ts.ClassDeclaration): ts.ClassElement[] {
  const members = declaration.members.filter(member => !isPrivateMember(member))
  const constructors = members.filter(ts.isConstructorDeclaration)
  if (!constructors.length && declaration.heritageClauses?.length)
    return members
  // TypeScript compares constructor parameters loosely. A function property
  // also checks that callers can still pass the old constructor arguments.
  const signatures = (constructors.length ? constructors : [undefined]).map(
    constructor =>
      ts.factory.createFunctionTypeNode(
        declaration.typeParameters,
        constructor?.parameters ?? [],
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
      )
  )
  return [
    ...members,
    ts.factory.createPropertyDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.StaticKeyword)],
      "__sdk_constructor_compatibility__",
      undefined,
      ts.factory.createIntersectionTypeNode(signatures),
      undefined
    ),
  ]
}

function isPrivateMember(member: ts.ClassElement): boolean {
  return (
    Boolean(member.name && ts.isPrivateIdentifier(member.name)) ||
    Boolean(
      ts.canHaveModifiers(member) &&
        ts
          .getModifiers(member)
          ?.some(
            modifier =>
              modifier.kind === ts.SyntaxKind.PrivateKeyword ||
              modifier.kind === ts.SyntaxKind.ProtectedKeyword
          )
    )
  )
}

if (process.argv[1]?.endsWith("/checkCompatibility.js")) {
  const before = process.argv[2]
  if (!before)
    throw new Error(
      "Usage: node build/test/checkCompatibility.js <baseline/src/index.ts>"
    )
  const after = resolve("src/index.ts")
  const failures = allowsContractChanges(
    packageVersion(before),
    packageVersion(after)
  )
    ? []
    : checkCompatibility(resolve(before), after)
  if (failures.length) {
    console.error(failures.join("\n"))
    process.exitCode = 1
  } else {
    console.log(
      "Public API check passed or a minor/major release allows contract changes."
    )
  }
}

function packageVersion(entry: string): string {
  const manifest: unknown = JSON.parse(
    readFileSync(resolve(dirname(entry), "../package.json"), "utf8")
  )
  if (
    typeof manifest !== "object" ||
    manifest === null ||
    !("version" in manifest) ||
    typeof manifest.version !== "string"
  )
    throw new Error(`Missing package version for ${entry}`)
  return manifest.version
}
