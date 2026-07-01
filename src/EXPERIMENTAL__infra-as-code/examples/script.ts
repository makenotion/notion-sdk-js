/**
 * This script will edit an existing space with the id
 * you provided in the existingResources.json file.
 *
 * You can edit the name and icon details below to match your desired space.
 */

{
  const space = notion.space.create({
    resourceId: "my-space",
    name: "My Space",
    icon: { type: "notion_icon", description: "code", color: "blue" },
  })
}
