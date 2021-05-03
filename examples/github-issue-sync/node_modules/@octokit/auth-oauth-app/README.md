# auth-oauth-app.js

> GitHub OAuth App authentication for JavaScript

[![@latest](https://img.shields.io/npm/v/@octokit/auth-oauth-app.svg)](https://www.npmjs.com/package/@octokit/auth-oauth-app)
[![Build Status](https://github.com/octokit/auth-oauth-app.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-oauth-app.js/actions?query=workflow%3ATest)

`@octokit/auth-oauth-app` is implementing one of [GitHub’s authentication strategies](https://github.com/octokit/auth.js).

It implements authentication using an OAuth app’s client ID and secret as well as creating user access tokens GitHub's OAuth [web application flow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow) and [device flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow).

<!-- toc -->

- [Standalone Usage](#standalone-usage)
  - [Authenticate as app](#authenticate-as-app)
  - [Authenticate user using OAuth Web Flow](#authenticate-user-using-oauth-web-flow)
  - [Authenticate user using OAuth Device flow](#authenticate-user-using-oauth-device-flow)
- [Usage with Octokit](#usage-with-octokit)
- [`createOAuthAppAuth(options)` or `new Octokit({ auth })`](#createoauthappauthoptions-or-new-octokit-auth-)
- [`auth(options)` or `octokit.auth(options)`](#authoptions-or-octokitauthoptions)
  - [Client ID/Client Secret Basic authentication](#client-idclient-server-basic-authentication)
  - [OAuth web flow](#oauth-web-flow)
  - [OAuth device flow](#oauth-device-flow)
- [Authentication object](#authentication-object)
  - [OAuth App authentication](#oauth-app-authentication)
  - [OAuth user access token authentication](#oauth-user-access-token-authentication)
  - [GitHub APP user authentication token with expiring disabled](#github-app-user-authentication-token-with-expiring-disabled)
  - [GitHub APP user authentication token with expiring enabled](#github-app-user-authentication-token-with-expiring-enabled)
- [`auth.hook(request, route, parameters)` or `auth.hook(request, options)`](#authhookrequest-route-parameters-or-authhookrequest-options)
- [Types](#types)
- [Implementation details](#implementation-details)
- [License](#license)

<!-- tocstop -->

## Standalone Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

⚠️ `@octokit/auth-oauth-app` is not meant for usage in the browser. The OAuth APIs to create tokens do not have CORS enabled, and a client secret must not be exposed to the client.

If you know what you are doing, load `@octokit/auth-oauth-app` directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { createOAuthAppAuth } from "https://cdn.skypack.dev/@octokit/auth-oauth-app";
</script>
```

</td></tr>
<tr><th>
Node
</th><td>

Install with <code>npm install @octokit/auth-oauth-app</code>

```js
const { createOAuthAppAuth } = require("@octokit/auth-oauth-app");
// or: import { createOAuthAppAuth } from "@octokit/auth-oauth-app";
```

</td></tr>
</tbody>
</table>

### Authenticate as app

```js
const auth = createOAuthAppAuth({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
});

const appAuthentication = await auth({
  type: "oauth-app",
});
```

resolves with

```json
{
  "type": "oauth-app",
  "clientId": "1234567890abcdef1234",
  "clientSecret": "1234567890abcdef1234567890abcdef12345678",
  "headers": {
    "authorization": "basic MTIzNDU2Nzg5MGFiY2RlZjEyMzQ6MTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3OA=="
  }
}
```

### Authenticate user using OAuth Web Flow

Exchange code from GitHub's OAuth web flow, see https://docs.github.com/en/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github

```js
const auth = createOAuthAppAuth({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
});

const userAuthenticationFromWebFlow = await auth({
  type: "oauth-user",
  code: "random123",
  state: "mystate123",
});
```

resolves with

```json
{
  "clientType": "oauth-app",
  "clientId": "1234567890abcdef1234",
  "clientSecret": "1234567890abcdef1234567890abcdef12345678",
  "type": "token",
  "tokenType": "oauth",
  "token": "useraccesstoken123",
  "scopes": []
}
```

### Authenticate user using OAuth Device flow

Pass an asynchronous `onVerification()` method which will be called with the response from step 1 of the device flow. In that function you have to prompt the user to enter the user code at the provided verification URL.

`auth()` will not resolve until the user entered the code and granted access to the app.

See https://docs.github.com/en/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github

```js
const auth = createOAuthAppAuth({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
});

const userAuthenticationFromDeviceFlow = await auth({
  async onVerification(verification) {
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
```

resolves with

```json
{
  "clientType": "oauth-app",
  "clientId": "1234567890abcdef1234",
  "clientSecret": "1234567890abcdef1234567890abcdef12345678",
  "type": "token",
  "tokenType": "oauth",
  "token": "useraccesstoken123",
  "scopes": []
}
```

## Usage with Octokit

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

⚠️ `@octokit/auth-oauth-app` is not meant for usage in the browser. The OAuth APIs to create tokens do not have CORS enabled, and a client secret must not be exposed to the client.

If you know what you are doing, load `@octokit/auth-oauth-app` and `@octokit/core` (or a compatible module) directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { createOAuthAppAuth } from "https://cdn.skypack.dev/@octokit/auth-oauth-app";
  import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core @octokit/auth-oauth-app`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const {
  createOAuthAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");
```

</td></tr>
</tbody>
</table>

```js
const appOctokit = new Octokit({
  authStrategy: createOAuthAppAuth,
  auth: {
    clientId: "1234567890abcdef1234",
    clientSecret: "1234567890abcdef1234567890abcdef12345678",
  },
});

// Send requests as app
await appOctokit.request("POST /application/{client_id}/token", {
  client_id: "1234567890abcdef1234",
  access_token: "existingtoken123",
});
console.log("token is valid");

// create a new octokit instance that is authenticated as the user
const userOctokit = await appOctokit.auth({
  type: "oauth-user",
  code: "code123",
  factor: (options) => {
    return new Octokit({
      authStrategy: createOAuthUserAuth,
      auth: options,
    });
  },
});

// Exchanges the code for the user access token authentication on first request
// and caches the authentication for successive requests
const {
  data: { login },
} = await userOctokit.request("GET /user");
console.log("Hello, %s!", login);
```

## `createOAuthAppAuth(options)` or `new Octokit({ auth })`

The `createOAuthAppAuth` method accepts a single `options` object as argument. The same set of options can be passed as `auth` to the `Octokit` constructor when setting `authStrategy: createOAuthAppAuth`

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
        <strong>Required</strong>. Find your OAuth app’s <code>Client ID</code> in your account’s developer settings.
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
        <strong>Required</strong>. Find your OAuth app’s <code>Client Secret</code> in your account’s developer settings.
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
        Must be set to either <code>"oauth-app"</code> or <code>"github-app"</code>. Defaults to <code>"oauth-app"</code>
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

</td></tr>
  </tbody>
</table>

## `auth(options)` or `octokit.auth(options)`

The async `auth()` method returned by `createOAuthAppAuth(options)` accepts different options depending on your use case

### Client ID/Client Secret Basic authentication

All REST API routes starting with `/applications/{client_id}` need to be authenticated using the OAuth/GitHub App's Client ID and a client secret.

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
        <strong>Required.</strong> Must be set to <code>"oauth-app"</code>
      </td>
    </tr>
  </tbody>
</table>

### OAuth web flow

Exchange `code` for a user access token. See [Web application flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#web-application-flow).

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
        <strong>Required.</strong> Must be set to <code>"oauth-user"</code>.
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
        <strong>Required</strong>. The authorization <code>code</code> which was passed as query parameter to the callback URL from the <a href="https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github">OAuth web application flow</a>.
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
        The URL in your application where users are sent after authorization. See <a href="https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls">redirect urls</a>.
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
        The unguessable random string you provided in Step 1 of the <a href="https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github">OAuth web application flow</a>.
      </td>
    </tr>
    <tr>
      <th>
        <code>factory</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>

When the `factory` option is, the `auth({type: "oauth-user", code, factory })` call with resolve with whatever the `factory` function returns. The `factory` function will be called with all the strategy option that `auth` was created with, plus the additional options passed to `auth`, besides `type` and `factory`.

For example, you can create a new `auth` instance for for a user using [`createOAuthUserAuth`](https://github.com/octokit/auth-oauth-user.js/#readme) which implements auto-refreshing tokens, among other features. You can import `createOAuthUserAuth` directly from `@octokit/auth-oauth-app` which will ensure compatibility.

```js
const {
  createOAuthAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");

const appAuth = createOAuthAppAuth({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
});

const userAuth = await appAuth({
  type: "oauth-user",
  code,
  factory: createOAuthUserAuth,
});

// will create token upon first call, then cache authentication for successive calls,
// until token needs to be refreshed (if enabled for the GitHub App)
const authentication = await userAuth();
```

</td>
    </tr>
  </tbody>
</table>

### OAuth device flow

Create a user access token without an http redirect. See [Device flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow).

The device flow does not require a client secret, but it is required as strategy option for `@octokit/auth-oauth-app`, even for the device flow. If you want to implement the device flow without requiring a client secret, use [`@octokit/auth-oauth-device`](https://github.com/octokit/auth-oauth-device.js#readme).

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
        <strong>Required.</strong> Must be set to <code>"oauth-user"</code>.
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

**Required**. A function that is called once the device and user codes were retrieved.

The `onVerification()` callback can be used to pause until the user completes step 2, which might result in a better user experience.

```js
const auth = auth({
  type: "oauth-user",
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
        <code>scopes</code>
      </th>
      <th>
        <code>array of strings</code>
      </th>
      <td>
        Only relevant if the <code>clientType</code> strategy option is set to <code>"oauth-app"</code>.Array of OAuth scope names that the user access token should be granted. Defaults to no scopes (<code>[]</code>).
      </td>
    </tr>
    <tr>
      <th>
        <code>factory</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>

When the `factory` option is, the `auth({type: "oauth-user", code, factory })` call with resolve with whatever the `factory` function returns. The `factory` function will be called with all the strategy option that `auth` was created with, plus the additional options passed to `auth`, besides `type` and `factory`.

For example, you can create a new `auth` instance for for a user using [`createOAuthUserAuth`](https://github.com/octokit/auth-oauth-user.js/#readme) which implements auto-refreshing tokens, among other features. You can import `createOAuthUserAuth` directly from `@octokit/auth-oauth-app` which will ensure compatibility.

```js
const {
  createOAuthAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");

const appAuth = createOAuthAppAuth({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef1234567890abcdef12345678",
});

const userAuth = await appAuth({
  type: "oauth-user",
  onVerification,
  factory: createOAuthUserAuth,
});

// will create token upon first call, then cache authentication for successive calls,
// until token needs to be refreshed (if enabled for the GitHub App)
const authentication = await userAuth();
```

</td>
    </tr>
  </tbody>
</table>

## Authentication object

The async `auth(options)` method to one of four possible authentication objects

1. **OAuth App authentication** for `auth({ type: "oauth-app" })`
2. **OAuth user access token authentication** for `auth({ type: "oauth-app" })` and App is an OAuth App (OAuth user access token)
3. **GitHub APP user authentication token with expiring disabled** for `auth({ type: "oauth-app" })` and App is a GitHub App (user-to-server token)
4. **GitHub APP user authentication token with expiring enabled** for `auth({ type: "oauth-app" })` and App is a GitHub App (user-to-server token)

### OAuth App authentication

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
        <code>"oauth-app"</code>
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
        <code>"oauth-app"</code> or <code>"github-app"</code>
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
        The client ID as passed to the constructor.
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
        The client secret as passed to the constructor.
      </td>
    </tr>
    <tr>
      <th>
        <code>headers</code>
      </th>
      <th>
        <code>object</code>
      </th>
      <td>
        <code>{ authorization }</code>.
      </td>
    </tr>
  </tbody>
</table>

### OAuth user access token authentication

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
        The app's <code>Client ID</code>
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
        One of the app's client secrets
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
        The app's <code>Client ID</code>
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
        One of the app's client secrets
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
  </tbody>
</table>

## `auth.hook(request, route, parameters)` or `auth.hook(request, options)`

`auth.hook()` hooks directly into the request life cycle. It amends the request to authenticate correctly using `clientId` and `clientSecret` as basic auth for the API endpoints that support it. It throws an error in other cases.

The `request` option is an instance of [`@octokit/request`](https://github.com/octokit/request.js#readme). The `route`/`options` parameters are the same as for the [`request()` method](https://github.com/octokit/request.js#request).

`auth.hook()` can be called directly to send an authenticated request

```js
const { data: user } = await auth.hook(
  request,
  "POST /applications/{client_id}/token",
  {
    client_id: "1234567890abcdef1234",
    access_token: "token123",
  }
);
```

Or it can be passed as option to [`request()`](https://github.com/octokit/request.js#request).

```js
const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook,
  },
});

const { data: user } = await requestWithAuth(
  "POST /applications/{client_id}/token",
  {
    client_id: "1234567890abcdef1234",
    access_token: "token123",
  }
);
```

## Types

```ts
import {
  // strategy options
  OAuthAppStrategyOptions,
  GitHubAppStrategyOptions,
  // auth options
  AppAuthOptions,
  WebFlowAuthOptions,
  OAuthAppDeviceFlowAuthOptions,
  GitHubAppDeviceFlowAuthOptions,
  // auth interfaces
  OAuthAppAuthInterface,
  GitHubAuthInterface,
  // authentication object
  AppAuthentication,
  OAuthAppUserAuthentication,
  GitHubAppUserAuthentication,
  GitHubAppUserAuthenticationWithExpiration,
} from "@octokit/auth-oauth-app";
```

## Implementation details

Client ID and secret can be passed as Basic auth in the `Authorization` header in order to get a higher rate limit compared to unauthenticated requests. This is meant for the use on servers only: never expose an OAuth client secret on a client such as a web application!

`auth.hook` will set the correct authentication header automatically based on the request URL. For all [OAuth Application endpoints](https://developer.github.com/v3/apps/oauth_applications/), the `Authorization` header is set to basic auth. For all other endpoints and token is retrieved and used in the `Authorization` header. The token is cached and used for succeeding requests.

To reset the cached access token, you can do this

```js
const { token } = await auth({ type: "oauth-user" });
await auth.hook(request, "POST /applications/{client_id}/token", {
  client_id: "1234567890abcdef1234",
  access_token: token,
});
```

The internally cached token will be replaced and used for succeeding requests. See also ["the REST API documentation"](https://developer.github.com/v3/oauth_authorizations/).

See also: [octokit/oauth-authorization-url.js](https://github.com/octokit/oauth-authorization-url.js).

## License

[MIT](LICENSE)

```

```
