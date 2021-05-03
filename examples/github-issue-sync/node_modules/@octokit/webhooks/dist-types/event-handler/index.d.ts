import type { EmitterWebhookEvent, EmitterWebhookEventName, HandlerFunction, Options, WebhookEventHandlerError } from "../types";
interface EventHandler<TTransformed> {
    on<E extends EmitterWebhookEventName>(event: E | E[], callback: HandlerFunction<E, TTransformed>): void;
    onAny(handler: (event: EmitterWebhookEvent) => any): void;
    onError(handler: (event: WebhookEventHandlerError) => any): void;
    removeListener<E extends EmitterWebhookEventName>(event: E | E[], callback: HandlerFunction<E, TTransformed>): void;
    receive(event: EmitterWebhookEvent): Promise<void>;
}
export declare function createEventHandler<TTransformed>(options: Options<TTransformed>): EventHandler<TTransformed>;
export {};
