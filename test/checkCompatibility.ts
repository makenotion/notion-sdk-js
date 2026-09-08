import * as ts from "typescript"
import { readFileSync } from "fs"
import { dirname, resolve } from "path"

// Private fields have different identities in separate checkouts. Compare the
// emitted public declarations so implementation changes do not fail this check.
export function checkCompatibility(
  before: string,
  after: string,
  includeProtected: boolean = false
): string[] {
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
  const failures = diagnosticMessages(sourceProgram)
  if (failures.length) {
    return failures
  }
  const files = new Map<string, string>()
  const declarations = new Map<string, string>()
  let hasProtectedMembers = false
  sourceProgram.emit(
    undefined,
    (fileName, content, _byteOrderMark, _onError, sources) => {
      if (!fileName.endsWith(".d.ts")) {
        return
      }
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
                publicMembers(statement, includeProtected)
              )
            : statement
        )
      )
      hasProtectedMembers ||= source.statements.some(
        statement =>
          ts.isClassDeclaration(statement) &&
          statement.members.some(
            member =>
              ts.getCombinedModifierFlags(member) & ts.ModifierFlags.Protected
          )
      )
      files.set(fileName, ts.createPrinter().printFile(publicSource))
      for (const input of sources ?? []) {
        declarations.set(input.fileName, fileName)
      }
    }
  )
  const beforeDeclaration = declarations.get(before)
  const afterDeclaration = declarations.get(after)
  if (!beforeDeclaration || !afterDeclaration) {
    throw new Error("Could not emit package declarations")
  }
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
  const declarationErrors = diagnosticMessages(program)
  if (declarationErrors.length) {
    return declarationErrors
  }
  const checker = program.getTypeChecker()
  const compared = new Map<ts.Type, Map<ts.Type, boolean>>()

  function exportsAt(path: string): Map<string, ts.Symbol> {
    const file = program.getSourceFile(path)
    const symbol = file && checker.getSymbolAtLocation(file)
    if (!symbol) {
      throw new Error(`Cannot read package exports: ${path}`)
    }
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
      compatible(
        `typeof ${name}`,
        checker.getTypeOfSymbol(newSymbol),
        checker.getTypeOfSymbol(oldSymbol)
      )
    }
  }
  // Check subclass access separately so protected declarations from different
  // checkouts do not fail TypeScript's class-identity rules.
  return !failures.length && hasProtectedMembers && !includeProtected
    ? checkCompatibility(before, after, true)
    : failures

  function resolveAlias(symbol: ts.Symbol): ts.Symbol {
    return symbol.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(symbol)
      : symbol
  }

  function compatible(
    name: string,
    currentType: ts.Type,
    previousType: ts.Type
  ): void {
    if (
      !checker.isTypeAssignableTo(currentType, previousType) ||
      !retainsProperties(currentType, previousType)
    ) {
      failures.push(`Incompatible export: ${name}`)
    }
  }

  // Assignability alone allows optional properties to disappear. Follow the
  // readable surface, including nested results, without revisiting cycles.
  function retainsProperties(current: ts.Type, previous: ts.Type): boolean {
    current = checker.getNonNullableType(current)
    previous = checker.getNonNullableType(previous)
    if (current === previous) {
      return true
    }
    const cached = compared.get(previous)?.get(current)
    if (cached !== undefined) {
      return cached
    }
    const results = compared.get(previous) ?? new Map<ts.Type, boolean>()
    compared.set(previous, results)
    results.set(current, true)
    const result = compareProperties(current, previous)
    results.set(current, result)
    return result
  }

  function compareProperties(current: ts.Type, previous: ts.Type): boolean {
    if (previous.isUnion() || current.isUnion()) {
      const oldTypes = previous.isUnion() ? previous.types : [previous]
      const newTypes = current.isUnion() ? current.types : [current]
      return oldTypes.every(oldType =>
        newTypes.some(newType => retainsProperties(newType, oldType))
      )
    }
    // Match discriminated union members without comparing unrelated generic
    // parameter identities from the two declarations.
    if (previous.flags & ts.TypeFlags.Literal) {
      return checker.isTypeAssignableTo(current, previous)
    }
    if (!(previous.flags & (ts.TypeFlags.Object | ts.TypeFlags.Intersection))) {
      return true
    }
    const oldResult = checker.getAwaitedType(previous)
    const newResult = checker.getAwaitedType(current)
    if (oldResult && oldResult !== previous) {
      return Boolean(newResult && retainsProperties(newResult, oldResult))
    }
    for (const kind of [ts.IndexKind.Number, ts.IndexKind.String]) {
      const oldIndex = checker.getIndexTypeOfType(previous, kind)
      const newIndex = checker.getIndexTypeOfType(current, kind)
      if (oldIndex && (!newIndex || !retainsProperties(newIndex, oldIndex))) {
        return false
      }
    }
    if (checker.isArrayType(previous) || checker.isTupleType(previous)) {
      return true
    }
    for (const kind of [ts.SignatureKind.Call, ts.SignatureKind.Construct]) {
      const newSignatures = checker.getSignaturesOfType(current, kind)
      if (
        !checker
          .getSignaturesOfType(previous, kind)
          .every(oldSignature =>
            newSignatures.some(newSignature =>
              retainsProperties(
                checker.getReturnTypeOfSignature(newSignature),
                checker.getReturnTypeOfSignature(oldSignature)
              )
            )
          )
      ) {
        return false
      }
    }
    const newProperties = new Map(
      checker
        .getPropertiesOfType(current)
        .map(property => [property.escapedName, property])
    )
    return checker.getPropertiesOfType(previous).every(oldProperty => {
      const newProperty = newProperties.get(oldProperty.escapedName)
      return Boolean(
        newProperty &&
          retainsProperties(
            checker.getTypeOfSymbol(newProperty),
            checker.getTypeOfSymbol(oldProperty)
          )
      )
    })
  }
}

function diagnosticMessages(program: ts.Program): string[] {
  return ts
    .getPreEmitDiagnostics(program)
    .map(diagnostic =>
      ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
    )
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
  if (!match) {
    throw new Error(`Invalid package version: ${version}`)
  }
  return { major: Number(match[1]), minor: Number(match[2]) }
}

function publicMembers(
  declaration: ts.ClassDeclaration,
  includeProtected: boolean
): ts.ClassElement[] {
  const visible = declaration.members
    .filter(member => {
      if (ts.isConstructorDeclaration(member)) {
        return true
      }
      const flags = ts.getCombinedModifierFlags(member)
      return (
        !(member.name && ts.isPrivateIdentifier(member.name)) &&
        !(flags & ts.ModifierFlags.Private) &&
        (includeProtected || !(flags & ts.ModifierFlags.Protected))
      )
    })
    .map(member =>
      !ts.isConstructorDeclaration(member) && ts.canHaveModifiers(member)
        ? ts.factory.replaceModifiers(
            member,
            ts
              .getModifiers(member)
              ?.filter(
                modifier => modifier.kind !== ts.SyntaxKind.ProtectedKeyword
              )
          )
        : member
    )
  // Function properties enforce strict input checks; method syntax does not.
  // An intersection preserves every overload instead of keeping only the last.
  const methods = new Set<string>()
  const members = visible.flatMap(member => {
    if (!ts.isMethodDeclaration(member)) {
      return [member]
    }
    const key = (method: ts.MethodDeclaration): string =>
      `${ts.getCombinedModifierFlags(method) & ts.ModifierFlags.Static}:${method.name.getText()}`
    if (methods.has(key(member))) {
      return []
    }
    methods.add(key(member))
    const signatures = visible
      .filter(ts.isMethodDeclaration)
      .filter(method => key(method) === key(member))
      .map(method =>
        ts.factory.createFunctionTypeNode(
          method.typeParameters,
          method.parameters,
          method.type ??
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
        )
      )
    return [
      ts.factory.createPropertyDeclaration(
        member.modifiers,
        member.name,
        member.questionToken,
        ts.factory.createIntersectionTypeNode(signatures),
        undefined
      ),
    ]
  })
  const constructors = members.filter(ts.isConstructorDeclaration)
  if (!constructors.length && declaration.heritageClauses?.length) {
    return members
  }
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

if (require.main === module) {
  const before = process.argv[2]
  if (!before) {
    throw new Error(
      "Usage: node build/test/checkCompatibility.js <baseline/src/index.ts>"
    )
  }
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
      "SDK compatibility check passed or a minor/major release allows contract changes."
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
  ) {
    throw new Error(`Missing package version for ${entry}`)
  }
  return manifest.version
}
