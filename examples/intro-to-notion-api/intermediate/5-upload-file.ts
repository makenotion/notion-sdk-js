import { Client, isFullComment } from "@notionhq/client"
import { config } from "dotenv"
import { readFile } from "fs/promises"
import { basename, join } from "path"

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/*
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - File upload guide: https://developers.notion.com/docs/uploading-small-files
 * - Create file upload API: https://developers.notion.com/reference/create-a-file-upload
 */

async function createFileUpload() {
  return await notion.fileUploads.create({
    mode: "single_part",
  })
}

async function sendFileUpload(fileUploadId, filePath) {
  return await notion.fileUploads.send({
    file_upload_id: fileUploadId,
    file: {
      filename: basename(filePath),
      data: new Blob([await readFile(filePath)], {
        type: "image/png",
      }),
    },
  })
}

async function appendBlockChildren(blockId, fileUploadId) {
  return await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        type: "image",
        image: {
          type: "file_upload",
          file_upload: {
            id: fileUploadId,
          },
        },
      },
      {
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "This is a test",
              },
            },
          ],
        },
      },
    ],
  })
}

async function main() {
  let fileUpload = await createFileUpload()
  console.log("Created file upload with ID:", fileUpload.id)

  fileUpload = await sendFileUpload(
    fileUpload.id,
    join(process.argv[1], "..", "..", "assets", "page_id.png")
  )
  console.log(
    "Uploaded page_id.png to file upload; status is now:",
    fileUpload.status
  )

  // Append an image block with the file upload from above, and a text block,
  // to the configured page.
  const newBlocks = await appendBlockChildren(pageId, fileUpload.id)
  const newBlockIds = newBlocks.results.map(block => block.id)
  console.log(
    "Appended block children; new list of block children is:",
    newBlockIds
  )

  // Create a comment on the text block with the same image by providing
  // the same file upload ID. Also use a custom display name.
  const comment = await notion.comments.create({
    parent: {
      type: "block_id",
      block_id: newBlockIds[1],
    },
    rich_text: [
      {
        type: "text",
        text: { content: "I'm commenting on this block with an image:" },
      },
    ],
    attachments: [
      {
        type: "file_upload",
        file_upload_id: fileUpload.id,
      },
    ],
    display_name: {
      type: "custom",
      custom: {
        name: "Notion test auto commenter",
      },
    },
  })

  console.log("Comment ID:", comment.id)

  if (isFullComment(comment)) {
    console.log("Discussion ID:", comment.discussion_id)
    console.log("Comment parent:", comment.parent)
    console.log("Comment created by:", comment.created_by)
    console.log("Comment display name:", comment.display_name)
  } else {
    console.error("No read access to comment object")
  }

  console.log("Done! Image & comment added to page:", pageId)
}

await main()
