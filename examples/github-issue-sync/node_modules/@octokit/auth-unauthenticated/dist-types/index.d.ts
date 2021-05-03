import { StrategyInterface, Options, Authentication } from "./types";
export declare type Types = {
    StrategyOptions: Options;
    AuthOptions: never;
    Authentication: Authentication;
};
export declare const createUnauthenticatedAuth: StrategyInterface;
