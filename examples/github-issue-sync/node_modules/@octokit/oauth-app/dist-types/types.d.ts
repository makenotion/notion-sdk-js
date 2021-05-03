import { Octokit } from "@octokit/core";
import { OAuthAppUserAuthentication, GitHubAppUserAuthentication, GitHubAppUserAuthenticationWithExpiration } from "@octokit/auth-oauth-app";
import { OAuthAppOctokit } from "./oauth-app-octokit";
export declare type ClientType = "oauth-app" | "github-app";
export declare type OAuthAppOctokitClassType = typeof OAuthAppOctokit;
export declare type Scope = string;
export declare type ClientId = string;
export declare type ClientSecret = string;
export declare type Token = string;
export declare type EventName = "token" | "authorization";
export declare type ActionName = "created" | "reset" | "deleted" | "refreshed" | "scoped";
export declare type EventAndActionName = "token" | "token.created" | "token.reset" | "token.refreshed" | "token.scoped" | "token.deleted" | "authorization" | "authorization.deleted";
declare type CommonOptions<TOctokit extends OAuthAppOctokitClassType> = {
    clientId?: ClientId;
    clientSecret?: ClientSecret;
    allowSignup?: boolean;
    baseUrl?: string;
    log?: typeof console;
    Octokit?: TOctokit;
};
export declare type Options<TClientType extends ClientType, TOctokit extends OAuthAppOctokitClassType = OAuthAppOctokitClassType> = TClientType extends "oauth-app" ? CommonOptions<TOctokit> & {
    clientType?: TClientType;
    defaultScopes?: Scope[];
} : CommonOptions<TOctokit> & {
    clientType?: TClientType;
};
export declare type ConstructorOptions<TOptions extends Options<ClientType>> = TOptions & {
    clientId: ClientId;
    clientSecret: ClientSecret;
};
export declare type OctokitTypeFromOptions<TOptions extends Options<ClientType>> = TOptions["Octokit"] extends typeof Octokit ? InstanceType<TOptions["Octokit"]> : Octokit;
export declare type OctokitClassTypeFromOptions<TOptions extends Options<ClientType>> = TOptions["Octokit"] extends typeof Octokit ? TOptions["Octokit"] : typeof Octokit;
export declare type ClientTypeFromOptions<TOptions extends Options<ClientType>> = TOptions["clientType"] extends "github-app" ? "github-app" : "oauth-app";
export declare type OctokitInstance = InstanceType<OAuthAppOctokitClassType>;
export declare type State = {
    clientType: ClientType;
    clientId: ClientId;
    clientSecret: ClientSecret;
    defaultScopes: Scope[];
    allowSignup?: boolean;
    baseUrl?: string;
    log?: typeof console;
    Octokit: OAuthAppOctokitClassType;
    octokit: OctokitInstance;
    eventHandlers: {
        [key: string]: EventHandler<Options<ClientType>>[];
    };
};
export declare type EventHandlerContext<TOptions extends Options<ClientType>> = ClientTypeFromOptions<TOptions> extends "oauth-app" ? {
    name: EventName;
    action: ActionName;
    token: Token;
    scopes?: Scope[];
    octokit: OctokitTypeFromOptions<TOptions>;
    authentication?: OAuthAppUserAuthentication | GitHubAppUserAuthentication | GitHubAppUserAuthenticationWithExpiration;
} : {
    name: EventName;
    action: ActionName;
    token: Token;
    octokit: OctokitTypeFromOptions<TOptions>;
    authentication?: GitHubAppUserAuthentication | GitHubAppUserAuthenticationWithExpiration;
};
export declare type EventHandler<TOptions extends Options<ClientType>> = (context: EventHandlerContext<TOptions>) => void;
export declare type AddEventHandler<TOptions extends Options<ClientType>> = (eventName: EventAndActionName | EventAndActionName[], eventHandler: EventHandler<TOptions>) => void;
export {};
