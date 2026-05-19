/**
 * Helpers for receiving and verifying Notion webhook deliveries.
 *
 * Notion signs each webhook request with HMAC-SHA256 over the raw HTTP
 * body using the subscription's verification token as the key, and sends
 * the resulting hex digest in the `X-Notion-Signature` header as
 * `sha256=<hex>`. To verify a delivery, callers must pass the body
 * **exactly as it arrived over the wire** — any JSON re-serialization
 * will change the bytes and invalidate the signature.
 *
 * The helpers prefer the Web Crypto API (`globalThis.crypto.subtle`)
 * when present (browsers, edge runtimes, Node.js >= 18.19) and
 * transparently fall back to `node:crypto`'s `webcrypto.subtle` on older
 * Node.js 18 builds where `globalThis.crypto` is not yet enabled by
 * default. They work without configuration in Node.js, Bun, Deno,
 * Vercel Edge Functions, Cloudflare Workers, and modern browsers.
 */

const SIGNATURE_PREFIX = "sha256="
const SHA256_HEX_LENGTH = 64

export type VerifyWebhookSignatureArgs = {
  /**
   * The raw HTTP request body — exactly as received, before any parsing.
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
 * Performs a constant-time comparison; returns `true` only if the
 * supplied `signature` matches HMAC-SHA256 of `body` keyed by
 * `verificationToken`. Returns `false` (rather than throwing) for any
 * malformed input so the caller can respond with a single 401/403 path.
 */
export async function verifyWebhookSignature(
  args: VerifyWebhookSignatureArgs
): Promise<boolean> {
  const { body, signature, verificationToken } = args

  if (typeof signature !== "string") return false
  if (!signature.startsWith(SIGNATURE_PREFIX)) return false

  const providedHex = signature.slice(SIGNATURE_PREFIX.length).toLowerCase()
  if (providedHex.length !== SHA256_HEX_LENGTH) return false
  if (!/^[0-9a-f]+$/.test(providedHex)) return false

  const computedHex = await computeHmacSha256Hex(verificationToken, body)
  return timingSafeEqualHex(providedHex, computedHex)
}

/**
 * Compute the value Notion would send in `X-Notion-Signature` for a
 * given body and verification token. Useful for unit-testing webhook
 * handlers without standing up a real subscription.
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
  if (cachedSubtle) return cachedSubtle

  // Preferred path: every modern runtime exposes Web Crypto on the
  // global object. This includes browsers, Vercel Edge, Cloudflare
  // Workers, Deno, Bun, and Node.js >= 18.19 (which backported the
  // change from Node.js 19).
  const fromGlobal = (globalThis as { crypto?: { subtle?: SubtleCrypto } })
    .crypto?.subtle
  if (fromGlobal) {
    cachedSubtle = fromGlobal
    return cachedSubtle
  }

  // Fallback for Node.js 18.0–18.18, which ships Web Crypto via
  // `node:crypto` but does not expose it on `globalThis` by default.
  // Using `require` (rather than a static `import`) keeps the
  // node:crypto reference off the dependency graph of browser bundlers
  // that would otherwise fail to resolve it.
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
  for (let i = 0; i < bytes.length; i++) {
    hex += (bytes[i] as number).toString(16).padStart(2, "0")
  }
  return hex
}

// Constant-time string comparison. The inputs are already known to be
// the same length (callers enforce SHA256_HEX_LENGTH), so this purely
// avoids early-exit on the first differing character.
function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}
