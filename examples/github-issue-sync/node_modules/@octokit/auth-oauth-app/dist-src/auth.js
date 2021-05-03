import btoa from "btoa-lite";
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";
export async function auth(state, authOptions) {
    if (authOptions.type === "oauth-app") {
        return {
            type: "oauth-app",
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            clientType: state.clientType,
            headers: {
                authorization: `basic ${btoa(`${state.clientId}:${state.clientSecret}`)}`,
            },
        };
    }
    if ("factory" in authOptions) {
        const { type, ...options } = {
            ...authOptions,
            ...state,
        };
        // @ts-expect-error TODO: `option` cannot be never, is this a bug?
        return authOptions.factory(options);
    }
    const common = {
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.request,
        ...authOptions,
    };
    // TS: Look what you made me do
    const userAuth = state.clientType === "oauth-app"
        ? await createOAuthUserAuth({
            ...common,
            clientType: state.clientType,
        })
        : await createOAuthUserAuth({
            ...common,
            clientType: state.clientType,
        });
    return userAuth();
}
