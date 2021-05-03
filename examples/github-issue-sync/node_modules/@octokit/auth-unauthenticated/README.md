# auth-unauthenticated.js

> strategy for explicitly unauthenticated Octokit instances

[![@latest](https://img.shields.io/npm/v/@octokit/auth-unauthenticated.svg)](https://www.npmjs.com/package/@octokit/auth-unauthenticated)
[![Build Status](https://github.com/octokit/auth-unauthenticated.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-unauthenticated.js/actions?query=workflow%3ATest)

`@octokit/auth-unauthenticated` is useful for cases when an Octokit constructor has a default authentication strategy, but you require an explicitly unauthenticated instance.

One use cases is when building a GitHub App using [`@octokit/auth-app`](https://github.com/octokit/auth-app.js) and handling webhooks using [`@octokit/webhooks](https://github.com/octokit/webhooks.js). While all webhook events provide an installation ID in its payload, in case of the `installation.deleted` event, the app can no longer create an installation access token, because the app's access has been revoked.

<!-- toc -->

- [Usage](#usage)
- [`createUnauthenticatedAuth() options`](#createunauthenticatedauth-options)
- [`auth()`](#auth)
- [Authentication object](#authentication-object)
- [`auth.hook(request, route, options)` or `auth.hook(request, options)`](#authhookrequest-route-options-or-authhookrequest-options)
- [License](#license)

<!-- tocstop -->

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

Load `@octokit/auth-unauthenticated` directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { createUnauthenticatedAuth } from "https://cdn.pika.dev/@octokit/auth-unauthenticated";
</script>
```

</td></tr>
<tr><th>
Node
</th><td>

Install with <code>npm install @octokit/auth-unauthenticated</code>

```js
const { createUnauthenticatedAuth } = require("@octokit/auth-unauthenticated");
// or: import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";
```

</td></tr>
</tbody>
</table>

```js
const auth = createUnauthenticatedAuth({
  reason:
    "Handling an installation.deleted event (The app's access has been revoked)",
});
const authentication = await auth();
// {
//   type: 'unauthenticated',
//   reason: 'Handling an installation.deleted event (The app's access has been revoked)'
// }
```

## `createUnauthenticatedAuth() options`

The `createUnauthenticatedAuth` method requires an `options.reason` argument which will be used when returning an error due to a lack of authentication or when logging a warning in case of a `404` error.

Examples

```js
createUnauthenticatedAuth({
  reason:
    "Handling an installation.deleted event: The app's access has been revoked from @octokit (id: 12345)",
});
```

## `auth()`

The `auth()` method accepts any options, but it doesn't do anything with it. That makes it a great drop-in replacement for any other authentication strategy.

## Authentication object

<table width="100%">
  <thead align=left>
    <tr>
      <th width=150>
        name
      </th>
      <th width=70>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>type</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"unauthenticated"</code>
      </td>
    </tr>
  </tbody>
</table>

## `auth.hook(request, route, options)` or `auth.hook(request, options)`

`auth.hook()` hooks directly into the request life cycle. If a mutating request is attempted to be sent (`DELETE`, `PATCH`, `POST`, or `PUT`), the request is failed immediately and returning an error that contains the reason passed to `createUnauthenticatedAuth({ reason })`.

If a request fails with a `404` or due to hitting a rate/abuse limit, the returned error is amended that it might be caused due to a lack of authentication and will include the reason passed to `createUnauthenticatedAuth({ reason })`.

The `request` option is an instance of [`@octokit/request`](https://github.com/octokit/request.js#readme). The `route`/`options` parameters are the same as for the [`request()` method](https://github.com/octokit/request.js#request).

`auth.hook()` can be called directly to send an authenticated request

```js
const { data } = await auth.hook(request, "GET /");
```

Or it can be passed as option to [`request()`](https://github.com/octokit/request.js#request).

```js
const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook,
  },
});

const { data } = await requestWithAuth("GET /");
```

## License

[MIT](LICENSE)
