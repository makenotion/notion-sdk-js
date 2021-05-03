declare type IncomingMessage = any;
declare type ServerResponse = any;
import { Webhooks } from "../../index";
import { MiddlewareOptions } from "./types";
export declare function middleware(webhooks: Webhooks, options: Required<MiddlewareOptions>, request: IncomingMessage, response: ServerResponse, next?: Function): Promise<any>;
export {};
