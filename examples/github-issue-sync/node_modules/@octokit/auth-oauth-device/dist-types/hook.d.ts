import { RequestInterface, OctokitResponse, EndpointOptions, RequestParameters, Route } from "@octokit/types";
import { OAuthAppState, GitHubAppState } from "./types";
export declare function hook(state: OAuthAppState | GitHubAppState, request: RequestInterface, route: Route | EndpointOptions, parameters?: RequestParameters): Promise<OctokitResponse<any>>;
