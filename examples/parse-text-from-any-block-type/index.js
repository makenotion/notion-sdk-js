import { Client } from "@notionhq/client"
import { config } from "dotenv"

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/* 
---------------------------------------------------------------------------
*/

// Take rich text array from a block child that supports rich text and return the plain text.
// Note: All rich text objects include a plain_text field.
const getPlainTextFromRichText = richText => {
  return richText.map(t => t.plain_text).join(", ")
  // Note: A page mention will return "Undefined" as the page name if the page has not been shared with the integration. See: https://developers.notion.com/reference/block#mention
}

// Use the source URL and optional caption from media blocks (file, video, etc.)
const getMediaSourceText = block => {
  let source, caption

  if (block[block.type].external) {
    source = block[block.type].external.url
  } else if (block[block.type].file) {
    source = block[block.type].file.url
  } else if (block[block.type].url) {
    source = block[block.type].url
  } else {
    source = "Missing case for media block types: " + block.type
  }
  // If there's a caption, return it with the source
  if (block[block.type].caption.length) {
    caption = getPlainTextFromRichText(block[block.type].caption)
    return caption + ": " + source
  }
  // If no caption, just return the source URL
  return source
}

// Parse the plain text from any block type supported by the public API.
const parseText = block => {
  let text

  // The public API does not support all block types yet
  if (block.type === "unsupported") {
    text = "Unsupported block type"
  }
  // Get rich text from blocks that support it
  else if (block[block.type].rich_text) {
    // This will be an empty string if it's an empty line.
    text = getPlainTextFromRichText(block[block.type].rich_text)
  }
  // Get text for block types that don't have rich text
  else {
    switch (block.type) {
      case "bookmark":
        text = block.bookmark.url
        break
      case "child_database":
        text = block.child_database.title
        // Use "Query a database" endpoint to get db rows: https://developers.notion.com/reference/post-database-query
        // Use "Retrieve a database" endpoint to get additional properties: https://developers.notion.com/reference/retrieve-a-database
        break
      case "child_page":
        text = block.child_page.title
        break
      case "embed":
      case "video":
      case "file":
      case "image":
      case "pdf":
        text = getMediaSourceText(block)
        break
      case "equation":
        text = block.equation.expression
        break
      case "link_preview":
        text = block.link_preview.url
        break
      case "synced_block":
        // Provides ID for block it's synced with.
        text = block.synced_block.synced_from
          ? "This block is synced with a block with the following ID: " +
            block.synced_block.synced_from[block.synced_block.synced_from.type]
          : "Source sync block that another blocked is synced with."
        break
      case "table":
        // Only contains table properties.
        // Fetch children blocks for more details.
        text = "Table width: " + block.table.table_width
        break
      case "table_of_contents":
        // Does not include text from ToC; just the color
        text = "ToC color: " + block.table_of_contents.color
        break
      case "breadcrumb":
      case "column_list":
      case "divider":
        text = "No text available"
        break
      default:
        text = "Needs case added"
        break
    }
  }
  // Blocks with the has_children property will require fetching the child blocks. (Not included in this example.)
  // e.g. nested bulleted lists
  if (block.has_children) {
    // For now, we'll just flag there are children blocks.
    text = text + " (Has children)"
  }
  // Includes block type for readability. Update formatting as needed.
  return block.type + ": " + text
}

async function retrieveBlockChildren(id) {
  console.log("Retrieving blocks (async)...")

  const blocks = await notion.blocks.children.list({
    block_id: id, // A page ID can be passed as a block ID: https://developers.notion.com/docs/working-with-page-content#modeling-content-as-blocks
  })

  return blocks
}

const printBlockText = blocks => {
  console.log("Displaying blocks:")

  for (let i = 0; i < blocks.length; i++) {
    const text = parseText(blocks[i])
    // Print plain text for each block.
    console.log(text)
  }
}

async function main() {
  // Make API call to retrieve all block children from the page provided in .env
  const blocks = await retrieveBlockChildren(pageId)

  // Parse and print plain text for each block.
  printBlockText(blocks.results)
}

main()
