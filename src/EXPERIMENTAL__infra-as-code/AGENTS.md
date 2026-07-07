# AGENTS.md

<!-- cspell:ignore Dont testDontCommit YYYYMMDDTHHMMSSZ -->

Guidance for agents helping users author and run experimental Notion infra as
code scripts in this directory.

## Purpose

This directory contains an experimental SDK workflow that lets a user write a
local TypeScript script, compile it into JSON "intents", and submit those intents
through `Client.EXPERIMENTAL__infraAsCode.run()`.

Use this guide when helping a user create or edit:

- a raw infra as code script, usually `scripts/script_TIMESTAMP.ts`
- a required session-state file, usually
  `sessions/sessionState_TIMESTAMP.json`
- a runner file, usually `examples/runInfraAsCode.ts`

The goal is to make it easy for users to generate scripts ranging from a tiny
space update to a full workspace setup with spaces, teamspaces, pages,
databases, data sources, views, and seeded pages.

## Directory Map

- `run.ts`: orchestration for `Client.EXPERIMENTAL__infraAsCode.run()`
- `api.ts`: API submit and async task polling helpers
- `session.ts`: reads existing resource mappings and writes run output state
- `compile.ts`: compiles a raw TypeScript script into JSON intents
- `runtime.ts`: stub runtime used by the compiler while collecting intents
- `utils.ts`: small shared helpers
- `types.ts`: generated ambient types for script authoring
- `scripts/`: timestamped raw infra as code scripts for local runs
- `sessions/`: timestamped session-state files for local runs
- `examples/script.ts`: simple raw infra as code script
- `examples/sessionState.json`: sample persisted mappings for known resources
- `examples/runInfraAsCode.ts`: simple runner for the example script

`compile.ts` is the key piece for script generation. It wraps the user's script
with the stub runtime from `runtime.ts`, runs it in a temporary Node process, and
reads the emitted intents back as JSON.

## Current Limitations

`api.ts` submits compiled intents to the public infra as code API endpoint,
polls the async task endpoint, and writes returned mappings back to the
session-state file.

Keep implementation changes minimal unless the user explicitly asks to work on
the SDK internals.

## Runner Files

Runner files are normal SDK code. They should import `Client`, create a client,
and call `EXPERIMENTAL__infraAsCode.run()`.

Prefer this shape:

```typescript
import { Client } from "../.."

const notion = new Client({ auth: process.env["NOTION_TOKEN"] })

notion.EXPERIMENTAL__infraAsCode.run({
  scriptFilePath:
    "./src/EXPERIMENTAL__infra-as-code/scripts/script_20260707T101500Z.ts",
  sessionStateFilePath:
    "./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_20260707T101500Z.json",
})
  .then(result => console.dir(result, { depth: null }))
  .catch(error => {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  })
```

For local experimentation, users may paste a token into a scratch runner file.
The important rule is to never commit real tokens. Infra as code requires a
Personal Access Token with access to the target space:
https://developers.notion.com/guides/get-started/personal-access-tokens

Include the exact command near the top of example runner files when useful. If
the runner reads `process.env["NOTION_TOKEN"]`, include:

```text
npm run build
NOTION_TOKEN=<personal-access-token> node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
```

If the token is already pasted into a local scratch runner file, include:

```text
npm run build
node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
```

## Raw Script Files

Raw script files are compiler input, not normal SDK entry points.

For local user-specific work, create a new raw script in `scripts/` instead of
editing `examples/script.ts`. Name it with the creation timestamp:
`script_TIMESTAMP.ts`. Use a compact UTC timestamp such as
`20260707T101500Z`, so a created file looks like
`scripts/script_20260707T101500Z.ts`.

Important rules:

- Do not import `Client` in raw scripts.
- Do not create a real SDK client in raw scripts.
- Use the global `notion` helper provided by the compiler.
- Use stable, human-readable `resourceId` values.
- Keep every `resourceId` unique within the script file. Reusing a resource ID
  can cause later declarations to overwrite or target the wrong resource.
- Wrap top-level script content in `{ ... }` so multiple script files can be
  type-checked in the same TypeScript project without duplicate global `const`
  declarations.
- Do not add `export {}` unless the compiler is updated to support module-style
  scripts.

Good raw script shape:

```typescript
{
  const space = notion.space.create({
    resourceId: "my-space",
    name: "My Space",
    icon: { type: "notion_icon", description: "code", color: "blue" },
  })

  const teamspace = space.addTeamspace({
    resourceId: "general-teamspace",
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

Use `types.ts` for public type signatures and supported argument shapes. Do not
copy or summarize implementation comments, internal names, tag refs, backend
storage details, provider names, or roadmap notes from generated files into
user-facing output.

Use the examples and exported helper signatures as the practical supported
surface. The experimental runtime may support fewer helpers than the generated
types describe.

Common helpers include:

- `notion.space.create(...)`
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

## Session State Files

Every run must provide `sessionStateFilePath`. Use it to tell the API which
existing workspace/resources the script should target, and to write returned
mappings back to the same file. Prefer this session-state file shape:

For local user-specific work, create a new session-state file in `sessions/`
instead of editing `examples/sessionState.json`. Use the same timestamp as the
raw script where possible, such as
`sessions/sessionState_20260707T101500Z.json`.

```json
{
  "resourceIdToPointerMappings": {
    "my-space": {
      "table": "space",
      "id": "<space-id>",
      "spaceId": "<space-id>"
    }
  },
  "resourceIdToPropertyIdMappings": {
    "task-name-prop": "title"
  }
}
```

The session-state file must always include exactly one existing space mapping.
Without a space in `resourceIdToPointerMappings` or `existingResources`, the
public API returns a validation error.

If the user asks an agent to create a script and does not provide a workspace
ID, the agent should ask the user for the workspace ID before creating the
session-state file.

The keys in `resourceIdToPointerMappings` and
`resourceIdToPropertyIdMappings` must match `resourceId` values in the script.
When a script uses a `resourceId` that is present in the session-state file,
the run targets that existing Notion resource. When a script uses a new
`resourceId` that is not in the session-state file, the run creates a new
resource and writes the returned mapping back to the same file.

For compatibility, the SDK can also read files that use this wrapper shape:

```json
{
  "existingResources": {
    "my-space": {
      "table": "space",
      "id": "<space-id>",
      "spaceId": "<space-id>"
    }
  },
  "existingProperties": {
    "task-name-prop": "title"
  }
}
```

After the run, the SDK writes the preferred `resourceIdTo*` session-state shape
back to `sessionStateFilePath`.

Do not invent real Notion IDs. If the user wants to target existing local
resources and has not provided IDs, ask for them or leave clear placeholders.

The SDK reads this file before a run and writes the merged session state back to
the same file after the run.

## Authoring Workflow For Agents

When helping a user create a new infra as code example:

1. Clarify the target workspace shape: spaces, teamspaces, pages, databases,
   properties, views, and seed pages.
2. If the user has not provided a workspace ID, ask for it before creating the
   script and session-state file.
3. Choose stable `resourceId` values before writing the script.
4. Generate one timestamp for the run, preferably UTC in
   `YYYYMMDDTHHMMSSZ` format.
5. Create a new raw script at `scripts/script_TIMESTAMP.ts` with the global
   `notion` helper.
6. Create a new session-state file at
   `sessions/sessionState_TIMESTAMP.json` only for resources the user already
   has and explicitly wants to target.
7. Keep `examples/script.ts` and `examples/sessionState.json` as reusable
   baseline samples unless the user explicitly asks to change them.
8. Keep the runner small and point it at the script and mapping file.
9. Run `npm run build` to type-check the SDK and examples.
10. Optionally run the built example if the user asks and a suitable token/setup
    exists.

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
  need example script, mapping, or runner edits.

## Verification

Useful checks from the repository root:

```bash
npm run build
npx jest test/infra-as-code.test.ts --runInBand
```

If the user asks to run an example:

```bash
npm run build
NOTION_TOKEN=<personal-access-token> node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
```

The API path logs the compiled payload, submits it to Notion, polls the async
task, and writes the returned mappings back to the session-state file.
