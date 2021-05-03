import { OAuthAppState, GitHubAppState, AppAuthOptions, WebFlowAuthOptions, OAuthAppDeviceFlowAuthOptions, GitHubAppDeviceFlowAuthOptions, FactoryOAuthAppWebFlow, FactoryOAuthAppDeviceFlow, FactoryGitHubWebFlow, FactoryGitHubDeviceFlow, AppAuthentication, OAuthAppUserAuthentication, GitHubAppUserAuthentication, GitHubAppUserAuthenticationWithExpiration } from "./types";
export declare function auth(state: OAuthAppState | GitHubAppState, authOptions: AppAuthOptions): Promise<AppAuthentication>;
export declare function auth(state: OAuthAppState, authOptions: WebFlowAuthOptions): Promise<OAuthAppUserAuthentication>;
export declare function auth<T = unknown>(state: OAuthAppState, authOptions: WebFlowAuthOptions & {
    factory: FactoryOAuthAppWebFlow<T>;
}): Promise<T>;
export declare function auth(state: OAuthAppState, authOptions: OAuthAppDeviceFlowAuthOptions): Promise<OAuthAppUserAuthentication>;
export declare function auth<T = unknown>(state: OAuthAppState, authOptions: OAuthAppDeviceFlowAuthOptions & {
    factory: FactoryOAuthAppDeviceFlow<T>;
}): Promise<T>;
export declare function auth(state: GitHubAppState, authOptions: WebFlowAuthOptions): Promise<GitHubAppUserAuthentication | GitHubAppUserAuthenticationWithExpiration>;
export declare function auth<T = unknown>(state: GitHubAppState, authOptions: WebFlowAuthOptions & {
    factory: FactoryGitHubWebFlow<T>;
}): Promise<T>;
export declare function auth(state: GitHubAppState, authOptions: GitHubAppDeviceFlowAuthOptions): Promise<GitHubAppUserAuthentication | GitHubAppUserAuthenticationWithExpiration>;
export declare function auth<T = unknown>(state: GitHubAppState, authOptions: GitHubAppDeviceFlowAuthOptions & {
    factory: FactoryGitHubDeviceFlow<T>;
}): Promise<T>;
