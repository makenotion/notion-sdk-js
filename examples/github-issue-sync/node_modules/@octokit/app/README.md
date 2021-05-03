# app.js

> GitHub App toolset for Node.js

[![@latest](https://img.shields.io/npm/v/@octokit/app.svg)](https://www.npmjs.com/package/@octokit/app)
[![Build Status](https://github.com/octokit/app.js/workflows/Test/badge.svg)](https://github.com/octokit/app.js/actions?workflow=Test)

<!-- toc -->

- [Usage](#usage)
- [`App.defaults(options)`](#appdefaultsoptions)
- [Constructor](#constructor)
- [API](#api)
  - [`app.octokit`](#appoctokit)
  - [`app.log`](#applog)
  - [`app.getInstallationOctokit`](#appgetinstallationoctokit)
  - [`app.eachInstallation`](#appeachinstallation)
  - [`app.eachRepository`](#appeachrepository)
  - [`app.webhooks`](#appwebhooks)
  - [`app.oauth`](#appoauth)
- [Middlewares](#middlewares)
  - [`createNodeMiddleware(app, options)`](#createnodemiddlewareapp-options)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

## Usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

`@octokit/app` is not meant for browser usage.

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/app`

```js
const { App, createNodeMiddleware } = require("@octokit/app");
```

</td></tr>
</tbody>
</table>

```js
const app = new App({
  appId: 123,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  oauth: {
    clientId: "0123",
    clientSecret: "0123secret",
  },
  webhooks: {
    secret: "secret",
  },
});

const { data } = await app.octokit.request("/app");
console.log("authenticated as %s", data.name);

for await (const { octokit, repository } of app.eachRepository.iterator()) {
  await octokit.request("POST /repos/{owner}/{repo}/dispatches", {
    owner: repository.owner.login,
    repo: repository.name,
    event_type: "my_event",
  });
}

app.webhooks.on("issues.opened", async ({ octokit, payload }) => {
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body: "Hello World!",
    }
  );
});

app.oauth.on("token", async ({ token, octokit }) => {
  const { data } = await octokit.request("GET /user");
  console.log(`Token retrieved for ${data.login}`);
});

require("http").createServer(createNodeMiddleware(app)).listen(3000);
// can now receive requests at /api/github/*
```

## `App.defaults(options)`

Create a new `App` with custom defaults for the [constructor options](#constructor-options)

```js
const MyApp = App.defaults({
  Octokit: MyOctokit,
});
const app = new MyApp({ clientId, clientSecret });
// app.octokit is now an instance of MyOctokit
```

## Constructor

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
        <strong>Required</strong>. Find the <strong>App ID</strong> on the app’s about page in settings.
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
    <tr id="constructor-option-octokit">
      <th>
        <code>Octokit</code>
      </th>
      <th>
        <code>Constructor</code>
      </th>
      <td>

You can pass in your own Octokit constructor with custom defaults and plugins. Note that `authStrategy` will be always be set to `createAppAuth` from [`@octokit/auth-app`](https://github.com/octokit/auth-app.js).

For usage with enterprise, set `baseUrl` to the hostname + `/api/v3`. Example:

```js
const { Octokit } = require("@octokit/core");
new App({
  appId: 123,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  oauth: {
    clientId: 123,
    clientSecret: "secret",
  },
  webhooks: {
    secret: "secret",
  },
  Octokit: Octokit.defaults({
    baseUrl: "https://ghe.my-company.com/api/v3",
  }),
});
```

Defaults to [`@octokit/core`](https://github.com/octokit/core.js).

</td></tr>
    <tr id="constructor-option-log">
      <th>
        <code>log</code>
      </th>
      <th>
        <code>object</code>
      </th>
      <td>
        Used for internal logging. Defaults to <a href="https://developer.mozilla.org/en-US/docs/Web/API/console"><code>console</code></a>.
      </td>
    </tr>
    <tr>
      <th>
        <code>webhooks.secret</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required.</strong> Secret as configured in the GitHub App's settings.
      </td>
    </tr>
    <tr>
      <th>
        <code>webhooks.transform</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>
        Only relevant for `app.webhooks.on`. Transform emitted event before calling handlers. Can be asynchronous. 
      </td>
    </tr>
    <tr>
      <th>
        <code>oauth.clientId</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        Find the OAuth <strong>Client ID</strong> on the app’s about page in settings.
      </td>
    </tr>
    <tr>
      <th>
        <code>oauth.clientSecret</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        Find the OAuth  <strong>Client Secret</strong> on the app’s about page in settings.
      </td>
    </tr>
    <tr>
      <th>
        <code>oauth.allowSignup</code>
      </th>
      <th>
        <code>boolean</code>
      </th>
      <td>
        Sets the default value for <code>app.oauth.getAuthorizationUrl(options)</code>.
      </td>
    </tr>
  </tbody>
</table>

## API

### `app.octokit`

Octokit instance. Uses the [`Octokit` constructor option](#constructor-option-octokit) if passed.

### `app.log`

See https://github.com/octokit/core.js#logging. Customize using the [`log` constructor option](#constructor-option-log).

### `app.getInstallationOctokit`

```js
const { octokit } = await app.getInstallationOctokit(123);
```

### `app.eachInstallation`

```js
for await (const { octokit, installation } of app.eachInstallation.iterator()) { /* ... */ }
await app.eachInstallation(({ octokit, installation }) => /* ... */)
```

### `app.eachRepository`

```js
for await (const { octokit, repository } of app.eachRepository.iterator()) { /* ... */ }
await app.eachRepository(({ octokit, repository }) => /* ... */)
```

Optionally pass installation ID to iterate through all repositories in one installation

```js
for await (const { octokit, repository } of app.eachRepository.iterator({ installationId })) { /* ... */ }
await app.eachRepository({ installationId }, ({ octokit, repository }) => /* ... */)
```

### `app.webhooks`

An [`@octokit/webhooks` instance](https://github.com/octokit/webhooks.js/#readme)

### `app.oauth`

An [`@octokit/oauth-app` instance](https://github.com/octokit/oauth-app.js/#readme)

## Middlewares

A middleware is a method or set of methods to handle requests for common environments.

By default, all middlewares expose the following routes

| Route                            | Route Description                                                                                                                                                                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /api/github/webhooks`      | Endpoint to receive GitHub Webhook Event requests                                                                                                                                                                                                               |
| `GET /api/github/oauth/login`    | Redirects to GitHub's authorization endpoint. Accepts optional `?state` query parameter.                                                                                                                                                                        |
| `GET /api/github/oauth/callback` | The client's redirect endpoint. This is where the `token` event gets triggered                                                                                                                                                                                  |
| `POST /api/github/oauth/token`   | Exchange an authorization code for an OAuth Access token. If successful, the `token` event gets triggered.                                                                                                                                                      |
| `GET /api/github/oauth/token`    | Check if token is valid. Must authenticate using token in `Authorization` header. Uses GitHub's [`POST /applications/{client_id}/token`](https://developer.github.com/v3/apps/oauth_applications/#check-a-token) endpoint                                       |
| `PATCH /api/github/oauth/token`  | Resets a token (invalidates current one, returns new token). Must authenticate using token in `Authorization` header. Uses GitHub's [`PATCH /applications/{client_id}/token`](https://developer.github.com/v3/apps/oauth_applications/#reset-a-token) endpoint. |
| `DELETE /api/github/oauth/token` | Invalidates current token, basically the equivalent of a logout. Must authenticate using token in `Authorization` header.                                                                                                                                       |
| `DELETE /api/github/oauth/grant` | Revokes the user's grant, basically the equivalent of an uninstall. must authenticate using token in `Authorization` header.                                                                                                                                    |

### `createNodeMiddleware(app, options)`

Native http server middleware for Node.js

```js
const { App, createNodeMiddleware } = require("@octokit/app");
const app = new App({
  appId: 123,
  privateKey: "-----BEGIN PRIVATE KEY-----\n...",
  oauth: {
    clientId: "0123",
    clientSecret: "0123secret",
  },
  webhooks: {
    secret: "secret",
  },
});

const middleware = createNodeMiddleware(app);

require("http").createServer(middleware).listen(3000);
// can now receive user authorization callbacks at /api/github/*
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
        <code>app</code>
      </th>
      <th>
        <code>App instance</code>
      </th>
      <td>
        <strong>Required</strong>.
      </td>
    </tr>
    <tr>
      <th>
        <code>options.pathPrefix</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>

All exposed paths will be prefixed with the provided prefix. Defaults to `"/api/github"`

</td>
    </tr>
    <tr>
      <td>
        <code>log</code>
        <em>
          object
        </em>
      </td>
      <td>

Used for internal logging. Defaults to [`console`](https://developer.mozilla.org/en-US/docs/Web/API/console) with `debug` and `info` doing nothing.

</td>
    </tr>
    <tr>
      <th>
        <code>options.onUnhandledRequest</code>
      </th>
      <th>
        <code>function</code>
      </th>
      <td>

Defaults to

```js
function onUnhandledRequest(request, response) {
  response.writeHead(400, {
    "content-type": "application/json",
  });
  response.end(
    JSON.stringify({
      error: error.message,
    })
  );
}
```

</td></tr>
  </tbody>
</table>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
