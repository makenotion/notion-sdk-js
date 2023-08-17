import { Client } from "@notionhq/client"
import { config } from "dotenv"

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/* 
---------------------------------------------------------------------------
*/

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
          content: "New database name",
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
}

main()
