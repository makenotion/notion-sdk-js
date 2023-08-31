import { Client } from "@notionhq/client"
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

async function addNotionPageToDatabase(databaseId, pageProperties) {
  await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties, // Note: Page properties must match the schema of the database
  })
}

async function queryAndSortDatabase(databaseId) {
  // This query will filter and sort database entries. The returned pages will have a "Last ordered" property that is more recent than 2022-12-31. Any database property can be filtered or sorted. Pass multiple sort objects to the "sorts" array to apply more than one sorting rule.
  const lastOrderedIn2023Alphabetical = await notion.databases.query({
    database_id: databaseId,
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
  console.log(lastOrderedIn2023Alphabetical)
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
    properties: {
      // These properties represent columns in the database (i.e. its schema)
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
  })
  // Print the new database's URL. Visit the URL in your browser to see the pages that get created in the next step.
  console.log(newDatabase.url)

  const databaseId = newDatabase.id
  if (!databaseId) return

  console.log("Adding new pages...")
  for (let i = 0; i < propertiesForNewPages.length; i++) {
    // Add a few new pages to the database that was just created
    await addNotionPageToDatabase(databaseId, propertiesForNewPages[i])
  }

  // After adding pages, query the database entries (pages) and sort the results
  queryAndSortDatabase(databaseId)
}

main()
