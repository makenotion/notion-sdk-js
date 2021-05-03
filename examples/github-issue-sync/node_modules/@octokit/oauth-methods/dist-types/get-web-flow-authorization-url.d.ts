import { OAuthAppResult, GitHubAppResult } from "@octokit/oauth-authorization-url";
import { RequestInterface } from "@octokit/types";
export declare type GetWebFlowAuthorizationUrlOAuthAppOptions = {
    clientType: "oauth-app";
    clientId: string;
    allowSignup?: boolean;
    login?: string;
    scopes?: string | string[];
    redirectUrl?: string;
    state?: string;
    request?: RequestInterface;
};
export declare type GetWebFlowAuthorizationUrlGitHubAppOptions = {
    clientType: "github-app";
    clientId: string;
    allowSignup?: boolean;
    login?: string;
    redirectUrl?: string;
    state?: string;
    request?: RequestInterface;
};
export declare type GetWebFlowAuthorizationUrlOAuthAppResult = OAuthAppResult;
export declare type GetWebFlowAuthorizationUrlGitHubAppResult = GitHubAppResult;
export declare function getWebFlowAuthorizationUrl(options: GetWebFlowAuthorizationUrlOAuthAppOptions): OAuthAppResult;
export declare function getWebFlowAuthorizationUrl(options: GetWebFlowAuthorizationUrlGitHubAppOptions): GitHubAppResult;
