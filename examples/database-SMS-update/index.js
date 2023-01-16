/* ================================================================================

	database-update-send-SMS.

================================================================================ */

const { Client } = require("@notionhq/client")
const dotenv = require("dotenv")
dotenv.config()

//Setting Up Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const toNum = process.env.SMS_TO_FIELD
const fromNum = process.env.SMS_FROM_FIELD
const client = require('twilio')(accountSid, authToken)


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
    await sendUpdateSMSWithTwilio(task)
  }
}

/**
 * Gets tasks from the database.
 *
 * @returns {Promise<Array<{ pageId: string, status: string, title: string }>>}
 */
async function getTasksFromNotionDatabase() {
  const pages = []
  let cursor = undefined

  while (true) {
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
    const status = statusPropertyItem.select
      ? statusPropertyItem.select.name
      : "No Status"

    const titlePropertyId = page.properties["Name"].id
    const titlePropertyItems = await getPropertyValue({
      pageId,
      propertyId: titlePropertyId,
    })
    const title = titlePropertyItems
      .map(propertyItem => propertyItem.title.plain_text)
      .join("")

    tasks.push({ pageId, status, title })
  }

  return tasks
}

/**
 * Compares task to most recent version of task stored in taskPageIdToStatusMap.
 * Returns any tasks that have a different status than their last version.
 *
 * @param {Array<{ pageId: string, status: string, title: string }>} currentTasks
 * @returns {Array<{ pageId: string, status: string, title: string }>}
 */
function findUpdatedTasks(currentTasks) {
  return currentTasks.filter(currentTask => {
    const previousStatus = getPreviousTaskStatus(currentTask)
    return currentTask.status !== previousStatus
  })
}

/**
 * Sends task update notification using Sendgrid.
 *
 * @param {{ status: string, title: string }} task
 */
async function sendUpdateSMSWithTwilio({ title, status }) {
  const message = `Status of Notion task ("${title}") has been updated to "${status}".`
  console.log(message)

  try {
    // Send an SMS about this change.
    client.messages
    .create({
      body: message,
      from: fromNum,
      to: toNum
    })
    .then(message => console.log("SMS SID: " + message.sid));

    console.log("SMS Requested")
  } catch (error) {
    console.error(error)
  }
}

/**
 * Finds or creates task in local data store and returns its status.
 * @param {{ pageId: string; status: string }} task
 * @returns {string}
 */
function getPreviousTaskStatus({ pageId, status }) {
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
 *
 * @param {{ pageId: string, propertyId: string }}
 * @returns {Promise<PropertyItemObject | Array<PropertyItemObject>>}
 */
async function getPropertyValue({ pageId, propertyId }) {
  const propertyItem = await notion.pages.properties.retrieve({
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
    const propertyItem = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
      start_cursor: nextCursor,
    })

    nextCursor = propertyItem.next_cursor
    results.push(...propertyItem.results)
  }

  return results
}
