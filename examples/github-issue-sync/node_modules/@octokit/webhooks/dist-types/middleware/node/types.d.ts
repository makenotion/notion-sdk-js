declare type IncomingMessage = any;
declare type ServerResponse = any;
import { Logger } from "../../createLogger";
export declare type MiddlewareOptions = {
    path?: string;
    log?: Logger;
    onUnhandledRequest?: (request: IncomingMessage, response: ServerResponse) => void;
};
export {};
