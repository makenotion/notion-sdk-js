import { WebhookEvent } from "@octokit/webhooks-types";
declare type IncomingMessage = any;
export declare function getPayload(request: IncomingMessage): Promise<WebhookEvent>;
export {};
