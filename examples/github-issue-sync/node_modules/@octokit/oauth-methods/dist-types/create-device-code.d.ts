import { OctokitResponse, RequestInterface } from "@octokit/types";
export declare type CreateDeviceCodeOAuthAppOptions = {
    clientType: "oauth-app";
    clientId: string;
    scopes?: string[];
    request?: RequestInterface;
};
export declare type CreateDeviceCodeGitHubAppOptions = {
    clientType: "github-app";
    clientId: string;
    request?: RequestInterface;
};
export declare type CreateDeviceCodeDeviceTokenResponse = OctokitResponse<{
    device_code: string;
    user_code: string;
    verification_uri: string;
    expires_in: number;
    interval: number;
}>;
export declare function createDeviceCode(options: CreateDeviceCodeOAuthAppOptions | CreateDeviceCodeGitHubAppOptions): Promise<CreateDeviceCodeDeviceTokenResponse>;
