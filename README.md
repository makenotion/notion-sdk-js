<div align="center">
	<h1>Notion SDK for JavaScript</h1>
	<p>
		<b>A simple and easy to use client for the <a href="https://developers.notion.com">Notion API</a></b>
	</p>
	<br>
</div>

![Build status](https://github.com/makenotion/notion-sdk-js/actions/workflows/ci.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40notionhq%2Fclient.svg)](https://www.npmjs.com/package/notion-api-js)

## Installation

```
npm install @notionhq/client
```

## Usage

> Before getting started, [create an integration](https://www.notion.com/my-integrations) and find the token.
>
> [→ Learn more about authorization](https://developers.notion.com/docs/authorization).

Import and initialize a client using an **integration token** or an OAuth **access token**.

```js
const { Client } = require("@notionhq/client")

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
```

Make a request to any Notion API endpoint.

> See the complete list of endpoints in the [API reference](https://developers.notion.com/reference).

```js
;(async () => {
  const listUsersResponse = await notion.users.list()
})()
```

Each method returns a `Promise` which resolves the response.

```js
console.log(listUsersResponse)

// {
//   results: [
//     {
//       object: 'user',
//       id: 'd40e767c-d7af-4b18-a86d-55c61f1e39a4',
//       type: 'person',
//       person: {
//         email: 'avo@example.org',
//       },
//       name: 'Avocado Lovelace',
//       avatar_url: 'https://secure.notion-static.com/e6a352a8-8381-44d0-a1dc-9ed80e62b53d.jpg',
//     },
//     ...
//   ]
// }
```

Endpoint parameters are grouped into a single object. You don't need to remember which parameters go in the path, query, or body.

```js
const myPage = await notion.databases.query({
  database_id: "897e5a76-ae52-4b48-9fdf-e71f5945d1af",
  filter: {
    property: "Landmark",
    text: {
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
  const myPage = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Landmark",
      text: {
        contains: "Bridge",
      },
    },
  })
} catch (error) {
  if (error.code === APIErrorCode.ObjectNotFound) {
    //
    // For example: handle by asking the user to select a different database
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

| Option      | Default value              | Type         | Description                                                                                                                                                  |
| ----------- | -------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth`      | `undefined`                | `string`     | Bearer token for authentication. If left undefined, the `auth` parameter should be set on each request.                                                      |
| `logLevel`  | `LogLevel.WARN`            | `LogLevel`   | Verbosity of logs the instance will produce. By default, logs are written to `stdout`.                                                                       |
| `timeoutMs` | `60_000`                   | `number`     | Number of milliseconds to wait before emitting a `RequestTimeoutError`                                                                                       |
| `baseUrl`   | `"https://api.notion.com"` | `string`     | The root URL for sending API requests. This can be changed to test with a mock server.                                                                       |
| `logger`    | Log to console             | `Logger`     | A custom logging function. This function is only called when the client emits a log that is equal or greater severity than `logLevel`.                       |
| `agent`     | Default node agent         | `http.Agent` | Used to control creation of TCP sockets. A common use is to proxy requests with [`https-proxy-agent`](https://github.com/TooTallNate/node-https-proxy-agent) |

### TypeScript

This package contains type definitions for **all request parameters and responses**.

Error classes, such as `RequestTimeoutError` and `APIResponseError`, contain type guards as static methods which can be useful for narrowing the type of a thrown error. TypeScript infers all thrown errors to be `any` or `unknown`. These type guards will allow you to handle errors with better type support.

```ts
try {
  const response = notion.databases.query({
    /* ... */
  })
} catch (error: unknown) {
  if (APIResponseError.isAPIResponseError(error)) {
    // error is now strongly typed to APIResponseError
    switch (error.code) {
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

## Requirements

This package supports the following minimum versions:

- Runtime: `node >= 12`
- Type definitions (optional): `typescript >= 4.2`

Earlier versions may still work, but we encourage people building new applications to upgrade to the current stable.

## Getting help

If you have a question about the library, or are having difficulty using it, chat with the community in [GitHub Discussions](https://github.com/makenotion/notion-sdk-js/discussions).

If you're experiencing issues with the Notion API, such as a service interruption or a potential bug in the platform, reach out to [Notion help](https://www.notion.com/Help-Support-e040febf70a94950b8620e6f00005004?target=intercom).
