/**
 * Utilities for working with typescript types
 */

/**
 * Unwrap the type of a promise
 */
export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown
}
  ? U
  : T

/**
 * Assert U is assignable to T.
 */
export type Assert<T, U extends T> = U
