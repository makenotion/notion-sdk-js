# AGENTS.md

Guidance for agents helping users author and run experimental Notion infra as
code scripts in this directory.

## Purpose

This directory contains an experimental SDK workflow that lets a user write a
local TypeScript script, compile it into JSON "intents", and submit those intents
through `Client.EXPERIMENTAL__infraAsCode.run()`.

Use this guide when helping a user create or edit:

- a raw infra as code script, usually `examples/script.ts`
- an optional existing resources file, usually `examples/existingResources.json`
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
- `examples/script.ts`: simple raw infra as code script
- `examples/existingResources.json`: sample input mapping for known resources
- `examples/runInfraAsCode.ts`: simple runner for the example script

`compile.ts` is the key piece for script generation. It wraps the user's script
with the stub runtime from `runtime.ts`, runs it in a temporary Node process, and
reads the emitted intents back as JSON.

## Current Limitations

The real public API endpoint is not available yet. `api.ts` currently keeps the
future API call commented out and returns a local placeholder task id. The run
flow still compiles scripts, logs the request payload, polls the local
placeholder, and writes session output, but it does not actually apply changes
through Notion yet.

TODO: Update this section once the public infra as code API endpoint is ready.

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
  scriptFilePath: "./src/EXPERIMENTAL__infra-as-code/examples/script.ts",
  existingResourcesFilePath:
    "./src/EXPERIMENTAL__infra-as-code/examples/existingResources.json",
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

## Existing Resources Files

Use `existingResourcesFilePath` when the script should update or refer to
resources that already exist in Notion. The input file shape is:

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

The keys must match `resourceId` values in the script.

Do not invent real Notion IDs. If the user wants to target existing local
resources and has not provided IDs, ask for them or leave clear placeholders.

`sessionStateFilePath` is output from a run. Current output keys are:

```json
{
  "resourceIdToPointerMappings": {},
  "resourceIdToPropertyIdMappings": {}
}
```

That output shape is not the same as the input `existingResourcesFilePath`
shape. Convert keys before using a run output file as an input mapping file.

TODO: Update this section once session state reads from and writes to the same
file shape.

## Authoring Workflow For Agents

When helping a user create a new infra as code example:

1. Clarify the target workspace shape: spaces, teamspaces, pages, databases,
   properties, views, and seed pages.
2. Choose stable `resourceId` values before writing the script.
3. Create or update the raw script with the global `notion` helper.
4. Add or update `existingResources.json` only for resources the user already
   has and explicitly wants to target.
5. Keep the runner small and point it at the script and mapping file.
6. Run `npm run build` to type-check the SDK and examples.
7. Optionally run the built example if the user asks and a suitable token/setup
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
NOTION_TOKEN=secret_... node build/src/EXPERIMENTAL__infra-as-code/examples/runInfraAsCode.js
```

The current stubbed API path logs the compiled payload and writes a local
session-state output file, but does not yet apply changes through the real API.
