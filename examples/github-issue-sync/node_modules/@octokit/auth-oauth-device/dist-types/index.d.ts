import { GitHubAppAuthInterface, GitHubAppStrategyOptions, OAuthAppAuthInterface, OAuthAppStrategyOptions } from "./types";
export { OAuthAppStrategyOptions, OAuthAppAuthOptions, OAuthAppAuthentication, GitHubAppStrategyOptions, GitHubAppAuthOptions, GitHubAppAuthentication, GitHubAppAuthenticationWithExpiration, } from "./types";
export declare function createOAuthDeviceAuth(options: OAuthAppStrategyOptions): OAuthAppAuthInterface;
export declare function createOAuthDeviceAuth(options: GitHubAppStrategyOptions): GitHubAppAuthInterface;
