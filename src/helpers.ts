
/**
 * Utility for enforcing exhaustiveness checks in the type system.
 *
 * @see https://basarat.gitbook.io/typescript/type-system/discriminated-unions#throw-in-exhaustive-checks
 *
 * @param _x The variable with no remaining values
 */
export function assertNever(_x: never): never { // eslint-disable-line @typescript-eslint/no-unused-vars
  throw new Error('Unexpected value. Should have been never.');
}


export function pick<O extends unknown, K extends keyof O> (base: O, keys: readonly K[]): Pick<O, K> {
  const entries = keys.map(key => ([key, base[key]]));
  return Object.fromEntries(entries);
}

export function isObject(o: unknown): o is Record<PropertyKey, unknown> {
  return typeof o === 'object' && o !== null;
}
