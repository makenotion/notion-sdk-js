import btoa from "btoa-lite";
import { auth } from "./auth";
import { requiresBasicAuth } from "./requires-basic-auth";
export async function hook(state, request, route, parameters = {}) {
    const endpoint = request.endpoint.merge(route, parameters);
    // Do not intercept OAuth Web/Device flow request
    if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint.url)) {
        return request(endpoint);
    }
    if (requiresBasicAuth(endpoint.url)) {
        const credentials = btoa(`${state.clientId}:${state.clientSecret}`);
        endpoint.headers.authorization = `basic ${credentials}`;
        return request(endpoint);
    }
    // TS makes us do this ¯\_(ツ)_/¯
    const { token } = state.clientType === "oauth-app"
        ? await auth({ ...state, request })
        : await auth({ ...state, request });
    endpoint.headers.authorization = "token " + token;
    return request(endpoint);
}
