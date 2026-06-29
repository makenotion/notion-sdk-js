export type InfraAsCodeIntent = Record<string, unknown>

export type InfraAsCodeIntents = InfraAsCodeIntent[]

export type CompileInfraAsCodeScriptToIntentsOptions = {
  filePathToScript: string
}

export async function compileInfraAsCodeScriptToIntents(
  _options: CompileInfraAsCodeScriptToIntentsOptions
): Promise<InfraAsCodeIntents> {
  throw new Error("compileInfraAsCodeScriptToIntents is not implemented yet")
}
