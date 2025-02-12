/**
 * Utilities for working with typescript types
 */

/**
 * Assert U is assignable to T.
 */
export type Assert<T, U extends T> = U
