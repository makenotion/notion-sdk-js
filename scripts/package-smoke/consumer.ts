import { strict as assert } from "node:assert"
import { Client, extractNotionId, type ClientOptions } from "@notionhq/client"

const options: ClientOptions = { auth: "package-smoke-test" }
const client = new Client(options)

assert.equal(typeof client.pages.retrieve, "function")
assert.equal(
  extractNotionId("https://notion.so/123456781234123412341234567890ab"),
  "12345678-1234-1234-1234-1234567890ab"
)
