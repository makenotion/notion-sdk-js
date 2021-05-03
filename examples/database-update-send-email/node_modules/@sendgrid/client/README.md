[![BuildStatus](https://travis-ci.com/sendgrid/sendgrid-nodejs.svg?branch=main)](https://travis-ci.com/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](../../README.md) for details.**

# Client for the SendGrid v3 Web API
This client library is used by the other [Twilio SendGrid service packages](https://www.npmjs.com/org/sendgrid) to make requests to the [Twilio SendGrid v3 Web API](https://sendgrid.com/docs/API_Reference/api_v3.html). You can also use it independently to make custom requests to the Twilio SendGrid v3 Web API and other HTTP APIs.

To be notified when this package is updated, please subscribe to email [notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

# Installation

## Prerequisites

- Node.js version 6, 8 or >=10
- A Twilio SendGrid account, [sign up for free](https://sendgrid.com/free?source=sendgrid-nodejs) to send up to 40,000 emails for the first 30 days or check out [our pricing](https://sendgrid.com/pricing?source=sendgrid-nodejs).

## Obtain an API Key

Grab your API Key from the [Twilio SendGrid UI](https://app.sendgrid.com/settings/api_keys).

## Setup Environment Variables

Do not hardcode your [Twilio SendGrid API Key](https://app.sendgrid.com/settings/api_keys) into your code. Instead, use an environment variable or some other secure means of protecting your Twilio SendGrid API Key. Following is an example of using an environment variable.

Update the development environment with your [SENDGRID_API_KEY](https://app.sendgrid.com/settings/api_keys), for example:

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save @sendgrid/client
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @sendgrid/client
```

<a name="general"></a>
## General v3 Web API Usage Example

Please see [USAGE.md](USAGE.md) for all endpoint examples for the [Twilio SendGrid v3 Web API](https://sendgrid.com/docs/API_Reference/api_v3.html).

```js
const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);
const request = {
  method: 'GET',
  url: '/v3/api_keys'
};
client.request(request)
.then(([response, body]) => {
  console.log(response.statusCode);
  console.log(body);
})
```

## Add a Custom Default Header
```js
client.setDefaultHeader('User-Agent', 'Some user agent string');
// or
client.setDefaultHeader({'User-Agent': 'Some user agent string'});
```

## Change Request Defaults
```js
client.setDefaultRequest('baseUrl', 'https://api.sendgrid.com/');
// or
client.setDefaultRequest({baseUrl: 'https://api.sendgrid.com/'});
```

## Overwrite Promise Implementation
You can overwrite the promise implementation you want the client to use. Defaults to the ES6 `Promise`:

```js
global.Promise = require('bluebird');
```

## Instantiate Client Instances Manually
```js
const {Client} = require('@sendgrid/client');
const sgClient1 = new Client();
const sgClient2 = new Client();
sgClient1.setApiKey('KEY1');
sgClient2.setApiKey('KEY2');
```

<a name="announcements"></a>
# Announcements

All updates to this library are documented in our [CHANGELOG](../../CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases). You may also subscribe to email [release notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

<a name="contribute"></a>
# How to Contribute

We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](../../CONTRIBUTING.md) guide for details.

* [Feature Request](../../CONTRIBUTING.md#feature-request)
* [Bug Reports](../../CONTRIBUTING.md#submit-a-bug-report)
* [Improvements to the Codebase](../../CONTRIBUTING.md#improvements-to-the-codebase)

<a name="troubleshooting"></a>
# Troubleshooting

Please see our [troubleshooting guide](../../TROUBLESHOOTING.md) for common library issues.

<a name="about"></a>
# About

@sendgrid/client is maintained and funded by Twilio SendGrid, Inc. The names and logos for @sendgrid/client are trademarks of Twilio SendGrid, Inc.

If you need help installing or using the library, please check the [Twilio SendGrid Support Help Center](https://support.sendgrid.com).

If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!

![Twilio SendGrid Logo](../../twilio_sendgrid_logo.png)
