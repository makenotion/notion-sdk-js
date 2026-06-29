type RuntimeNotion = typeof notion & {
  intent(intent: InfraAsCodeIntent): void
  log(message: unknown): void
}

export function createInfraAsCodeRuntime(): {
  notion: RuntimeNotion
  intents: InfraAsCodeIntent[]
  logs: string[]
} {
  const intents: InfraAsCodeIntent[] = []
  const logs: string[] = []
  const notion: RuntimeNotion = {
    intent(intent) {
      intents.push(intent)
    },

    log(message) {
      logs.push(String(message))
    },

    space: {
      create: args => {
        notion.intent({ type: "space", ...args })
        return {
          resourceId: args.resourceId,
          addTeamspace: tsArgs =>
            notion.teamspace.create({
              ...tsArgs,
              parent: { type: "resourceId", resourceId: args.resourceId },
            }),
        }
      },
    },

    teamspace: {
      create: args => {
        notion.intent({ type: "teamspace", ...args })
        return {
          resourceId: args.resourceId,
          addDatabase: dbArgs =>
            notion.database.create({
              ...dbArgs,
              parent: { type: "resourceId", resourceId: args.resourceId },
            }),
          addPage: pageArgs =>
            notion.page.create({
              ...pageArgs,
              parent: { type: "resourceId", resourceId: args.resourceId },
            }),
        }
      },
    },

    database: {
      create: args => {
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
              notion.page.create({
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
    },

    page: {
      create: args => {
        notion.intent({ type: "page", ...args })
        return {
          resourceId: args.resourceId,
        }
      },
    },

    customAgent: {
      create: args => {
        notion.intent({ type: "custom_agent", ...args })
        return {
          resourceId: args.resourceId,
        }
      },
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
    logs,
  }
}
