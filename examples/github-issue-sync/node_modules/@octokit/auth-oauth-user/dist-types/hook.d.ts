import { EndpointOptions, OctokitResponse, RequestInterface, RequestParameters, Route } from "@octokit/types";
import { OAuthAppState, GitHubAppState } from "./types";
declare type AnyResponse = OctokitResponse<any>;
export declare function hook(state: OAuthAppState, request: RequestInterface, route: Route | EndpointOptions, parameters: RequestParameters): Promise<AnyResponse>;
export declare function hook(state: GitHubAppState, request: RequestInterface, route: Route | EndpointOptions, parameters: RequestParameters): Promise<AnyResponse>;
export {};
