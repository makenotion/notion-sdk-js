/**
 * Helpers for receiving and verifying Notion webhook deliveries.
 *
 * Event signatures use HMAC-SHA256 with the subscription's verification
 * token. The `X-Notion-Signature` header contains `sha256=<hex>`.
 * Pass the raw body as received. Parsing and re-serializing JSON can change
 * its bytes and invalidate the signature.
 *
 * The helpers use the global Web Crypto API provided by Node.js 22 and later.
 */

const SIGNATURE_PREFIX = "sha256="
const SHA256_HEX_LENGTH = 64

export type VerifyWebhookSignatureArgs = {
  /**
   * The raw HTTP request body, before any parsing.
   * Pass a string for text bodies or a Uint8Array/Buffer for binary-safe
   * access. Re-serialized JSON will not verify.
   */
  body: string | Uint8Array
  /**
   * The value of the `X-Notion-Signature` request header. Verification
   * fails (returns false) if this is missing or malformed.
   */
  signature: string | null | undefined
  /**
   * The verification token configured for this webhook subscription
   * (returned by Notion when the subscription was created and surfaced
   * during the initial handshake).
   */
  verificationToken: string
}

/**
 * Verify that a webhook delivery came from Notion and has not been
 * tampered with.
 *
 * Returns `true` if the signature matches HMAC-SHA256 of the body using
 * the verification token. Returns `false` for a missing or malformed
 * signature. Crypto errors may throw.
 */
export async function verifyWebhookSignature(
  args: VerifyWebhookSignatureArgs
): Promise<boolean> {
  const { body, signature, verificationToken } = args

  if (typeof signature !== "string") {
    return false
  }
  if (!signature.startsWith(SIGNATURE_PREFIX)) {
    return false
  }

  const providedHex = signature.slice(SIGNATURE_PREFIX.length).toLowerCase()
  if (providedHex.length !== SHA256_HEX_LENGTH) {
    return false
  }
  if (!/^[0-9a-f]+$/.test(providedHex)) {
    return false
  }

  const key = await importHmacKey(verificationToken, "verify")
  return globalThis.crypto.subtle.verify(
    "HMAC",
    key,
    hexToBytes(providedHex),
    bodyToBytes(body)
  )
}

/**
 * Compute the value Notion would send in `X-Notion-Signature` for a
 * given body and verification token. Use this to test webhook handlers
 * without a live subscription.
 */
export async function signWebhookPayload(args: {
  body: string | Uint8Array
  verificationToken: string
}): Promise<string> {
  const key = await importHmacKey(args.verificationToken, "sign")
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    bodyToBytes(args.body)
  )
  return `${SIGNATURE_PREFIX}${bytesToHex(new Uint8Array(signature))}`
}

async function importHmacKey(
  token: string,
  usage: "sign" | "verify"
): Promise<CryptoKey> {
  return globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(token),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  )
}

function bodyToBytes(body: string | Uint8Array): Uint8Array<ArrayBuffer> {
  // Web Crypto requires ArrayBuffer-backed views; binary inputs may use SharedArrayBuffer.
  return typeof body === "string"
    ? new TextEncoder().encode(body)
    : Uint8Array.from(body)
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = ""
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0")
  }
  return hex
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}
