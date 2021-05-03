import { Octokit as OctokitCore } from "@octokit/core";
import { OAuthApp } from "@octokit/oauth-app";
import { Webhooks } from "@octokit/webhooks";
import { Options, ConstructorOptions, EachInstallationInterface, EachRepositoryInterface, GetInstallationOctokitInterface } from "./types";
declare type Constructor<T> = new (...args: any[]) => T;
declare type OctokitType<TOptions extends Options> = TOptions["Octokit"] extends typeof OctokitCore ? InstanceType<TOptions["Octokit"]> : OctokitCore;
declare type OctokitClassType<TOptions extends Options> = TOptions["Octokit"] extends typeof OctokitCore ? TOptions["Octokit"] : typeof OctokitCore;
export declare class App<TOptions extends Options = Options> {
    static VERSION: string;
    static defaults<TDefaults extends Options, S extends Constructor<App<TDefaults>>>(this: S, defaults: Partial<TDefaults>): {
        new (...args: any[]): {
            octokit: OctokitType<TDefaults>;
            webhooks: Webhooks<{
                octokit: OctokitType<TDefaults>;
            }>;
            oauth: OAuthApp<{
                clientType: "github-app";
                Octokit: OctokitClassType<TDefaults>;
            }>;
            getInstallationOctokit: GetInstallationOctokitInterface<OctokitType<TDefaults>>;
            eachInstallation: EachInstallationInterface<OctokitType<TDefaults>>;
            eachRepository: EachRepositoryInterface<OctokitType<TDefaults>>;
            log: {
                [key: string]: unknown;
                debug: (message: string, additionalInfo?: object | undefined) => void;
                info: (message: string, additionalInfo?: object | undefined) => void;
                warn: (message: string, additionalInfo?: object | undefined) => void;
                error: (message: string, additionalInfo?: object | undefined) => void;
            };
        };
    } & S;
    octokit: OctokitType<TOptions>;
    webhooks: Webhooks<{
        octokit: OctokitType<TOptions>;
    }>;
    oauth: OAuthApp<{
        clientType: "github-app";
        Octokit: OctokitClassType<TOptions>;
    }>;
    getInstallationOctokit: GetInstallationOctokitInterface<OctokitType<TOptions>>;
    eachInstallation: EachInstallationInterface<OctokitType<TOptions>>;
    eachRepository: EachRepositoryInterface<OctokitType<TOptions>>;
    log: {
        debug: (message: string, additionalInfo?: object) => void;
        info: (message: string, additionalInfo?: object) => void;
        warn: (message: string, additionalInfo?: object) => void;
        error: (message: string, additionalInfo?: object) => void;
        [key: string]: unknown;
    };
    constructor(options: ConstructorOptions<TOptions>);
}
export { createNodeMiddleware } from "./middleware/node/index";
