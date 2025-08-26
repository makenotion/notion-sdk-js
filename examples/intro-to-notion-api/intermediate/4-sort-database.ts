import { Client, isFullDatabase } from "@notionhq/client"
import { config } from "dotenv"
import { propertiesForNewPages } from "./sampleData.js"

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/*
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Create a page endpoint (notion.pages.create(): https://developers.notion.com/reference/post-page)
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 * Query a database: https://developers.notion.com/reference/post-database-query
 * Filter database entries: https://developers.notion.com/reference/post-database-query-filter
 * Sort database entries: https://developers.notion.com/reference/post-database-query-sort
 */

async function addNotionPageToDataSource(dataSourceId, pageProperties) {
  await notion.pages.create({
    parent: {
      data_source_id: dataSourceId,
    },
    properties: pageProperties, // Note: Page properties must match the schema of the database
  })
}

async function queryAndSortDataSource(dataSourceId) {
  console.log("Querying data source...")
  // This query will filter and sort database entries. The returned pages will have a
  // "Last ordered" property that is more recent than 2022-12-31. Any database property
  // can be filtered or sorted. Pass multiple sort objects to the "sorts" array to
  // apply more than one sorting rule.
  const lastOrderedIn2023Alphabetical = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Last ordered",
      date: {
        after: "2022-12-31",
      },
    },
    sorts: [
      {
        property: "Grocery item",
        direction: "descending",
      },
    ],
  })

  // Print filtered/sorted results
  console.log(
    'Pages with the "Last ordered" date after 2022-12-31 in descending order:'
  )
  console.log(JSON.stringify(lastOrderedIn2023Alphabetical, null, 2))
}

async function main() {
  // Create a new database
  const newDatabase = await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    title: [
      {
        type: "text",
        text: {
          content: "Grocery list",
        },
      },
    ],
    initial_data_source: {
      properties: {
        // These properties represent columns in the data source (i.e. its schema)
        "Grocery item": {
          type: "title",
          title: {},
        },
        Price: {
          type: "number",
          number: {
            format: "dollar",
          },
        },
        "Last ordered": {
          type: "date",
          date: {},
        },
      },
    },
  })

  if (!isFullDatabase(newDatabase)) {
    console.error(`No read permissions on database: ${newDatabase.id}`)
    return
  }

  // Print the new database's URL. Visit the URL in your browser to see the pages that get created in the next step.
  console.log(newDatabase.id)

  const dataSourceId = newDatabase.data_sources[0].id
  if (!dataSourceId) return

  console.log("Adding new pages...")
  for (let i = 0; i < propertiesForNewPages.length; i++) {
    // Add a few new pages to the database that was just created
    await addNotionPageToDataSource(dataSourceId, propertiesForNewPages[i])
  }

  // After adding pages, query the database entries (pages) and sort the results
  queryAndSortDataSource(dataSourceId)
}

main()
