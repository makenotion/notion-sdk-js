/**
 * Helpers for receiving and verifying Notion webhook deliveries.
 *
 * Event signatures use HMAC-SHA256 with the subscription's verification
 * token. The `X-Notion-Signature` header contains `sha256=<hex>`.
 * Pass the raw body as received. Parsing and re-serializing JSON can change
 * its bytes and invalidate the signature.
 *
 * The helpers use `globalThis.crypto.subtle` when available, then fall
 * back to the Web Crypto API in Node's crypto module.
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

  const computedHex = await computeHmacSha256Hex(verificationToken, body)
  return timingSafeEqualHex(providedHex, computedHex)
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
  const hex = await computeHmacSha256Hex(args.verificationToken, args.body)
  return `${SIGNATURE_PREFIX}${hex}`
}

async function computeHmacSha256Hex(
  key: string,
  body: string | Uint8Array
): Promise<string> {
  const subtle = await getSubtle()

  const encoder = new TextEncoder()
  const keyBytes = encoder.encode(key)
  // Copy any Uint8Array input into a fresh ArrayBuffer-backed view so
  // subtle.sign (which forbids SharedArrayBuffer-backed views) is
  // satisfied regardless of where the caller's buffer came from.
  const bodyBytes =
    typeof body === "string" ? encoder.encode(body) : Uint8Array.from(body)

  const cryptoKey = await subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signatureBuffer = await subtle.sign("HMAC", cryptoKey, bodyBytes)
  return bytesToHex(new Uint8Array(signatureBuffer))
}

let cachedSubtle: SubtleCrypto | undefined

async function getSubtle(): Promise<SubtleCrypto> {
  if (cachedSubtle) {
    return cachedSubtle
  }

  const fromGlobal = (globalThis as { crypto?: { subtle?: SubtleCrypto } })
    .crypto?.subtle
  if (fromGlobal) {
    cachedSubtle = fromGlobal
    return cachedSubtle
  }

  // Load Node's fallback only when needed so browser callers can use the
  // global API without loading a Node module.
  try {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const nodeCrypto = require("crypto") as {
      webcrypto?: { subtle?: SubtleCrypto }
    }
    /* eslint-enable @typescript-eslint/no-var-requires */
    if (nodeCrypto.webcrypto?.subtle) {
      cachedSubtle = nodeCrypto.webcrypto.subtle
      return cachedSubtle
    }
  } catch {
    // node:crypto unavailable (e.g. a browser bundle that stubbed it).
    // Fall through to the error below.
  }

  throw new Error(
    "verifyWebhookSignature requires Web Crypto support " +
      "(globalThis.crypto.subtle or node:crypto.webcrypto). Upgrade to " +
      "a runtime that provides one of them."
  )
}

function bytesToHex(bytes: Uint8Array): string {
  let hex = ""
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0")
  }
  return hex
}

// Constant-time string comparison. The inputs are already known to be
// the same length (callers enforce SHA256_HEX_LENGTH), so this purely
// avoids early-exit on the first differing character.
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}
