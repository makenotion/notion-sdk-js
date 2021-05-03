import { request as defaultRequest } from "@octokit/request";
import { oauthRequest } from "./utils";
export async function createDeviceCode(options) {
    const request = options.request ||
        /* istanbul ignore next: we always pass a custom request in tests */
        defaultRequest;
    const parameters = {
        client_id: options.clientId,
    };
    if ("scopes" in options && Array.isArray(options.scopes)) {
        parameters.scope = options.scopes.join(" ");
    }
    return oauthRequest(request, "POST /login/device/code", parameters);
}
