import { Client } from "../src/mod.ts"

Deno.test("Notion SDK Client", async (c) => {
  await c.step("Constructs without throwing", () => {
    new Client({ auth: "foo" })
  })
})
