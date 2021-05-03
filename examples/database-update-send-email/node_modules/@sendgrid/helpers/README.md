[![BuildStatus](https://travis-ci.com/sendgrid/sendgrid-nodejs.svg?branch=main)](https://travis-ci.com/sendgrid/sendgrid-nodejs)
[![npm version](https://badge.fury.io/js/%40sendgrid%2Fclient.svg)](https://www.npmjs.com/org/sendgrid)
[![Email Notifications Badge](https://dx.sendgrid.com/badge/nodejs)](https://dx.sendgrid.com/newsletter/nodejs)

**This package is part of a monorepo, please see [this README](../../README.md) for details.**

# Support classes and helpers for the SendGrid NodeJS libraries
This is a collection of classes and helpers used internally by the
[SendGrid NodeJS libraries](https://www.npmjs.com/org/sendgrid).

Note that not all objects represented in the SendGrid API have helper classes assigned to them because it is not expected that developers will use these classes themselves. They are primarily for internal use and developers are expected to use the publicly exposed API in the [various endpoint services](https://www.npmjs.com/org/sendgrid).

To be notified when this package is updated, please subscribe to email [notifications](https://dx.sendgrid.com/newsletter/nodejs) for releases and breaking changes.

## Mail class
Used to compose a `Mail` object that converts itself to proper JSON for use with the [SendGrid v3 API](https://sendgrid.com/docs/API_Reference/api_v3.html). This class supports a slightly different API to make sending emails easier in many cases by not having to deal with personalization arrays, instead offering a more straightforward interface for composing emails.

## Attachment class
Used by the inbound mail parser to compose `Attachment` objects.

## Personalization class
Used by the Mail class to compose `Personalization` objects.

## Email address
`Helper` class to represent an email address with name/email. Used by both the `Mail` and `Personalization` classes to deal with email addresses of various formats.

## Helpers
Internal helpers that mostly speak for themselves.

<a name="contribute"></a>
# How to Contribute

We encourage contribution to our libraries (you might even score some nifty swag), please see our [CONTRIBUTING](https://github.com/sendgrid/sendgrid-nodejs/blob/HEAD/CONTRIBUTING.md) guide for details.

* [Feature Request](../../CONTRIBUTING.md#feature-request)
* [Bug Reports](../../CONTRIBUTING.md#submit-a-bug-report)
* [Improvements to the Codebase](../../CONTRIBUTING.md#improvements-to-the-codebase)

<a name="about"></a>
# About

@sendgrid/helpers are maintained and funded by Twilio SendGrid, Inc. The names and logos for @sendgrid/helpers are trademarks of Twilio SendGrid, Inc.

If you need help installing or using the library, please check the [Twilio SendGrid Support Help Center](https://support.sendgrid.com).

If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!

![Twilio SendGrid Logo](../../twilio_sendgrid_logo.png)
