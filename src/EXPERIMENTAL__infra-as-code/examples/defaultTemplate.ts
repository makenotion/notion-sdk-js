/**
 * Creates a database with separate template pages for the data source default
 * and the view default.
 */
function createDatabaseWithDefaultTemplate() {
  const space = notion.space.create({
    resourceId: "default-template-space",
    name: "Default Template Demo",
  })

  const teamspace = space.addTeamspace({
    resourceId: "default-template-teamspace",
    name: "Default Template Team",
    accessLevel: "default",
  })

  const database = teamspace.addDatabase({
    resourceId: "default-template-db",
    name: "Tasks",
    dataSources: [
      {
        resourceId: "default-template-ds",
        name: "Tasks",
        defaultTemplate: "default-data-source-template",
        properties: [
          { resourceId: "task-name", name: "Name", type: "title" },
          {
            resourceId: "task-status",
            name: "Status",
            type: "status",
            options: {
              todo: [{ name: "To Do", color: "gray" }],
              inProgress: [{ name: "In Progress", color: "blue" }],
              complete: [{ name: "Done", color: "green" }],
            },
          },
        ] as const,
      },
    ] as const,
    views: [
      {
        resourceId: "default-template-view",
        name: "All Tasks",
        type: "table",
        dataSourceResourceId: "default-template-ds",
        defaultTemplate: "default-view-template",
      },
    ] as const,
  })

  const tasksDataSource = database.dataSources["default-template-ds"]
  if (!tasksDataSource) {
    throw new Error("Expected default-template-ds to be available")
  }

  // Keep this example strict-build friendly until the copied helper types
  // return SimpleTextValue instead of unknown.
  tasksDataSource.addPage({
    resourceId: "default-data-source-template",
    template: true,
    properties: {
      Name: [["Data Source Template"]],
      Status: notion.status("To Do"),
    },
    content: [
      "# Data Source Template",
      "",
      "Start here when creating pages from the data source default.",
    ].join("\n"),
  })

  tasksDataSource.addPage({
    resourceId: "default-view-template",
    template: true,
    properties: {
      Name: [["View Template"]],
      Status: notion.status("In Progress"),
    },
    content: [
      "# View Template",
      "",
      "Start here when creating pages from the view default.",
    ].join("\n"),
  })

  tasksDataSource.addPage({
    resourceId: "default-template-task-1",
    properties: {
      Name: [["Ship template support"]],
      Status: notion.status("In Progress"),
    },
  })
}

createDatabaseWithDefaultTemplate()
