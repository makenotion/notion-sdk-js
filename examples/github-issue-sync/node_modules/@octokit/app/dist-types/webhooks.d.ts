import { Octokit } from "@octokit/core";
import { Webhooks, EmitterWebhookEvent } from "@octokit/webhooks";
import { Options } from "./types";
export declare function webhooks(appOctokit: Octokit, options: Required<Options>["webhooks"]): Webhooks<EmitterWebhookEvent & {
    octokit: Octokit;
}>;
