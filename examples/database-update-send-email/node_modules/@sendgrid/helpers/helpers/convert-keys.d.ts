/**
 * Helper to convert an object's keys
 */
declare function convertKeys<T extends {}, S extends {}>(obj: T, converter: (key: string) => string, ignored?: string[]): S;

export = convertKeys;