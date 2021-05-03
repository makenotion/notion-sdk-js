import { request as defaultRequest } from "@octokit/request";
import { oauthRequest } from "./utils";
export async function exchangeDeviceCode(options) {
    const request = options.request ||
        /* istanbul ignore next: we always pass a custom request in tests */
        defaultRequest;
    const response = await oauthRequest(request, "POST /login/oauth/access_token", {
        client_id: options.clientId,
        device_code: options.code,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    });
    const authentication = {
        clientType: options.clientType,
        clientId: options.clientId,
        token: response.data.access_token,
        scopes: response.data.scope.split(/\s+/).filter(Boolean),
    };
    if ("clientSecret" in options) {
        authentication.clientSecret = options.clientSecret;
    }
    if (options.clientType === "github-app") {
        if ("refresh_token" in response.data) {
            const apiTimeInMs = new Date(response.headers.date).getTime();
            (authentication.refreshToken = response.data.refresh_token),
                (authentication.expiresAt = toTimestamp(apiTimeInMs, response.data.expires_in)),
                (authentication.refreshTokenExpiresAt = toTimestamp(apiTimeInMs, response.data.refresh_token_expires_in));
        }
        delete authentication.scopes;
    }
    return { ...response, authentication };
}
function toTimestamp(apiTimeInMs, expirationInSeconds) {
    return new Date(apiTimeInMs + expirationInSeconds * 1000).toISOString();
}
