# AGENTS.md

Guidance for agents helping users run, author, and troubleshoot experimental
Notion as Code workflows in this directory.

## Prime Directive

Make the user's path feel obvious, concrete, and low-friction. Prefer one clear
next step over a menu of possibilities. When a command can be made exact, fill
in every value the user has already provided.

Never hand the user a run command with a raw workspace placeholder such as
`<YOUR_WORKSPACE_ID>` or `<USER_WORKSPACE_ID>`. If the workspace ID is not
available from the prompt, prior chat, terminal context, or local run output,
ask for it before showing the command.

When no Notion Personal Access Token is available in the local runner, current
shell, or visible terminal context, prefer nudging the user to export it once:

```bash
export NOTION_TOKEN=<personal-access-token>
```

Then give the normal run command without an inline token prefix. Use an inline
`NOTION_TOKEN=secret...` prefix only when a one-off command is clearer or the
user specifically wants that style.

When the user asks where to get their token, direct them to the Notion Personal
Access Token guide:
https://developers.notion.com/guides/get-started/personal-access-tokens

This directory contains an experimental SDK workflow that lets a user write a
local TypeScript script, compile it into JSON intents, and submit those intents
through `Client.EXPERIMENTAL__notionAsCode.run()`.

Use this guide when helping a user create or edit:

- the user-facing runner at `runNotionAsCode.ts`
- raw Notion as Code scripts in `scripts/`
- session-state files in `sessions/`
- implementation helpers in `utils/`
- user-facing docs in `README.md`

## Golden Flow: Running The Example

When the user asks something like:

> I would like to run the example file for Notion as code. Please help me.

Do not immediately paste a placeholder command. First collect the missing value
that the README requires:

```text
What is your workspace ID?
```

After the user provides a workspace ID:

1. Check whether a token is already available locally.
   - Inspect `runNotionAsCode.ts` for a non-empty top-level `NOTION_TOKEN`
     constant.
   - Check whether `NOTION_TOKEN` is present in the agent's current shell
     environment, for example with `printenv NOTION_TOKEN`.
   - Check visible terminal context from the same shell session for evidence
     that the user already exported `NOTION_TOKEN`, for example a prior
     `export NOTION_TOKEN=...` command or a successful `npm run notion-as-code`
     run in that terminal without an inline `NOTION_TOKEN=secret...` prefix.
   - Do not print, echo, summarize, or expose the token value.
2. Choose exactly one command.
   - If `NOTION_TOKEN` is already set in the local runner, current shell, or
     visible terminal context from the same shell session, omit the inline token
     prefix.
   - If no token is available, show `export NOTION_TOKEN=<personal-access-token>`
     first, then show the normal run command without an inline token prefix.
3. Fill in the user's workspace ID in the command. Do not leave
   `<YOUR_WORKSPACE_ID>` in the final command once the user has provided it.

If a token is already available, surface this command:

```bash
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
```

If no token is available, first ask the user to export it:

```bash
export NOTION_TOKEN=<personal-access-token>
```

Then surface this command:

```bash
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
```

Replace `<USER_WORKSPACE_ID>` with the exact workspace ID the user provided.
Keep `<personal-access-token>` as a visible cue for the user's local shell.
Never ask the user to paste a real token into chat unless there is no safer path
and they explicitly want that.

Only run the command yourself when the user explicitly asks you to run it and a
suitable token/workspace setup exists. Otherwise, give the exact command for the
user to run from the repository root.

## Golden Flow: Writing A Script

When the user asks for a new workspace script from an example-style prompt,
such as:

> I need a workspace for launching a podcast with guests, sponsors, and
> episodes.

Treat the workflow like a real run path, not only a code-generation task. The
agent should end with a script and a runnable command that already contains the
workspace ID.

First, identify whether the user already provided a workspace ID.

- If the prompt does not include a workspace ID, ask only:

  ```text
  What is your workspace ID?
  ```

  Stop there until the user answers. Do not create the final script handoff and
  do not show a run command with `<YOUR_WORKSPACE_ID>` or
  `<USER_WORKSPACE_ID>`.

- If the prompt already includes a workspace ID, such as:

  ```text
  Build a Notion workspace for a high school teacher managing classes and
  students. Use workspace id 'a6aded10-dbbf-8106-a691-0003be96ace6'.
  ```

  Do not ask for the workspace ID again. Use the provided value in the final
  command.

Once a workspace ID is known, check whether a token is already available
locally:

- Inspect `runNotionAsCode.ts` for a non-empty top-level `NOTION_TOKEN`
  constant.
- Check whether `NOTION_TOKEN` is present in the agent's current shell
  environment, for example with `printenv NOTION_TOKEN`.
- Check visible terminal context from the same shell session for evidence that
  the user already exported `NOTION_TOKEN`, such as a prior
  `export NOTION_TOKEN=...` command or a successful `npm run notion-as-code`
  run in that terminal without an inline `NOTION_TOKEN=secret...` prefix.
- Do not print, echo, summarize, or expose the token value.

Then create the script. Do not let the workspace ID question block normal script
quality: still infer a useful first version from the user's prompt, choose
stable `resourceId` values, consult `utils/types.ts` for supported Notion as
Code types and helper shapes when needed, and use a timestamped file in
`scripts/` unless the user asked to edit an existing script.

Finish with the exact script path and exactly one command. If a token is already
available, omit the inline token prefix:

```text
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=src/EXPERIMENTAL__notion-as-code/scripts/script_TIMESTAMP.ts
```

If no token is available, include the export step first:

```text
export NOTION_TOKEN=<personal-access-token>
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=src/EXPERIMENTAL__notion-as-code/scripts/script_TIMESTAMP.ts
```

Replace `<USER_WORKSPACE_ID>` with the exact workspace ID the user provided.
Never leave `<YOUR_WORKSPACE_ID>` in the final command once the user has
provided an ID.

If the script has already been written but no workspace ID is known yet, finish
by asking for the workspace ID instead of showing a placeholder command. After
the user provides it, respond with the complete command using the existing
script path.

## Golden Flow: Running Against An Existing Workspace

When the user wants to run a script against a workspace that Notion as Code has
already touched, use the follow-up run flow. The important difference from a
first run is that the command should include both:

- `--spaceId=<USER_WORKSPACE_ID>`
- `--sessionStateFilePath=<SESSION_STATE_FILE_PATH>`

Use this flow when the user says things like:

> I already ran the example. Can you help me run another script against that
> workspace?

> Use my existing session state file to update the podcast workspace.

First, collect only the missing run inputs. A value is only missing after the
agent has checked the latest user prompt, prior chat context, visible terminal
commands/output, and obvious local files such as recently written files in
`sessions/`.

- If a workspace ID is visible in the prompt, prior chat, or current terminal
  context, use it and do not ask for it again.

- If no workspace ID is visible anywhere, ask:

  ```text
  What is your workspace ID?
  ```

- If a session-state file path is visible in the prompt, prior chat, current
  terminal context, or recent run output, use it and do not ask for it again.

- If no session-state file path is visible anywhere, ask:

  ```text
  What is the path to your session-state file?
  ```

- If there is exactly one plausible generated session-state file in `sessions/`,
  the agent may use that path. If there are multiple plausible session-state
  files and no clear latest run output or user-provided path, ask which one to
  use.

Once the workspace ID and session-state file path are known, check whether a
token is already available locally:

- Inspect `runNotionAsCode.ts` for a non-empty top-level `NOTION_TOKEN`
  constant.
- Check whether `NOTION_TOKEN` is present in the agent's current shell
  environment, for example with `printenv NOTION_TOKEN`.
- Check visible terminal context from the same shell session for evidence that
  the user already exported `NOTION_TOKEN`, such as a prior
  `export NOTION_TOKEN=...` command or a successful `npm run notion-as-code`
  run in that terminal without an inline `NOTION_TOKEN=secret...` prefix.
- Do not print, echo, summarize, or expose the token value.

If the user asked to run an existing script, use that script path. If the user
asked for a new script for an existing workspace, create the script first, then
use the generated script path.

Finish with exactly one command. If a token is already available, omit the
inline token prefix:

```text
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=<SCRIPT_FILE_PATH> --sessionStateFilePath=<SESSION_STATE_FILE_PATH>
```

If no token is available, include the export step first:

```text
export NOTION_TOKEN=<personal-access-token>
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=<SCRIPT_FILE_PATH> --sessionStateFilePath=<SESSION_STATE_FILE_PATH>
```

Replace `<USER_WORKSPACE_ID>`, `<SCRIPT_FILE_PATH>`, and
`<SESSION_STATE_FILE_PATH>` with exact values before handing the command to the
user. Do not use the example `sessions/sessionState_example.json` file for a
real follow-up run unless the user explicitly says they have edited it to point
at real resources.

## Golden Flow: Editing An Existing Script

When the user asks to edit a script that has already been created or run, such
as:

> Thanks for building in that workspace! Now can you edit the script to include
> beautiful icons? Make each icon under the teamspace level green.

Treat the request as an edit plus a follow-up run handoff.

First, identify the edited script path. Use the active file, the user's prompt,
prior chat context, visible terminal commands/output, or recently created files
in `scripts/`. If there are multiple plausible scripts and no clear active or
latest script, ask which script to edit.

Next, identify the workspace ID and session-state file path using the same
lookup order as the existing-workspace flow:

- Use values from the prompt, prior chat, terminal context, recent run output,
  or obvious local files.
- If the workspace ID is still missing, ask for it.
- If the session-state file path is still missing and there is exactly one
  plausible generated session-state file in `sessions/`, use it.
- If the session-state file path is still missing and there are multiple
  plausible session-state files, ask which one to use.

After editing the script, finish with the exact edited `--scriptFilePath` and
the exact `--sessionStateFilePath`. Do not hand off a command that omits
`--sessionStateFilePath` for an already-run workspace.

If a token is already available locally, use:

```text
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=<EDITED_SCRIPT_FILE_PATH> --sessionStateFilePath=<SESSION_STATE_FILE_PATH>
```

If no token is available locally, use:

```text
export NOTION_TOKEN=<personal-access-token>
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=<EDITED_SCRIPT_FILE_PATH> --sessionStateFilePath=<SESSION_STATE_FILE_PATH>
```

Replace every placeholder with exact values before showing the command. If any
required value is unknown, ask for that value instead of showing a partial or
placeholder command.

## Source Of Truth

Before creating scripts, changing docs, troubleshooting commands, or explaining
Notion as Code, read `README.md`. Treat it as the user-facing source of truth
for:

- setup steps
- Personal Access Token instructions
- `--spaceId`, `--scriptFilePath`, and `--sessionStateFilePath` usage
- first-run and follow-up-run commands
- expected success output
- script/session-state concepts
- example prompts

If README guidance and implementation behavior disagree, make the smallest
coherent fix requested by the user, then explain the mismatch. For normal usage
help, agents should be able to run or debug every command shown in the README
without changing it.

## Directory Map

- `runNotionAsCode.ts`: user-facing runner for local experimentation.
- `README.md`: user-facing setup and usage documentation.
- `scripts/script_example.ts`: first-run sample script.
- `sessions/sessionState_example.json`: sample persisted mappings.
- `utils/run.ts`: orchestration for `Client.EXPERIMENTAL__notionAsCode.run()`.
- `utils/api.ts`: API submit and async task polling helpers.
- `utils/session.ts`: reads and writes session-state files.
- `utils/compile.ts`: compiles a raw TypeScript script into JSON intents.
- `utils/runtime.ts`: stub runtime used by the compiler while collecting
  intents.
- `utils/utils.ts`: CLI parsing, command examples, output formatting, and small
  type guards.
- `utils/types.ts`: generated ambient types for script authoring.
- `utils/index.ts`: utility export surface.

`compile.ts` is the key piece for script generation. It wraps the user's script
with the stub runtime from `runtime.ts`, runs it in a temporary Node process,
and reads the emitted intents back as JSON.

## Runner Behavior

The root runner is `src/EXPERIMENTAL__notion-as-code/runNotionAsCode.ts`.
It creates an SDK client, parses command-line flags, and calls
`EXPERIMENTAL__notionAsCode.run()`.

`NOTION_TOKEN` can be provided in either of these ways:

- export `NOTION_TOKEN` in the shell before running the command
- paste a local test token into the top-level `NOTION_TOKEN` constant in
  `runNotionAsCode.ts`

Never commit a real token. The runner intentionally keeps an editable top-level
`NOTION_TOKEN` constant for local testing. Do not remove the `new Client(...)`
construction used for testing unless the user explicitly asks.

Supported command-line flags are camelCase and use a leading `--`:

```text
--spaceId=<YOUR_WORKSPACE_ID>
--scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
--sessionStateFilePath=./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_example.json
```

Flags can be passed as either `--name=value` or `--name value`.

`scriptFilePath` is required. If it is missing, the runner should fail with a
friendly error that includes a runnable example command.

`spaceId` is the workspace ID and is required by the root runner. If it is
missing, the runner should fail with a friendly error that tells the user to
attach their workspace ID with `--spaceId` and includes a runnable example
command.

When the user passes `--spaceId` without a session-state file, the SDK creates
an initial existing-space mapping from the compiled script, runs the script, and
writes a timestamped session-state file such as:

```text
./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_20260707T173844Z.json
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

On success, the runner should print a concise user-facing message and point the
user to the written session-state file. Do not print the full
`resourceIdToPointerMappings` result in normal runner output.

## Command Style

Use README commands for normal Notion as Code usage. Fill in every known flag,
such as `--spaceId`, `--scriptFilePath`, and `--sessionStateFilePath`; do not
leave placeholders for values the user already supplied.

The examples below are documentation templates only. In direct user-facing
handoffs, replace workspace placeholders with a real workspace ID or ask for the
workspace ID before showing the command.

First run against an existing workspace:

```bash
npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
```

First run when no local token is set:

```bash
export NOTION_TOKEN=<personal-access-token>
npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
```

Follow-up run using a written session-state file:

```bash
npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts --sessionStateFilePath=./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_TIMESTAMP.json
```

If no local token is set for a follow-up run, show the
`export NOTION_TOKEN=<personal-access-token>` step before the run command.

## Raw Script Files

Raw script files are compiler input, not normal SDK entry points.

For local user-specific work, create a new raw script in `scripts/` instead of
editing the sample unless the user explicitly asks to change
`scripts/script_example.ts`. Name one-off scripts with a compact UTC timestamp,
such as `scripts/script_20260707T101500Z.ts`.

The `scripts/` directory is ignored by cspell because user prompts and generated
workspaces often include names, foods, fictional terms, brands, and other
domain-specific words. Do not try to make generated scripts pass cspell unless
the user explicitly asks for that.

Important rules:

- Do not import `Client` in raw scripts.
- Do not create a real SDK client in raw scripts.
- Use the global `notion` helper provided by the compiler.
- Use stable, human-readable `resourceId` values.
- Keep every `resourceId` unique within the script file, including database
  property `resourceId` values.
- Give every teamspace, page, database, and custom agent an appropriate `icon`
  when the supported type allows it. Use the `icon` property; do not prepend
  emoji or icon text to names, titles, or database titles.
- Add a small amount of useful seed data when it helps the user understand how
  to use the workspace. Avoid filler data that obscures the structure.
- When modifying an existing script, preserve working resources and stable
  `resourceId` values. Change only what is needed for the user's request.
- Do not configure teamspace membership in generated scripts for now. Simple
  teamspace access levels such as `open`, `closed`, or `private` are okay.
- Add `export {}` at the end of each raw script so TypeScript treats it as a
  module and multiple script files can live in the same project without
  duplicate global `const` declarations.

When a script is meant to run with `--spaceId`, include one clear workspace
anchor. Prefer a parent reference when the workspace itself should not be
updated:

```typescript
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

export {}
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
- `notion.customAgent(...)`
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
- `notion.relation(...)`

Page `content` uses Notion-flavored markdown. Date mentions currently use
explicit dates; there is no dynamic `@Today` shorthand in the raw markdown
syntax.

Useful content patterns:

- Use `<mention-page url="{{page-resource-id}}" />`,
  `<mention-database url="{{database-resource-id}}" />`, or
  `<mention-data-source url="{{data-source-resource-id}}" />` for inline links
  to resources.
- Use `<database data-source-url="{{view-or-data-source-resource-id}}" inline="true">Title</database>`
  to embed a linked database view in page content. If a view should exist only
  for a linked database block and not as a main database tab, check `types.ts`
  for the supported `ephemeral` view option.
- To place a real child page at a specific spot in page content, create the
  child page with a `parent` pointing at the containing page's `resourceId`,
  then reference it once with `<page url="{{child-resource-id}}">Title</page>`.
  Use `<mention-page>` instead when the goal is only to link to a page without
  moving or placing it as a child.
- For database relations, pass page resource IDs, not page handles. For example,
  use `notion.relation([projectPage.resourceId])`.

Custom agents can be created with `notion.customAgent(...)` when supported by
`types.ts`. Keep custom agent resources generic and user-facing:

- Use a stable `resourceId`, clear `name`, optional `icon`, and concise
  markdown `instructions`.
- `sharedResources` should reference page or database `resourceId` values that
  are created earlier in the same script or mapped through session state.
- `model` accepts a curated set of model identifiers:
  `"ambrosia-tart-high"` for Opus 4.8 High, `"opal-quince-medium"` for GPT 5.5
  Medium, and `"almond-croissant-low"` for Sonnet 4.6 Low. Omit `model` to use
  the workspace default model.

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

## Authoring Workflow

When helping a user create a new Notion as Code script:

1. Read `README.md` first and use its commands/terms in user-facing guidance.
2. Identify the workspace ID before finalizing the script handoff.
   - If the user provided it in the prompt, use it.
   - If the user did not provide it, ask `What is your workspace ID?`
   - Do not ask for it again after the user has already supplied it.
   - Do not show a run command until the workspace ID is known.
3. Check token availability before choosing whether the final handoff needs an
   `export NOTION_TOKEN=<personal-access-token>` setup step.
4. Clarify the target workspace shape when needed: spaces, teamspaces, pages,
   properties, views, and seed pages.
5. Check `utils/types.ts` when deciding which Notion as Code resource,
   property, view, content, or helper shapes are supported.
6. Choose stable `resourceId` values before writing the script.
7. Use `scripts/script_example.ts` only when the user asks to update the shared
   example. Otherwise create a timestamped script in `scripts/`.
8. If editing an existing script that has already been run, preserve the edited
   script path in `--scriptFilePath` and include the matching
   `--sessionStateFilePath` in the handoff command.
9. If the user already has a session-state file or existing mappings, include
   that `sessionStateFilePath` in the run command. If they mention an existing
   workspace but do not provide the session-state path, ask for it before
   finalizing the command.
10. After creating or editing the script, tell the user the exact script path
    and include the exact command they can run from the repository root.
11. Keep runner changes small and preserve the top-level editable constants.

When the user asks in plain English for a script, such as "Create a student
dashboard for my semester...", create the script and finish with a clear
handoff:

```text
I've generated the script for you at:
src/EXPERIMENTAL__notion-as-code/scripts/script_TIMESTAMP.ts

You can run it with:
export NOTION_TOKEN=<personal-access-token>
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=src/EXPERIMENTAL__notion-as-code/scripts/script_TIMESTAMP.ts
```

If a session-state file is already known, include it alongside `--spaceId`:

```text
export NOTION_TOKEN=<personal-access-token>
npm run notion-as-code -- --spaceId=<USER_WORKSPACE_ID> --scriptFilePath=src/EXPERIMENTAL__notion-as-code/scripts/script_TIMESTAMP.ts --sessionStateFilePath=src/EXPERIMENTAL__notion-as-code/sessions/sessionState_TIMESTAMP.json
```

If the token is already pasted into the local runner file, present in the
current shell, or clearly exported in visible terminal context from the same
shell session, omit the `export NOTION_TOKEN=<personal-access-token>` setup
step.

For complex examples, prefer readable local variables over deeply nested calls.
Use `const tasksDb = teamspace.addDatabase(...)` and then
`const tasksDS = tasksDb.getDataSource("tasks-ds")` before adding rows.

## Troubleshooting

When troubleshooting a README command, check these first:

- the command is being run from the repository root
- `NOTION_TOKEN` is set in the shell, was already exported in the active
  terminal session, or the local runner constant has a token
- the token is attached to the target workspace
- `--spaceId` is present and matches the workspace being targeted
- `--scriptFilePath` points to an existing raw script file
- `--sessionStateFilePath`, when provided, points to the same workspace as
  `--spaceId`

The run compiles the script, submits it to Notion, polls the async task, and
writes returned mappings to the session-state file. Normal runner output should
stay concise; users can open the written session-state file to inspect generated
mappings.

## Safety And Hygiene

- Do not commit Personal Access Tokens.
- Do not print or reveal token values when checking whether they are configured.
- Do not commit scratch files that are explicitly named as local-only test
  files.
- Do not commit captured console output that contains local Notion IDs unless
  the user explicitly wants it included.
- Keep generated or local-only resource IDs out of public examples when they
  reveal private workspace details.
- Prefer minimal SDK changes; most user requests in this directory should only
  need example script, mapping, docs, or runner edits.
