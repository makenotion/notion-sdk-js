/**
 * Utilities for working with typescript types
 */

// Make a named property in a type required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

// Make a named property in a type optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// from: https://stackoverflow.com/questions/57103834/typescript-omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-s
//
// Given a type union, omit a field from every member of it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never

// Given a type union, add a field to every member of it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveExtend<T, K extends any> = T extends any ? T & K : never

export type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown
}
  ? U
  : T
