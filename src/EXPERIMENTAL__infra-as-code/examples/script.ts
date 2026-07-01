/**
 * This is the infra as code script compiled by runInfraAsCode.ts.
 *
 * No imports are needed: the runner provides a global `notion` helper.
 * The resourceId "my-space" matches the key in existingResources.json, so the
 * example run updates that mapped space.
 *
 * Try changing the name or icon, then rebuild and rerun the example.
 */

{
  notion.space.create({
    resourceId: "my-space",
    name: "My Space",
    icon: { type: "notion_icon", description: "code", color: "blue" },
  })
}
