import { AnyResponse, EndpointOptions, RequestParameters, RequestInterface, Route, State } from "./types";
export declare function hook(state: State, request: RequestInterface, route: Route | EndpointOptions, parameters?: RequestParameters): Promise<AnyResponse>;
