import jsonwebtoken from "jsonwebtoken";
export async function getToken({ privateKey, payload }) {
    return jsonwebtoken.sign(payload, privateKey, {
        algorithm: "RS256"
    });
}
