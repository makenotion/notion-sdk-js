import { request as defaultRequest } from "@octokit/request";
import btoa from "btoa-lite";
export async function deleteToken(options) {
    const request = options.request ||
        /* istanbul ignore next: we always pass a custom request in tests */
        defaultRequest;
    const auth = btoa(`${options.clientId}:${options.clientSecret}`);
    return request("DELETE /applications/{client_id}/token", {
        headers: {
            authorization: `basic ${auth}`,
        },
        client_id: options.clientId,
        access_token: options.token,
    });
}
