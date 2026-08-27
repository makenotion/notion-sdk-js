import { mkdtempSync, writeFileSync, rmSync } from "fs"
import { tmpdir } from "os"
import { join } from "path"
import { allowsContractChanges, checkCompatibility } from "./checkCompatibility"

describe("package compatibility check", () => {
  const directory = mkdtempSync(join(tmpdir(), "notion-sdk-compatibility-"))
  afterAll(() => rmSync(directory, { recursive: true }))

  function compare(before: string, after: string) {
    const oldFile = join(directory, "before.ts")
    const newFile = join(directory, "after.ts")
    writeFileSync(oldFile, before)
    writeFileSync(newFile, after)
    return checkCompatibility(oldFile, newFile)
  }

  it("allows additive exports and private implementation changes", () => {
    expect(
      compare(
        "export declare class Client { private old; pages: { retrieve(id: string): number } }",
        "export declare class Client { private next; pages: { retrieve(id: string): number } }; export type Added = string"
      )
    ).toEqual([])
  })

  it.each([
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
        "export declare class Client { private old; request: (id: string) => number }; export declare function collect(client: Client): number[]",
        "export declare class Client { private next; request: (id: string) => number }; export declare function collect(client: Client): number[]"
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

  it.each([
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
