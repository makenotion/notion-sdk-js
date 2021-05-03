import { getUserAgent } from "universal-user-agent";
import { request as octokitRequest } from "@octokit/request";
import { VERSION } from "./version";
import { auth } from "./auth";
import { hook } from "./hook";
export { requiresBasicAuth } from "./requires-basic-auth";
export function createOAuthUserAuth({ clientId, clientSecret, clientType = "oauth-app", request = octokitRequest.defaults({
    headers: {
        "user-agent": `octokit-auth-oauth-app.js/${VERSION} ${getUserAgent()}`,
    },
}), ...strategyOptions }) {
    const state = Object.assign({
        clientType,
        clientId,
        clientSecret,
        strategyOptions,
        request,
    });
    // @ts-expect-error not worth the extra code needed to appease TS
    return Object.assign(auth.bind(null, state), {
        // @ts-expect-error not worth the extra code needed to appease TS
        hook: hook.bind(null, state),
    });
}
createOAuthUserAuth.VERSION = VERSION;
