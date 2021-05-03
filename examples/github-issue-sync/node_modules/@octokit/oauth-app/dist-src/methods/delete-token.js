import * as OAuthMethods from "@octokit/oauth-methods";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
import { emitEvent } from "../emit-event";
export async function deleteTokenWithState(state, options) {
    const optionsWithDefaults = {
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        request: state.octokit.request,
        ...options,
    };
    const response = state.clientType === "oauth-app"
        ? await OAuthMethods.deleteToken({
            clientType: "oauth-app",
            ...optionsWithDefaults,
        })
        : // istanbul ignore next
            await OAuthMethods.deleteToken({
                clientType: "github-app",
                ...optionsWithDefaults,
            });
    await emitEvent(state, {
        name: "token",
        action: "deleted",
        token: options.token,
        octokit: new state.Octokit({
            authStrategy: createUnauthenticatedAuth,
            auth: {
                reason: `Handling "token.deleted" event. The access for the token has been revoked.`,
            },
        }),
    });
    return response;
}
