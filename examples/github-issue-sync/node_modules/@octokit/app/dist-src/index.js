import { Octokit as OctokitCore } from "@octokit/core";
import { createAppAuth } from "@octokit/auth-app";
import { OAuthApp } from "@octokit/oauth-app";
import { VERSION } from "./version";
import { webhooks } from "./webhooks";
import { eachInstallationFactory } from "./each-installation";
import { eachRepositoryFactory } from "./each-repository";
import { getInstallationOctokit } from "./get-installation-octokit";
export class App {
    constructor(options) {
        const Octokit = (options.Octokit ||
            OctokitCore);
        const authOptions = Object.assign({
            appId: options.appId,
            privateKey: options.privateKey,
        }, options.oauth
            ? {
                clientId: options.oauth.clientId,
                clientSecret: options.oauth.clientSecret,
            }
            : {});
        this.octokit = new Octokit({
            authStrategy: createAppAuth,
            auth: authOptions,
            log: options.log,
        });
        this.log = Object.assign({
            debug: () => { },
            info: () => { },
            warn: console.warn.bind(console),
            error: console.error.bind(console),
        }, options.log);
        // set app.webhooks depending on whether "webhooks" option has been passed
        if (options.webhooks) {
            // @ts-expect-error TODO: figure this out
            this.webhooks = webhooks(this.octokit, options.webhooks);
        }
        else {
            Object.defineProperty(this, "webhooks", {
                get() {
                    throw new Error("[@octokit/app] webhooks option not set");
                },
            });
        }
        // set app.oauth depending on whether "oauth" option has been passed
        if (options.oauth) {
            this.oauth = new OAuthApp({
                ...options.oauth,
                clientType: "github-app",
                Octokit,
            });
        }
        else {
            Object.defineProperty(this, "oauth", {
                get() {
                    throw new Error("[@octokit/app] oauth.clientId / oauth.clientSecret options are not set");
                },
            });
        }
        this.getInstallationOctokit = getInstallationOctokit.bind(null, this);
        this.eachInstallation = eachInstallationFactory(this);
        this.eachRepository = eachRepositoryFactory(this);
    }
    static defaults(defaults) {
        const AppWithDefaults = class extends this {
            constructor(...args) {
                super({
                    ...defaults,
                    ...args[0],
                });
            }
        };
        return AppWithDefaults;
    }
}
App.VERSION = VERSION;
export { createNodeMiddleware } from "./middleware/node/index";
