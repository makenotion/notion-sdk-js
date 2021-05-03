// https://github.com/isaacs/node-lru-cache#readme
import LRU from "lru-cache";
export function getCache() {
    return new LRU({
        // cache max. 15000 tokens, that will use less than 10mb memory
        max: 15000,
        // Cache for 1 minute less than GitHub expiry
        maxAge: 1000 * 60 * 59,
    });
}
export async function get(cache, options) {
    const cacheKey = optionsToCacheKey(options);
    const result = await cache.get(cacheKey);
    if (!result) {
        return;
    }
    const [token, createdAt, expiresAt, repositorySelection, permissionsString, singleFileName,] = result.split("|");
    const permissions = options.permissions ||
        permissionsString.split(/,/).reduce((permissions, string) => {
            if (/!$/.test(string)) {
                permissions[string.slice(0, -1)] = "write";
            }
            else {
                permissions[string] = "read";
            }
            return permissions;
        }, {});
    return {
        token,
        createdAt,
        expiresAt,
        permissions,
        repositoryIds: options.repositoryIds,
        singleFileName,
        repositorySelection: repositorySelection,
    };
}
export async function set(cache, options, data) {
    const key = optionsToCacheKey(options);
    const permissionsString = options.permissions
        ? ""
        : Object.keys(data.permissions)
            .map((name) => `${name}${data.permissions[name] === "write" ? "!" : ""}`)
            .join(",");
    const value = [
        data.token,
        data.createdAt,
        data.expiresAt,
        data.repositorySelection,
        permissionsString,
        data.singleFileName,
    ].join("|");
    await cache.set(key, value);
}
function optionsToCacheKey({ installationId, permissions = {}, repositoryIds = [], }) {
    const permissionsString = Object.keys(permissions)
        .sort()
        .map((name) => (permissions[name] === "read" ? name : `${name}!`))
        .join(",");
    const repositoryIdsString = repositoryIds.sort().join(",");
    return [installationId, repositoryIdsString, permissionsString]
        .filter(Boolean)
        .join("|");
}
