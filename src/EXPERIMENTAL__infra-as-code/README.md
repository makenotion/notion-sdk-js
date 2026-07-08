## What Is Infra As Code?

Infra as Code for Notion lets you define and generate a Notion workspace programmatically, using code instead of manually building pages, databases, relations, views, and permissions one by one. It’s designed for builders, consultants, admins, and developers who need to create or manage structured Notion workspaces at scale.

Instead of spending hours manually recreating the same setup across customers, teams, or workspaces, users can define the desired workspace structure once and reliably apply it again and again. This makes workspace setup faster, more consistent, easier to iterate on, and less prone to human error, especially for complex systems with many connected databases and views.

## How To Set it Up

1. If you haven't yet, **clone** the notion-js-sdk repository:

```
git clone git@github.com:makenotion/notion-sdk-js.git
```

1. **Check out** the Infra as Code experimental branch:

```
git checkout experimental-alpha-infra-as-code
```

1. You will need a **Personal Access Token (PAT)** to run Infra as Code. See here for how to create a PAT: [https://developers.notion.com/guides/get-started/personal-access-tokens](https://developers.notion.com/guides/get-started/personal-access-tokens)
2. Make sure to **attach your PAT to the Notion workspace** you wish to modify. *Note: Infra as Code is an **experimental alpha**, so make sure to choose a workspace that you are comfortable with modifying.*
3. Copy the **workspace ID** for the Notion workspace connected to your PAT. To find your workspace ID on Notion, go to Settings > General, scroll all the way down, and copy the workspace id. You'll need this for later!

Now, you should be ready to get started! Open up our example run file at `src/EXPERIMENTAL__infra-as-code/runInfraAsCode.ts` and follow the instructions there.

Alternatively, you can also run your own agent to assist you with running files and writing scripts. We have attached an `AGENTS.md` file that will help guide you through the process.

## Scripts and Sessions

(WIP)

To write your own script and sessionState files, you can use the examples in the `scripts/` and `sessions/` directories. Make sure to replace `<YOUR_WORKSPACE_ID>` in `sessionState_example.json`. 

You can also pass in scripts using the optional flags...

## How It Works

This PR adds an experimental SDK workflow at `Client.EXPERIMENTAL__infraAsCode.run()`.

At a high level:

- The user writes a local TypeScript infra-as-code script using the provided `notion` helper.
- The SDK compiles that script into JSON intents.
- The SDK reads `sessionStateFilePath` to find existing Notion resources, especially the target space.
- The SDK submits `{ intents, existingResources, existingProperties }` to the public infra-as-code API.
- The SDK polls the async task endpoint until the run succeeds or fails.
- On success, the SDK writes returned resource/property mappings back to the same session-state file.

The session-state file is required. It must include at least one existing space mapping so the public API knows which workspace the script should target.