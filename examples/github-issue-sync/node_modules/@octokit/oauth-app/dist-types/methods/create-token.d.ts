import * as OAuthAppAuth from "@octokit/auth-oauth-app";
import { ClientType, State } from "../types";
export declare type CreateTokenWebFlowOptions = Omit<OAuthAppAuth.WebFlowAuthOptions, "type">;
export declare type CreateTokenOAuthAppDeviceFlowOptions = Omit<OAuthAppAuth.OAuthAppDeviceFlowAuthOptions, "type">;
export declare type CreateTokenGitHubAppDeviceFlowOptions = Omit<OAuthAppAuth.GitHubAppDeviceFlowAuthOptions, "type">;
export declare function createTokenWithState(state: State, options: CreateTokenWebFlowOptions | CreateTokenOAuthAppDeviceFlowOptions | CreateTokenGitHubAppDeviceFlowOptions): Promise<{
    authentication: OAuthAppAuth.OAuthAppUserAuthentication | OAuthAppAuth.GitHubAppUserAuthentication | OAuthAppAuth.GitHubAppUserAuthenticationWithExpiration;
}>;
export interface CreateTokenInterface<TClientType extends ClientType> {
    (options: CreateTokenWebFlowOptions): TClientType extends "oauth-app" ? Promise<{
        authentication: OAuthAppAuth.OAuthAppUserAuthentication;
    }> : Promise<{
        authentication: OAuthAppAuth.GitHubAppUserAuthentication;
    } | {
        authentication: OAuthAppAuth.GitHubAppUserAuthenticationWithExpiration;
    }>;
    (options: TClientType extends "oauth-app" ? CreateTokenOAuthAppDeviceFlowOptions : CreateTokenGitHubAppDeviceFlowOptions): TClientType extends "oauth-app" ? Promise<{
        authentication: OAuthAppAuth.OAuthAppUserAuthentication;
    }> : Promise<{
        authentication: OAuthAppAuth.GitHubAppUserAuthentication;
    } | {
        authentication: OAuthAppAuth.GitHubAppUserAuthenticationWithExpiration;
    }>;
}
