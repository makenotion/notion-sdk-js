import { Client } from "@notionhq/client"
import { config } from "dotenv"
import { openAsBlob } from "fs"
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
      data: new Blob([await openAsBlob(filePath)], {
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

  const result = await appendBlockChildren(pageId, fileUpload.id)
  console.log(
    "Appended block children; new list of block children is:",
    result.results.map(block => block.id)
  )

  console.log("Done! Image added to page:", pageId)
}

await main()
