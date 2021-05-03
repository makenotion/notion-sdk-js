import { EmitterWebhookEvent, EmitterWebhookEventName, State, WebhookEventHandlerError } from "../types";
export declare function receiverOn(state: State, webhookNameOrNames: EmitterWebhookEventName | EmitterWebhookEventName[], handler: Function): void;
export declare function receiverOnAny(state: State, handler: (event: EmitterWebhookEvent) => any): void;
export declare function receiverOnError(state: State, handler: (event: WebhookEventHandlerError) => any): void;
