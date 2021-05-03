import * as OAuthAppAuth from "@octokit/auth-oauth-app";
import { emitEvent } from "../emit-event";
export async function createTokenWithState(state, options) {
    const authentication = await state.octokit.auth({
        type: "oauth-user",
        ...options,
    });
    await emitEvent(state, {
        name: "token",
        action: "created",
        token: authentication.token,
        scopes: authentication.scopes,
        authentication,
        octokit: new state.Octokit({
            authStrategy: OAuthAppAuth.createOAuthUserAuth,
            auth: {
                clientType: state.clientType,
                clientId: state.clientId,
                clientSecret: state.clientSecret,
                token: authentication.token,
                scopes: authentication.scopes,
                refreshToken: authentication.refreshToken,
                expiresAt: authentication.expiresAt,
                refreshTokenExpiresAt: authentication.refreshTokenExpiresAt,
            },
        }),
    });
    return { authentication };
}
