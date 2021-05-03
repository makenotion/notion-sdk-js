import { OAuthAppState, GitHubAppState, OAuthAppAuthentication, GitHubAppAuthentication, GitHubAppAuthenticationWithExpiration } from "./types";
export declare function getAuthentication(state: OAuthAppState): Promise<OAuthAppAuthentication>;
export declare function getAuthentication(state: GitHubAppState): Promise<GitHubAppAuthentication | GitHubAppAuthenticationWithExpiration>;
