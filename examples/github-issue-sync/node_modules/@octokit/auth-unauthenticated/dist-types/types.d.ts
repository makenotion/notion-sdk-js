import * as OctokitTypes from "@octokit/types";
export declare type AnyResponse = OctokitTypes.OctokitResponse<any>;
export declare type StrategyInterface = OctokitTypes.StrategyInterface<[
    Options
], [
], Authentication>;
export declare type EndpointDefaults = OctokitTypes.EndpointDefaults;
export declare type EndpointOptions = OctokitTypes.EndpointOptions;
export declare type RequestParameters = OctokitTypes.RequestParameters;
export declare type RequestInterface = OctokitTypes.RequestInterface;
export declare type Route = OctokitTypes.Route;
export declare type Options = {
    reason: string;
};
export declare type Authentication = {
    type: "unauthenticated";
    reason: string;
};
