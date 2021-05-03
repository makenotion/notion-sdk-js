import { oauthAuthorizationUrl, } from "@octokit/oauth-authorization-url";
import { request as defaultRequest } from "@octokit/request";
import { requestToOAuthBaseUrl } from "./utils";
export function getWebFlowAuthorizationUrl({ request = defaultRequest, ...options }) {
    const baseUrl = requestToOAuthBaseUrl(request);
    // @ts-expect-error TypeScript wants `clientType` to be set explicitly ¯\_(ツ)_/¯
    return oauthAuthorizationUrl({
        ...options,
        baseUrl,
    });
}
