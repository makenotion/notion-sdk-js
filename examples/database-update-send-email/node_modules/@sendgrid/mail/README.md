[![BuildStatus](https://travis-ci.com/sendgrid/sendgrid-nodejs.svg?branch=main)](https://travis-ci.com/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](../../README.md) for details.**

# Mail Service for the SendGrid v3 Web API
This is a dedicated service for interaction with the mail endpoint of the [SendGrid v3 API](https://sendgrid.com/docs/API_Reference/api_v3.html).

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
npm install --save @sendgrid/mail
```

You may also use [yarn](https://yarnpkg.com/en/) to install.

```sh
yarn add @sendgrid/mail
```

## Verify Sender Identity
Verify an email address or domain in the [Sender Authentication tab](https://app.sendgrid.com/settings/sender_auth/senders). Without this you will receive a `403 Forbidden` response when trying to send mail.

<a name="quick-start"></a>
# Quick Start, Hello Email
The following is the minimum needed code to send a simple email. Use this example, and modify the `to` and `from` variables:

For more complex use cases, please see [USE_CASES.md](../../docs/use-cases/README.md#email-use-cases).

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
//ES8
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();
```

After executing the above code, you should have an email in the inbox of the recipient. You can check the status of your email [in the UI](https://app.sendgrid.com/email_activity?). Alternatively, we can post events to a URL of your choice using our [Event Webhook](https://sendgrid.com/docs/API_Reference/Webhooks/event.html). This gives you data about the events that occur as Twilio SendGrid processes your email.

# Troubleshooting
Please see our [troubleshooting guide](../../TROUBLESHOOTING.md) for common library issues.

# Announcements
All updates to this library are documented in our [CHANGELOG](../../CHANGELOG.md) and [releases](https://github.com/sendgrid/sendgrid-nodejs/releases). You may also subscribe to email [release notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

<a name="contribute"></a>
# How to Contribute
We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/blob/HEAD/CONTRIBUTING.md) guide for details.

* [Feature Request](../../CONTRIBUTING.md#feature-request)
* [Bug Reports](../../CONTRIBUTING.md#submit-a-bug-report)
* [Improvements to the Codebase](../../CONTRIBUTING.md#improvements-to-the-codebase)

# About
@sendgrid/mail is maintained and funded by Twilio SendGrid, Inc. The names and logos for @sendgrid/mail are trademarks of Twilio SendGrid, Inc.

If you need help installing or using the library, please check the [Twilio SendGrid Support Help Center](https://support.sendgrid.com).

If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!

![Twilio SendGrid Logo](../../twilio_sendgrid_logo.png)
