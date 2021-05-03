import { getOAuthAccessToken } from "./get-oauth-access-token";
export async function hook(state, request, route, parameters) {
    let endpoint = request.endpoint.merge(route, parameters);
    // Do not intercept request to retrieve codes or token
    if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint.url)) {
        return request(endpoint);
    }
    const { token } = await getOAuthAccessToken(state, {
        request,
        auth: { type: "oauth" },
    });
    endpoint.headers.authorization = `token ${token}`;
    return request(endpoint);
}
