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

async function addNotionPageToDatabase(databaseId, pageProperties) {
  const newPage = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: pageProperties,
  })
  console.log(newPage)
}

async function main() {
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
  console.log(newDatabase)
  const databaseId = newDatabase.id
  if (!databaseId) return

  for (let i = 0; i < propertiesForNewPages.length; i++) {
    addNotionPageToDatabase(databaseId, propertiesForNewPages[i])
  }
}

main()
