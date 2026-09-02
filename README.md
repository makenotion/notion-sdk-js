# Notion SDK for JavaScript

<img alt="Notion logo" src="https://mcp.notion.com/notion-logo-block-sticker.svg" width="70" />

A JavaScript and TypeScript client for the [Notion API](https://developers.notion.com). This reference covers the SDK's methods, options, and helpers.

![Build status](https://github.com/makenotion/notion-sdk-js/actions/workflows/ci.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40notionhq%2Fclient.svg)](https://www.npmjs.com/package/@notionhq/client)

## Installation

```bash
npm install @notionhq/client
```

[![Open Val Town Template](https://stevekrouse-badge.web.val.run/?3)](https://www.val.town/v/charmaine/NotionJsSDK)

## Usage

> [!NOTE]
> For setup steps, see Notion's [getting started guide](https://developers.notion.com/docs/getting-started).

`Client` accepts an integration token or an OAuth access token.

```js
const { Client } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
```

Make a request to any Notion API endpoint.

```js
;(async () => {
  const listUsersResponse = await notion.users.list({})
  console.log(listUsersResponse)
})()
```

> [!NOTE]
> See the complete list of endpoints in the [API reference](https://developers.notion.com/reference).

Request methods return a `Promise` with the response. For example:

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

Notion API errors reject the request with an `APIResponseError`. The `code` property identifies the error. `APIErrorCode` contains the known server error codes.

```js
const {
  Client,
  APIErrorCode,
  isNotionClientError,
} = require("@notionhq/client")

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
  if (
    isNotionClientError(error) &&
    error.code === APIErrorCode.ObjectNotFound
  ) {
    // Ask the user to select a different data source.
  } else {
    // Other error handling code
    console.error(error)
  }
}
```

### Logging

The default logger writes warnings and errors to the console. `LogLevel.DEBUG` also logs response bodies.

```js
const { Client, LogLevel } = require("@notionhq/client")

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  logLevel: LogLevel.DEBUG,
})
```

A custom `logger` receives `logLevel`, `message`, and `extraInfo`. It should return no value.

### Client options

The `Client` constructor accepts one options object.

| Option                    | Default value               | Type           | Description                                                                                                                                                         |
| ------------------------- | --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auth`                    | `undefined`                 | `string`       | Bearer token for authentication. If left undefined, the `auth` parameter should be set on each request.                                                             |
| `logLevel`                | `LogLevel.WARN`             | `LogLevel`     | Verbosity of logs the instance will produce. By default, logs are written to `stdout`.                                                                              |
| `timeoutMs`               | `DEFAULT_TIMEOUT_MS`        | `number`       | Number of milliseconds to wait before emitting a `RequestTimeoutError`                                                                                              |
| `baseUrl`                 | `DEFAULT_BASE_URL`          | `string`       | The root URL for sending API requests. This can be changed to test with a mock server.                                                                              |
| `logger`                  | Log to console              | `Logger`       | A custom logging function. This function is only called when the client emits a log that is equal or greater severity than `logLevel`.                              |
| `agent`                   | Default node agent          | `http.Agent`   | Used to control creation of TCP sockets. A common use is to proxy requests with [`https-proxy-agent`](https://github.com/TooTallNate/node-https-proxy-agent)        |
| `retry`                   | See [constants](#constants) | `RetryOptions` | Configuration for automatic retries on rate limits (429), service overloads (529), and server errors (500, 503). See [Automatic retries](#automatic-retries) below. |
| `dangerouslyAllowBrowser` | `false`                     | `boolean`      | Confirms you mean to hold a token inside a browser page and silences the warning the client logs in that case. See [Browser usage](#browser-usage) below.           |

### Browser usage

The Notion API sends CORS headers, so browser code can call `api.notion.com` directly. The client works in modern browsers with the built-in `fetch`.

A token in a web page isn't a secret. Anyone who can load the page can read it and act as your integration.

- For an app other people use, keep the token on a server. Use a public integration with OAuth, exchange the authorization code on your server, and send the page only the data it needs.
- For a personal tool or a local page that only you can open, using a token directly is your own risk to accept.

The client logs a warning when you construct it with `auth` inside a browser page. Pass `dangerouslyAllowBrowser: true` to confirm you understand the risk and silence the warning.

```js
const notion = new Client({
  auth: tokenTypedIntoYourOwnPage,
  dangerouslyAllowBrowser: true,
})
```

A token passed per request through `auth` triggers the same warning once per client. Web workers and service workers count as a browser too, because every visitor downloads their script. Test runners that emulate a browser, such as jsdom, also trigger the warning. In tests, pass `dangerouslyAllowBrowser: true` or set `logLevel` to `LogLevel.ERROR`. The `agent` option is ignored in browsers. OAuth token endpoints under `/v1/oauth/` don't send CORS headers, so exchange authorization codes on a server.

### Automatic retries

The client retries failed requests up to 2 times by default. Delays increase with each retry and include a random offset.

Retried errors:

- `rate_limited` (HTTP 429) - Too many requests; retried for all HTTP methods
- `service_overload` (HTTP 529) - Service overloaded; retried for all HTTP methods
- `internal_server_error` (HTTP 500) - Server error; retried only for GET and DELETE
- `service_unavailable` (HTTP 503) - Service temporarily unavailable; retried only for GET and DELETE

For server errors, only GET and DELETE are retried to avoid repeating writes. The client uses the `Retry-After` header when present. It accepts a delay in seconds or an HTTP date.

Retry options:

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

The SDK exports these defaults and Notion-specific values:

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

`MIN_VIEW_COLUMN_WIDTH` is the minimum table column width in pixels. A column at this width appears collapsed. For example:

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

The package includes types for request parameters, responses, and their fields.

With strict TypeScript, caught errors have type `unknown`. `isNotionClientError`
narrows the error to a known SDK error type. `APIErrorCode` identifies server
errors; `ClientErrorCode` identifies errors raised by the client.

```ts
import {
  APIErrorCode,
  ClientErrorCode,
  isNotionClientError,
} from "@notionhq/client"

try {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
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
      default:
        console.error(error)
    }
  }
}
```

#### Type guards

These [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)
distinguish full API responses from partial responses.

| Type guard function      | Purpose                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `isFullPage`             | Determine whether an object is a full `PageObjectResponse`                               |
| `isFullBlock`            | Determine whether an object is a full `BlockObjectResponse`                              |
| `isFullDataSource`       | Determine whether an object is a full `DataSourceObjectResponse`                         |
| `isFullPageOrDataSource` | Determine whether an object is a full `PageObjectResponse` or `DataSourceObjectResponse` |
| `isFullUser`             | Determine whether an object is a full `UserObjectResponse`                               |
| `isFullComment`          | Determine whether an object is a full `CommentObjectResponse`                            |

Example:

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

These helpers read results across multiple pages.

#### `iteratePaginatedAPI(listFn, firstPageArgs)`

Returns an async iterator that reads each page of results as needed.

Parameters:

- `listFn`: Any function on the Notion client that represents a paginated API (i.e. accepts
  `start_cursor`.) Example: `notion.blocks.children.list`.
- `firstPageArgs`: Arguments that should be passed to the API on the first and subsequent calls
  to the API, for example a `block_id`.

Returns:

An [async iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols)
over results from the API.

Example:

```javascript
for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
  block_id: parentBlockId,
})) {
  // Do something with block.
}
```

#### `collectPaginatedAPI(listFn, firstPageArgs)`

Accepts the same arguments as `iteratePaginatedAPI` and returns all results in
one array. The results must fit in memory.

Parameters:

- `listFn`: Any function on the Notion client that represents a paginated API (i.e. accepts
  `start_cursor`.) Example: `notion.blocks.children.list`.
- `firstPageArgs`: Arguments that should be passed to the API on the first and subsequent calls
  to the API, for example a `block_id`.

Returns:

An array with results from the API.

Example:

```javascript
const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
  block_id: parentBlockId,
})
// Do something with blocks.
```

#### `iterateAllDataSourceRows(client, args)`

Reads rows beyond the limit for a single data source query, which is 10,000 by
default. At that limit, `has_more` is `false` and `request_status.type` is
`"incomplete"`; ordinary pagination stops.

This helper sorts by `created_time` and starts a new query from the last row's
timestamp each time it reaches the limit. It removes duplicate rows by ID.

Parameters:

- `client`: A Notion client instance.
- `args`: The same arguments as `dataSources.query`, minus the fields the helper
  controls: `start_cursor` (pagination is automatic) and `sorts` (set to
  `created_time` ascending to partition). `data_source_id` is required. Any
  `filter` you pass is combined with the window bound using `and`.

Returns:

An async iterator over every row in the data source.

Throws:

If a single `created_time` value holds more rows than the limit, the window
cannot be narrowed by time alone. Pass a `filter` in that case so each window
stays under the limit.

Example:

```javascript
for await (const row of iterateAllDataSourceRows(notion, {
  data_source_id: dataSourceId,
})) {
  // Do something with row.
}
```

#### `collectAllDataSourceRows(client, args)`

Accepts the same arguments as `iterateAllDataSourceRows` and returns all results
in one array. The full data source must fit in memory. For larger data sources,
`iterateAllDataSourceRows` reads rows as a stream.

Parameters:

- `client`: A Notion client instance.
- `args`: The same arguments as `iterateAllDataSourceRows`.

Returns:

An array with every row in the data source.

Example:

```javascript
const rows = await collectAllDataSourceRows(notion, {
  data_source_id: dataSourceId,
})
// Do something with rows.
```

### Custom requests

`request()` calls a Notion API endpoint directly. For example:

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

`notion.request<ResponseBody>({...})` uses `ResponseBody` as the expected response type. It does not validate that type at runtime.

> [!TIP]
> Prefer a named SDK method when one exists, such as `notion.comments.create()` for this example. `request()` can call endpoints that the SDK does not yet cover.

The `Client` constructor also accepts a custom `fetch` function.

### Verifying webhook signatures

`verifyWebhookSignature` checks the signature on a [Notion webhook event](https://developers.notion.com/reference/webhooks). It uses the raw request body, the subscription's verification token, and the `X-Notion-Signature` header. The header contains an HMAC-SHA256 signature in the form `sha256=<hex>`.

```ts
import { verifyWebhookSignature } from "@notionhq/client"

const verificationToken = process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN
if (!verificationToken) {
  throw new Error("Missing webhook verification token")
}

// Express example. Use the raw body: parsing and re-serializing JSON
// can change its bytes and invalidate the signature.
app.post(
  "/notion-webhook",
  express.text({ type: "application/json" }),
  async (req, res) => {
    const body: unknown = req.body
    if (typeof body !== "string") {
      return res.status(400).send("expected a raw text body")
    }
    const ok = await verifyWebhookSignature({
      body,
      signature: req.header("x-notion-signature"),
      verificationToken,
    })
    if (!ok) {
      return res.status(401).send("invalid signature")
    }

    const event: unknown = JSON.parse(body)
    // Validate the event's shape before using its fields.
    res.status(200).send("ok")
  }
)
```

Subscription setup is separate from event validation. The [webhook setup guide](https://developers.notion.com/reference/webhooks#step-2-verifying-the-subscription) covers receiving and saving the initial verification token.

`signWebhookPayload({ body, verificationToken })` creates a signature for tests without a live subscription.

> [!NOTE]
> Both helpers are async. They use `globalThis.crypto.subtle` when available and fall back to the Web Crypto API in `node:crypto` on Node.js.

## Examples

For sample code and example projects, see [notion-cookbook](https://github.com/makenotion/notion-cookbook/tree/main/examples).

## Requirements and compatibility

This package supports the following minimum versions:

- Runtime: `node >= 18`
- Type definitions (optional): `typescript >= 5.9`

Older versions are not supported. SDK releases also have minimum recommended [Notion API versions](https://developers.notion.com/reference/versioning):

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

- The `position` parameter replaces `after` on `appendBlockChildren`. It supports `after_block`, `start`, and `end`.
- The `in_trash` field replaces `archived` on pages, blocks, databases, and data sources.
- The `meeting_notes` block type replaces `transcription`.

The SDK's TypeScript types include both sets of field names. Older names are marked `@deprecated`.

The `notionVersion` constructor option sets the API version header for requests.

## Contributing

Follow [the contribution guide](CONTRIBUTING.md) to build, test, and check SDK compatibility before opening a pull request.

Endpoint code is generated from a schema in Notion's internal repo. Outside contributors cannot run that generator. Ask a maintainer for generated-code changes; direct edits will be overwritten. Open an issue to discuss changes to the SDK's core behavior first.

Docs, examples, and bug reports are welcome.

## Getting help

For API support, SDK problems, or feature requests, email `developers@makenotion.com`.

You can also [open an SDK issue](https://github.com/makenotion/notion-sdk-js/issues), but we do not monitor issues as closely as email.
