import { EventHandler, EventAndActionName, State, ClientType, Options } from "./types";
export declare function addEventHandler(state: State, eventName: EventAndActionName | EventAndActionName[], eventHandler: EventHandler<Options<ClientType>>): void;
