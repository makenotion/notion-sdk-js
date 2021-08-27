import { Client } from "../src/mod.ts"

Deno.test("initialize client", () => {
  new Client({ auth: "foo" })
})
