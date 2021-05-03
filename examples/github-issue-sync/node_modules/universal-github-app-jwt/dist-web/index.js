function string2ArrayBuffer(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
function getDERfromPEM(pem) {
    const pemB64 = pem
        .trim()
        .split("\n")
        .slice(1, -1) // Remove the --- BEGIN / END PRIVATE KEY ---
        .join("");
    const decoded = atob(pemB64);
    return string2ArrayBuffer(decoded);
}
function getEncodedMessage(header, payload) {
    return `${base64encodeJSON(header)}.${base64encodeJSON(payload)}`;
}
function base64encode(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return fromBase64(btoa(binary));
}
function fromBase64(base64) {
    return base64
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}
function base64encodeJSON(obj) {
    return fromBase64(btoa(JSON.stringify(obj)));
}

const getToken = async ({ privateKey, payload }) => {
    // WebCrypto only supports PKCS#8, unfortunately
    if (/BEGIN RSA PRIVATE KEY/.test(privateKey)) {
        throw new Error("[universal-github-app-jwt] Private Key is in PKCS#1 format, but only PKCS#8 is supported. See https://github.com/gr2m/universal-github-app-jwt#readme");
    }
    const algorithm = {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
    };
    const header = { alg: "RS256", typ: "JWT" };
    const privateKeyDER = getDERfromPEM(privateKey);
    const importedKey = await crypto.subtle.importKey("pkcs8", privateKeyDER, algorithm, false, ["sign"]);
    const encodedMessage = getEncodedMessage(header, payload);
    const encodedMessageArrBuf = string2ArrayBuffer(encodedMessage);
    const signatureArrBuf = await crypto.subtle.sign(algorithm.name, importedKey, encodedMessageArrBuf);
    const encodedSignature = base64encode(signatureArrBuf);
    return `${encodedMessage}.${encodedSignature}`;
};

async function githubAppJwt({ id, privateKey, now = Math.floor(Date.now() / 1000), }) {
    // When creating a JSON Web Token, it sets the "issued at time" (iat) to 30s
    // in the past as we have seen people running situations where the GitHub API
    // claimed the iat would be in future. It turned out the clocks on the
    // different machine were not in sync.
    const nowWithSafetyMargin = now - 30;
    const expiration = nowWithSafetyMargin + 60 * 10; // JWT expiration time (10 minute maximum)
    const payload = {
        iat: nowWithSafetyMargin,
        exp: expiration,
        iss: id
    };
    const token = await getToken({
        privateKey,
        payload
    });
    return {
        appId: id,
        expiration,
        token
    };
}

export { githubAppJwt };
//# sourceMappingURL=index.js.map
