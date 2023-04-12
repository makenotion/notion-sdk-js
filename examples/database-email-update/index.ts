/* ================================================================================

	database-update-send-email.
  
  Glitch example: https://glitch.com/edit/#!/notion-database-email-update
  Find the official Notion API client @ https://github.com/makenotion/notion-sdk-js/

================================================================================ */

import { Client } from "@notionhq/client"
import { config } from "dotenv"
import SendGrid from "@sendgrid/mail"
import { PropertyItemObjectResponse } from "../../build/src/api-endpoints"

config()
SendGrid.setApiKey(process.env.SENDGRID_KEY)
const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

/**
 * Local map to store task pageId to its last status.
 * { [pageId: string]: string }
 */
const taskPageIdToStatusMap = {}

/**
 * Initialize local data store.
 * Then poll for changes every 5 seconds (5000 milliseconds).
 */
setInitialTaskPageIdToStatusMap().then(() => {
  setInterval(findAndSendEmailsForUpdatedTasks, 5000)
})

/**
 * Get and set the initial data store with tasks currently in the database.
 */
async function setInitialTaskPageIdToStatusMap() {
  const currentTasks = await getTasksFromNotionDatabase()
  for (const { pageId, status } of currentTasks) {
    taskPageIdToStatusMap[pageId] = status
  }
}

async function findAndSendEmailsForUpdatedTasks() {
  // Get the tasks currently in the database.
  console.log("\nFetching tasks from Notion DB...")
  const currentTasks = await getTasksFromNotionDatabase()

  // Return any tasks that have had their status updated.
  const updatedTasks = findUpdatedTasks(currentTasks)
  console.log(`Found ${updatedTasks.length} updated tasks.`)

  // For each updated task, update taskPageIdToStatusMap and send an email notification.
  for (const task of updatedTasks) {
    taskPageIdToStatusMap[task.pageId] = task.status
    await sendUpdateEmailWithSendgrid(task)
  }
}

/**
 * Gets tasks from the database.
 */
async function getTasksFromNotionDatabase(): Promise<
  Array<{ pageId: string; status: string; title: string }>
> {
  const pages = []
  let cursor = undefined

  const shouldContinue = true
  while (shouldContinue) {
    const { results, next_cursor } = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
    })
    pages.push(...results)
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  console.log(`${pages.length} pages successfully fetched.`)

  const tasks = []
  for (const page of pages) {
    const pageId = page.id

    const statusPropertyId = page.properties["Status"].id
    const statusPropertyItem = await getPropertyValue({
      pageId,
      propertyId: statusPropertyId,
    })

    const status = getStatusPropertyValue(statusPropertyItem)

    const titlePropertyId = page.properties["Name"].id
    const titlePropertyItems = await getPropertyValue({
      pageId,
      propertyId: titlePropertyId,
    })
    const title = getTitlePropertyValue(titlePropertyItems)

    tasks.push({ pageId, status, title })
  }

  return tasks
}

/**
 * Extract status as string from property value
 */
function getStatusPropertyValue(
  property: PropertyItemObjectResponse | Array<PropertyItemObjectResponse>
): string {
  if (Array.isArray(property)) {
    if (property?.[0]?.type === "select") {
      return property[0].select.name
    } else {
      return "No Status"
    }
  } else {
    if (property.type === "select") {
      return property.select.name
    } else {
      return "No Status"
    }
  }
}

/**
 * Extract title as string from property value
 */
function getTitlePropertyValue(
  property: PropertyItemObjectResponse | Array<PropertyItemObjectResponse>
): string {
  if (Array.isArray(property)) {
    if (property?.[0].type === "title") {
      return property[0].title.plain_text
    } else {
      return "No Title"
    }
  } else {
    if (property.type === "title") {
      return property.title.plain_text
    } else {
      return "No Title"
    }
  }
}

/**
 * Compares task to most recent version of task stored in taskPageIdToStatusMap.
 * Returns any tasks that have a different status than their last version.
 */
function findUpdatedTasks(
  currentTasks: Array<{ pageId: string; status: string; title: string }>
): Array<{ pageId: string; status: string; title: string }> {
  return currentTasks.filter(currentTask => {
    const previousStatus = getPreviousTaskStatus(currentTask)
    return currentTask.status !== previousStatus
  })
}

/**
 * Sends task update notification using Sendgrid.
 */
async function sendUpdateEmailWithSendgrid({
  title,
  status,
}: {
  status: string
  title: string
}) {
  const message = `Status of Notion task ("${title}") has been updated to "${status}".`
  console.log(message)

  try {
    // Send an email about this change.
    await SendGrid.send({
      to: process.env.EMAIL_TO_FIELD,
      from: process.env.EMAIL_FROM_FIELD,
      subject: "Notion Task Status Updated",
      text: message,
    })
    console.log(
      `Email Sent to ${process.env.EMAIL_TO_FIELD}, from: ${process.env.EMAIL_FROM_FIELD}`
    )
  } catch (error) {
    console.error(error)
  }
}

/**
 * Finds or creates task in local data store and returns its status.
 */
function getPreviousTaskStatus({ pageId, status }): string {
  // If this task hasn't been seen before, add to local pageId to status map.
  if (!taskPageIdToStatusMap[pageId]) {
    taskPageIdToStatusMap[pageId] = status
  }
  return taskPageIdToStatusMap[pageId]
}

/**
 * If property is paginated, returns an array of property items.
 *
 * Otherwise, it will return a single property item.
 */
async function getPropertyValue({
  pageId,
  propertyId,
}: {
  pageId: string
  propertyId: string
}): Promise<PropertyItemObjectResponse | Array<PropertyItemObjectResponse>> {
  let propertyItem = await notion.pages.properties.retrieve({
    page_id: pageId,
    property_id: propertyId,
  })
  if (propertyItem.object === "property_item") {
    return propertyItem
  }

  // Property is paginated.
  let nextCursor = propertyItem.next_cursor
  const results = propertyItem.results

  while (nextCursor !== null) {
    propertyItem = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
      start_cursor: nextCursor,
    })

    if (propertyItem.object === "list") {
      nextCursor = propertyItem.next_cursor
      results.push(...propertyItem.results)
    } else {
      nextCursor = null
    }
  }

  return results
}
