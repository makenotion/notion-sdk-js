import { OAuthAppOptions, GitHubAppOptions, OAuthAppResult, GitHubAppResult } from "./types";
export { ClientType, OAuthAppOptions, GitHubAppOptions, OAuthAppResult, GitHubAppResult, } from "./types";
export declare function oauthAuthorizationUrl(options: OAuthAppOptions): OAuthAppResult;
export declare function oauthAuthorizationUrl(options: GitHubAppOptions): GitHubAppResult;
