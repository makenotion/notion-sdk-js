const enc = new TextEncoder();
export async function sign(secret, data) {
    const signature = await crypto.subtle.sign("HMAC", await importKey(secret), enc.encode(data));
    return UInt8ArrayToHex(signature);
}
export async function verify(secret, data, signature) {
    return await crypto.subtle.verify("HMAC", await importKey(secret), hexToUInt8Array(signature), enc.encode(data));
}
function hexToUInt8Array(string) {
    // convert string to pairs of 2 characters
    const pairs = string.match(/[\dA-F]{2}/gi);
    // convert the octets to integers
    const integers = pairs.map(function (s) {
        return parseInt(s, 16);
    });
    return new Uint8Array(integers);
}
function UInt8ArrayToHex(signature) {
    return Array.prototype.map
        .call(new Uint8Array(signature), (x) => x.toString(16).padStart(2, "0"))
        .join("");
}
async function importKey(secret) {
    return crypto.subtle.importKey("raw", // raw format of the key - should be Uint8Array
    enc.encode(secret), {
        // algorithm details
        name: "HMAC",
        hash: { name: "SHA-256" },
    }, false, // export = false
    ["sign", "verify"] // what this key can do
    );
}
