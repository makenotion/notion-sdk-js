# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Official Notion SDK for JavaScript - a TypeScript client library providing type-safe access to the Notion API.

- **Package**: `@notionhq/client`
- **Target Runtime**: Node.js ≥ 18
- **TypeScript**: ≥ 5.9
- **Build System**: TypeScript compiler (tsc)
- **Test Framework**: Jest with ts-jest

## Development Commands

### Building

```bash
npm run build          # Runs: npm run clean && tsc
npm run clean          # Remove build/ directory
```

### Testing

```bash
npm test               # Run all tests in test/
```

To run a single test file:

```bash
npx jest test/helpers.test.ts
```

### Linting and Formatting

```bash
npm run lint           # Runs prettier, eslint, and cspell
npm run prettier       # Format code with prettier
```

### Examples

```bash
npm run install:examples     # Install dependencies for all example projects
npm run examples:typecheck   # Type-check all examples
```

## Code Architecture

### Client Structure

The SDK is organized around a central `Client` class (src/Client.ts) that exposes namespaced endpoints:

- `client.blocks` - Block CRUD operations and children management
- `client.databases` - Database CRUD operations
- `client.dataSources` - Data source operations and querying
- `client.pages` - Page CRUD operations and property retrieval
- `client.users` - User listing and retrieval
- `client.comments` - Comment CRUD operations
- `client.fileUploads` - File upload lifecycle (create, send, complete, list)
- `client.oauth` - OAuth token, introspect, and revoke operations
- `client.search()` - Search across workspace

Each endpoint namespace contains methods like `retrieve`, `create`, `update`, `delete`, and `list` as appropriate. Child resources use nested objects (e.g., `client.blocks.children.list()`).

### Request Flow

All API calls flow through `Client.request()` which:

1. Constructs the full URL from `baseUrl` + `path`
2. Validates path against traversal attacks
3. Adds authentication headers (from client-level `auth` or request-level override)
4. Sets `Notion-Version` header (defaults to "2025-09-03")
5. Handles request timeout (default 60s)
6. Automatically retries on transient errors (rate limits, server errors)
7. Processes response or throws typed errors

### Retry Behavior

The client automatically retries failed requests for these error codes:

- `rate_limited` (HTTP 429) - retried for all HTTP methods; respects `retry-after` header if present
- `internal_server_error` (HTTP 500) - retried only for idempotent methods (GET, DELETE)
- `service_unavailable` (HTTP 503) - retried only for idempotent methods (GET, DELETE)

Server errors (500, 503) are only retried for idempotent methods to avoid duplicate side effects. Rate limits (429) are retried for all methods since the server explicitly asks clients to retry.

Configuration via `ClientOptions.retry`:

```typescript
const client = new Client({
  auth: "secret_...",
  retry: {
    maxRetries: 2, // Default: 2 retry attempts
    initialRetryDelayMs: 1000, // Default: 1 second base delay
    maxRetryDelayMs: 60000, // Default: 60 second cap
  },
})

// Or disable retries entirely:
const client = new Client({ auth: "secret_...", retry: false })
```

When `retry-after` header is present, the client waits for that duration (capped by `maxRetryDelayMs`). Otherwise, it uses exponential back-off with jitter.

### Type System

**Generated Types** (`src/api-endpoints.ts`):

- **DO NOT EDIT** - This file is auto-generated from the Notion API specification
- Contains all request/response types and endpoint definitions
- Each endpoint exports: `Parameters`, `Response` types, and a descriptor with `path`, `method`, `queryParams`, `bodyParams`

**Type Guards** (`src/type-utils.ts` and `src/helpers.ts`):

- `isFullPage()`, `isFullBlock()`, `isFullDataSource()`, `isFullUser()`, `isFullComment()`
- `isFullPageOrDataSource()` - handles union types
- `isNotionClientError()` - for error handling

**ID Extraction** (`src/helpers.ts`):

- `extractNotionId()`, `extractPageId()`, `extractDatabaseId()`, `extractBlockId()`
- Extract IDs from Notion URLs or format raw IDs

### Error Handling

Four error types (all in `src/errors.ts`):

- `APIResponseError` - HTTP errors from Notion API with error codes from `APIErrorCode`
- `RequestTimeoutError` - Request exceeded timeout
- `UnknownHTTPResponseError` - Unexpected HTTP responses
- `InvalidPathParameterError` - Path contains traversal sequences

Error codes are in two enums:

- `APIErrorCode` - Server-side errors (unauthorized, rate_limited, object_not_found, etc.)
- `ClientErrorCode` - Client-side errors (request_timeout, response_error, invalid_path_parameter)

Type guards for error handling:

- `isNotionClientError(error)` - Check if error is any SDK error
- `isHTTPResponseError(error)` - Check if error is an HTTP response error (has status, headers, body)
- `APIResponseError.isAPIResponseError(error)` - Check for API-specific errors

### Pagination

Two utilities in `src/helpers.ts`:

- `iteratePaginatedAPI()` - Async iterator for memory-efficient pagination
- `collectPaginatedAPI()` - Collects all results into array (use for small datasets)

Both accept a list function and parameters, automatically handling `start_cursor`/`next_cursor`.

### Logging

Configurable logging system (`src/logging.ts`):

- Four levels: DEBUG, INFO, WARN, ERROR (via `LogLevel` enum)
- Default: WARN level to console
- Custom loggers via `logger` option (receives level, message, extraInfo)
- Debug mode logs full request/response bodies

## Important Constraints

### DO NOT EDIT

- `src/api-endpoints.ts` - Auto-generated from API spec (see file header)
- `build/` directory - Compiled output

### Code Style

- **NO semicolons** (enforced by Prettier)
- **NO redundant comments** - Only add comments explaining "why", not "what"
- **NO `as any`** - Use type guards from `src/type-utils.ts`
- Comment length: max 80 characters per line
- Use CommonJS (`require`/`module.exports`) not ES6 imports

### Spelling Checks (cspell)

The linter runs cspell for spell checking. Avoid non-dictionary terms in code:

- Use "back-off" instead of "back off" (single word)
- Use "parsable" instead of "parse able" variants
- Prefer standard English words in method names and comments

### Testing Requirements

- Always run `npm run build && npm test` before committing
- Add tests for new functionality in `test/`
- CI validates on Node.js 18, 19, 20, 22

### Publishing Workflow

```bash
npm run prepublishOnly  # Runs: checkLoggedIn && lint && test
```

## Key Files

- `src/Client.ts` - Main client implementation with all endpoint namespaces and retry logic
- `src/index.ts` - Public API surface (all exports)
- `src/api-endpoints.ts` - Generated API types and endpoint descriptors
- `src/errors.ts` - Error types and error handling utilities
- `src/helpers.ts` - Pagination utilities and type guards
- `src/type-utils.ts` - TypeScript type guards and utilities
- `src/logging.ts` - Logging system
- `src/utils.ts` - Internal utilities (pick, isObject)
- `src/fetch-types.ts` - Fetch API type definitions (uses `unknown` for headers to support various fetch implementations)

## Making Changes

### Adding New Functionality

1. Implement in appropriate source file
2. Add exports to `src/index.ts`
3. Add tests in `test/`
4. Run `npm run build && npm test`
5. Run `npm run lint` to validate formatting and spelling

### Working with API Endpoints

- API endpoint changes must come from upstream (api-endpoints.ts is generated)
- New endpoint types are automatically available once api-endpoints.ts is regenerated
- Wire up new endpoints in Client.ts following existing patterns

### Type Guards

If adding response type discriminators, add type guard functions to `src/helpers.ts` following the `isFullX()` pattern and export from `src/index.ts`.
