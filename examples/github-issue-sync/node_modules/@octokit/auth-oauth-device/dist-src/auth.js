import { getOAuthAccessToken } from "./get-oauth-access-token";
export async function auth(state, authOptions) {
    return getOAuthAccessToken(state, {
        auth: authOptions,
    });
}
