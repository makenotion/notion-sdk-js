
/**
 * Utility for enforcing exhaustiveness checks in the type system.
 *
 * @see https://basarat.gitbook.io/typescript/type-system/discriminated-unions#throw-in-exhaustive-checks
 *
 * @param _x The variable with no remaining values
 */
export function assertNever(_x: never): never {
  throw new Error('Unexpected value. Should have been never.');
}

// NOTE: no need to use a rest argument, just accept an array
export function pick<O extends {}, K extends keyof O> (base: O, ...keys: K[]): Pick<O, K> {
  const entries = keys.map(key => ([key, base[key]]));
  return Object.fromEntries(entries);
}
