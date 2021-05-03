import { getUserAgent } from "universal-user-agent";
import { request as octokitRequest } from "@octokit/request";
import { auth } from "./auth";
import { hook } from "./hook";
import { VERSION } from "./version";
export function createOAuthDeviceAuth(options) {
    const requestWithDefaults = options.request ||
        octokitRequest.defaults({
            headers: {
                "user-agent": `octokit-auth-oauth-device.js/${VERSION} ${getUserAgent()}`,
            },
        });
    const { request = requestWithDefaults, ...otherOptions } = options;
    const state = options.clientType === "github-app"
        ? {
            ...otherOptions,
            clientType: "github-app",
            request,
        }
        : {
            ...otherOptions,
            clientType: "oauth-app",
            request,
            scopes: options.scopes || [],
        };
    if (!options.clientId) {
        throw new Error('[@octokit/auth-oauth-device] "clientId" option must be set (https://github.com/octokit/auth-oauth-device.js#usage)');
    }
    if (!options.onVerification) {
        throw new Error('[@octokit/auth-oauth-device] "onVerification" option must be a function (https://github.com/octokit/auth-oauth-device.js#usage)');
    }
    // @ts-ignore too much for tsc / ts-jest ¯\_(ツ)_/¯
    return Object.assign(auth.bind(null, state), {
        hook: hook.bind(null, state),
    });
}
