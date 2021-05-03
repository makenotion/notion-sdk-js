import { AppAuthentication, State } from "./types";
export declare function getAppAuthentication({ appId, privateKey, timeDifference, }: State & {
    timeDifference?: number;
}): Promise<AppAuthentication>;
