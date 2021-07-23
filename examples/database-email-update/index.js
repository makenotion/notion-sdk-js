/* ================================================================================

	database-update-send-email.
  
  Glitch example: https://glitch.com/edit/#!/notion-database-email-update
  Find the official Notion API client @ https://github.com/makenotion/notion-sdk-js/

================================================================================ */

const { Client } = require("@notionhq/client")
const dotenv = require("dotenv")
const sendgridMail = require("@sendgrid/mail")

dotenv.config()
sendgridMail.setApiKey(process.env.SENDGRID_KEY)
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
  return pages.map(page => {
    const statusProperty = page.properties["Status"]
    const status = statusProperty ? statusProperty.select.name : "No Status"
    const title = page.properties["Name"].title
      .map(({ plain_text }) => plain_text)
      .join("")
    return {
      pageId: page.id,
      status,
      title,
    }
  })
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
async function sendUpdateEmailWithSendgrid({ title, status }) {
  const message = `Status of Notion task ("${title}") has been updated to "${status}".`
  console.log(message)

  try {
    // Send an email about this change.
    await sendgridMail.send({
      to: process.env.EMAIL_TO_FIELD,
      from: process.env.EMAIL_FROM_FIELD,
      subject: "Notion Task Status Updated",
      text: message,
    })
    console.log("Email Sent")
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
