import { RequestInterface, Endpoints } from "@octokit/types";
export declare type DeleteAuthorizationOAuthAppOptions = {
    clientType: "oauth-app";
    clientId: string;
    clientSecret: string;
    token: string;
    request?: RequestInterface;
};
export declare type DeleteAuthorizationGitHubAppOptions = {
    clientType: "github-app";
    clientId: string;
    clientSecret: string;
    token: string;
    request?: RequestInterface;
};
export declare type DeleteAuthorizationResponse = Endpoints["DELETE /applications/{client_id}/grant"]["response"];
export declare function deleteAuthorization(options: DeleteAuthorizationOAuthAppOptions): Promise<DeleteAuthorizationResponse>;
export declare function deleteAuthorization(options: DeleteAuthorizationGitHubAppOptions): Promise<DeleteAuthorizationResponse>;
