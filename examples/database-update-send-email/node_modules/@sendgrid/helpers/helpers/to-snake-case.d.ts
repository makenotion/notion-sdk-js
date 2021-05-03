/**
 * Convert object keys to snake case
 */
declare function toSnakeCase<T extends {}, S extends {}>(obj: T, ignored?: string[]): S;

export = toSnakeCase;