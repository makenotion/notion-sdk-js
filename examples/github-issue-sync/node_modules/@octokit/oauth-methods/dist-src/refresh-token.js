import { request as defaultRequest } from "@octokit/request";
import { oauthRequest } from "./utils";
export async function refreshToken(options) {
    const request = options.request ||
        /* istanbul ignore next: we always pass a custom request in tests */
        defaultRequest;
    const response = await oauthRequest(request, "POST /login/oauth/access_token", {
        client_id: options.clientId,
        client_secret: options.clientSecret,
        grant_type: "refresh_token",
        refresh_token: options.refreshToken,
    });
    const apiTimeInMs = new Date(response.headers.date).getTime();
    const authentication = {
        clientType: "github-app",
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        token: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: toTimestamp(apiTimeInMs, response.data.expires_in),
        refreshTokenExpiresAt: toTimestamp(apiTimeInMs, response.data.refresh_token_expires_in),
    };
    return { ...response, authentication };
}
function toTimestamp(apiTimeInMs, expirationInSeconds) {
    return new Date(apiTimeInMs + expirationInSeconds * 1000).toISOString();
}
