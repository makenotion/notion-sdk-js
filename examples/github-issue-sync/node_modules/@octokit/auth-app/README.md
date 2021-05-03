# auth-app.js

> GitHub App authentication for JavaScript

[![@latest](https://img.shields.io/npm/v/@octokit/auth-app.svg)](https://www.npmjs.com/package/@octokit/auth-app)
[![Build Status](https://github.com/octokit/auth-app.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-app.js/actions?query=workflow%3ATest)

`@octokit/auth-app` implements authentication for GitHub Apps using [JSON Web Token](https://jwt.io/), installation access tokens, and OAuth user-to-server access tokens.

<!-- toc -->

- [Standalone usage](#standalone-usage)
  - [Authenticate as GitHub App (JSON Web Token)](#authenticate-as-github-app-json-web-token)
  - [Authenticate as OAuth App (client ID/client secret)](#authenticate-as-oauth-app-client-idclient-secret)
  - [Authenticate as installation](#authenticate-as-installation)
  - [Authenticate as user](#authenticate-as-user)
- [Usage with Octokit](#usage-with-octokit)
- [`createAppAuth(options)` or `new Octokit({ auth })`](#createappauthoptions-or-new-octokit-auth-)
- [`auth(options)` or `octokit.auth(options)`](#authoptions-or-octokitauthoptions)
  - [JSON Web Token (JWT) Authentication](#json-web-token-jwt-authentication)
  - [OAuth App authentication](#oauth-app-authentication)
  - [Installation authentication](#installation-authentication)
  - [User authentication (web flow)](#user-authentication-web-flow)
  - [User authentication (device flow)](#user-authentication-device-flow)
- [Authentication object](#authentication-object)
  - [JSON Web Token (JWT) authentication](#json-web-token-jwt-authentication)
  - [OAuth App authentication](#oauth-app-authentication-1)
  - [Installation access token authentication](#installation-access-token-authentication)
  - [GitHub APP user authentication token with expiring disabled](#github-app-user-authentication-token-with-expiring-disabled)
  - [GitHub APP user authentication token with expiring enabled](#github-app-user-authentication-token-with-expiring-enabled)
- [`auth.hook(request, route, parameters)` or `auth.hook(request, options)`](#authhookrequest-route-parameters-or-authhookrequest-options)
- [Types](#types)
- [Implementation details](#implementation-details)
- [License](#license)

<!-- tocstop -->

## Standalone usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

⚠️ `@octokit/auth-app` is not meant for usage in the browser. A private key and client secret must not be exposed to users.

The private keys provided by GitHub are in `PKCS#1` format, but the WebCrypto API only supports `PKCS#8`. You need to convert it first:

```shell
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.key
```

The OAuth APIs to create user-to-server tokens cannot be used because they do not have CORS enabled.

If you know what you are doing, load `@octokit/auth-app` directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { createAppAuth } from "https://cdn.skypack.dev/@octokit/auth-app";
</script>
```

</td></tr>
<tr><th>
Node
</th><td>

Install with <code>npm install @octokit/auth-app</code>

```js
const { createAppAuth } = require("@octokit/auth-app");
// or: import { createAppAuth } from "@octokit/auth-app";
```

</td></tr>
</tbody>
</table>

### Authenticate as GitHub App (JSON Web Token)

```js
const auth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12341234567890abcdef1234",
});

// Retrieve JSON Web Token (JWT) to authenticate as app
const appAuthentication = await auth({ type: "app" });
```

resolves with

```json
{
  "type": "app",
  "token": "jsonwebtoken123",
  "appId": 123,
  "expiresAt": "2018-07-07T00:09:30.000Z"
}
```

### Authenticate as OAuth App (client ID/client secret)

The [OAuth Application APIs](https://docs.github.com/en/rest/reference/apps#oauth-applications-api) require the app to authenticate using clientID/client as Basic Authentication

```js
const auth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12341234567890abcdef1234",
});

const appAuthentication = await auth({
  type: "oauth-app",
});
```

resolves with

```json
{
  "type": "oauth-app",
  "clientId": "lv1.1234567890abcdef",
  "clientSecret": "1234567890abcdef1234567890abcdef12345678",
  "headers": {
    "authorization": "basic bHYxLjEyMzQ1Njc4OTBhYmNkZWY6MTIzNDU2Nzg5MGFiY2RlZjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3OA=="
  }
}
```

### Authenticate as installation

```js
const auth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12341234567890abcdef1234",
});

// Retrieve installation access token
const installationAuthentication = await auth({
  type: "installation",
  installationId: 123,
});
```

resolves with

```json
{
  "type": "token",
  "tokenType": "installation",
  "token": "token123",
  "installationId": 123,
  "createdAt": "2018-07-07T00:00:00.000Z",
  "expiresAt": "2018-07-07T00:59:00.000Z"
}
```

### Authenticate as user

```js
const auth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12341234567890abcdef1234",
});

// Retrieve an oauth-access token
const userAuthentication = await auth({ type: "oauth-user", code: "123456" });
```

Resolves with

```json
{
  "type": "token",
  "tokenType": "oauth",
  "token": "token123"
}
```

## Usage with Octokit

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

⚠️ `@octokit/auth-app` is not meant for usage in the browser. A private key and client secret must not be exposed to users.

The private keys provided by GitHub are in `PKCS#1` format, but the WebCrypto API only supports `PKCS#8`. You need to convert it first:

```shell
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.key
```

The OAuth APIs to create user-to-server tokens cannot be used because they do not have CORS enabled.

If you know what you are doing, load `@octokit/auth-app` and `@octokit/core` (or a compatible module) directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { createAppAuth } from "https://cdn.skypack.dev/@octokit/auth-app";
  import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core @octokit/auth-app`. Optionally replace `@octokit/core` with a compatible module

```js
const { Octokit } = require("@octokit/core");
const { createAppAuth, createOAuthUserAuth } = require("@octokit/auth-app");
```

</td></tr>
</tbody>
</table>

```js
const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 1,
    privateKey: "-----BEGIN PRIVATE KEY-----\n...",
    clientId: "1234567890abcdef1234",
    clientSecret: "1234567890abcdef1234567890abcdef12345678",
  },
});

// Send requests as GitHub App
const { slug } = await appOctokit.request("GET /user");
console.log("authenticated as %s", slug);

// Send requests as OAuth App
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

In order to create an `octokit` instance that is authenticated as an installation, with automated installation token refresh, set `installationId` as `auth` option

```js
const installationOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 1,
    privateKey: "-----BEGIN PRIVATE KEY-----\n...",
    installationId: 123,
  },
});

// transparently creates an installation access token the first time it is needed
// and refreshes it when it expires
await installationOctokit.request("POST /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "hello-world",
  title: "title",
});
```

## `createAppAuth(options)` or `new Octokit({ auth })`

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
        <code>appId</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        <strong>Required</strong>. Find <strong>App ID</strong> on the app’s about page in settings.
      </td>
    </tr>
    <tr>
      <th>
        <code>privateKey</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Content of the <code>*.pem</code> file you downloaded from the app’s about page. You can generate a new private key if needed.
      </td>
    </tr>
    <tr>
      <th>
        <code>installationId</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        Default <code>installationId</code> to be used when calling <code>auth({ type: "installation" })</code>.
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
        The client ID of the GitHub App.
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
        A client secret for the GitHub App.
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

Automatically set to `octokit.request` when using with an `Octokit` constructor.

For standalone usage, you can pass in your own [`@octokit/request`](https://github.com/octokit/request.js) instance. For usage with enterprise, set `baseUrl` to the hostname + `/api/v3`. Example:

```js
const { request } = require("@octokit/request");
createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td></tr>
    <tr>
      <th>
        <code>cache</code>
      </th>
      <th>
        <code>object</code>
      </th>
      <td>
        Installation tokens expire after an hour. By default, <code>@octokit/auth-app</code> is caching up to 15000 tokens simultaneously using <a href="https://github.com/isaacs/node-lru-cache">lru-cache</a>. You can pass your own cache implementation by passing <code>options.cache.{get,set}</code> to the constructor. Example:

```js
const CACHE = {};
createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  cache: {
    async get(key) {
      return CACHE[key];
    },
    async set(key, value) {
      CACHE[key] = value;
    },
  },
});
```

</td></tr>
  <tr>
      <th>
        <code>log</code>
      </th>
      <th>
        <code>object</code>
      </th>
      <td>
        You can pass in your preferred logging tool by passing <code>option.log</code> to the constructor. If you would like to make the log level configurable using an environment variable or external option, we recommend the console-log-level package. For example:

```js
createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  log: require("console-log-level")({ level: "info" }),
});
```

</td></tr>
  </tbody>
</table>

## `auth(options)` or `octokit.auth(options)`

The async `auth()` method accepts different options depending on your use case

### JSON Web Token (JWT) Authentication

Authenticate as the GitHub app to list installations, repositories, and create installation access tokens.

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
        <strong>Required</strong>. Must be either <code>"app"</code>.
      </td>
    </tr>
  </tbody>
</table>

### OAuth App authentication

Create, reset, refresh, delete OAuth user-to-server tokens

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
        <strong>Required</strong>. Must be either <code>"oauth-app"</code>.
      </td>
    </tr>
  </tbody>
</table>

### Installation authentication

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
        <strong>Required</strong>. Must be <code>"installation"</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>installationId</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        <strong>Required unless a default <code>installationId</code> was passed to <code>createAppAuth()</code></strong>. ID of installation to retrieve authentication for.
      </td>
    </tr>
    <tr>
      <th>
        <code>repositoryIds</code>
      </th>
      <th>
        <code>array of numbers</code>
      </th>
      <td>
        The <code>id</code> of the repositories that the installation token can access. Also known as a <code>databaseID</code> when querying the repository object in GitHub's GraphQL API.
      </td>
    </tr>
    <tr>
      <th>
        <code>permissions</code>
      </th>
      <th>
        <code>object</code>
      </th>
      <td>
        The permissions granted to the access token. The permissions object includes the permission names and their access type. For a complete list of permissions and allowable values, see <a href="https://docs.github.com/en/developers/apps/creating-a-github-app-using-url-parameters#github-app-permissions">GitHub App permissions</a>.
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

The `auth({type: "installation", installationId, factory })` call with resolve with whatever the factory function returns. The `factory` function will be called with all the strategy option that `auth` was created with, plus the additional options passed to `auth`, besides `type` and `factory`.

For example, you can create a new `auth` instance for an installation which shares the internal state (especially the access token cache) with the calling `auth` instance:

```js
const appAuth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
});

const installationAuth123 = await appAuth({
  type: "installation",
  installationId: 123,
  factory: createAppAuth,
});
```

</td>
    </tr>
    <tr>
      <th>
        <code>refresh</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>

Installation tokens expire after one hour. By default, tokens are cached and returned from cache until expired. To bypass and update a cached token for the given `installationId`, set `refresh` to `true`.

Defaults to `false`.

</td>
    </tr>
  </tbody>
</table>

### User authentication (web flow)

Exchange code received from the web flow redirect described in [step 2 of GitHub's OAuth web flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#web-application-flow)

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
        <strong>Required</strong>. Must be <code>"oauth-user"</code>.
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

The `auth({type: "oauth-user", factory })` call with resolve with whatever the factory function returns. The `factory` function will be called with all the strategy option that `auth` was created with, plus the additional options passed to `auth`, besides `type` and `factory`.

For example, you can create a new `auth` instance for an installation which shares the internal state (especially the access token cache) with the calling `auth` instance:

```js
const {
  createAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");

const appAuth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
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
    <tr>
      <th>
        <code>code</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The authorization <code>code</code> which was passed as query parameter to the callback URL from the <a href="https://docs.github.com/en/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github">OAuth web application flow</a>.
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
        The URL in your application where users are sent after authorization. See <a href="https://docs.github.com/en/developers/apps/authorizing-oauth-apps#redirect-urls">redirect urls</a>.
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
        The unguessable random string you provided in Step 1 of the <a href="https://docs.github.com/en/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github">OAuth web application flow</a>.
      </td>
    </tr>
  </tbody>
</table>

### User authentication (device flow)

Create a token using [GitHub's device flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow).

The device flow does not require a client secret, but it is required as strategy option for `@octokit/auth-app`, even for the device flow. If you want to implement the device flow without requiring a client secret, use [`@octokit/auth-oauth-device`](https://github.com/octokit/auth-oauth-device.js#readme).

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
        <strong>Required</strong>. Must be <code>"oauth-user"</code>.
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

The `auth({type: "oauth-user", factory })` call with resolve with whatever the factory function returns. The `factory` function will be called with all the strategy option that `auth` was created with, plus the additional options passed to `auth`, besides `type` and `factory`.

For example, you can create a new `auth` instance for an installation which shares the internal state (especially the access token cache) with the calling `auth` instance:

```js
const {
  createAppAuth,
  createOAuthUserAuth,
} = require("@octokit/auth-oauth-app");

const appAuth = createAppAuth({
  appId: 1,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
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

## Authentication object

Depending on on the `auth()` call, the resulting authentication object can be one of

1. JSON Web Token (JWT) authentication
1. OAuth App authentication
1. Installation access token authentication
1. GitHub APP user authentication token with expiring disabled
1. GitHub APP user authentication token with expiring enabled

### JSON Web Token (JWT) authentication

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
        <code>"app"</code>
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
        The JSON Web Token (JWT) to authenticate as the app.
      </td>
    </tr>
    <tr>
      <th>
        <code>appId</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        GitHub App database ID.
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
        Timestamp in UTC format, e.g. <code>"2018-07-07T00:09:30.000Z"</code>. A Date object can be created using <code>new Date(authentication.expiresAt)</code>.
      </td>
    </tr>
  </tbody>
</table>

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

### Installation access token authentication

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
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The installation access token.
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
        <code>"installation"</code>
      </td>
    </tr>
    <tr>
      <th>
        <code>installationId</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        Installation database ID.
      </td>
    </tr>
    <tr>
      <th>
        <code>createdAt</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Timestamp in UTC format, e.g. <code>"2018-07-07T00:00:00.000Z"</code>. A Date object can be created using <code>new Date(authentication.expiresAt)</code>.
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
        Timestamp in UTC format, e.g. <code>"2018-07-07T00:59:00.000Z"</code>. A Date object can be created using <code>new Date(authentication.expiresAt)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>repositoryIds</code>
      </th>
      <th>
        <code>array of numbers</code>
      </th>
      <td>
        Only present if <code>repositoryIds</code> option passed to <code>auth(options)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>permissions</code>
      </th>
      <th>
        <code>object</code>
      </th>
      <td>
        An object where keys are the permission name and the value is either <code>"read"</code> or <code>"write"</code>. See the list of all <a href="https://docs.github.com/en/rest/reference/permissions-required-for-github-apps">GitHub App Permissions</a>.
      </td>
    </tr>
    <tr>
      <th>
        <code>singleFileName</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        If the <a herf="https://docs.github.com/en/rest/reference/permissions-required-for-github-apps#permission-on-single-file">single file permission</a> is enabled, the <code>singleFileName</code> property is set to the path of the accessible file.
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

`auth.hook()` hooks directly into the request life cycle. It amends the request to authenticate either as app or as installation based on the request URL. Although the `"machine-man"` preview has graduated to the official API, https://developer.github.com/changes/2020-08-20-graduate-machine-man-and-sailor-v-previews/, it is still required in versions of GitHub Enterprise up to 2.21 so it automatically sets the `"machine-man"` preview for all endpoints requiring JWT authentication.

The `request` option is an instance of [`@octokit/request`](https://github.com/octokit/request.js#readme). The arguments are the same as for the [`request()` method](https://github.com/octokit/request.js#request).

`auth.hook()` can be called directly to send an authenticated request

```js
const { data: installations } = await auth.hook(
  request,
  "GET /app/installations"
);
```

Or it can be passed as option to [`request()`](https://github.com/octokit/request.js#request).

```js
const requestWithAuth = request.defaults({
  request: {
    hook: auth.hook,
  },
});

const { data: installations } = await requestWithAuth("GET /app/installations");
```

Note that `auth.hook()` does not create and set an OAuth authentication token. But you can use [`@octokit/auth-oauth-app`](https://github.com/octokit/auth-oauth-app.js#readme) for that functionality. And if you don't plan on sending requests to routes that require authentication with `client_id` and `client_secret`, you can just retrieve the token and then create a new instance of [`request()`](https://github.com/octokit/request.js#request) with the authentication header set:

```js
const { token } = await auth({
  type: "oauth-user",
  code: "123456",
});
const requestWithAuth = request.defaults({
  headers: {
    authentication: `token ${token}`,
  },
});
```

## Types

```ts
import {
  // strategy options
  StrategyOptions,
  // auth options
  AuthOptions,
  AppAuthOptions,
  OAuthAppAuthOptions,
  InstallationAuthOptions,
  OAuthWebFlowAuthOptions,
  OAuthDeviceFlowAuthOptions,
  // authentication objects
  Authentication,
  AppAuthentication,
  OAuthAppAuthentication,
  InstallationAccessTokenAuthentication,
  GitHubAppUserAuthentication,
  GitHubAppUserAuthenticationWithExpiration,
} from "@octokit/auth-app";
```

## Implementation details

When creating a JSON Web Token, it sets the "issued at time" (iat) to 30s in the past as we have seen people running situations where the GitHub API claimed the iat would be in future. It turned out the clocks on the different machine were not in sync.

Installation access tokens are valid for 60 minutes. This library invalidates them after 59 minutes to account for request delays.

All OAuth features are implemented internally using [@octokit/auth-oauth-app](https://github.com/octokit/auth-oauth-app.js/#readme).

## License

[MIT](LICENSE)
