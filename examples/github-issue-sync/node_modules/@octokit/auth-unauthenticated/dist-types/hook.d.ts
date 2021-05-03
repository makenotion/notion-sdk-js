import { AnyResponse, EndpointOptions, RequestInterface, RequestParameters, Route } from "./types";
export declare function hook(reason: string, request: RequestInterface, route: Route | EndpointOptions, parameters?: RequestParameters): Promise<AnyResponse>;
