import { createDeviceCode, exchangeDeviceCode } from "@octokit/oauth-methods";
export async function getOAuthAccessToken(state, options) {
    const cachedAuthentication = getCachedAuthentication(state, options.auth);
    if (cachedAuthentication)
        return cachedAuthentication;
    // Step 1: Request device and user codes
    // https://docs.github.com/en/developers/apps/authorizing-oauth-apps#step-1-app-requests-the-device-and-user-verification-codes-from-github
    const { data: verification } = await createDeviceCode({
        clientType: state.clientType,
        clientId: state.clientId,
        request: options.request || state.request,
        // @ts-expect-error the extra code to make TS happy is not worth it
        scopes: options.auth.scopes || state.scopes,
    });
    // Step 2: User must enter the user code on https://github.com/login/device
    // See https://docs.github.com/en/developers/apps/authorizing-oauth-apps#step-2-prompt-the-user-to-enter-the-user-code-in-a-browser
    await state.onVerification(verification);
    // Step 3: Exchange device code for access token
    // See https://docs.github.com/en/developers/apps/authorizing-oauth-apps#step-3-app-polls-github-to-check-if-the-user-authorized-the-device
    const authentication = await waitForAccessToken(options.request || state.request, state.clientId, state.clientType, verification);
    state.authentication = authentication;
    return authentication;
}
function getCachedAuthentication(state, auth) {
    if (auth.refresh === true)
        return false;
    if (!state.authentication)
        return false;
    if (state.clientType === "github-app") {
        return state.authentication;
    }
    const authentication = state.authentication;
    const newScope = (("scopes" in auth && auth.scopes) || state.scopes).join(" ");
    const currentScope = authentication.scopes.join(" ");
    return newScope === currentScope ? authentication : false;
}
async function wait(seconds) {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
async function waitForAccessToken(request, clientId, clientType, verification) {
    try {
        const options = {
            clientId,
            request,
            code: verification.device_code,
        };
        // WHY TYPESCRIPT WHY ARE YOU DOING THIS TO ME
        const { authentication } = clientType === "oauth-app"
            ? await exchangeDeviceCode({
                ...options,
                clientType: "oauth-app",
            })
            : await exchangeDeviceCode({
                ...options,
                clientType: "github-app",
            });
        return {
            type: "token",
            tokenType: "oauth",
            ...authentication,
        };
    }
    catch (error) {
        // istanbul ignore if
        if (!error.response)
            throw error;
        const errorType = error.response.data.error;
        if (errorType === "authorization_pending") {
            await wait(verification.interval);
            return waitForAccessToken(request, clientId, clientType, verification);
        }
        if (errorType === "slow_down") {
            await wait(verification.interval + 5);
            return waitForAccessToken(request, clientId, clientType, verification);
        }
        throw error;
    }
}
