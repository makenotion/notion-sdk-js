import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
export declare type Options = {
    appId?: number | string;
    privateKey?: string;
    webhooks?: {
        secret: string;
    };
    oauth?: {
        clientId: string;
        clientSecret: string;
        allowSignup?: boolean;
    };
    Octokit?: typeof Octokit;
    log?: {
        debug: (...data: any[]) => void;
        info: (...data: any[]) => void;
        warn: (...data: any[]) => void;
        error: (...data: any[]) => void;
    };
};
export declare type ConstructorOptions<TOptions extends Options> = TOptions & {
    appId: number | string;
    privateKey: string;
};
export declare type InstallationFunctionOptions<O> = {
    octokit: O;
    installation: Endpoints["GET /app/installations"]["response"]["data"][0];
};
export declare type EachInstallationFunction<O> = (options: InstallationFunctionOptions<O>) => unknown | Promise<unknown>;
export interface EachInstallationInterface<O> {
    (callback: EachInstallationFunction<O>): Promise<void>;
    iterator: () => AsyncIterable<InstallationFunctionOptions<O>>;
}
declare type EachRepositoryFunctionOptions<O> = {
    octokit: O;
    repository: Endpoints["GET /installation/repositories"]["response"]["data"]["repositories"][0];
};
export declare type EachRepositoryFunction<O> = (options: EachRepositoryFunctionOptions<O>) => unknown | Promise<unknown>;
export declare type EachRepositoryQuery = {
    installationId: number;
};
export interface EachRepositoryInterface<O> {
    (callback: EachRepositoryFunction<O>): Promise<void>;
    (query: EachRepositoryQuery, callback: EachRepositoryFunction<O>): Promise<void>;
    iterator: (query?: EachRepositoryQuery) => AsyncIterable<EachRepositoryFunctionOptions<O>>;
}
export interface GetInstallationOctokitInterface<O> {
    (installationId: number): Promise<O>;
}
export {};
