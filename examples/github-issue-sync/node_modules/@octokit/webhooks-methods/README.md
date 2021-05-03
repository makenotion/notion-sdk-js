# webhooks-methods.js

> Methods to handle GitHub Webhook requests

[![@latest](https://img.shields.io/npm/v/@octokit/webhooks-methods.svg)](https://www.npmjs.com/package/@octokit/webhooks-methods)
[![Build Status](https://github.com/octokit/webhooks-methods.js/workflows/Test/badge.svg)](https://github.com/octokit/webhooks-methods.js/actions?query=workflow%3ATest+branch%3Amain)

<details>
<summary>Table of contents</summary>

<!-- toc -->

- [usage](#usage)
- [Methods](#methods)
  - [`sign()`](#sign)
  - [`verify()`](#verify)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

</details>

## usage

<table>
<tbody valign=top align=left>
<tr><th>

Browsers

</th><td width=100%>

🚧 `@octokit/webhooks-methods` is not meant to be used in browsers. The webhook secret is a sensitive credential that must not be exposed to users.

Load `@octokit/webhooks-methods` directly from [cdn.skypack.dev](https://cdn.skypack.dev)

```html
<script type="module">
  import {
    sign,
    verify,
  } from "https://cdn.skypack.dev/@octokit/webhooks-methods";
</script>
```

</td></tr>
<tr><th>

Node

</th><td>

Install with `npm install @octokit/core @octokit/webhooks-methods`

```js
const { sign, verify } = require("@octokit/webhooks-methods");
```

</td></tr>
</tbody>
</table>

```js
await sign("mysecret", eventPayload);
// resolves with a string like "sha256=4864d2759938a15468b5df9ade20bf161da9b4f737ea61794142f3484236bda3"

await sign({ secret: "mysecret", algorithm: "sha1" }, eventPayload);
// resolves with a string like "sha1=d03207e4b030cf234e3447bac4d93add4c6643d8"

await verify("mysecret", eventPayload, "sha256=486d27...");
// resolves with true or false
```

## Methods

### `sign()`

```js
await sign(secret, eventPayload);
await sign({ secret, algorithm }, eventPayload);
```

<table width="100%">
  <tr>
    <td>
      <code>
        secret
      </code>
      <em>(String)</em>
    </td>
    <td>
      <strong>Required.</strong>
      Secret as configured in GitHub Settings.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        algorithm
      </code>
      <em>
        (String)
      </em>
    </td>
    <td>

Algorithm to calculate signature. Can be set to `sha1` or `sha256`. `sha1` is supported for legacy reasons. GitHub Enterprise Server 2.22 and older do not send the `X-Hub-Signature-256` header. Defaults to `sha256`.

Learn more at [Validating payloads from GitHub](https://docs.github.com/en/developers/webhooks-and-events/securing-your-webhooks#validating-payloads-from-github)

</td>
  </tr>
  <tr>
    <td>
      <code>
        eventPayload
      </code>
      <em>
        (Object)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request payload as received from GitHub
    </td>
  </tr>
</table>

Resolves with a `signature` string. Throws an error if an argument is missing.

### `verify()`

```js
await verify(secret, eventPayload, signature);
```

<table width="100%">
  <tr>
    <td>
      <code>
        secret
      </code>
      <em>(String)</em>
    </td>
    <td>
      <strong>Required.</strong>
      Secret as configured in GitHub Settings.
    </td>
  </tr>
  <tr>
    <td>
      <code>
        eventPayload
      </code>
      <em>
        (Object)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Webhook request payload as received from GitHub
    </td>
  </tr>
  <tr>
    <td>
      <code>
        signature
      </code>
      <em>
        (String)
      </em>
    </td>
    <td>
      <strong>Required.</strong>
      Signature string as calculated by <code><a href="../sign">sign()</a></code>.
    </td>
  </tr>
</table>

Resolves with `true` or `false`. Throws error if an argument is missing.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
