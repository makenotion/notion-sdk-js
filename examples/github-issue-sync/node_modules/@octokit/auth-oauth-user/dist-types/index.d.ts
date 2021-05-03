import { OAuthAppStrategyOptions, GitHubAppStrategyOptions, OAuthAppAuthInterface, GitHubAppAuthInterface } from "./types";
export { OAuthAppStrategyOptionsWebFlow, GitHubAppStrategyOptionsWebFlow, OAuthAppStrategyOptionsDeviceFlow, GitHubAppStrategyOptionsDeviceFlow, OAuthAppStrategyOptionsExistingAuthentication, GitHubAppStrategyOptionsExistingAuthentication, GitHubAppStrategyOptionsExistingAuthenticationWithExpiration, OAuthAppStrategyOptions, GitHubAppStrategyOptions, OAuthAppAuthOptions, GitHubAppAuthOptions, OAuthAppAuthentication, GitHubAppAuthentication, GitHubAppAuthenticationWithExpiration, } from "./types";
export { requiresBasicAuth } from "./requires-basic-auth";
export declare function createOAuthUserAuth(options: OAuthAppStrategyOptions): OAuthAppAuthInterface;
export declare namespace createOAuthUserAuth {
    var VERSION: string;
}
export declare function createOAuthUserAuth(options: GitHubAppStrategyOptions): GitHubAppAuthInterface;
export declare namespace createOAuthUserAuth {
    var VERSION: string;
}
