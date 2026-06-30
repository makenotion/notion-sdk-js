// This script & its corresponding testExistingResources.json
// was generated from the IAC admin tool on localhost on 6/30/2026.

const space = notion.space.create({
  resourceId: "test-js-sdk-space",
  name: "Test JS SDK",
  icon: { type: "notion_icon", description: "code", color: "blue" },
})

const teamspace = space.addTeamspace({
  resourceId: "general-teamspace",
  name: "General",
  accessLevel: "open",
  icon: { type: "notion_icon", description: "home", color: "green" },
  description: "The main teamspace for Test JS SDK.",
})

teamspace.addPage({
  resourceId: "welcome-page",
  icon: { type: "emoji", emoji: "👋" },
  properties: { title: notion.text("Welcome") },
  content: `# Welcome to Test JS SDK

This is a simple workspace to get started.

## Resources

- Check out the <mention-database url="{{tasks-db}}" /> to track your work.
`,
})

const tasksDb = teamspace.addDatabase({
  resourceId: "tasks-db",
  name: "Tasks",
  icon: { type: "notion_icon", description: "checklist", color: "purple" },
  dataSources: [
    {
      resourceId: "tasks-ds",
      name: "Tasks",
      properties: [
        { resourceId: "task-name-prop", name: "Name", type: "title" },
        {
          resourceId: "task-status-prop",
          name: "Status",
          type: "status",
          options: {
            todo: [{ name: "Not Started", color: "gray", default: true }],
            inProgress: [{ name: "In Progress", color: "blue" }],
            complete: [{ name: "Done", color: "green" }],
          },
        },
        {
          resourceId: "task-priority-prop",
          name: "Priority",
          type: "select",
          options: [
            { name: "High", color: "red" },
            { name: "Medium", color: "yellow" },
            { name: "Low", color: "green" },
          ],
        },
        { resourceId: "task-due-date-prop", name: "Due Date", type: "date" },
      ],
    },
  ],
  views: [
    {
      resourceId: "tasks-table-view",
      name: "All Tasks",
      type: "table",
      dataSourceResourceId: "tasks-ds",
    },
    {
      resourceId: "tasks-board-view",
      name: "Board",
      type: "board",
      dataSourceResourceId: "tasks-ds",
      groupBy: { property: "task-status-prop" },
    },
  ],
})

const tasksDS = tasksDb.getDataSource("tasks-ds")

tasksDS.addPage({
  resourceId: "task-1",
  properties: {
    Name: notion.text("Set up workspace"),
    Status: notion.status("Done"),
    Priority: notion.select("High"),
    "Due Date": notion.date("2026-06-30"),
  },
})

tasksDS.addPage({
  resourceId: "task-2",
  properties: {
    Name: notion.text("Add team members"),
    Status: notion.status("In Progress"),
    Priority: notion.select("Medium"),
    "Due Date": notion.date("2026-07-05"),
  },
})

tasksDS.addPage({
  resourceId: "task-3",
  properties: {
    Name: notion.text("Create project plan"),
    Status: notion.status("Not Started"),
    Priority: notion.select("Low"),
    "Due Date": notion.date("2026-07-10"),
  },
})
