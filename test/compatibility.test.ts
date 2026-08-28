import { mkdtempSync, writeFileSync, rmSync } from "fs"
import { tmpdir } from "os"
import { join } from "path"
import { allowsContractChanges, checkCompatibility } from "./checkCompatibility"

describe("package compatibility check", () => {
  const directory = mkdtempSync(join(tmpdir(), "notion-sdk-compatibility-"))
  afterAll(() => rmSync(directory, { recursive: true }))

  function compare(before: string, after: string): string[] {
    const oldFile = join(directory, "before.ts")
    const newFile = join(directory, "after.ts")
    writeFileSync(oldFile, before)
    writeFileSync(newFile, after)
    return checkCompatibility(oldFile, newFile)
  }

  it("allows additive exports and private implementation changes", () => {
    expect(
      compare(
        "export declare class Client { private old: unknown; pages: { retrieve(id: string): number } }",
        "export declare class Client { private next: unknown; pages: { retrieve(id: string): number } }; export type Added = string"
      )
    ).toEqual([])
  })

  it.each<[string, string, string]>([
    ["export type Page = string", "export {}", "Removed export: Page"],
    [
      "export type Page = string",
      "export type Page = number",
      "Incompatible export: Page",
    ],
    [
      "export declare class Client { retrieve(id: string): number }",
      "export declare class Client {}",
      "Incompatible export: Client",
    ],
    [
      "export declare class Client { retrieve: (id: string) => number }",
      'export declare class Client { retrieve: (id: "only") => number }',
      "Incompatible export: Client",
    ],
  ])("rejects a broken public contract %#", (before, after, failure) => {
    expect(compare(before, after)).toContain(failure)
  })

  it("fails on unresolved declarations instead of accepting an error type", () => {
    expect(
      compare("export type Page = string", "export type Page = Missing")
    ).toContain("Cannot find name 'Missing'.")
  })

  it("rejects a newly required constructor argument", () => {
    expect(
      compare(
        "export declare class Client { constructor(options?: string) }",
        "export declare class Client { constructor(options: string) }"
      )
    ).toEqual(["Incompatible export: typeof Client"])
  })

  it("compares helpers that accept a client without private-field identity", () => {
    expect(
      compare(
        "export declare class Client { private old: unknown; request: (id: string) => number }; export declare function collect(client: Client): number[]",
        "export declare class Client { private next: unknown; request: (id: string) => number }; export declare function collect(client: Client): number[]"
      )
    ).toEqual([])
  })

  it("rejects replacing a runtime export with a type-only export", () => {
    expect(
      compare("export declare class Client {}", "export interface Client {}")
    ).toContain("Removed value export: Client")
  })

  it("checks generic class constructors without creating invalid declarations", () => {
    expect(
      compare(
        "export declare class Client<T extends string> { constructor(value?: T) }",
        "export declare class Client<T extends string> { constructor(value: T) }"
      )
    ).toContain("Incompatible export: typeof Client")
  })

  it.each<[string, string, string]>([
    [
      "optional response field",
      "export type Response = { results: string[]; request_status?: string }",
      "export type Response = { results: string[] }",
    ],
    [
      "nested optional response field",
      "export declare class Client { search(): Promise<{ results: { id: string; status?: string }[] }> }",
      "export declare class Client { search(): Promise<{ results: { id: string }[] }> }",
    ],
    [
      "optional field on a union member",
      'export type Response = { kind: "page"; status?: string } | { kind: "block"; status?: string }',
      'export type Response = { kind: "page" } | { kind: "block"; status?: string }',
    ],
    [
      "narrowed class method",
      "export declare class Client { request(id: string): number }",
      'export declare class Client { request(id: "only"): number }',
    ],
    [
      "narrowed generic class method",
      "export declare class Client { request<T>(id: string): Promise<T> }",
      'export declare class Client { request<T>(id: "only"): Promise<T> }',
    ],
    [
      "removed method overload",
      "export declare class Client { request(id: string): number; request(id: number): string }",
      "export declare class Client { request(id: string): number }",
    ],
    ...["private", "protected"].map<[string, string, string]>(visibility => [
      `${visibility} constructor`,
      "export declare class Client { constructor(options?: string) }",
      `export declare class Client { ${visibility} constructor(options?: string) }`,
    ]),
    [
      "removed protected member",
      "export declare class Client { protected status?: string }",
      "export declare class Client {}",
    ],
    [
      "narrowed protected method",
      "export declare class Client { protected request(id: string): number }",
      'export declare class Client { protected request(id: "only"): number }',
    ],
    [
      "narrowed static method",
      "export declare class Client { static request(id: string): number }",
      'export declare class Client { static request(id: "only"): number }',
    ],
    [
      "optional field in an intersection",
      "export type Response = { id: string } & { status?: string }",
      "export type Response = { id: string }",
    ],
    [
      "public member made protected",
      "export declare class Client { status?: string }",
      "export declare class Client { protected status?: string }",
    ],
  ])("rejects %s", (_description, before, after) => {
    expect(compare(before, after)).toEqual(
      expect.arrayContaining([expect.stringMatching(/^Incompatible export:/)])
    )
  })

  it.each<[string, string, string]>([
    [
      "added optional response field",
      "export type Response = { results: string[] }",
      "export type Response = { results: string[]; status?: string }",
    ],
    [
      "wider method inputs",
      'export declare class Client { request(id: "only"): number }',
      "export declare class Client { request(id: string): number }",
    ],
    [
      "unchanged overloads",
      "export declare class Client { request(id: string): number; request(id: number): string }",
      "export declare class Client { request(id: string): number; request(id: number): string }",
    ],
    [
      "unchanged protected members",
      "export declare class Client { protected status?: string; protected request(id: string): number }",
      "export declare class Client { protected status?: string; protected request(id: string): number }",
    ],
    [
      "protected member made public",
      "export declare class Client { protected status?: string }",
      "export declare class Client { status?: string }",
    ],
    [
      "recursive response types",
      "export type Response = { next?: Response }",
      "export type Response = { next?: Response; status?: string }",
    ],
    [
      "generic async iterators and symbol keys",
      "export declare function iterate<T>(): AsyncIterableIterator<T>",
      "export declare function iterate<T>(): AsyncIterableIterator<T>",
    ],
  ])("allows %s", (_description, before, after) => {
    expect(compare(before, after)).toEqual([])
  })

  it.each<[string, string, boolean]>([
    ["5.26.0", "5.26.0", false],
    ["5.26.0", "5.26.1", false],
    ["5.26.0", "5.27.0", true],
    ["5.26.0", "6.0.0", true],
    ["5.26.0", "4.99.0", false],
  ])(
    "allows planned contract changes from %s to %s: %s",
    (before, after, allowed) => {
      expect(allowsContractChanges(before, after)).toBe(allowed)
    }
  )
})
