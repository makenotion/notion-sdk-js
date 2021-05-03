import { Octokit } from "@octokit/core";
import { App } from "./index";
export declare function getInstallationOctokit(app: App, installationId: number): Promise<Octokit>;
