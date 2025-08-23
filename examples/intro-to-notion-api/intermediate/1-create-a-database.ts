import { Client } from "@notionhq/client"
import { config } from "dotenv"

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
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 */

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
          content: "New database name",
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

  // Print the new database response
  console.log(newDatabase)
}

main()
