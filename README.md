# Notion SDK for JavaScript

<img alt="Notion Logo" src="https://www.notion.so/images/notion-logo-block-main.svg" width="70" />

**A simple and easy to use client for the [Notion API](https://developers.notion.com).**

![Build status](https://github.com/makenotion/notion-sdk-js/actions/workflows/ci.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40notionhq%2Fclient.svg)](https://www.npmjs.com/package/@notionhq/client)

## Installation

```bash
npm install @notionhq/client
```

[![Open Val Town Template](https://stevekrouse-badge.web.val.run/?3)](https://www.val.town/v/charmaine/NotionJsSDK)

## Usage

> [!NOTE]
> Use Notion's [Getting Started Guide](https://developers.notion.com/docs/getting-started) to get set up to use Notion's API.

Import and initialize a client using an **integration token** or an OAuth **access token**.

```js
const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
```

Make a request to any Notion API endpoint.

```js
;(async () => {
  const listUsersResponse = await notion.users.list({})
})()
```

> [!NOTE]
> See the complete list of endpoints in the [API reference](https://developers.notion.com/reference).

Each method returns a `Promise` that resolves the response.

```js
console.log(listUsersResponse)
```

```ts
{
  results: [
    {
      object: "user",
      id: "d40e767c-d7af-4b18-a86d-55c61f1e39a4",
      type: "person",
      person: {
        email: "avo@example.org",
      },
      name: "Avocado Lovelace",
      avatar_url:
        "https://secure.notion-static.com/e6a352a8-8381-44d0-a1dc-9ed80e62b53d.jpg",
    },
    // ...
  ]
}
```

Endpoint parameters are grouped into a single object. You don't need to remember which parameters go in the path, query, or body.

```js
const myPage = await notion.dataSources.query({
  data_source_id: "897e5a76-ae52-4b48-9fdf-e71f5945d1af",
  filter: {
    property: "Landmark",
    rich_text: {
      contains: "Bridge",
    },
  },
})
```

### Handling errors

If the API returns an unsuccessful response, the returned `Promise` rejects with a `APIResponseError`.

The error contains properties from the response, and the most helpful is `code`. You can compare `code` to the values in the `APIErrorCode` object to avoid misspelling error codes.

```js
const { Client, APIErrorCode } = require("@notionhq/client")

try {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const myPage = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Landmark",
      rich_text: {
        contains: "Bridge",
      },
    },
  })
} catch (error) {
  if (error.code === APIErrorCode.ObjectNotFound) {
    //
    // For example: handle by asking the user to select a different data source
    //
  } else {
    // Other error handling code
    console.error(error)
  }
}
```

### Logging

The client emits useful information to a logger. By default, it only emits warnings and errors.

If you're debugging an application, and would like the client to log response bodies, set the `logLevel` option to `LogLevel.DEBUG`.

```js
const { Client, LogLevel } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
})
```

You may also set a custom `logger` to emit logs to a destination other than `stdout`. A custom logger is a function which is called with 3 parameters: `logLevel`, `message`, and `extraInfo`. The custom logger should not return a value.

### Client options

The `Client` supports the following options on initialization. These options are all keys in the single constructor parameter.

| Option      | Default value               | Type           | Description                                                                                                                                                         |
| ----------- | --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auth`      | `undefined`                 | `string`       | Bearer token for authentication. If left undefined, the `auth` parameter should be set on each request.                                                             |
| `logLevel`  | `LogLevel.WARN`             | `LogLevel`     | Verbosity of logs the instance will produce. By default, logs are written to `stdout`.                                                                              |
| `timeoutMs` | `DEFAULT_TIMEOUT_MS`        | `number`       | Number of milliseconds to wait before emitting a `RequestTimeoutError`                                                                                              |
| `baseUrl`   | `DEFAULT_BASE_URL`          | `string`       | The root URL for sending API requests. This can be changed to test with a mock server.                                                                              |
| `logger`    | Log to console              | `Logger`       | A custom logging function. This function is only called when the client emits a log that is equal or greater severity than `logLevel`.                              |
| `agent`     | Default node agent          | `http.Agent`   | Used to control creation of TCP sockets. A common use is to proxy requests with [`https-proxy-agent`](https://github.com/TooTallNate/node-https-proxy-agent)        |
| `retry`     | See [constants](#constants) | `RetryOptions` | Configuration for automatic retries on rate limits (429), service overloads (529), and server errors (500, 503). See [Automatic retries](#automatic-retries) below. |

### Automatic retries

The client automatically retries requests that fail due to rate limiting or transient server errors. By default, it will retry up to 2 times using exponential back-off with jitter.

**Retryable errors:**

- `rate_limited` (HTTP 429) - Too many requests; retried for all HTTP methods
- `service_overload` (HTTP 529) - Service overloaded; retried for all HTTP methods
- `internal_server_error` (HTTP 500) - Server error; retried only for GET and DELETE
- `service_unavailable` (HTTP 503) - Service temporarily unavailable; retried only for GET and DELETE

Server errors (500, 503) are only retried for idempotent HTTP methods (GET, DELETE) to avoid duplicate side effects. Rate limits (429) and service overloads (529) are retried for all methods since the server explicitly asks clients to retry.

**Retry behavior:**

- Uses exponential back-off: delays increase with each retry attempt
- Respects the `Retry-After` header when present (both delta-seconds and HTTP-date formats)
- Adds random jitter to prevent thundering herd problems

**Configuration:**

```js
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  retry: {
    maxRetries: 5, // Maximum retry attempts (default: 2)
    initialRetryDelayMs: 500, // Initial delay between retries (default: 1000ms)
    maxRetryDelayMs: 60000, // Maximum delay between retries (default: 60000ms)
  },
})
```

To disable automatic retries:

```js
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  retry: false,
})
```

### Constants

The SDK exports named constants for all default values used by the client, as well as useful Notion-specific values. You can import them directly:

```js
const {
  DEFAULT_BASE_URL, // "https://api.notion.com"
  DEFAULT_TIMEOUT_MS, // 60_000
  DEFAULT_MAX_RETRIES, // 2
  DEFAULT_INITIAL_RETRY_DELAY_MS, // 1_000
  DEFAULT_MAX_RETRY_DELAY_MS, // 60_000
  MIN_VIEW_COLUMN_WIDTH, // 32
} = require("@notionhq/client")
```

`MIN_VIEW_COLUMN_WIDTH` is the minimum width (in pixels) that a table column can have in the Notion UI. Set a property's `width` to this value when creating or updating a view to make a column appear collapsed -- useful for checkbox or status-as-checkbox columns:

```js
await notion.views.create({
  database_id: databaseId,
  name: "My view",
  type: "table",
  configuration: {
    table: {
      properties: [
        {
          property_id: checkboxPropId,
          visible: true,
          width: MIN_VIEW_COLUMN_WIDTH,
        },
      ],
    },
  },
})
```

### TypeScript

This package contains type definitions for all request parameters and responses,
as well as some useful sub-objects from those entities.

Because errors in TypeScript start with type `any` or `unknown`, you should use
the `isNotionClientError` type guard to handle them in a type-safe way. Each
`NotionClientError` type is uniquely identified by its `error.code`. Codes in
the `APIErrorCode` enum are returned from the server. Codes in the
`ClientErrorCode` enum are produced on the client.

```ts
try {
  const response = await notion.dataSources.query({
    /* ... */
  })
} catch (error: unknown) {
  if (isNotionClientError(error)) {
    // error is now strongly typed to NotionClientError
    switch (error.code) {
      case ClientErrorCode.RequestTimeout:
        // ...
        break
      case APIErrorCode.ObjectNotFound:
        // ...
        break
      case APIErrorCode.Unauthorized:
        // ...
        break
      // ...
      default:
        // you could even take advantage of exhaustiveness checking
        assertNever(error.code)
    }
  }
}
```

#### Type guards

There are several [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)
provided to distinguish between full and partial API responses.

| Type guard function      | Purpose                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `isFullPage`             | Determine whether an object is a full `PageObjectResponse`                               |
| `isFullBlock`            | Determine whether an object is a full `BlockObjectResponse`                              |
| `isFullDataSource`       | Determine whether an object is a full `DataSourceObjectResponse`                         |
| `isFullPageOrDataSource` | Determine whether an object is a full `PageObjectResponse` or `DataSourceObjectResponse` |
| `isFullUser`             | Determine whether an object is a full `UserObjectResponse`                               |
| `isFullComment`          | Determine whether an object is a full `CommentObjectResponse`                            |

Here is an example of using a type guard:

```typescript
const fullOrPartialPages = await notion.dataSources.query({
  data_source_id: "897e5a76-ae52-4b48-9fdf-e71f5945d1af",
})
for (const page of fullOrPartialPages.results) {
  if (!isFullPageOrDataSource(page)) {
    continue
  }
  // The page variable has been narrowed from
  //      PageObjectResponse | PartialPageObjectResponse | DataSourceObjectResponse | PartialDataSourceObjectResponse
  // to
  //      PageObjectResponse | DataSourceObjectResponse.
  console.log("Created at:", page.created_time)
}
```

### Utility functions

This package also exports a few utility functions that are helpful for dealing with
any of our paginated APIs.

#### `iteratePaginatedAPI(listFn, firstPageArgs)`

This utility turns any paginated API into an async iterator.

**Parameters:**

- `listFn`: Any function on the Notion client that represents a paginated API (i.e. accepts
  `start_cursor`.) Example: `notion.blocks.children.list`.
- `firstPageArgs`: Arguments that should be passed to the API on the first and subsequent calls
  to the API, for example a `block_id`.

**Returns:**

An [async iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols)
over results from the API.

**Example:**

```javascript
for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
  block_id: parentBlockId,
})) {
  // Do something with block.
}
```

#### `collectPaginatedAPI(listFn, firstPageArgs)`

This utility accepts the same arguments as `iteratePaginatedAPI`, but collects
the results into an in-memory array.

Before using this utility, check that the data you are dealing with is
small enough to fit in memory.

**Parameters:**

- `listFn`: Any function on the Notion client that represents a paginated API (i.e. accepts
  `start_cursor`.) Example: `notion.blocks.children.list`.
- `firstPageArgs`: Arguments that should be passed to the API on the first and subsequent calls
  to the API, for example a `block_id`.

**Returns:**

An array with results from the API.

**Example:**

```javascript
const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
  block_id: parentBlockId,
})
// Do something with blocks.
```

#### `iterateAllDataSourceRows(client, args)`

A single data source query (one filter and sort) returns at most a fixed number
of rows, 10,000 by default. Once that limit is reached, `has_more` becomes
`false` and the response carries `request_status.type === "incomplete"`. Plain
pagination such as `iteratePaginatedAPI` stops there and silently misses the rest
of a larger data source.

This utility reads every row anyway. It partitions the data source into
`created_time` windows: it sorts by `created_time` ascending, and whenever a
window hits the limit it starts a fresh query from the last row's timestamp.
Each fresh query has a different filter, so it gets its own result budget. Rows
that share a boundary timestamp are de-duplicated by id, so every row is yielded
exactly once.

`created_time` is used because it never changes. `last_edited_time` would shift
rows between windows as they are edited, causing gaps or duplicates.

**Parameters:**

- `client`: A Notion client instance.
- `args`: The same arguments as `dataSources.query`, minus the fields the helper
  controls: `start_cursor` (pagination is automatic) and `sorts` (set to
  `created_time` ascending to partition). `data_source_id` is required. Any
  `filter` you pass is combined with the window bound using `and`.

**Returns:**

An async iterator over every row in the data source.

**Throws:**

If a single `created_time` value holds more rows than the limit, the window
cannot be narrowed by time alone. Pass a `filter` in that case so each window
stays under the limit.

**Example:**

```javascript
for await (const row of iterateAllDataSourceRows(notion, {
  data_source_id: dataSourceId,
})) {
  // Do something with row.
}
```

#### `collectAllDataSourceRows(client, args)`

This utility accepts the same arguments as `iterateAllDataSourceRows`, but
collects the results into an in-memory array.

Before using this utility, check that the full data source fits in memory. For
very large data sources, prefer `iterateAllDataSourceRows` and process rows as
they stream.

**Parameters:**

- `client`: A Notion client instance.
- `args`: The same arguments as `iterateAllDataSourceRows`.

**Returns:**

An array with every row in the data source.

**Example:**

```javascript
const rows = await collectAllDataSourceRows(notion, {
  data_source_id: dataSourceId,
})
// Do something with rows.
```

### Custom requests

To make requests directly to a Notion API endpoint instead of using the pre-built families of methods, call the `request()` method. For example:

```ts
// POST /v1/comments
const response = await notion.request({
  path: "comments",
  method: "post",
  body: {
    parent: { page_id: "5c6a28216bb14a7eb6e1c50111515c3d" },
    rich_text: [{ text: { content: "Hello, world!" } }],
  },
  // No `query` params in this example, only `body`.
})

console.log(JSON.stringify(response, null, 2))
```

The `notion.request<ResponseBody>({...})` method is generic; `ResponseBody` represents the expected type of response object Notion returns for the endpoint you're calling (we don't validate this at runtime; you can pass anything!)

> [!TIP]
> Usually, making custom requests with `notion.request()` isn't necessary, but can be helpful in some cases, e.g. when upgrading your [Notion API version](https://developers.notion.com/reference/versioning) incrementally before upgrading your SDK version. For example, if there's a new or renamed endpoint in the new API version that isn't yet available to call via a dedicated method on `Client`.
>
> In the above example, the simpler approach is to use `await notion.comments.create()`.

Another customization you can make is to pass your own `fetch` function to the `Client` constructor. This might be helpful for some execution environments where the default, built-in `fetch` isn't suitable.

### Verifying webhook signatures

If your integration receives [Notion webhook deliveries](https://developers.notion.com/reference/webhooks), use `verifyWebhookSignature` to confirm each request was sent by Notion and was not tampered with in transit. Notion signs every delivery with HMAC-SHA256 over the raw request body using the subscription's verification token, and places the result in the `X-Notion-Signature` header as `sha256=<hex>`.

```ts
import { verifyWebhookSignature } from "@notionhq/client"

// Express example. The body must be read as the raw text/bytes that
// arrived over the wire — JSON-parsed and re-serialized bodies will not
// verify, because re-serialization changes whitespace and key order.
app.post(
  "/notion-webhook",
  express.text({ type: "application/json" }),
  async (req, res) => {
    const ok = await verifyWebhookSignature({
      body: req.body,
      signature: req.header("x-notion-signature"),
      verificationToken: process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN!,
    })
    if (!ok) {
      return res.status(401).send("invalid signature")
    }

    const event = JSON.parse(req.body)
    // …handle the event
    res.status(200).send("ok")
  }
)
```

The same helper handles the initial verification handshake that Notion sends when you first register a webhook URL — the handshake body (`{ "verification_token": "..." }`) is signed with the same token, so a single code path covers both cases.

`signWebhookPayload({ body, verificationToken })` produces the same `sha256=<hex>` header value, which is useful for unit-testing your webhook handler without standing up a real subscription.

> [!NOTE]
> Both helpers are async. They prefer the Web Crypto API (`globalThis.crypto.subtle`) when present and transparently fall back to `node:crypto` on older Node.js 18 builds, so they run unchanged on Node.js, Bun, Deno, Vercel Edge Functions, Cloudflare Workers, and modern browsers.

## Examples

For sample code and example projects, see [notion-cookbook](https://github.com/makenotion/notion-cookbook/tree/main/examples).

## Requirements and compatibility

This package supports the following minimum versions:

- Runtime: `node >= 18`
- Type definitions (optional): `typescript >= 5.9`

Earlier versions may still work, but we encourage people building new applications to upgrade to the current stable.

In some cases, due to backwards-incompatible changes across [Notion API versions](https://developers.notion.com/reference/versioning), more recent versions of this SDK don't work well with older API versions:

| Version of JS/TS SDK | Minimum recommended API version |
| -------------------- | ------------------------------- |
| v4.0.0 and above     | 2022-06-28                      |
| v5.0.0 and above     | 2025-09-03                      |

This SDK supports both `2025-09-03` and `2026-03-11` API versions. The default is `2025-09-03`. To use the newer version, pass it when constructing the client:

```js
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2026-03-11",
})
```

Key changes in `2026-03-11`:

- **Block positioning**: The `after` parameter on `appendBlockChildren` is replaced by `position`, which supports `after_block`, `start`, and `end`.
- **Trash status**: The `archived` field is replaced by `in_trash` on pages, blocks, databases, and data sources.
- **Block type rename**: The `transcription` block type is renamed to `meeting_notes`.

Both the old and new field names are available in the SDK's TypeScript types for a smooth migration. Fields from the older version are marked `@deprecated`.

In these cases, we recommend upgrading your Notion API version header using the `Client()` constructor across all of your requests before upgrading to a newer version of the SDK.

## Contributing

While we value open-source contributions to this SDK, most of the client code is generated programmatically from the Notion API specification. Additions made directly to `src/api-endpoints.ts` or other generated code would be overwritten upon the next release.

If you'd like to contribute a feature or fix to the SDK's core functionality, we suggest opening an issue first to discuss it with us. This helps ensure your effort aligns with how the SDK is maintained.

However, contributions to documentation (including this README), examples, and bug reports are always welcome and greatly appreciated!

## Getting help

If you want to submit a feature request for Notion's API, or are experiencing any issues with the API platform, please email us at `developers@makenotion.com`.

To report issues with the SDK, it is possible to [submit an issue](https://github.com/makenotion/notion-sdk-js/issues) to this repo. However, we don't monitor these issues very closely. We recommend you reach out to us at `developers@makenotion.com` instead.
