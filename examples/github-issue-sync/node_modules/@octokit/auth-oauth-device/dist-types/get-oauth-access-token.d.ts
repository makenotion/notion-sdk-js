import { RequestInterface } from "@octokit/types";
import { OAuthAppState, GitHubAppState, OAuthAppAuthOptions, GitHubAppAuthOptions, OAuthAppAuthentication, GitHubAppAuthentication } from "./types";
export declare function getOAuthAccessToken(state: OAuthAppState | GitHubAppState, options: {
    request?: RequestInterface;
    auth: OAuthAppAuthOptions | GitHubAppAuthOptions;
}): Promise<OAuthAppAuthentication | GitHubAppAuthentication>;
