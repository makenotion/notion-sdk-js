import { State, EventHandlerContext, ClientType, Options } from "./types";
export declare function emitEvent(state: State, context: EventHandlerContext<Options<ClientType>>): Promise<void>;
