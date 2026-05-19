import { createHmac } from "crypto"
import { verifyWebhookSignature, signWebhookPayload } from "../src/webhooks"

const VERIFICATION_TOKEN = "secret_abc123_verification_token"
const ALTERNATE_TOKEN = "secret_different_token_xyz"

function nodeSign(body: string | Uint8Array, token: string): string {
  const hmac = createHmac("sha256", token)
  hmac.update(body)
  return `sha256=${hmac.digest("hex")}`
}

describe("verifyWebhookSignature", () => {
  it("returns true for a valid signature over a string body", async () => {
    const body = JSON.stringify({ id: "evt_1", type: "page.created" })
    const signature = nodeSign(body, VERIFICATION_TOKEN)

    await expect(
      verifyWebhookSignature({
        body,
        signature,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(true)
  })

  it("returns true for a valid signature over a Uint8Array body", async () => {
    const bodyString = JSON.stringify({ id: "evt_1", type: "page.created" })
    const body = new TextEncoder().encode(bodyString)
    const signature = nodeSign(bodyString, VERIFICATION_TOKEN)

    await expect(
      verifyWebhookSignature({
        body,
        signature,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(true)
  })

  it("returns false when the body has been tampered with", async () => {
    const original = JSON.stringify({ id: "evt_1", type: "page.created" })
    const tampered = JSON.stringify({ id: "evt_1", type: "page.deleted" })
    const signature = nodeSign(original, VERIFICATION_TOKEN)

    await expect(
      verifyWebhookSignature({
        body: tampered,
        signature,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(false)
  })

  it("returns false when the verification token is wrong", async () => {
    const body = JSON.stringify({ id: "evt_1" })
    const signature = nodeSign(body, VERIFICATION_TOKEN)

    await expect(
      verifyWebhookSignature({
        body,
        signature,
        verificationToken: ALTERNATE_TOKEN,
      })
    ).resolves.toBe(false)
  })

  it("returns false when the signature header is missing", async () => {
    const body = JSON.stringify({ id: "evt_1" })

    await expect(
      verifyWebhookSignature({
        body,
        signature: undefined,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(false)

    await expect(
      verifyWebhookSignature({
        body,
        signature: null,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(false)
  })

  it("returns false when the signature header lacks the sha256= prefix", async () => {
    const body = JSON.stringify({ id: "evt_1" })
    const fullSig = nodeSign(body, VERIFICATION_TOKEN)
    const hexOnly = fullSig.slice("sha256=".length)

    await expect(
      verifyWebhookSignature({
        body,
        signature: hexOnly,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(false)
  })

  it("returns false for malformed hex in the signature", async () => {
    const body = JSON.stringify({ id: "evt_1" })

    await expect(
      verifyWebhookSignature({
        body,
        signature: "sha256=not-hex-content-here",
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(false)
  })

  it("returns false when the hex digest length is wrong", async () => {
    const body = JSON.stringify({ id: "evt_1" })

    await expect(
      verifyWebhookSignature({
        body,
        signature: "sha256=abcdef",
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(false)
  })

  it("accepts uppercase hex digits in the signature header", async () => {
    const body = JSON.stringify({ id: "evt_1" })
    const lower = nodeSign(body, VERIFICATION_TOKEN)
    const upper = `sha256=${lower.slice("sha256=".length).toUpperCase()}`

    await expect(
      verifyWebhookSignature({
        body,
        signature: upper,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(true)
  })

  it("verifies the initial verification_token handshake payload", async () => {
    // When a webhook is first set up, Notion POSTs `{ verification_token }`
    // signed with that same token. The helper must handle this case
    // identically to any subsequent event delivery.
    const body = JSON.stringify({ verification_token: VERIFICATION_TOKEN })
    const signature = nodeSign(body, VERIFICATION_TOKEN)

    await expect(
      verifyWebhookSignature({
        body,
        signature,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(true)
  })

  it("matches the algorithm used by the Notion webhook delivery pipeline", async () => {
    // Locked-down fixture: ensure interop with the canonical algorithm
    // (HMAC-SHA256 over raw body bytes, hex digest, "sha256=" prefix).
    const body = '{"id":"fixed-evt","type":"page.created"}'
    const token = "fixed-verification-token"
    const expected =
      "sha256=" + createHmac("sha256", token).update(body).digest("hex")

    await expect(
      verifyWebhookSignature({
        body,
        signature: expected,
        verificationToken: token,
      })
    ).resolves.toBe(true)
  })
})

describe("signWebhookPayload", () => {
  it("produces a signature accepted by verifyWebhookSignature", async () => {
    const body = JSON.stringify({ id: "evt_1", type: "page.created" })
    const signature = await signWebhookPayload({
      body,
      verificationToken: VERIFICATION_TOKEN,
    })

    expect(signature.startsWith("sha256=")).toBe(true)
    await expect(
      verifyWebhookSignature({
        body,
        signature,
        verificationToken: VERIFICATION_TOKEN,
      })
    ).resolves.toBe(true)
  })

  it("agrees byte-for-byte with the node:crypto reference", async () => {
    const body = JSON.stringify({ hello: "world" })
    const expected = nodeSign(body, VERIFICATION_TOKEN)
    const actual = await signWebhookPayload({
      body,
      verificationToken: VERIFICATION_TOKEN,
    })
    expect(actual).toBe(expected)
  })
})

describe("verifyWebhookSignature: fallback to node:crypto", () => {
  // Exercises the path used on Node.js 18.0–18.18, where `globalThis.crypto`
  // is not enabled by default. We can't downgrade the test runner, so we
  // simulate the missing global and re-import the module fresh so its
  // `cachedSubtle` is empty.
  const originalGlobalCrypto = (globalThis as { crypto?: unknown }).crypto

  afterEach(() => {
    const g = globalThis as { crypto?: unknown }
    g.crypto = originalGlobalCrypto
    jest.resetModules()
  })

  it("verifies a real signature using node:crypto webcrypto when globalThis.crypto is missing", async () => {
    delete (globalThis as { crypto?: unknown }).crypto

    let verify: typeof verifyWebhookSignature | undefined
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      verify = require("../src/webhooks").verifyWebhookSignature
    })
    if (!verify) throw new Error("module did not load")

    const body = JSON.stringify({ id: "evt_fallback" })
    const signature = nodeSign(body, VERIFICATION_TOKEN)

    await expect(
      verify({ body, signature, verificationToken: VERIFICATION_TOKEN })
    ).resolves.toBe(true)
  })
})
