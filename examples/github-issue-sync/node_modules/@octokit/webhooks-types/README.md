# Octokit Webhooks

> machine-readable, always up-to-date GitHub Webhooks specifications

![Update status](https://github.com/octokit/webhooks/workflows/Update/badge.svg)

## Download

Download the latest specification at
[octokit.github.io/webhooks/index.json](https://octokit.github.io/webhooks/index.json)

## Usage

This package ships with types for the webhook events generated from the
respective json schemas, which you can use like so:

```typescript
import { WebhookEvent, IssuesOpenedEvent } from "@octokit/webhooks-types";

const handleWebhookEvent = (event: WebhookEvent) => {
  if ("action" in event && event.action === "completed") {
    console.log(`${event.sender.login} completed something!`);
  }
};

const handleIssuesOpenedEvent = (event: IssuesOpenedEvent) => {
  console.log(
    `${event.sender.login} opened "${event.issue.title}" on ${event.repository.full_name}`
  );
};
```

## See also

- [octokit/graphql-schema](https://github.com/octokit/graphql-schema) – GitHub’s
  GraphQL Schema with validation
- [octokit/openapi](https://github.com/octokit/openapi) – GitHub REST API route
  specifications
- [octokit/app-permissions](https://github.com/octokit/app-permissions) – GitHub
  App permission specifications

## LICENSE

[MIT](LICENSE.md)
