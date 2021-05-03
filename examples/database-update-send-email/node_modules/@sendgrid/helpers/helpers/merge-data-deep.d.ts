/**
 * Merge data deep helper
 */
declare function mergeDataDeep<T, S>(base: T, data: S): T & S;

export = mergeDataDeep;