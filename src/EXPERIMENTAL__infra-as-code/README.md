## What Is Infra As Code?

Infra as Code for Notion lets you describe a Notion workspace in a local TypeScript file, then apply that structure to a real workspace.

Instead of manually creating the same teamspaces, pages, databases, properties, and seed content over and over, you can write them once as code and run that script again when you want to create or update the workspace.

Infra as Code is experimental alpha. Use a workspace you are comfortable modifying.

## How To Set it Up

1. **Clone** the notion-js-sdk repository:

   ```
   git clone git@github.com:makenotion/notion-sdk-js.git
   ```

2. **Check out** the Infra as Code experimental branch:

   ```
   git checkout experimental-alpha-infra-as-code
   ```

3. Create a Notion **Personal Access Token (PAT)**:
   [https://developers.notion.com/guides/get-started/personal-access-tokens](https://developers.notion.com/guides/get-started/personal-access-tokens)

4. **Attach** your Personal Access Token **to the workspace** you want to update.

5. **Provide your token** either by setting `NOTION_TOKEN` in your shell or by pasting it into the `NOTION_TOKEN` constant in `runInfraAsCode.ts`.

6. **Copy your workspace ID** from Notion. In Notion, go to Settings > General, scroll to the bottom, and copy the workspace ID.

7. **Run the example script** and replace `<YOUR_WORKSPACE_ID>`.

   ```
   npm run build
   node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
   ```

   This runs `script_example.ts` against your workspace. The example creates a **General** teamspace, a welcome page, a sample database, and a few sample database entries in your provided workspace.

## Success Output

If the run succeeds, you should see a message like:

```
✅ Your workspace <YOUR_WORKSPACE_ID> has been successfully updated with ./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts.
The session-state file has been saved to ./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_TIMESTAMP.json.

To run new scripts against this workspace, run the following command:
npm run build && node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --scriptFilePath=<YOUR_NEW_SCRIPT_FILE_PATH> --spaceId=<YOUR_WORKSPACE_ID> --sessionStateFilePath=./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_TIMESTAMP.json
```

The session-state file is important. It stores the mapping between names in your script and the real Notion resources that were created. Use it for future runs so Infra as Code can update the same resources instead of creating duplicates.

**What next?** Once the example run succeeds, you can edit `scripts/script_example.ts` or create a new script in `scripts/`.

You can also ask an agent to help generate a script. Describe the Notion setup you want in plain English, for example:

> Create a student dashboard for my semester. Include a General teamspace, a Courses database, an Assignments database, a weekly study plan page, deadline views grouped by course and status, and a few sample assignments.

The agent can turn that description into an Infra as Code script you can run with the generated session-state file.

## Scripts and Sessions

A script file describes what you want in Notion.
For example, this script creates a teamspace and adds a page under the workspace mapped by `--spaceId`:

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

A session-state file remembers what happened after a run. It connects script resource IDs like "general-teamspace" to real Notion IDs.

```json
{
  "resourceIdToPointerMappings": {
    "my-space": {
      "table": "space",
      "id": "<YOUR_WORKSPACE_ID>",
      "spaceId": "<YOUR_WORKSPACE_ID>"
    },
    "general-teamspace": {
      "table": "team",
      "id": "<teamspace-id>",
      "spaceId": "<YOUR_WORKSPACE_ID>"
    }
  },
  "resourceIdToPropertyIdMappings": {}
}
```

You usually do not need to write this file by hand for a first run. If you pass `--spaceId`, Infra as Code creates the initial mapping and writes a timestamped session-state file for you.

For future runs, include the generated `--sessionStateFilePath` with the same `--spaceId`.

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
npm run build
node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/script_example.ts
```

Use `--sessionStateFilePath` with the same `--spaceId` for follow-up runs:

```
npm run build
node build/src/EXPERIMENTAL__infra-as-code/runInfraAsCode.js --spaceId=<YOUR_WORKSPACE_ID> --scriptFilePath=./src/EXPERIMENTAL__infra-as-code/scripts/my_script.ts --sessionStateFilePath=./src/EXPERIMENTAL__infra-as-code/sessions/sessionState_TIMESTAMP.json
```

If `--spaceId` and `--sessionStateFilePath` point at different workspaces, the run stops with an error.

## How It Works

At a high level:

- You write a local TypeScript script using the provided global notion helper.
- The SDK compiles that script into JSON intents.
- The SDK combines those intents with the `spaceId` mapping and any existing mappings from `sessionStateFilePath`.
- The SDK submits the run to Notion.
- The SDK polls until the run succeeds or fails.
- On success, the SDK writes the latest mappings to a session-state file.

Useful Files

- `runInfraAsCode.ts`: local runner
- `scripts/script_example.ts`: starter script
- `sessions/`: generated session-state files
- `utils/types.ts`: supported script types and helper shapes
