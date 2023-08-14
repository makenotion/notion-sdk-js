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
  const blockId = pageId // Blocks can be appended to other blocks *or* pages. Therefore, a page ID can be used for the block_id parameter
  const newHeadingResponse = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Types of kale",
              },
            },
          ],
        },
      },
    ],
  })
  console.log(newHeadingResponse)
}

main()
