// Find the official Notion API client @ https://github.com/makenotion/notion-sdk-js/
// npm install @notionhq/client
import { Client } from "@notionhq/client"

import { config } from "dotenv"
import { Octokit } from "octokit"

config()

const octokit = new Octokit({ auth: process.env.GITHUB_KEY })
const notion = new Client({ auth: process.env.NOTION_KEY })

const database_id = process.env.NOTION_DATABASE_ID

async function syncIssuesWithDatabase() {
  console.log("Syncing GitHub Issues with Notion Database")
  const issues_in_db = await getIssuesFromDatabase()

  // Get a list of github issues and add them to a local store
  let github_issues = {}
  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: process.env.GITHUB_REPO_OWNER,
    repo: process.env.GITHUB_REPO_NAME,
    per_page: 100,
  })

  for await (const { data: issues } of iterator) {
    for (const issue of issues) {
      github_issues[issue.number] = {
        id: issue.id,
        title: issue.title,
        state: issue.state,
        comments: issue.comments,
      }
    }
  }

  // Create new issues or update existing in a Notion Database
  for (const [issue_number, issues_details] of Object.entries(github_issues)) {
    // If the issue does not exist in the database yet, add it to the database
    if (!(issue_number in issues_in_db)) {
      await notion.pages.create({
        parent: { database_id },
        properties: {
          State: { name: issues_details.state },
          "Issue Number": parseInt(issue_number),
          Name: [{ text: { content: issues_details.title } }],
          Comments: parseInt(issues_details.comments),
        },
      })
    }
    // This issue already exists in the database so we want to update the page
    else {
      await notion.pages.update({
        page_id: issues_in_db[issue_number].page_id,
        properties: {
          State: { name: issues_details.state },
          "Issue Number": parseInt(issue_number),
          Name: [{ text: { content: issues_details.title } }],
          Comments: parseInt(issues_details.comments),
        },
      })
    }
  }
  // Run this function every five minutes
  setTimeout(syncIssuesWithDatabase, 5 * 60 * 1000)
}

// Get a paginated list of issues currently in the database.
async function getIssuesFromDatabase() {
  const issues = {}

  async function getPageOfIssues(cursor) {
    const db = await notion.databases.query({
      database_id,
      start_cursor: cursor,
    })
    for (const page of db.results) {
      issues[page.properties["Issue Number"].number] = {
        page_id: page.id,
      }
    }
    if (db.has_more) {
      await getPageOfIssues(db.next_cursor)
    }
  }
  await getPageOfIssues()
  return issues
}

syncIssuesWithDatabase()
