import { OAuthAppAuthOptions, GitHubAppAuthOptions, OAuthAppAuthentication, GitHubAppAuthentication, GitHubAppAuthenticationWithExpiration, OAuthAppState, GitHubAppState } from "./types";
export declare function auth(state: OAuthAppState, options?: OAuthAppAuthOptions): Promise<OAuthAppAuthentication>;
export declare function auth(state: GitHubAppState, options?: GitHubAppAuthOptions): Promise<GitHubAppAuthentication | GitHubAppAuthenticationWithExpiration>;
