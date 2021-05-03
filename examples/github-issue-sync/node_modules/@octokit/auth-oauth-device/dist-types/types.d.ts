import { RequestInterface, Route, EndpointOptions, RequestParameters, OctokitResponse } from "@octokit/types";
import * as OAuthMethodsTypes from "@octokit/oauth-methods";
export declare type ClientType = "oauth-app" | "github-app";
export declare type OAuthAppStrategyOptions = {
    clientId: string;
    clientType?: "oauth-app";
    onVerification: OnVerificationCallback;
    scopes?: string[];
    request?: RequestInterface;
};
export declare type GitHubAppStrategyOptions = {
    clientId: string;
    clientType: "github-app";
    onVerification: OnVerificationCallback;
    request?: RequestInterface;
};
export interface OAuthAppAuthInterface {
    (options: OAuthAppAuthOptions): Promise<OAuthAppAuthentication>;
    hook(request: RequestInterface, route: Route | EndpointOptions, parameters?: RequestParameters): Promise<OctokitResponse<any>>;
}
export interface GitHubAppAuthInterface {
    (options: GitHubAppAuthOptions): Promise<GitHubAppAuthentication | GitHubAppAuthenticationWithExpiration>;
    hook(request: RequestInterface, route: Route | EndpointOptions, parameters?: RequestParameters): Promise<OctokitResponse<any>>;
}
export declare type OAuthAppAuthOptions = {
    type: "oauth";
    scopes?: string[];
    refresh?: boolean;
};
export declare type GitHubAppAuthOptions = {
    type: "oauth";
    refresh?: boolean;
};
export declare type OAuthAppAuthentication = {
    type: "token";
    tokenType: "oauth";
} & Omit<OAuthMethodsTypes.OAuthAppAuthentication, "clientSecret">;
export declare type GitHubAppAuthentication = {
    type: "token";
    tokenType: "oauth";
} & Omit<OAuthMethodsTypes.GitHubAppAuthentication, "clientSecret">;
export declare type GitHubAppAuthenticationWithExpiration = {
    type: "token";
    tokenType: "oauth";
} & Omit<OAuthMethodsTypes.GitHubAppAuthentication, "clientSecret">;
export declare type Verification = {
    device_code: string;
    user_code: string;
    verification_uri: string;
    expires_in: number;
    interval: number;
};
export declare type OnVerificationCallback = (verification: Verification) => any | Promise<any>;
export declare type OAuthAppState = {
    clientId: string;
    clientType: "oauth-app";
    onVerification: OnVerificationCallback;
    scopes: string[];
    request: RequestInterface;
    authentication?: OAuthAppAuthentication;
};
export declare type GitHubAppState = {
    clientId: string;
    clientType: "github-app";
    onVerification: OnVerificationCallback;
    request: RequestInterface;
    authentication?: GitHubAppAuthentication | GitHubAppAuthenticationWithExpiration;
};
