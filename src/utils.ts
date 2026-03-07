/**
 * Utility for enforcing exhaustiveness checks in the type system.
 *
 * @see https://basarat.gitbook.io/typescript/type-system/discriminated-unions#throw-in-exhaustive-checks
 *
 * @param value The variable with no remaining values
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value should never occur: ${value}`)
}

type AllKeys<T> = T extends unknown ? keyof T : never

export function pick<O, K extends AllKeys<O>>(
  base: O,
  keys: readonly K[]
): Pick<O, K> {
  const result = {} as Pick<O, K>
  for (const key of keys) {
    result[key] = (base as any)?.[key]
  }
  return result
}

export function isObject(o: unknown): o is Record<PropertyKey, unknown> {
  return typeof o === "object" && o !== null
}

export type EndpointDefinition = {
  pathParams: readonly string[]
  queryParams: readonly string[]
  bodyParams: readonly string[]
  formDataParams?: readonly string[]
}

/**
 * Returns parameter names present in `args` that are not recognized by the
 * endpoint definition. Useful for warning users about typos or parameters
 * that have been renamed across API versions.
 */
export function getUnknownParams(
  args: Record<string, unknown>,
  endpoint: EndpointDefinition
): string[] {
  const knownKeys = new Set<string>([
    ...endpoint.pathParams,
    ...endpoint.queryParams,
    ...endpoint.bodyParams,
    ...(endpoint.formDataParams ?? []),
    "auth",
  ])
  return Object.keys(args).filter(k => !knownKeys.has(k))
}
