import type { EmitterWebhookEvent, State } from "../types";
export declare function receiverHandle(state: State, event: EmitterWebhookEvent): Promise<void>;
