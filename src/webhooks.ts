/**
 * Helpers for receiving and verifying Notion webhook deliveries.
 *
 * Notion signs each webhook request with HMAC-SHA256 over the raw HTTP body
 * using the subscription's verification token as the key, and sends the
 * resulting hex digest in the `X-Notion-Signature` header as
 * `sha256=<hex>`. To verify a delivery, callers must pass the body
 * **exactly as it arrived over the wire** — any JSON re-serialization will
 * change the bytes and invalidate the signature.
 *
 * These helpers use the Web Crypto API (`globalThis.crypto.subtle`) so they
 * work in Node.js (>= 18), edge runtimes (Vercel, Cloudflare Workers, Deno),
 * and modern browsers without depending on `node:crypto`.
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
 * Performs a constant-time comparison; returns `true` only if the supplied
 * `signature` matches HMAC-SHA256 of `body` keyed by `verificationToken`.
 * Returns `false` (rather than throwing) for any malformed input so the
 * caller can respond with a single 401/403 path.
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
 * Compute the value Notion would send in `X-Notion-Signature` for a given
 * body and verification token. Useful for unit-testing webhook handlers
 * without standing up a real subscription.
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
  const subtle = globalThis.crypto?.subtle
  if (!subtle) {
    // Web Crypto is present on Node >= 15 and all supported runtimes; if a
    // host strips it, fail loudly rather than silently weakening security.
    throw new Error(
      "verifyWebhookSignature requires Web Crypto support " +
        "(globalThis.crypto.subtle). Upgrade to Node.js 18+ or a runtime " +
        "that provides Web Crypto."
    )
  }

  const encoder = new TextEncoder()
  const keyBytes = encoder.encode(key)
  // Copy any Uint8Array input into a fresh ArrayBuffer-backed view so the
  // subtle.sign signature (which forbids SharedArrayBuffer-backed views)
  // is satisfied regardless of the caller's buffer source (e.g. Node Buffer).
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

function bytesToHex(bytes: Uint8Array): string {
  let hex = ""
  for (let i = 0; i < bytes.length; i++) {
    hex += (bytes[i] as number).toString(16).padStart(2, "0")
  }
  return hex
}

// Constant-time string comparison. The two inputs are already known to be
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
