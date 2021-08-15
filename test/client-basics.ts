import { Client } from "../src/index.ts"

Deno.test("initialize client", () => {
  new Client({ auth: "foo" })
})
