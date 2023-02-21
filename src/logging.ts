import { assertNever } from "./utils.ts"

export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export interface Logger {
  (level: LogLevel, message: string, extraInfo: Record<string, unknown>): void
}

export function makeConsoleLogger(name: string): Logger {
  return (level, message, extraInfo) => {
    console[level](`${name} ${level}:`, message, extraInfo)
  }
}

/**
 * Transforms a log level into a comparable (numerical) value ordered by severity.
 */
export function logLevelSeverity(level: LogLevel): number {
  switch (level) {
    case LogLevel.DEBUG:
      return 20
    case LogLevel.INFO:
      return 40
    case LogLevel.WARN:
      return 60
    case LogLevel.ERROR:
      return 80
    default:
      return assertNever(level)
  }
}
