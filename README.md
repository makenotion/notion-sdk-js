# Notion SDK for JavaScript

<img alt="Notion Logo" src="https://www.notion.so/images/notion-logo-block-main.svg" width="70" />

**A simple and easy to use client for the [Notion API](https://developers.notion.com).**

![Build status](https://github.com/makenotion/notion-sdk-js/actions/workflows/ci.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40notionhq%2Fclient.svg)](https://www.npmjs.com/package/@notionhq/client)

## Installation

```bash
npm install @notionhq/client
```

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

| Option      | Default value              | Type           | Description                                                                                                                                                  |
| ----------- | -------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth`      | `undefined`                | `string`       | Bearer token for authentication. If left undefined, the `auth` parameter should be set on each request.                                                      |
| `logLevel`  | `LogLevel.WARN`            | `LogLevel`     | Verbosity of logs the instance will produce. By default, logs are written to `stdout`.                                                                       |
| `timeoutMs` | `60_000`                   | `number`       | Number of milliseconds to wait before emitting a `RequestTimeoutError`                                                                                       |
| `baseUrl`   | `"https://api.notion.com"` | `string`       | The root URL for sending API requests. This can be changed to test with a mock server.                                                                       |
| `logger`    | Log to console             | `Logger`       | A custom logging function. This function is only called when the client emits a log that is equal or greater severity than `logLevel`.                       |
| `agent`     | Default node agent         | `http.Agent`   | Used to control creation of TCP sockets. A common use is to proxy requests with [`https-proxy-agent`](https://github.com/TooTallNate/node-https-proxy-agent) |
| `retry`     | `{ maxRetries: 3 }`        | `RetryOptions` | Configuration for automatic retries on rate limits (429) and server errors (500, 503). See [Automatic retries](#automatic-retries) below.                    |

### Automatic retries

The client automatically retries requests that fail due to rate limiting or transient server errors. By default, it will retry up to 3 times using exponential back-off with jitter.

**Retryable errors:**

- `rate_limited` (HTTP 429) - Too many requests
- `internal_server_error` (HTTP 500) - Server error
- `service_unavailable` (HTTP 503) - Service temporarily unavailable

**Retry behavior:**

- Uses exponential back-off: delays increase with each retry attempt
- Respects the `Retry-After` header when present (both delta-seconds and HTTP-date formats)
- Adds random jitter to prevent thundering herd problems

**Configuration:**

```js
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  retry: {
    maxRetries: 5, // Maximum retry attempts (default: 3)
    initialRetryDelayMs: 500, // Initial delay between retries (default: 1000ms)
    maxRetryDelayMs: 60000, // Maximum delay between retries (default: 60000ms)
  },
})
```

To disable automatic retries:

```js
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  retry: { maxRetries: 0 },
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

In these cases, we recommend upgrading your Notion API version header using the `Client()` constructor across all of your requests before upgrading to a newer version of the SDK.

## Contributing

While we value open-source contributions to this SDK, most of the client code is generated programmatically from the Notion API specification. Additions made directly to `src/api-endpoints.ts` or other generated code would be overwritten upon the next release.

If you'd like to contribute a feature or fix to the SDK's core functionality, we suggest opening an issue first to discuss it with us. This helps ensure your effort aligns with how the SDK is maintained.

However, contributions to documentation (including this README), examples, and bug reports are always welcome and greatly appreciated!

## Getting help

If you want to submit a feature request for Notion's API, or are experiencing any issues with the API platform, please email us at `developers@makenotion.com`.

To report issues with the SDK, it is possible to [submit an issue](https://github.com/makenotion/notion-sdk-js/issues) to this repo. However, we don't monitor these issues very closely. We recommend you reach out to us at `developers@makenotion.com` instead.
