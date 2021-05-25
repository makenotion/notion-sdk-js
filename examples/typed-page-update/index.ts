// Find the official Notion API client @ https://  github.com/makenotion/notion-sdk-js/
// npm install @notionhq/client
import { Client, LogLevel } from "@notionhq/client"

import { config } from "dotenv"
import { Page, TitlePropertyValue } from "../../build/src/api-types"

config()

const notion = new Client({
  auth: process.env["NOTION_KEY"],
  logLevel: LogLevel.DEBUG,
})

type PrecisePage = Page & {
  properties: {
    Title: TitlePropertyValue
  }
}

export async function updatePage(pageId: string): Promise<void> {
  await notion.pages.update<PrecisePage>({
    page_id: pageId,
    properties: {
      Title: {
        type: "title",
        id: "azer",
        title: [
          {
            type: "text",
            text: {
              content: "azer",
            },
          },
        ],
      },
      // Won't be validated by Typescript because Title is a Title type property
      // Title: {
      //   type: "title",
      //   id: "azer",
      //   select: [
      //     {
      //       type: "text",
      //       text: {
      //         content: "azer",
      //       },
      //     },
      //   ],
      // },

      // Won't be validated by Typescript because OtherProperty hasn't been defined in PrecisePage
      // OtherProperty: {
      //   type: "title",
      //   id: "azer",
      //   text: [
      //     {
      //       type: "text",
      //       text: {
      //         content: "azer",
      //       },
      //     },
      //   ],
      // },
    },
  })
}

updatePage(process.env["PAGE_ID"] ?? "")
