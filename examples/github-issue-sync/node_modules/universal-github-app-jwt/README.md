# universal-github-app-jwt

> Calculate GitHub App bearer tokens for Node & modern browsers

[![@latest](https://img.shields.io/npm/v/universal-github-app-jwt.svg)](https://www.npmjs.com/package/universal-github-app-jwt)
![Build status](https://github.com/gr2m/universal-github-app-jwt/workflows/Test/badge.svg)
[![Greenkeeper](https://badges.greenkeeper.io/gr2m/universal-github-app-jwt.svg)](https://greenkeeper.io/)

⚠ The private keys provide by GitHub are in `PKCS#1` format, but the WebCrypto API only supports `PKCS#8`. You can see the difference in the first line, `PKCS#1` format starts with `-----BEGIN RSA PRIVATE KEY-----` while `PKCS#8` starts with `-----BEGIN PRIVATE KEY-----`. You can convert one format to the other using `oppenssl`:

```
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.key
```

It's also possible to convert the formats with JavaScript, e.g. using [node-rsa](https://github.com/rzcoder/node-rsa), but it turns a 4kb to a 200kb+ built. I'm looking for help to create a minimal `PKCS#1` to `PKCS#8` convert library that I can recommend people to use before passing the private key to `githubAppJwt`. Please create an issue if you'd like to help.

The way it works with `node-rsa` is this

```js
const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----`;

const key = new NodeRSA(PRIVATE_KEY);
const privateKeyPkcs8 = key.exportKey("pkcs8-private-pem");

// privateKeyPkcs8 is now
// -----BEGIN PRIVATE KEY-----
// ...
// -----END PRIVATE KEY-----
```

When using a node, a conversion is not necessary, the implementation is agnostic to either format.

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

Load `universal-github-app-jwt` directly from [cdn.pika.dev](https://cdn.pika.dev)

```html
<script type="module">
  import { githubAppJwt } from "https://cdn.pika.dev/universal-github-app-jwt";
</script>
```

</td></tr>
<tr><th>
Node
</th><td>

Install with <code>npm install universal-github-app-jwt</code>

```js
const { githubAppJwt } = require("universal-github-app-jwt");
// or: import { githubAppJwt } from "universal-github-app-jwt";
```

</td></tr>
</tbody>
</table>

```js
(async () => {
  const { token, appId, expiration } = await githubAppJwt({
    id: APP_ID,
    privateKey: PRIVATE_KEY
  });
})();
```

The retrieved `token` can now be used in Authorization request header, e.g. with [`@octokit/request`](https://github.com/octokit/request.js/#readme):

```js
request("GET /app", {
  headers: {
    authorization: `bearer ${token}`
  }
});
```

For a complete implementation of GitHub App authentication strategies, see [`@octokit/auth-app.js`](https://github.com/octokit/auth-app.js/#readme).

## `githubAppJwt(options)`

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
        <code>options.id</code>
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
        <code>options.privateKey</code>
      </th>
      <th>
        <code>string</code>
      </th>
      <td>
        <strong>Required</strong>. Content of the <code>*.pem</code> file you downloaded from the app’s about page. You can generate a new private key if needed. Make sure to preserve the line breaks.
      </td>
    </tr>
  </tbody>
</table>

`githubAppJwt(options)` resolves with an object with the following keys

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
        The GitHub App database ID passed in <code>options.id</code>.
      </td>
    </tr>
    <tr>
      <th>
        <code>expiration</code>
      </th>
      <th>
        <code>number</code>
      </th>
      <td>
        Timestamp as UNIX epoch, e.g. <code>1530922170</code>. A Date object can be created using <code>new Date(authentication.expiration)</code>.
      </td>
    </tr>
  </tbody>
</table>

## License

[MIT](LICENSE)
