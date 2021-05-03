/**
 * Convert object keys to camel case
 */
declare function toCamelCase<T extends {}, S extends {}>(obj: T, ignored?: string[]): S;

export = toCamelCase;