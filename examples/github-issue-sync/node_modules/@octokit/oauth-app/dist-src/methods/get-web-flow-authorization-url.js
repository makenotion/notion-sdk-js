import * as OAuthMethods from "@octokit/oauth-methods";
export function getWebFlowAuthorizationUrlWithState(state, options) {
    const optionsWithDefaults = {
        clientId: state.clientId,
        request: state.octokit.request,
        ...options,
        allowSignup: options.allowSignup || state.allowSignup,
        scopes: options.scopes || state.defaultScopes,
    };
    return OAuthMethods.getWebFlowAuthorizationUrl({
        clientType: state.clientType,
        ...optionsWithDefaults,
    });
}
