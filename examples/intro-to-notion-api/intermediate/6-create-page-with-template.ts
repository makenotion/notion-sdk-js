import {
  Client,
  collectDataSourceTemplates,
  isFullDatabase,
  isFullPage,
} from "@notionhq/client"
import { config } from "dotenv"

config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey })

/*
---------------------------------------------------------------------------
*/

/**
 * This example demonstrates how to use pages as templates to create new pages
 * with pre-defined content structures.
 *
 * Steps:
 * 1. Create a database
 * 2. Create a page with rich content (a bug report structure)
 * 3. List official templates using collectDataSourceTemplates() (will be empty)
 * 4. Create a new page using the first page's ID as a template
 *
 * Key concepts:
 * - Any page in a data source can be used as a template by providing its ID
 * - "Official templates" (created via Notion UI) appear in the templates list
 * - Regular pages used as templates won't appear in the templates list
 * - The template's content structure is automatically duplicated to the new page
 * - Properties like the title can be customized at creation time
 *
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Create a page endpoint (notion.pages.create(): https://developers.notion.com/reference/post-page)
 * - List data source templates endpoint (notion.dataSources.listTemplates(): https://developers.notion.com/reference/list-data-source-templates)
 * - Creating pages from templates guide: https://developers.notion.com/docs/creating-pages-from-templates
 * - collectDataSourceTemplates helper: https://github.com/makenotion/notion-sdk-js#helpers
 */

async function main() {
  // Step 1: Create a database to hold our tasks
  console.log("Creating a new database...")
  const newDatabase = await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    title: [
      {
        type: "text",
        text: {
          content: "Task Database",
        },
      },
    ],
    initial_data_source: {
      properties: {
        "Task name": {
          type: "title",
          title: {},
        },
        Status: {
          type: "select",
          select: {
            options: [
              { name: "Not started", color: "gray" },
              { name: "In progress", color: "blue" },
              { name: "Complete", color: "green" },
            ],
          },
        },
        Priority: {
          type: "select",
          select: {
            options: [
              { name: "Low", color: "gray" },
              { name: "Medium", color: "yellow" },
              { name: "High", color: "red" },
            ],
          },
        },
        "Due date": {
          type: "date",
          date: {},
        },
      },
    },
  })

  if (!isFullDatabase(newDatabase)) {
    console.error(`No read permissions on database: ${newDatabase.id}`)
    return
  }

  const dataSourceId = newDatabase.data_sources[0].id
  if (!dataSourceId) {
    console.error("No data source ID found")
    return
  }

  console.log(`Database created: ${newDatabase.url}\n`)

  // Step 2: Create a page with rich content that we'll use as a template
  // Note: This creates a regular page, not an official "template" in Notion's UI.
  // We can still use any page's ID as a template when creating new pages.
  console.log("Creating a page with example content to use as a template...")
  const templatePage = await notion.pages.create({
    parent: {
      data_source_id: dataSourceId,
    },
    properties: {
      "Task name": {
        title: [
          {
            text: {
              content: "Bug Report Template",
            },
          },
        ],
      },
      Status: {
        select: {
          name: "Not started",
        },
      },
      Priority: {
        select: {
          name: "High",
        },
      },
    },
    children: [
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Description",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: "Provide a clear description of the bug...",
              },
            },
          ],
        },
      },
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Steps to Reproduce",
              },
            },
          ],
        },
      },
      {
        object: "block",
        numbered_list_item: {
          rich_text: [
            {
              text: {
                content: "Go to...",
              },
            },
          ],
        },
      },
      {
        object: "block",
        numbered_list_item: {
          rich_text: [
            {
              text: {
                content: "Click on...",
              },
            },
          ],
        },
      },
      {
        object: "block",
        numbered_list_item: {
          rich_text: [
            {
              text: {
                content: "Observe...",
              },
            },
          ],
        },
      },
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Expected Behavior",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: "What should happen...",
              },
            },
          ],
        },
      },
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Actual Behavior",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content: "What actually happens...",
              },
            },
          ],
        },
      },
    ],
  })

  if (!isFullPage(templatePage)) {
    console.error("Failed to create template page")
    return
  }

  console.log(`Page created: ${templatePage.url}`)
  console.log(`Page ID: ${templatePage.id}\n`)

  // Step 3: List official templates in the data source
  // Note: The page we just created won't appear here because it's not an
  // official "template" - those can only be created/designated through the
  // Notion UI. However, we can still use any page ID as a template!
  console.log("Fetching official templates from the data source...")
  const templates = await collectDataSourceTemplates(notion, {
    data_source_id: dataSourceId,
  })

  console.log(
    `Found ${templates.length} official template(s) (expected: 0 for a new database)`
  )
  if (templates.length > 0) {
    for (const template of templates) {
      console.log(
        `- ${template.name} (ID: ${template.id})${
          template.is_default ? " [DEFAULT]" : ""
        }`
      )
    }
  }
  console.log()

  // Step 4: Create a new page using the page we created as a template
  // Even though our page isn't an "official template", we can use its ID
  // to duplicate its content structure. The title and properties we provide
  // here will override the template's values.
  console.log("Creating a new bug report using the page as a template...")
  const bugReportPage = await notion.pages.create({
    parent: {
      data_source_id: dataSourceId,
    },
    properties: {
      "Task name": {
        title: [
          {
            text: {
              content: "Login Button Not Working",
            },
          },
        ],
      },
      // We can customize properties - they won't be overridden by the template
      // The template has Priority: "High", but we're setting it to "Low" here
      Priority: {
        select: {
          name: "Low",
        },
      },
    },
    template: {
      type: "template_id",
      template_id: templatePage.id,
    },
    // Note: When using a template, you cannot specify children.
    // The template's content structure will be applied automatically.
  })

  if (isFullPage(bugReportPage)) {
    console.log(`Bug report created: ${bugReportPage.url}`)
    console.log(
      "Notice: The page has a custom title but inherits the template's content structure!"
    )
  }
  console.log(
    "Note: The page content from the template is being applied asynchronously.\n"
  )

  console.log("Done! Visit the database URL to see all created pages.")
  console.log(
    "\nFor more information on templates, see: https://developers.notion.com/docs/creating-pages-from-templates"
  )
}

main()
