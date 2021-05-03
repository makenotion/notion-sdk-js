// @ts-nocheck there is only place for one of us in this file. And it's not you, TS
import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";
import { exchangeWebFlowCode } from "@octokit/oauth-methods";
export async function getAuthentication(state) {
    // handle code exchange form OAuth Web Flow
    if ("code" in state.strategyOptions) {
        const { authentication } = await exchangeWebFlowCode({
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            clientType: state.clientType,
            ...state.strategyOptions,
            request: state.request,
        });
        return {
            type: "token",
            tokenType: "oauth",
            ...authentication,
        };
    }
    // handle OAuth device flow
    if ("onVerification" in state.strategyOptions) {
        const deviceAuth = createOAuthDeviceAuth({
            clientType: state.clientType,
            clientId: state.clientId,
            ...state.strategyOptions,
            request: state.request,
        });
        const authentication = await deviceAuth({
            type: "oauth",
        });
        return {
            clientSecret: state.clientSecret,
            ...authentication,
        };
    }
    // use existing authentication
    if ("token" in state.strategyOptions) {
        return {
            type: "token",
            tokenType: "oauth",
            clientId: state.clientId,
            clientSecret: state.clientSecret,
            clientType: state.clientType,
            ...state.strategyOptions,
        };
    }
    throw new Error("[@octokit/auth-oauth-user] Invalid strategy options");
}
