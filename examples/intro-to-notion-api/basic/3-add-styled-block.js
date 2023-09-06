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
 * - Appending block children endpoint (notion.blocks.children.append(): https://developers.notion.com/reference/patch-block-children)
 * - Rich text options: https://developers.notion.com/reference/rich-text
 * - Working with page content guide: https://developers.notion.com/docs/working-with-page-content
 */

async function main() {
  const blockId = pageId // Blocks can be appended to other blocks *or* pages. Therefore, a page ID can be used for the block_id parameter
  const styledLinkTextResponse = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        heading_3: {
          rich_text: [
            {
              text: {
                content: "Tuscan  kale",
              },
            },
          ],
        },
      },
      {
        paragraph: {
          rich_text: [
            {
              text: {
                // Paragraph text
                content:
                  "Tuscan  kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                link: {
                  // Paragraph link
                  url: "https://en.wikipedia.org/wiki/Kale",
                },
              },
              annotations: {
                // Paragraph styles
                bold: true,
                italic: true,
                strikethrough: true,
                underline: true,
                color: "green",
              },
            },
          ],
        },
      },
    ],
  })

  // Print the new block(s) response
  console.log(styledLinkTextResponse)
}

main()
