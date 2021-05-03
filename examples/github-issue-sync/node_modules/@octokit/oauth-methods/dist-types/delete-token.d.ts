import { RequestInterface, Endpoints } from "@octokit/types";
export declare type DeleteTokenOAuthAppOptions = {
    clientType: "oauth-app";
    clientId: string;
    clientSecret: string;
    token: string;
    request?: RequestInterface;
};
export declare type DeleteTokenGitHubAppOptions = {
    clientType: "github-app";
    clientId: string;
    clientSecret: string;
    token: string;
    request?: RequestInterface;
};
export declare type DeleteTokenResponse = Endpoints["DELETE /applications/{client_id}/token"]["response"];
export declare function deleteToken(options: DeleteTokenOAuthAppOptions): Promise<DeleteTokenResponse>;
export declare function deleteToken(options: DeleteTokenGitHubAppOptions): Promise<DeleteTokenResponse>;
