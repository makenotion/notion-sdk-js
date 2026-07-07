/**
 * This file needs no dependencies.
 *
 * `compile.ts` copies only this function into the generated user script. Any
 * imported value or top-level helper used inside the function would be missing
 * in the child process. Type-only references are okay because TypeScript erases
 * them before the generated script runs.
 */
type RuntimeNotion = typeof notion & {
  intent(intent: InfraAsCodeIntent): void
  rollup(value: unknown): unknown
}
type ChildPageArgs = Omit<PageIntent, "parent">
type ChildDatabaseArgs = Omit<DatabaseIntent, "parent">

/**
 * Creates the `notion` object exposed to an infra as code script.
 *
 * The compiler embeds this function into a generated script and runs it in a
 * child Node process. Calls such as `notion.page()` append plain intents to the
 * returned `intents` array instead of calling the Notion API directly.
 */
export function createInfraAsCodeStubRuntime(): {
  notion: RuntimeNotion
  intents: InfraAsCodeIntent[]
} {
  const intents: InfraAsCodeIntent[] = []
  const notion: RuntimeNotion = {
    intent(intent) {
      intents.push(intent)
    },

    space: args => {
      notion.intent({ type: "space", ...args })
      return {
        resourceId: args.resourceId,
        addTeamspace: tsArgs =>
          notion.teamspace({
            ...tsArgs,
            parent: { type: "resourceId", resourceId: args.resourceId },
          }),
      }
    },

    teamspace: args => {
      notion.intent({ type: "teamspace", ...args })
      return {
        resourceId: args.resourceId,
        addDatabase: dbArgs =>
          notion.database({
            ...dbArgs,
            parent: { type: "resourceId", resourceId: args.resourceId },
          }),
        addPage: pageArgs =>
          notion.page({
            ...pageArgs,
            parent: { type: "resourceId", resourceId: args.resourceId },
          }),
      }
    },

    database: args => {
      notion.intent({
        type: "database",
        ...args,
      })

      const dataSources: Record<
        ResourceId,
        DataSourceHandle<PropertySchemaDefinition[]>
      > = {}
      for (const ds of args.dataSources || []) {
        const dataSourceResourceId = ds.resourceId
        dataSources[ds.resourceId] = {
          resourceId: dataSourceResourceId,
          schema: ds.properties || [],
          addPage: pageArgs =>
            notion.page({
              ...pageArgs,
              parent: {
                type: "resourceId",
                resourceId: dataSourceResourceId,
              },
            }),
        }
      }

      return {
        resourceId: args.resourceId,
        dataSources,
        getDataSource: id => {
          const dataSource = dataSources[id]
          if (dataSource === undefined) {
            throw new Error(`Unknown data source resourceId: ${id}`)
          }

          return dataSource as DataSourceHandle<typeof dataSource.schema>
        },
        addView: view => {
          notion.intent({
            type: "view",
            databaseResourceId: args.resourceId,
            view,
          })
        },
      }
    },

    page: args => {
      notion.intent({ type: "page", ...args })
      return {
        resourceId: args.resourceId,
        addPage: (pageArgs: ChildPageArgs) =>
          notion.page({
            ...pageArgs,
            parent: { type: "resourceId", resourceId: args.resourceId },
          }),
        addDatabase: (dbArgs: ChildDatabaseArgs) =>
          notion.database({
            ...dbArgs,
            parent: { type: "resourceId", resourceId: args.resourceId },
          }),
      }
    },

    customAgent: args => {
      notion.intent({ type: "custom_agent", ...args })
      return {
        resourceId: args.resourceId,
      }
    },

    /**
     * Creates a file reference for use in database file properties.
     * The resourceId must match a file from the file manifest.
     */
    file: resourceId => ({ type: "file", resourceId }),

    text: value => [[value]],
    number: value => [[String(value)]],
    checkbox: value => [[value ? "Yes" : "No"]],
    phone: value => [[value]],
    select: value => value,
    status: value => value,
    multiSelect: values => values.join(","),
    rollup: value => value,
    date: (startDate, endDate) => {
      const dateData = endDate
        ? { type: "daterange", start_date: startDate, end_date: endDate }
        : { type: "date", start_date: startDate }
      return [["\u2023", [["d", dateData]]]]
    },
    url: value => [[value, [["a", value]]]],
    email: value => [[value, [["a", `mailto:${value}`]]]],
    relation: value => value,
  }

  return {
    notion,
    intents,
  }
}
