# Repo guidance

This is the `@notionhq/client` SDK. It supports Node.js 18 and later and uses TypeScript 5.9.2. This file is the shared reference for coding agents.

## Source files

`src/index.ts` defines the package exports. `src/Client.ts` handles requests, retries, authentication, and endpoint groups. `src/helpers.ts` contains pagination helpers and type guards. Error types are in `src/errors.ts`; webhook helpers are in `src/webhooks.ts`.

These files are generated. Change their upstream source, not the output:

- `src/api-endpoints.ts`
- `src/api-endpoints/`
- `src/api-endpoint-methods.ts`
- `build/`

The endpoint schema and generator are in Notion's internal repo. Only Notion employees can run `notion public-api update-sdk-js` there. Outside contributors should ask a maintainer for generated-code changes. The SDK build creates `build/`.

## Code rules

Use strict TypeScript and typed imports. The build emits CommonJS. Do not use `any` or unchecked casts to silence errors; use `unknown` and narrow the type instead.

Use braces for all JavaScript and TypeScript control flow, including one-line branches. ESLint enforces this for handwritten files. Follow Prettier for spacing and omit semicolons. Comments should explain why code exists, not repeat what it does.

Keep changes focused. Add tests for changed behavior and preserve unrelated local edits. Do not add dependencies when the existing compiler or standard library covers the need.

Use short sentences, plain words, and sentence case headings in docs. Keep each document in one mode: tutorial, how-to guide, reference, or explanation.

## Checks

Run commands from the repo root. [Contributing](CONTRIBUTING.md) covers the workflow.

| Command                                                  | Check                                                                               |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `npm ci`                                                 | Install the locked dependencies; also builds the SDK.                               |
| `npm run build`                                          | Clean `build/`, type-check source and tests, and emit declarations.                 |
| `npm run lint`                                           | Check formatting, ESLint rules, and spelling.                                       |
| `npm test`                                               | Run all Jest tests.                                                                 |
| `npx jest test/compatibility.test.ts --runInBand`        | Run only the compatibility tests.                                                   |
| `npm run check:compatibility -- <baseline>/src/index.ts` | Compare package exports and types with a separate checkout. Requires a build first. |

CI runs build, lint, and tests on Node.js 18, 19, 20, and 22. Pull requests also run the compatibility check on Node.js 22 against the base commit.

## Compatibility rules

The check compares TypeScript declarations reachable from `src/index.ts`, the package entry point. It checks exports, class method inputs, constructor access, and property presence, including optional fields in nested results. Private implementation changes are ignored. Protected members are checked as part of subclass access.

An unchanged version or a patch release must pass. A higher minor or major version skips the check to allow a planned contract change. Do not bump the version just to bypass a failed check; the release change needs review.

This is a conservative guard, not proof that every TypeScript use stays compatible. It does not check runtime behavior or deep imports outside the package entry point. Keep regression tests for the consumer code affected by a change.
