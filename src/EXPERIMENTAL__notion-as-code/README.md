## What Is Notion as Code?

Notion as Code lets you describe a Notion workspace in a local TypeScript file, then apply that structure to a real workspace.

Instead of manually creating the same teamspaces, pages, databases, properties, and seed content over and over, you can write them once as code and run that script again when you want to create or update the workspace.

> [!WARNING]
> Notion as Code is experimental alpha. Use a workspace you are comfortable modifying.

## How To Set it Up

1. **Clone** the notion-js-sdk repository:

```
 git clone git@github.com:makenotion/notion-sdk-js.git
```

2. Within the new repository, **check out** the Notion as Code experimental branch:

```
 cd notion-sdk-js
 git checkout experimental-alpha-notion-as-code
```

3. Create a Notion **Personal Access Token (PAT)**:
   [https://developers.notion.com/guides/get-started/personal-access-tokens](https://developers.notion.com/guides/get-started/personal-access-tokens)
4. **Attach** your Personal Access Token **to the workspace** you want to update.
5. **Provide your token** either by exporting `NOTION_TOKEN` in your shell or by pasting it into the `NOTION_TOKEN` constant in `runNotionAsCode.ts`.
6. **Copy your workspace ID** from Notion. In Notion, go to Settings > General, scroll to the bottom, and copy the workspace ID.
7. **Run the example script** and replace `<YOUR_WORKSPACE_ID>`.

```
 npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
```

This runs `script_example.ts` against your workspace. The example creates a **General** teamspace, a welcome page, a sample database, and a few sample database entries in your provided workspace.

## Success Output

If the run succeeds, you should see a message like:

```
✅ Your workspace <YOUR_WORKSPACE_ID> has been successfully updated with ./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts. The session-state file has been saved to ./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_TIMESTAMP.json.

To run new scripts against this workspace, run the following command:
npm run notion-as-code -- --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts --spaceId=<YOUR_WORKSPACE_ID> --sessionStateFilePath=./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_TIMESTAMP.json
```

The session-state file is important. It stores the mapping between names in your script and the real Notion resources that were created. Use it for future runs so Notion as Code can update the same resources instead of creating duplicates.

**What next?** Once the example run succeeds, you can edit `scripts/script_example.ts` or create a new script in `scripts/`.

You can also ask your favorite agent to help generate a script. Describe the Notion setup you want in plain English, for example:

> Create a student dashboard for my semester. Include a General teamspace, a Courses database, an Assignments database, a weekly study plan page, deadline views grouped by course and status, and a few sample assignments.

The agent can turn that description into a Notion as Code script you can run with the generated session-state file.

## Example Agent Prompts

Some of the ✨magic✨ behind Notion as Code is how naturally it pairs with AI. Describe the workspace you want, and an agent can turn that idea into a TypeScript script plus hand you the exact command to run it against your workspace. You can review the generated script, tweak it, run it, and then reuse the saved session state for future updates.

Your prompt can be loose and goal-oriented, like “I need a Notion setup for planning a wedding from scratch.” It can also be very specific: “Create a workspace with W teamspaces, X databases, Y pages, relations between these databases, and calendar, board, and timeline views for tracking projects.” The examples below range from tiny vibes-based requests to detailed workspace specs:

### Short

> Build a Notion workspace for a high school teacher managing classes and students.

> I want a system for organizing my life after moving to a new city.

> I need a workspace for launching a podcast with guests, sponsors, and episodes.

### Medium

**Coffee Shop Ops**

> I’m managing a small coffee shop and want a Notion workspace to track staff shifts, supplier orders, equipment maintenance, seasonal drinks, and daily opening/closing checklists.

**University Research Lab**

> Set up a research lab workspace with a Lab Admin teamspace, a Papers database, Experiments database, Grants database, Equipment database, Lab Members database, and pages for onboarding, safety protocols, weekly lab meetings, and publication pipeline.

**Personal Life OS**

> I want a simple personal workspace to manage my week: tasks, habits, meals, workouts, books, personal projects, and notes. Keep it lightweight and easy to maintain.

### Long

**AI-Powered Product Org**

> Build a Product HQ workspace for a 40-person startup. Create a Product teamspace with databases for Roadmap, Projects, User Feedback, Experiments, Launches, Bugs, and Research Notes. Add two-way relations between Projects and Roadmap items, Feedback and Projects, Bugs and Launches, plus rollups for total open bugs per launch and feedback count per project. Create table, board, timeline, and calendar views. Add template pages for new PRDs and launch plans. Create a Product Ops custom agent with access to the Roadmap, Projects, Feedback, and Launches databases. Add a homepage with callout blocks, linked database views, a launch calendar, and a synced block for weekly product rituals.

**Magical University Wiki And Admin System**

> Create a whimsical but serious workspace for running a fictional magical university. Build teamspaces for Academics, Student Life, Faculty, Admissions, Facilities, and Archives. Create databases for Courses, Professors, Students, Houses, Magical Artifacts, Spells, Incidents, Dorms, Events, Research Projects, and Library Collections. Add relations between Students and Houses, Courses and Professors, Incidents and Students, Artifacts and Research Projects, Events and Dorms, and Spells and Courses. Add rollups for incident count per house, active course load per professor, and artifacts per research project. Create gallery views for artifacts, calendar views for events, board views for incidents, and linked database views on a grand ‘Headmaster Dashboard’ page. Add dramatic callout blocks, a table of contents, synced school policies block, template pages for new courses and incident reports, and a custom agent called ‘Archivist Familiar’ that can search the Archives, Courses, Spells, and Artifacts databases.

## Scripts and Sessions

A script file describes what you want in Notion.
For example, this script creates a teamspace and adds a page under the workspace mapped by `--spaceId`:

```typescript
// npm run notion-as-code -- --scriptFilePath=./path/to/script.ts
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

A session-state file remembers what happened after a run. It maps `resourceId` values from your script, such as `my-space` and `general-teamspace`, to real Notion IDs. In the example below, those keys match the `resourceId` values from the script above.

```jsonc
// npm run notion-as-code -- --sessionStateFilePath=./path/to/sessionState.json
{
  "resourceIdToPointerMappings": {
    "my-space": {
      "table": "space",
      "id": "<YOUR_WORKSPACE_ID>",
      "spaceId": "<YOUR_WORKSPACE_ID>",
    },
    "general-teamspace": {
      "table": "team",
      "id": "<teamspace-id>",
      "spaceId": "<YOUR_WORKSPACE_ID>",
    },
  },
  "resourceIdToPropertyIdMappings": {},
}
```

You usually do not need to write this file by hand for a first run. If you pass `--spaceId`, Notion as Code creates the initial mapping and writes a timestamped session-state file for you.

For future runs, include the generated `--sessionStateFilePath` with the same `--spaceId`.

The included `sessions/sessionState_example.json` file is only a reference for the file shape. You can copy it if you want to seed mappings manually, but the recommended first-run flow is to let `--spaceId` generate a session-state file for you.

## Command-Line Flags

The runner supports these flags:

```
NOTION_TOKEN=
--scriptFilePath=...
--sessionStateFilePath=...
--spaceId=...
```

Use `--spaceId` for a first run against a workspace:

```
npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/script_example.ts
```

Use `--sessionStateFilePath` with the same `--spaceId` for follow-up runs:

```
npm run notion-as-code -- --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__notion-as-code/scripts/my_script.ts --sessionStateFilePath=./src/EXPERIMENTAL__notion-as-code/sessions/sessionState_TIMESTAMP.json
```

If `--spaceId` and `--sessionStateFilePath` point at different workspaces, the run stops with an error.

## How It Works

You do not need to understand this section to run Notion as Code. The instructions above are enough! But we've included a short summary below for anyone curious about how the pieces fit together.

At a high level:

- You write a local TypeScript script using the provided global notion helper.
- The SDK compiles that script into JSON intents.
- The SDK combines those intents with the `spaceId` mapping and any existing mappings from `sessionStateFilePath`.
- The SDK submits the run to Notion.
- The SDK polls until the run succeeds or fails.
- On success, the SDK writes the latest mappings to a session-state file.

Useful Files

- `runNotionAsCode.ts`: local runner
- `scripts/script_example.ts`: starter script
- `sessions/`: generated session-state files
- `utils/types.ts`: supported script types and helper shapes
