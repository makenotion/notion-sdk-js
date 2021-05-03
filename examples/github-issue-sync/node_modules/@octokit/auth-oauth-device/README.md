# auth-oauth-device.js

> GitHub OAuth Device authentication strategy for JavaScript

[![@latest](https://img.shields.io/npm/v/@octokit/auth-oauth-device.svg)](https://www.npmjs.com/package/@octokit/auth-oauth-device)
[![Build Status](https://github.com/octokit/auth-oauth-device.js/workflows/Test/badge.svg)](https://github.com/octokit/auth-oauth-device.js/actions?query=workflow%3ATest+branch%3Amain)

`@octokit/auth-oauth-device` is implementing one of [GitHub’s OAuth Device Flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow).

<!-- toc -->

- [Usage](#usage)
  - [For OAuth Apps](#for-oauth-apps)
  - [For GitHub Apps](#for-github-apps)
- [`createOAuthDeviceAuth(options)`](#createoauthdeviceauthoptions)
- [`auth(options)`](#authoptions)
- [Authentication object](#authentication-object)
  - [OAuth APP user authentication](#oauth-app-user-authentication)
  - [GitHub APP user authentication with expiring tokens disabled](#github-app-user-authentication-with-expiring-tokens-disabled)
  - [GitHub APP user authentication with expiring tokens enabled](#github-app-user-authentication-with-expiring-tokens-enabled)
- [`auth.hook(request, route, parameters)` or `auth.hook(request, options)`](#authhookrequest-route-parameters-or-authhookrequest-options)
- [Types](#types)
- [How it works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

## Usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

Load `@octokit/auth-oauth-device` directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { createOAuthDeviceAuth } from "https://cdn.pika.dev/@octokit/auth-oauth-device";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core @octokit/auth-oauth-device`

```js
const { createOAuthDeviceAuth } = require("@octokit/auth-oauth-device");
```

</td></tr>
</tbody>
</table>

### For OAuth Apps

```js
const auth = createOAuthDeviceAuth({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
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

const tokenAuthentication = await auth({
  type: "oauth",
});
// resolves with
// {
//   type: "token",
//   tokenType: "oauth",
//   clientType: "oauth-app",
//   clientId: "1234567890abcdef1234",
//   token: "...", /* the created oauth token */
//   scopes: [] /* depend on request scopes by OAuth app */
// }
```

### For GitHub Apps

GitHub Apps do not support `scopes`. Client IDs of GitHub Apps have a `lv1.` prefix. If the GitHub App has expiring user tokens enabled, the resulting `authentication` object has extra properties related to expiration and refreshing the token.

```js
const auth = createOAuthDeviceAuth({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
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

const tokenAuthentication = await auth({
  type: "oauth",
});
// resolves with
// {
//   type: "token",
//   tokenType: "oauth",
//   clientType: "github-app",
//   clientId: "lv1.1234567890abcdef",
//   token: "...", /* the created oauth token */
// }
// or if expiring user tokens are enabled
// {
//   type: "token",
//   tokenType: "oauth",
//   clientType: "github-app",
//   clientId: "lv1.1234567890abcdef",
//   token: "...", /* the created oauth token */
//   refreshToken: "...",
//   expiresAt: "2022-01-01T08:00:0.000Z",
//   refreshTokenExpiresAt: "2021-07-01T00:00:0.000Z",
// }
```

## `createOAuthDeviceAuth(options)`

The `createOAuthDeviceAuth` method accepts a single `options` parameter

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
        <code>onVerification</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>
        <strong>Required</strong>. A function that is called once the device and user codes were retrieved

The `onVerification()` callback can be used to pause until the user completes step 2, which might result in a better user experience.

```js
const auth = createOAuthDeviceAuth({
  clientId: "1234567890abcdef1234",
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
        <code>clientType</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>

Must be either `oauth-app` or `github-app`. Defaults to `oauth-app`.

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
createOAuthDeviceAuth({
  clientId: "1234567890abcdef1234",
  clientSecret: "secret",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td></tr>
    <tr>
      <th>
        <code>scopes</code>
      </th>
      <th>
        <code>array of strings</code>
      </th>
      <td>

Only relavant if `clientType` is set to `"oauth-app"`.

Array of scope names enabled for the token. Defaults to `[]`. See [available scopes](https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes).

</td>
    </tr>
  </tbody>
</table>

## `auth(options)`

The async `auth()` method returned by `createOAuthDeviceAuth(options)` accepts the following options

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
        <strong>Required.</strong> Must be set to <code>"oauth"</code>
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

Only relevant if the `clientType` strategy options was set to `"oauth-app"`

Array of scope names enabled for the token. Defaults to what was set in the [strategy options](#createoauthdeviceauthoptions). See <a href="https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes">available scopes</a>

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

Defaults to `false`. When set to `false`, calling `auth(options)` will resolve with a token that was previously created for the same scopes if it exists. If set to `true` a new token will always be created.

</td>
    </tr>
  </tbody>
</table>

## Authentication object

The async `auth(options)` method resolves to one of three possible objects

1. OAuth APP user authentication
1. GitHub APP user authentication with expiring tokens disabled
1. GitHub APP user authentication with expiring tokens enabled

The differences are

1. `scopes` is only present for OAuth Apps
2. `refreshToken`, `expiresAt`, `refreshTokenExpiresAt` are only present for GitHub Apps, and only if token expiration is enabled

### OAuth APP user authentication

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
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The personal access token
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

### GitHub APP user authentication with expiring tokens disabled

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
        <code>token</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The personal access token
      </td>
    </tr>
  </tbody>
</table>

### GitHub APP user authentication with expiring tokens enabled

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
  OAuthAppStrategyOptions,
  OAuthAppAuthOptions,
  OAuthAppAuthentication,
  GitHubAppStrategyOptions,
  GitHubAppAuthOptions,
  GitHubAppAuthentication,
  GitHubAppAuthenticationWithExpiration,
} from "@octokit/auth-oauth-device";
```

## How it works

GitHub's OAuth Device flow is different from the web flow in two ways

1. It does not require a URL redirect, which makes it great for devices and CLI apps
2. It does not require the OAuth client secret, which means there is no user-owned server component required.

The flow has 3 parts (see [GitHub documentation](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow))

1. `@octokit/auth-oauth-device` requests a device and user code
2. Then the user has to open https://github.com/login/device (or it's GitHub Enterprise Server equivalent) and enter the user code
3. While the user enters the code, `@octokit/auth-oauth-device` is sending requests in the background to retrieve the OAuth access token. Once the user completed step 2, the request will succeed and the token will be returned

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
