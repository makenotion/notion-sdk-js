import LRU from "lru-cache";
import { InstallationAuthOptions, Cache, CacheData, InstallationAccessTokenData } from "./types";
export declare function getCache(): LRU<number, string>;
export declare function get(cache: Cache, options: InstallationAuthOptions): Promise<InstallationAccessTokenData | void>;
export declare function set(cache: Cache, options: InstallationAuthOptions, data: CacheData): Promise<void>;
