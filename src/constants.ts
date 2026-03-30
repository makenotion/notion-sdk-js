/**
 * Default base URL for the Notion API.
 */
export const DEFAULT_BASE_URL = "https://api.notion.com"

/**
 * Default request timeout in milliseconds (60 seconds).
 */
export const DEFAULT_TIMEOUT_MS = 60_000

/**
 * Default maximum number of retry attempts for failed requests.
 */
export const DEFAULT_MAX_RETRIES = 2

/**
 * Default initial delay between retries in milliseconds (1 second).
 * Used as the base for exponential back-off when the retry-after
 * header is absent.
 */
export const DEFAULT_INITIAL_RETRY_DELAY_MS = 1_000

/**
 * Default maximum delay between retries in milliseconds
 * (60 seconds). Caps both retry-after and exponential
 * back-off delays.
 */
export const DEFAULT_MAX_RETRY_DELAY_MS = 60_000

/**
 * The minimum width of a view column in pixels. Use this
 * with the views API to make a property column that appears
 * minimal / collapsed in the Notion app UI (e.g. a checkbox
 * or status-as-checkbox column).
 */
export const MIN_VIEW_COLUMN_WIDTH = 32
