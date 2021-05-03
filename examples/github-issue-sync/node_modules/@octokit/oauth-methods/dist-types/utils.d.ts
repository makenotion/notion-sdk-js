import { RequestInterface } from "@octokit/types";
export declare function requestToOAuthBaseUrl(request: RequestInterface): string;
export declare function oauthRequest(request: RequestInterface, route: string, parameters: Record<string, unknown>): Promise<import("@octokit/types").OctokitResponse<any, number>>;
