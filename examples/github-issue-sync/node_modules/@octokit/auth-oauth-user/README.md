# auth-oauth-user.js

> Octokit authentication strategy for OAuth user authentication

[![@latest](https://img.shields.io/npm/v/@octokit/auth-oauth-user.svg)](https://www.npmjs.com/package/@octokit/auth-oauth-user)
[![Build Status](https://github.com/octokit/auth-oauth-user.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-oauth-user.js/actions?query=workflow%3ATest+branch%3Amain)

**Important:** `@octokit/auth-oauth-user` requires your app's `client_secret`, which must not be exposed. If you are looking for an OAuth user authentication strategy that can be used on a client (browser, IoT, CLI), check out [`@octokit/auth-oauth-user-client`](https://github.com/octokit/auth-oauth-user-client.js#readme). Note that `@octokit/auth-oauth-user-client` requires a backend. The only exception is [`@octokit/auth-oauth-device`](https://github.com/octokit/auth-oauth-device.js#readme) which does not require the `client_secret`, but does not work in browsers due to CORS constraints.

<details>
<summary>Table of contents</summary>

<!-- toc -->

- [Features](#features)
- [Standalone usage](#standalone-usage)
  - [Exchange code from OAuth web flow](#exchange-code-from-oauth-web-flow)
  - [OAuth Device flow](#oauth-device-flow)
  - [Use an existing authentication](#use-an-existing-authentication)
- [Usage with Octokit](#usage-with-octokit)
- [`createOAuthUserAuth(options)` or `new Octokit({ auth })`](#createoauthuserauthoptions-or-new-octokit-auth-)
  - [When using GitHub's OAuth web flow](#when-using-githubs-oauth-web-flow)
  - [When using GitHub's OAuth device flow](#when-using-githubs-oauth-device-flow)
  - [When passing an existing authentication object](#when-passing-an-existing-authentication-object)
- [`auth(options)` or `octokit.auth(options)`](#authoptions-or-octokitauthoptions)
- [Authentication object](#authentication-object)
  - [OAuth APP authentication token](#oauth-app-authentication-token)
  - [GitHub APP user authentication token with expiring disabled](#github-app-user-authentication-token-with-expiring-disabled)
  - [GitHub APP user authentication token with expiring enabled](#github-app-user-authentication-token-with-expiring-enabled)
- [`auth.hook(request, route, parameters)` or `auth.hook(request, options)`](#authhookrequest-route-parameters-or-authhookrequest-options)
- [Types](#types)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

</details>

## Features

- Code for token exchange from [GitHub's OAuth web flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#web-application-flow)
- [GitHub's OAuth device flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow)
- Caches token for succesive calls
- Auto-refreshing for [expiring user access tokens](https://docs.github.com/en/developers/apps/refreshing-user-to-server-access-tokens)
- Applies the correct authentication strategy based on the request URL when using with `Octokit`
- Token verification
- Token reset
- Token invalidation
- Application grant revocation

## Standalone usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `@octokit/auth-oauth-user` directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { createOAuthUserAuth } from "https://cdn.skypack.dev/@octokit/auth-oauth-user";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/auth-oauth-user`

```js
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
```

</td></tr>
</tbody>
</table>

### Exchange code from OAuth web flow

```js
const auth = createOAuthUserAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  code: "code123",
  // optional
  state: "state123",
  redirectUrl: "https://acme-inc.com/login",
});

// Exchanges the code for the user access token authentication on first call
// and caches the authentication for successive calls
const { token } = await auth();
```

About [GitHub's OAuth web flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#web-application-flow)

### OAuth Device flow

```js
const auth = createOAuthUserAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  onVerification(verification) {
    // verification example
    // {
    //   device_code: "3584d83530557fdd1f46af8289938c8ef79f9dc5",
    //   user_code: "WDJB-MJHT",
    //   verification_uri: "https://github.com/login/device",
    //   expires_in: 900,
    //   interval: 5,
    // };

    console.log("Open %s", verification.verification_uri);
    console.log("Enter code: %s", verification.user_code);
  },
});

// resolves once the user entered the `user_code` on `verification_uri`
const { token } = await auth();
```

About [GitHub's OAuth device flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow)

### Use an existing authentication

```js
const auth = createOAuthUserAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  clientType: "oauth-app",
  token: "token123",
});

// will return the passed authentication
const { token } = await auth();
```

See [Authentication object](#authentication-object).

## Usage with Octokit

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

`@octokit/auth-oauth-user` cannot be used in the browser. It requires `clientSecret` to be set which must not be exposed to clients, and some of the OAuth APIs it uses do not support CORS.

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core @octokit/auth-oauth-user`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const { createOAuthUserAuth } = require("@octokit/auth-oauth-user");
```

</td></tr>
</tbody>
</table>

```js
const octokit = new Octokit({
  authStrategy: createOAuthUserAuth,
  auth: {
    clientId: "1234567890abcdef1234",
    clientSecret: "1234567890abcdef1234567890abcdef12345678",
    code: "code123",
  },
});

// Exchanges the code for the user access token authentication on first request
// and caches the authentication for successive requests
const {
  data: { login },
} = await octokit.request("GET /user");
console.log("Hello, %s!", login);
```

## `createOAuthUserAuth(options)` or `new Octokit({ auth })`

The `createOAuthUserAuth` method accepts a single `options` object as argument. The same set of options can be passed as `auth` to the `Octokit` constructor when setting `authStrategy: createOAuthUserAuth`

### When using GitHub's OAuth web flow

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
        <code>clientId</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Client ID of your GitHub/OAuth App. Find it on your app's settings page.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientSecret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Client Secret for your GitHub/OAuth App. Create one on your app's settings page.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Either <code>"oauth-app"</code> or <code>"github-app"</code>. Defaults to <code>"oauth-app"</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>code</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>

**Required.** The authorization code which was passed as query parameter to the callback URL from [GitHub's OAuth web application flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#web-application-flow).

</td>
    </tr>
    <tr>
      <th>
        <code>state</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>

The unguessable random string you provided in [Step 1 of GitHub's OAuth web application flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity).

</td>
    </tr>
    <tr>
      <th>
        <code>redirectUrl</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        
The <code>redirect_uri</code> parameter you provided in [Step 1 of GitHub's OAuth web application flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity).

</td>
    </tr>
    <tr>
      <th>
        <code>request</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the API root endpoint. Example:

```js
const { request } = require("@octokit/request");
createOAuthAppAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

### When using GitHub's OAuth device flow

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
        <code>clientId</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Client ID of your GitHub/OAuth App. Find it on your app's settings page.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientSecret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Client Secret for your GitHub/OAuth App. The <code>clientSecret</code> is not needed for the OAuth device flow itself, but it is required for resetting, refreshing, and invalidating a token. Find the Client Secret on your app's settings page.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Either <code>"oauth-app"</code> or <code>"github-app"</code>. Defaults to <code>"oauth-app"</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>onVerification</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>

**Required**. A function that is called once the device and user codes were retrieved

The `onVerification()` callback can be used to pause until the user completes step 2, which might result in a better user experience.

```js
const auth = createOAuthUserAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  onVerification(verification) {
    console.log("Open %s", verification.verification_uri);
    console.log("Enter code: %s", verification.user_code);

    await prompt("press enter when you are ready to continue")
  },
});
```

</td>
    </tr>
    <tr>
      <th>
        <code>request</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the API root endpoint. Example:

```js
const { request } = require("@octokit/request");
createOAuthAppAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  onVerification(verification) {
    console.log("Open %s", verification.verification_uri);
    console.log("Enter code: %s", verification.user_code);

    await prompt("press enter when you are ready to continue")
  },
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

### When passing an existing authentication object

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
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Either <code>"oauth-app"</code> or <code>"github"</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Client ID of your GitHub/OAuth App. Find it on your app's settings page.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientSecret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Client Secret for your GitHub/OAuth App. Create one on your app's settings page.
      </td>
    </tr>
    <tr>
      <th>
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. The user access token
      </td>
    </tr>
    <tr>
      <th>
        <code>scopes</code>
      </th>
      <th>
        <code>array of strings</code>
      </th>
      <td>
        <strong>Required if <code>clientType</code> is set to <code>"oauth-app"</code></strong>. Array of OAuth scope names the token was granted
      </td>
    </tr>
    <tr>
      <th>
        <code>refreshToken</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Only relevant if <code>clientType</code> is set to <code>"github-app"</code> and token expiration is enabled.
      </td>
    </tr>
    <tr>
      <th>
        <code>expiresAt</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Only relevant if <code>clientType</code> is set to <code>"github-app"</code> and token expiration is enabled. Date timestamp in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString">ISO 8601</a> standard. Example: <code>2022-01-01T08:00:0.000Z</code>
      </td>
    </tr>
    </tr>
    <tr>
      <th>
        <code>refreshTokenExpiresAt</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Only relevant if <code>clientType</code> is set to <code>"github-app"</code> and token expiration is enabled. Date timestamp in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString">ISO 8601</a> standard. Example: <code>2021-07-01T00:00:0.000Z</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>request</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the API root endpoint. Example:

```js
const { request } = require("@octokit/request");
createOAuthAppAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

## `auth(options)` or `octokit.auth(options)`

The async `auth()` method is returned by `createOAuthUserAuth(options)` or set on the `octokit` instance when the `Octokit` constructor was called with `authStrategy: createOAuthUserAuth`.

Once `auth()` receives a valid authentication object it caches it in memory and uses it for subsequent calls. It also caches if the token is invalid and no longer tries to send any requests. If the authentication is using a refresh token, a new token will be requested as needed. Calling `auth({ type: "reset" })` will replace the internally cached authentication.

Resolves with an [authentication object](#authentication-object).

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

Without setting `type` auth will return the current authentication object, or exchange the `code` from the strategy options on first call. If the current authentication token is expired, the tokens will be refreshed.

Possible values for `type` are

- `"check"`: sends request to verify the validity of the current token
- `"reset"`: invalidates current token and replaces it with a new one
- `"refresh"`: GitHub Apps only, and only if expiring user tokens are enabled.
- `"delete"`: invalidates current token
- `"deleteAuthorization"`: revokes OAuth access for application. All tokens for the current user created by the same app are invalidated. The user will be prompted to grant access again during the next OAuth web flow.

</td>
    </tr>
  </tbody>
</table>

## Authentication object

There are three possible results

1. [OAuth APP authentication token](#oauth-app-authentication-token)
1. [GitHub APP user authentication token with expiring disabled](#github-app-user-authentication-token-with-expiring-disabled)
1. [GitHub APP user authentication token with expiring enabled](#github-app-user-authentication-token-with-expiring-enabled)

The differences are

1. `scopes` is only present for OAuth Apps
2. `refreshToken`, `expiresAt`, `refreshTokenExpiresAt` are only present for GitHub Apps, and only if token expiration is enabled

### OAuth APP authentication token

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
        <code>"token"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>tokenType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"oauth"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"oauth-app"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The <code>clientId</code> from the strategy options
      </td>
    </tr>
    <tr>
      <th>
        <code>clientSecret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The <code>clientSecret</code> from the strategy options
      </td>
    </tr>
    <tr>
      <th>
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The user access token
      </td>
    </tr>
    <tr>
      <th>
        <code>scopes</code>
      </th>
      <th>
        <code>array of strings</code>
      </th>
      <td>
        array of scope names enabled for the token
      </td>
    </tr>
    <tr>
      <th>
        <code>invalid</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>

Either `undefined` or `true`. Will be set to `true` if the token was invalided explicitly or found to be invalid

</td>
    </tr>
  </tbody>
</table>

### GitHub APP user authentication token with expiring disabled

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
        <code>"token"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>tokenType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"oauth"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"github-app"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The <code>clientId</code> from the strategy options
      </td>
    </tr>
    <tr>
      <th>
        <code>clientSecret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The <code>clientSecret</code> from the strategy options
      </td>
    </tr>
    <tr>
      <th>
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The user access token
      </td>
    </tr>
    <tr>
      <th>
        <code>invalid</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>

Either `undefined` or `true`. Will be set to `true` if the token was invalided explicitly or found to be invalid

</td>
    </tr>
  </tbody>
</table>

### GitHub APP user authentication token with expiring enabled

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
        <code>"token"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>tokenType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"oauth"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <code>"github-app"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The <code>clientId</code> from the strategy options
      </td>
    </tr>
    <tr>
      <th>
        <code>clientSecret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The <code>clientSecret</code> from the strategy options
      </td>
    </tr>
    <tr>
      <th>
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The user access token
      </td>
    </tr>
    <tr>
      <th>
        <code>refreshToken</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The refresh token
      </td>
    </tr>
    <tr>
      <th>
        <code>expiresAt</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Date timestamp in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString">ISO 8601</a> standard. Example: <code>2022-01-01T08:00:0.000Z</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>refreshTokenExpiresAt</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Date timestamp in <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString">ISO 8601</a> standard. Example: <code>2021-07-01T00:00:0.000Z</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>invalid</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>

Either `undefined` or `true`. Will be set to `true` if the token was invalided explicitly or found to be invalid

</td>
    </tr>
  </tbody>
</table>

## `auth.hook(request, route, parameters)` or `auth.hook(request, options)`

`auth.hook()` hooks directly into the request life cycle. It amends the request to authenticate correctly based on the request URL.

The `request` option is an instance of [`@octokit/request`](https://github.com/octokit/request.js#readme). The `route`/`options` parameters are the same as for the [`request()` method](https://github.com/octokit/request.js#request).

`auth.hook()` can be called directly to send an authenticated request

```js
const { data: user } = await auth.hook(request, "GET /user");
```

Or it can be passed as option to [`request()`](https://github.com/octokit/request.js#request).

```js
const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook,
  },
});

const { data: user } = await requestWithAuth("GET /user");
```

## Types

```ts
import {
  GitHubAppAuthentication,
  GitHubAppAuthenticationWithExpiration,
  GitHubAppAuthOptions,
  GitHubAppStrategyOptions,
  GitHubAppStrategyOptionsDeviceFlow,
  GitHubAppStrategyOptionsExistingAuthentication,
  GitHubAppStrategyOptionsExistingAuthenticationWithExpiration,
  GitHubAppStrategyOptionsWebFlow,
  OAuthAppAuthentication,
  OAuthAppAuthOptions,
  OAuthAppStrategyOptions,
  OAuthAppStrategyOptionsDeviceFlow,
  OAuthAppStrategyOptionsExistingAuthentication,
  OAuthAppStrategyOptionsWebFlow,
} from "@octokit/auth-oauth-user";
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
