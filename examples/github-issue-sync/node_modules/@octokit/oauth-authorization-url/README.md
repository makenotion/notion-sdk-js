# oauth-authorization-url.js

> Universal library to retrieve GitHub’s identity URL for the OAuth web flow

[![@latest](https://img.shields.io/npm/v/@octokit/oauth-authorization-url.svg)](https://www.npmjs.com/package/@octokit/oauth-authorization-url)
[![Build Status](https://github.com/octokit/oauth-authorization-url.js/workflows/Test/badge.svg)](https://github.com/octokit/oauth-authorization-url.js/actions?query=workflow%3ATest+branch%3Amaster)

See [GitHub’s Developer Guide for the OAuth App web application flow](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#web-application-flow). Note that the [OAuth web application flow for GitHub Apps](https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps#web-application-flow) is slightly different. GitHub Apps do not support scopes for its user access tokens (they are called user-to-server tokens for GitHub Apps), instead they inherit the user permissions from the GitHub App's registration and the repository/organization access and permissions from the respective installation.

<!-- toc -->

- [Usage](#usage)
  - [For OAuth Apps](#for-oauth-apps)
  - [For GitHub Apps](#for-github-apps)
- [Options](#options)
- [Result](#result)
- [Types](#types)
- [License](#license)

<!-- tocstop -->

## Usage

<table>
  <tbody valign=top align=left>
    <tr>
      <th>
        Browsers
      </th>
      <td width=100%>
  
Load `@octokit/oauth-authorization-url` directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import { oauthAuthorizationUrl } from "https://cdn.skypack.dev/@octokit/oauth-authorization-url";
</script>
```

</td></tr>
    <tr>
      <th>
        Node
      </th>
      <td>

Install with <code>npm install @octokit/oauth-authorization-url</code>

```js
const { oauthAuthorizationUrl } = require("@octokit/oauth-authorization-url");
// or: import { oauthAuthorizationUrl } from "@octokit/oauth-authorization-url";
```

</td></tr>
</tbody>
</table>

### For OAuth Apps

```js
const {
  url,
  clientId,
  redirectUrl,
  login,
  scopes,
  state,
} = oauthAuthorizationUrl({
  clientType: "oauth-app",
  clientId: "1234567890abcdef1234",
  redirectUrl: "https://example.com",
  login: "octocat",
  scopes: ["repo", "admin:org"],
  state: "secret123",
});
```

### For GitHub Apps

```js
const { url, clientId, redirectUrl, login, state } = oauthAuthorizationUrl({
  clientType: "github-app",
  clientId: "lv1.1234567890abcdef",
  redirectUrl: "https://example.com",
  login: "octocat",
  state: "secret123",
});
```

## Options

<table>
  <thead align=left>
    <tr>
      <th width=200>
        name
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
      <td>
        <strong>Required</strong>. The client ID you received from GitHub when you registered.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <td>

Must be set to either `"oauth-app"` or `"github-app"`. Defaults to `"oauth-app"`.

</td>
    </tr>
    <tr>
      <th>
        <code>redirectUrl</code>
      </th>
      <td>
        The URL in your application where users will be sent after authorization. See <a href="https://developer.github.com/enterprise/2.16/apps/building-oauth-apps/authorizing-oauth-apps/#redirect-urls">Redirect URLs</a> in GitHub’s Developer Guide.
      </td>
    </tr>
    <tr>
      <th>
        <code>login</code>
      </th>
      <td>
        Suggests a specific account to use for signing in and authorizing the app.
      </td>
    </tr>
    <tr>
      <th>
        <code>scopes</code>
      </th>
      <td>

Only relevant when `clientType` is set to `"oauth-app"`.

An array of scope names (or: space-delimited list of scopes). If not provided, scope defaults to an empty list for users that have not authorized any scopes for the application. For users who have authorized scopes for the application, the user won't be shown the OAuth authorization page with the list of scopes. Instead, this step of the flow will automatically complete with the set of scopes the user has authorized for the application. For example, if a user has already performed the web flow twice and has authorized one token with user scope and another token with repo scope, a third web flow that does not provide a scope will receive a token with user and repo scope.

Defaults to `[]` if `clientType` is set to `"oauth-app"`.

</td>
    </tr>
    <tr>
      <th>
        <code>state</code>
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
      <td>
        Whether or not unauthenticated users will be offered an option to sign up for GitHub during the OAuth flow. Use <code>false</code> in the case that a policy prohibits signups. Defaults to <code>true</code>. 
      </td>
    </tr>
    <tr>
      <th>
        <code>baseUrl</code>
      </th>
      <td>
        When using GitHub Enterprise Server, set the baseUrl to the origin, e.g. <code>https://github.my-enterprise.com</code>.
      </td>
    </tr>
  </tbody>
</table>

## Result

`oauthAuthorizationUrl()` returns an object with the following properties

<table>
  <thead align=left>
    <tr>
      <th width=200>
        name
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
      <td>
        Returns <code>options.allowSignup</code> if it was set. Defaults to <code>true</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientType</code>
      </th>
      <td>
        Returns <code>options.clientType</code>. Defaults to <code>"oauth-app"</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>clientId</code>
      </th>
      <td>
        Returns <code>options.clientId</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>login</code>
      </th>
      <td>
        Returns <code>options.login</code> if it was set. Defaults to <code>null</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>redirectUrl</code>
      </th>
      <td>
        Returns <code>options.redirectUrl</code> if it was set. Defaults to <code>null</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>scopes</code>
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
      <td>
        Returns <code>options.state</code> if it was set. Defaults to Defaults to <code>Math.random().toString(36).substr(2)</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>url</code>
      </th>
      <td>
        The authorization URL
      </td>
    </tr>
  </tbody>
</table>

## Types

```ts
import {
  ClientType,
  OAuthAppOptions,
  OAuthAppResult,
  GitHubAppOptions,
  GitHubAppResult,
} from "@octokit/oauth-authorization-url";
```

## License

[MIT](LICENSE)
