# AGENTS.md

<!-- cspell:ignore Dont testDontCommit YYYYMMDDTHHMMSSZ -->

Guidance for agents helping users author and run experimental Notion infra as
code scripts in this directory.

## Purpose

This directory contains an experimental SDK workflow that lets a user write a
local TypeScript script, compile it into JSON "intents", and submit those
intents through `Client.EXPERIMENTAL__infraAsCode.run()`.

Use this guide when helping a user create or edit:

- the user-facing runner at `runInfraAsCode.ts`
- a raw infra as code script in `scripts/`
- a session-state file in `sessions/`
- the infra as code implementation helpers in `utils/`
- user-facing docs in `README.md`

The goal is to make it easy for users to generate scripts ranging from a tiny
space update to a full workspace setup with spaces, teamspaces, pages,
databases, data sources, views, and seeded pages.

## Directory Map

- `runInfraAsCode.ts`: user-facing runner for local experimentation.
- `README.md`: user-facing setup and usage documentation.
- `scripts/script_example.ts`: first-run sample script.
- `sessions/sessionState_example.json`: sample persisted mappings.
- `utils/run.ts`: orchestration for `Client.EXPERIMENTAL__infraAsCode.run()`.
- `utils/api.ts`: API submit and async task polling helpers.
- `utils/session.ts`: reads and writes session-state files.
- `utils/compile.ts`: compiles a raw TypeScript script into JSON intents.
- `utils/runtime.ts`: stub runtime used by the compiler while collecting
  intents.
- `utils/utils.ts`: small shared helpers such as CLI parsing and type guards.
- `utils/types.ts`: generated ambient types for script authoring.
- `utils/index.ts`: utility export surface.

`compile.ts` is the key piece for script generation. It wraps the user's script
with the stub runtime from `runtime.ts`, runs it in a temporary Node process,
and reads the emitted intents back as JSON.

## Current Run Behavior

The root runner is `src/EXPERIMENTAL__infra-as-code/runInfraAsCode.ts`.
It creates an SDK client, parses command-line flags, and calls
`EXPERIMENTAL__infraAsCode.run()`.

`NOTION_TOKEN` can be provided in either of these ways:

- set `NOTION_TOKEN` in the shell
- paste a local test token into the top-level `NOTION_TOKEN` constant

Never commit a real token. The runner intentionally keeps an editable
top-level `NOTION_TOKEN` constant for local testing. Do not remove the
`new Client(...)` construction used for testing unless the user explicitly
asks.

Supported command-line flags are camelCase and use a leading `--`:

```text
--scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
--sessionStateFilePath=./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_example.json
--spaceId=<YOUR_WORKSPACE_ID>
```

Flags can be passed as either `--name=value` or `--name value`.

`scriptFilePath` is required. If it is missing, the runner should fail with a
friendly error that includes a runnable example command.

`spaceId` is the workspace ID and is required by the root runner. If it is
missing, the runner should fail with a friendly error that tells the user to
attach their workspace ID with `--spaceId` and includes a runnable example
command. When the user passes `--spaceId` without a session-state file, the SDK
creates an initial existing-space mapping from the compiled script, runs the
script, then writes a timestamped session-state file such as:

```text
./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_20260707T173844Z.json
```

The SDK can infer the script resource ID for `spaceId` when the script has
either:

- exactly one `space` intent, such as `notion.space({ resourceId: "my-space" })`
- no `space` intent and exactly one `teamspace.parent.resourceId`

If the script has multiple possible space resource IDs, the SDK throws and asks
the user to keep one clear workspace anchor in the script.

If both `sessionStateFilePath` and `spaceId` are provided, the session-state
file and `spaceId` must point at the same workspace. If they conflict, the SDK
throws and stops the run before submitting to the API.

`spaceId` is required by the SDK and root runner. The root runner does not
provide a default script path or session-state path.

On success, the runner should print a concise user-facing message and point the
user to the written session-state file. Do not print the full
`resourceIdToPointerMappings` result in normal runner output.

## Common Commands

First run against an existing workspace by workspace ID:

```bash
npm run build
NOTION_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
```

Follow-up run using a written session-state file:

```bash
npm run build
NOTION_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts --sessionStateFilePath=./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_TIMESTAMP.json
```

When the token is already pasted into a local scratch runner file, omit the
`NOTION_TOKEN=...` prefix.

## Raw Script Files

Raw script files are compiler input, not normal SDK entry points.

For local user-specific work, create a new raw script in `scripts/` instead of
editing the sample unless the user explicitly asks to change
`scripts/script_example.ts`. Name one-off scripts with a compact UTC timestamp,
such as `scripts/script_20260707T101500Z.ts`.

Important rules:

- Do not import `Client` in raw scripts.
- Do not create a real SDK client in raw scripts.
- Use the global `notion` helper provided by the compiler.
- Use stable, human-readable `resourceId` values.
- Keep every `resourceId` unique within the script file.
- Wrap top-level script content in `{ ... }` so multiple script files can be
  type-checked in the same TypeScript project without duplicate global `const`
  declarations.
- Do not add `export {}` unless the compiler is updated to support
  module-style scripts.

When a script is meant to run with `--spaceId`, include one clear workspace
anchor. Prefer a parent reference when the workspace itself should not be
updated:

```typescript
{
  const teamspace = notion.teamspace({
    resourceId: "general-teamspace",
    parent: { type: "resourceId", resourceId: "my-space" },
    name: "General",
    accessLevel: "open",
  })

  teamspace.addPage({
    resourceId: "welcome-page",
    properties: { title: notion.text("Welcome") },
    content: "# Welcome",
  })
}
```

In that example, `--spaceId=<YOUR_WORKSPACE_ID>` maps the real workspace to the
script resource ID `"my-space"`. The teamspace and page are new resources. If a
script intentionally emits a mapped `notion.space(...)` with fields like `name`
or `icon`, the run may update those fields on the existing workspace.

Only emit a resource when the run should create it or update one of its own
fields. If an existing mapped resource is only needed as a parent, reference its
`resourceId` in the child's `parent` field instead of calling its helper just to
get a handle.

Use convenience methods such as `space.addTeamspace(...)`,
`teamspace.addPage(...)`, and `teamspace.addDatabase(...)` when the parent
resource is also intentionally being emitted by the script. For existing
parents that should not change, use the top-level helper with an explicit
`parent`.

Use `types.ts` for public type signatures and supported argument shapes. Do not
copy or summarize implementation comments, internal names, backend storage
details, provider names, or roadmap notes from generated files into
user-facing output.

Use the examples and exported helper signatures as the practical supported
surface. The experimental runtime may support fewer helpers than the generated
types describe.

Common helpers include:

- `notion.space(...)`
- `notion.teamspace(...)`
- `notion.page(...)`
- `notion.database(...)`
- `space.addTeamspace(...)`
- `teamspace.addPage(...)`
- `teamspace.addDatabase(...)`
- `database.getDataSource(...)`
- `dataSource.addPage(...)`
- `notion.text(...)`
- `notion.date(...)`
- `notion.select(...)`
- `notion.status(...)`
- `notion.multiSelect(...)`

Page `content` uses Notion-flavored markdown. Useful examples include:

```markdown
# Heading

<callout icon="💡">
Helpful callout text.
</callout>

<mention-date start="2026-07-08"/>
```

Date mentions currently use explicit dates. There is no dynamic `@Today`
shorthand in the raw markdown syntax.

## Session State Files

Session-state files map script `resourceId` values to real Notion resources and
property IDs. They let follow-up runs update the same resources instead of
creating duplicates.

A session-state file is optional when the user passes `--spaceId`. In that
case, the SDK creates the initial space mapping and writes a timestamped
session-state file after the run.

The SDK and runner require `--spaceId`; use the generated session-state file
with the same `--spaceId` for follow-up runs.

Preferred session-state file shape:

```json
{
  "resourceIdToPointerMappings": {
    "my-space": {
      "table": "space",
      "id": "<YOUR_WORKSPACE_ID>",
      "spaceId": "<YOUR_WORKSPACE_ID>"
    }
  },
  "resourceIdToPropertyIdMappings": {
    "task-name-prop": "title"
  }
}
```

For compatibility, the SDK can also read files that use this wrapper shape:

```json
{
  "existingResources": {
    "my-space": {
      "table": "space",
      "id": "<YOUR_WORKSPACE_ID>",
      "spaceId": "<YOUR_WORKSPACE_ID>"
    }
  },
  "existingProperties": {
    "task-name-prop": "title"
  }
}
```

After the run, the SDK writes the preferred `resourceIdTo*` session-state shape
to `sessionStateFilePath`.

The keys in `resourceIdToPointerMappings` and
`resourceIdToPropertyIdMappings` must match `resourceId` values in the script.
When a script uses a `resourceId` that is present in the session-state file, the
run targets that existing Notion resource. When a script uses a new
`resourceId` that is not in the session-state file, the run creates a new
resource and writes the returned mapping back to the session-state file.

Do not invent real Notion IDs. If the user wants to target existing resources
and has not provided IDs, ask for them or leave clear placeholders.

## Authoring Workflow For Agents

When helping a user create a new infra as code example:

1. Clarify the target workspace shape: spaces, teamspaces, pages, databases,
   properties, views, and seed pages.
2. Choose stable `resourceId` values before writing the script.
3. Use `scripts/script_example.ts` only when the user asks to update the shared
   example. Otherwise create a timestamped script in `scripts/`.
4. If the user already has a session-state file or existing mappings, include
   that `sessionStateFilePath` in the run command.
5. If no session-state file is available, ask for the workspace ID before
   finalizing the run command. Use that ID with the `--spaceId` flow instead of
   manually creating a session-state file.
6. After creating the script, tell the user the exact script path and include
   the exact command they can run from the repository root.
7. Keep runner changes small and preserve the top-level editable constants.
8. Run `npm run build` to type-check the SDK and raw scripts.
9. Run `npx jest test/infra-as-code.test.ts --runInBand` when SDK behavior
   changes.
10. Optionally run the built example if the user asks and a suitable token/setup
    exists.

When the user asks in plain English for a script, such as "Create a student
dashboard for my semester...", the agent should create the script and finish
with a clear handoff:

```text
I've generated the script for you at:
src/EXPERIMENTAL__infra-as-code/scripts/script_TIMESTAMP.ts

You can run it with:
npm run build
NOTION_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --scriptFilePath=src/EXPERIMENTAL__infra-as-code/scripts/script_TIMESTAMP.ts --spaceId=<YOUR_WORKSPACE_ID>
```

If a session-state file is already known, include it alongside `--spaceId`:

```text
npm run build
NOTION_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --scriptFilePath=src/EXPERIMENTAL__infra-as-code/scripts/script_TIMESTAMP.ts --spaceId=<YOUR_WORKSPACE_ID> --sessionStateFilePath=src/EXPERIMENTAL__infra-as-code/sessions/sessionState_TIMESTAMP.json
```

If the token is already pasted into the local runner file, omit the
`NOTION_TOKEN=...` prefix from the command.

For complex examples, prefer readable local variables over deeply nested calls.
Use `const tasksDb = teamspace.addDatabase(...)` and then
`const tasksDS = tasksDb.getDataSource("tasks-ds")` before adding rows.

## Safety And Hygiene

- Do not commit Personal Access Tokens.
- Do not commit scratch files named `testDontCommit*`.
- Do not commit captured console output that contains local Notion IDs unless
  the user explicitly wants it included.
- Keep generated or local-only resource IDs out of public examples when they
  reveal private workspace details.
- Prefer minimal SDK changes; most user requests in this directory should only
  need example script, mapping, docs, or runner edits.

## Verification

Useful checks from the repository root:

```bash
npm run build
npx jest test/infra-as-code.test.ts --runInBand
```

If the user asks to run the example:

```bash
npm run build
NOTION_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
```

The run compiles the script, submits it to Notion, polls the async task, and
writes returned mappings to the session-state file. Normal runner output should
stay concise; users can open the written session-state file to inspect generated
mappings.
