# oauth-methods.js

> Set of stateless request methods to create, check, reset, refresh, and delete user access tokens for OAuth and GitHub Apps

[![@latest](https://img.shields.io/npm/v/@octokit/oauth-methods.svg)](https://www.npmjs.com/package/@octokit/oauth-methods)
[![Build Status](https://github.com/octokit/oauth-methods.js/workflows/Test/badge.svg)](https://github.com/octokit/oauth-methods.js/actions?query=workflow%3ATest+branch%3Amain)

<!-- toc -->

- [Usage](#usage)
  - [OAuth Web Flow](#oauth-web-flow)
  - [OAuth Device Flow](#oauth-device-flow)
- [Methods](#methods)
  - [`getWebFlowAuthorizationUrl()`](#getwebflowauthorizationurl)
  - [`exchangeWebFlowCode()`](#exchangewebflowcode)
  - [`createDeviceCode()`](#createdevicecode)
  - [`exchangeDeviceCode()`](#exchangedevicecode)
  - [`checkToken()`](#checktoken)
  - [`refreshToken()`](#refreshtoken)
  - [`scopeToken()`](#scopetoken)
  - [`resetToken()`](#resettoken)
  - [`deleteToken()`](#deletetoken)
  - [`deleteAuthorization()`](#deleteauthorization)
- [Authentication object](#authentication-object)
  - [OAuth APP authentication](#oauth-app-authentication)
  - [GitHub App with non-expiring user authentication](#github-app-with-non-expiring-user-authentication)
  - [GitHub App with expiring user authentication](#github-app-with-expiring-user-authentication)
- [Types](#types)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

The OAuth endpoints related to user access tokens are not all part of GitHub's REST API and they behave slightly different. The methods exported by `@octokit/normalize the differences so you don't have to.

## Usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

`@octokit/oauth-methods` is not meant for browser usage.

Some of the methods will work, but others do not have CORS headers enabled and will fail (`exchangeWebFlowCode()`, `createDeviceCode()`, `exchangeDeviceCode()`, `refreshToken()`). Also the Client Secret should not be exposed to clients as it can be used for a [Person-in-the-middle attack](https://en.wikipedia.org/wiki/Person-in-the-middle_attack).

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core @octokit/oauth-methods`

```js
const {
  exchangeWebFlowCode,
  createDeviceCode,
  exchangeDeviceCode,
  checkToken,
  refreshToken,
  scopeToken,
  resetToken,
  deleteToken,
  deleteAuthorization,
} = require("@octokit/oauth-methods");
```

</td></tr>
</tbody>
</table>

### OAuth Web Flow

After a user granted access to an OAuth App or GitHub App on [Step 1 of GitHub's OAuth Web Flow](https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps#1-request-a-users-github-identity), they get redirected to a URL controlled by your app with a `?code=...` query parameter.

You can exchange that code for a user access token as described in [Step 2 of GitHub's OAuth Web Flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github).

Setting `clientType` is required because there are slight differences between `"oauth-app"` and `"github-app"`. Most importantly, GitHub Apps do not support scopes.

```js
const { data, authentication } = await exchangeWebFlowCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  code: "code123",
  scopes: ["repo"],
});
```

`data` is the raw response data. `authentication` is a [User Authentication object](#authentication-object).

### OAuth Device Flow

In [step 1 of GitHub's OAuth Device Flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#step-1-app-requests-the-device-and-user-verification-codes-from-github), you need to create a device and user code

```js
const {
  data: { device_code, user_code, verification_uri },
} = await createDeviceCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  scopes: ["repo"],
});
```

In [step 2 of GitHub's OAuth Device Flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#step-2-prompt-the-user-to-enter-the-user-code-in-a-browser), the user has to enter `user_code` on `verification_uri` (https://github.com/login/device unless you use GitHub Enterprise Server).

Once the user entered the code and granted access, you can exchange the `device_code` for a user access token in [step 3 of GitHub's OAuth Device Flow](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#step-3-app-polls-github-to-check-if-the-user-authorized-the-device)

```js
const { data, authentication } = await exchangeDeviceCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  code: device_code,
});
```

`data` is the raw response data. `authentication` is a [User Authentication object](#authentication-object).

## Methods

### `getWebFlowAuthorizationUrl()`

This is a wrapper around [`@octokit/oauth-authorization-url`](https://github.com/octokit/oauth-authorization-url.js#readme) that accepts a `request` option instead of `baseUrl` for consistency with the other OAuth methods. `getWebFlowAuthorizationUrl()` is a synchronous method and does not send any request.

```js
const { url } = getWebFlowAuthorizationUrl({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  scopes: ["repo"],
});
```

Options

<table>
  <thead align=left>
    <tr>
      <th>
        name
      </th>
      <th>
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
        <strong>Required</strong>. The client ID you received from GitHub when you registered.
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
        <strong>Required.</strong> Must be set to either <code>"oauth-app"</code> or <code>"github-app"</code>.
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
        The URL in your application where users will be sent after authorization. See <a href="https://developer.github.com/enterprise/2.16/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls">Redirect URLs</a> in GitHub’s Developer Guide.
      </td>
    </tr>
    <tr>
      <th>
        <code>login</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Suggests a specific account to use for signing in and authorizing the app.
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

Only relevant if `clientType` is set to `"oauth-app"`.

An array of scope names (or: space-delimited list of scopes). If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.

Defaults to `[]`.

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
        An unguessable random string. It is used to protect against cross-site request forgery attacks.
        Defaults to <code>Math.random().toString(36).substr(2)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>allowSignup</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>
        Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. Use <code>false</code> in the case that a policy prohibits signups. Defaults to <code>true</code>. 
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { url } = getWebFlowAuthorizationUrl({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  scopes: ["repo"],
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

The `getWebFlowAuthorizationUrl` method is synchronous and returns an object with the following properties.

<table>
  <thead align=left>
    <tr>
      <th>
        name
      </th>
      <th>
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
        <code>allowSignup</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>
        Returns <code>options.allowSignup</code> if it was set. Defaults to <code>true</code>.
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
        Returns <code>options.clientType</code>
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
        Returns <code>options.clientId</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>login</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        Returns <code>options.login</code> if it was set. Defaults to <code>null</code>.
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
        Returns <code>options.redirectUrl</code> if it was set. Defaults to <code>null</code>.
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

Only set if `options.clientType` is set to `"oauth-app"`.

Returns an array of strings. Returns <code>options.scopes</code> if it was set and turns the string into an array if a string was passed, otherwise <code>[]</code>.

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
        Returns <code>options.state</code> if it was set. Defaults to <code>Math.random().toString(36).substr(2)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>url</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        The authorization URL
      </td>
    </tr>
  </tbody>
</table>

### `exchangeWebFlowCode()`

```js
const { data, authentication } = await exchangeWebFlowCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  code: "code123",
});
```

Options

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
        <strong>Required</strong>. Must be set to either <code>"oauth-app"</code> or <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
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
        <strong>Required</strong>. The code from GitHub's OAuth flow redirect's <code>?code=...</code> query parameter
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
        The <code>redirectUrl</code> option you passed to <a href="#getwebflowauthorizationurl"><code>getWebFlowAuthorizationUrl()</code></a>
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
        The <code>state</code> option you passed to <a href="#getwebflowauthorizationurl"><code>getWebFlowAuthorizationUrl()</code></a>
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await exchangeWebFlowCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  code: "code123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`POST /login/oauth/access_token`](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#response) (JSON) with an additional `authentication` key which is the [authentication object](#authentication-object).

### `createDeviceCode()`

```js
const { data, authentication } = await createDeviceCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  scopes: ["repo"],
});
```

Options

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
        <strong>Required</strong>. Must be set to either <code>"oauth-app"</code> or <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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

Only permitted if `clientType` is set to `"oauth-app"`. GitHub Apps do not support scopes.

Array of [scope names](https://docs.github.com/en/developers/apps/scopes-for-oauth-apps#available-scopes) you want to request for the user access token.

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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data } = await createDeviceCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  scopes: ["repo"],
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`POST https://github.com/login/device/code`](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#response-1) (JSON).

### `exchangeDeviceCode()`

```js
const { data, authentication } = await exchangeDeviceCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  code: "code123",
});
```

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
        <strong>Required</strong>. Must be set to either <code>"oauth-app"</code> or <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. The <code>decive_code</code> from the <code>createDeviceCode()</code> response
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await exchangeDeviceCode({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  code: "code123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

### `checkToken()`

```js
const { data, authentication } = await checkToken({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  token: "usertoken123",
});
```

Options

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
        <strong>Required</strong>. Must be set to either <code>"oauth-app"</code> or <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
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
        <strong>Required</strong>. The user access token to check
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await checkToken({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  token: "usertoken123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`POST /applications/{client_id}/token`](https://docs.github.com/en/rest/reference/apps#check-a-token) with an additional `authentication` key which is the [authentication object](#authentication-object). Note that the `authentication` object will not include the keys for expiring authentication.

### `refreshToken()`

Expiring user access tokens are currently in preview. You can [enable them for any of your GitHub apps](https://docs.github.com/en/developers/apps/refreshing-user-to-server-access-tokens#configuring-expiring-user-tokens-for-an-existing-github-app). OAuth Apps do not support expiring user access tokens

When a user access token expires it can be [refreshed using a refresh token](https://docs.github.com/en/developers/apps/refreshing-user-to-server-access-tokens). Refreshing a token invalidates the current user access token.

```js
const { data, authentication } = await refreshToken({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  refreshToken: "r1.refreshtoken123",
});
```

Options

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
        Must be set to <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
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
        <strong>Required</strong>. The refresh token that was received alongside the user access token.
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await refreshToken({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  refreshToken: "r1.refreshtoken123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`POST /login/oauth/access_token`](https://docs.github.com/en/developers/apps/refreshing-user-to-server-access-tokens#response) with an additional `authentication` key which is the [GitHub App expiring user authentication](#github-app-with-expiring-user-authentication).

### `scopeToken()`

```js
const { data, authentication } = await scopeToken({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  token: "usertoken123",
  target: "octokit",
  repositories: ["oauth-methods.js"],
  permissions: {
    issues: "write",
  },
});
```

Options

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
        <strong>Required</strong>. Must be set to <code>"github-app"</code>.
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
      </td>
    </tr>
    <tr>
      <th>
        <code>target</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required unless <code>targetId</code> is set</strong>. The name of the user or organization to scope the user-to-server access token to.
      </td>
    </tr>
    <tr>
      <th>
        <code>targetId</code>
      </th>
      <th>
        <code>integer</code>
      </th>
      <td>
        <strong>Required unless <code>target</code> is set</strong>. The ID of the user or organization to scope the user-to-server access token to.
      </td>
    </tr>
    <tr>
      <th>
        <code>repositories</code>
      </th>
      <th>
        <code>array of strings</code>
      </th>
      <td>
        The list of repository names to scope the user-to-server access token to. <code>repositories</code> may not be specified if <code>repository_ids</code> is specified.
      </td>
    </tr>
    <tr>
      <th>
        <code>repository_ids</code>
      </th>
      <th>
        <code>array of integers</code>
      </th>
      <td>
        The list of repository IDs to scope the user-to-server access token to. <code>repositories</code> may not be specified if <code>repositories</code> is specified.
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
        The permissions granted to the user-to-server access token. See <a href="https://docs.github.com/en/rest/reference/permissions-required-for-github-apps">GitHub App Permissions</a>.
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await scopeToken({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  token: "usertoken123",
  target: "octokit",
  repositories: ["oauth-methods.js"],
  permissions: {
    issues: "write",
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

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`POST /applications/{client_id}/token/scoped`](https://docs.github.com/en/rest/reference/apps#create-a-scoped-access-token) with an additional `authentication` key which is the new [authentication object](#authentication-object).

### `resetToken()`

```js
const { data, authentication } = await resetToken({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  token: "usertoken123",
});
```

Options

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
        Must be set to <code>"oauth-app"</code> or <code>"github-app"</code>.
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
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
        <strong>Required</strong>. The user access token to reset
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await resetToken({
  clientId: "1234567890abcdef1234",
  clientSecret: "secret",
  token: "usertoken123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`POST /applications/{client_id}/token`](https://docs.github.com/en/rest/reference/apps#reset-a-token) with an additional `authentication` key which is the new [authentication object](#authentication-object).

### `deleteToken()`

```js
const { status } = await deleteToken({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  token: "usertoken123",
});
```

Options

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
        Must be set to <code>"oauth-app"</code> or <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
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
        <strong>Required</strong>. The user access token to delete
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await deleteToken({
  clientId: "1234567890abcdef1234",
  clientSecret: "secret",
  token: "usertoken123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`DELETE /applications/{client_id}/token`](https://docs.github.com/en/rest/reference/apps#delete-an-app-token) (which is an empty `204` response).

### `deleteAuthorization()`

```js
const { status } = await deleteAuthorization({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  clientSecret: "1234567890abcdef12347890abcdef12345678",
  token: "usertoken123",
});
```

Options

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
        Must be set to <code>"oauth-app"</code> or <code>"github-app"</code>
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
        <strong>Required</strong>. Your app's client ID
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
        <strong>Required</strong>. One of your app's client secrets
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
        <strong>Required</strong>. A valid user access token for the authorization
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
        You can pass in your own <a href="https://github.com/octokit/request.js"><code>@octokit/request</code></a> instance. For usage with enterprise, set <code>baseUrl</code> to the REST API root endpoint. Example:

```js
const { request } = require("@octokit/request");
const { data, authentication } = await deleteAuthorization({
  clientId: "1234567890abcdef1234",
  clientSecret: "secret",
  token: "usertoken123",
  request: request.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

</td>
    </tr>
  </tbody>
</table>

Resolves with an [`@octokit/request` response object](https://github.com/octokit/request.js/#request) for [`DELETE /applications/{client_id}/grant`](https://docs.github.com/en/rest/reference/apps#delete-an-app-authorization) (which is an empty `204` response).

## Authentication object

The `authentication` object returned by the methods have one of three formats.

1. [OAuth APP authentication token](#oauth-app-authentication-token)
1. [GitHub APP non-expiring user authentication token with expiring disabled](#github-app-user-authentication-token-with-expiring-disabled)
1. [GitHub APP user authentication token with expiring enabled](#github-app-user-authentication-token-with-expiring-enabled)

The differences are

1. `scopes` is only present for OAuth Apps
2. `refreshToken`, `expiresAt`, `refreshTokenExpiresAt` are only present for GitHub Apps, and only if token expiration is enabled

Note that the `clientSecret` may not be set when using [`exchangeDeviceCode()`](#exchangedevicecode) as `clientSecret` is not required for the OAuth device flow.

### OAuth APP authentication

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

### GitHub App with non-expiring user authentication

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
  </tbody>
</table>

### GitHub App with expiring user authentication

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

## Types

```ts
import {
  OAuthAppAuthentication,
  GitHubAppAuthentication,
  GitHubAppAuthenticationWithExpiration,
  GetWebFlowAuthorizationUrlOAuthAppOptions,
  GetWebFlowAuthorizationUrlGitHubAppOptions,
  GetWebFlowAuthorizationUrlOAuthAppResult,
  GetWebFlowAuthorizationUrlGitHubAppResult,
  CheckTokenOAuthAppOptions,
  CheckTokenGitHubAppOptions,
  CheckTokenOAuthAppResponse,
  CheckTokenGitHubAppResponse,
  ExchangeWebFlowCodeOAuthAppOptions,
  ExchangeWebFlowCodeGitHubAppOptions,
  ExchangeWebFlowCodeOAuthAppResponse,
  ExchangeWebFlowCodeGitHubAppResponse,
  CreateDeviceCodeOAuthAppOptions,
  CreateDeviceCodeGitHubAppOptions,
  CreateDeviceCodeDeviceTokenResponse,
  ExchangeDeviceCodeOAuthAppOptionsWithoutClientSecret,
  ExchangeDeviceCodeOAuthAppOptions,
  ExchangeDeviceCodeGitHubAppOptionsWithoutClientSecret,
  ExchangeDeviceCodeGitHubAppOptions,
  ExchangeDeviceCodeOAuthAppResponse,
  ExchangeDeviceCodeOAuthAppResponseWithoutClientSecret,
  ExchangeDeviceCodeGitHubAppResponse,
  ExchangeDeviceCodeGitHubAppResponseWithoutClientSecret,
  RefreshTokenOptions,
  RefreshTokenResponse,
  ScopeTokenOptions,
  ScopeTokenResponse,
  ResetTokenOAuthAppOptions,
  ResetTokenGitHubAppOptions,
  ResetTokenOAuthAppResponse,
  ResetTokenGitHubAppResponse,
  DeleteTokenOAuthAppOptions,
  DeleteTokenGitHubAppOptions,
  DeleteTokenResponse,
  DeleteAuthorizationOAuthAppOptions,
  DeleteAuthorizationGitHubAppOptions,
  DeleteAuthorizationResponse,
} from "@octokit/oauth-methods";
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
