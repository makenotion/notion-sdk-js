/* ================================================================================

	notion-github-sync.

  Glitch example: https://glitch.com/edit/#!/notion-github-sync
  Find the official Notion API client @ https://github.com/makenotion/notion-sdk-js/

================================================================================ */

import { Client } from "@notionhq/client"
import dotenv from "dotenv"
import { Octokit } from "octokit"

dotenv.config()
const octokit = new Octokit({ auth: process.env.GITHUB_KEY })
const notion = new Client({ auth: process.env.NOTION_KEY })

const database_id = process.env.NOTION_DATABASE_ID

async function syncIssuesWithDatabase() {
  console.log("Syncing GitHub Issues with Notion Database")

  // retrieve all of the issues from the current Notion page
  const issues_in_db = await getIssuesFromDatabase()

  //
  // Second: Get a list of github issues and add them to a local store
  //

  // `github_issues` will have (key, value) entries such that
  // key = issue number
  // value = an object with the relevant fields of the issue `{id, title, state, comments}`
  let github_issues = {}

  // make an async iterator of paginated data from GitHub: each page of data will hold a list of issues
  const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
    owner: process.env.GITHUB_REPO_OWNER,
    repo: process.env.GITHUB_REPO_NAME,
    per_page: 100,
  })

  // for every page in the iterator,
  for await (const page of iterator) {
    //`page.data` holds the list of issues.
    // Iterate through every issue in the current list of issues
    for (const issue of page.data) {
      // de-structure the relevant properties from our issue
      const {id, title, state, comments, number} = issue;
      // and add all those properties at the given key `issue.number` in our `github_issues` dictionary
      github_issues[number] = {
        id,
        title,
        state,
        comments,
      }
    }
  }

  //
  // Now that we have all of the relevant data, we need to update the Notion Database.
  // If the issue already exists in the DB, update it.
  // If the issue doesn't exist yet, create it.
  //

  // Create new issues or update existing in a Notion Database
  for (const [key, value] of Object.entries(github_issues)) {
    const issue_number = key
    const issue_details = value

    // If the issue does not exist in the database yet, add it to the database
    if (!(issue_number in issues_in_db)) {
      await notion.pages.create({
        parent: { database_id },
        properties: {
          State: { name: issue_details.state },
          "Issue Number": parseInt(issue_number),
          Name: [{ text: { content: issue_details.title } }],
          Comments: parseInt(issue_details.comments),
        },
      })
    }
    // This issue already exists in the database so we want to update the page.
    else {
      await notion.pages.update({
        page_id: issues_in_db[issue_number].page_id,
        properties: {
          State: { name: issue_details.state },
          "Issue Number": parseInt(issue_number),
          Name: [{ text: { content: issue_details.title } }],
          Comments: parseInt(issue_details.comments),
        },
      })
    }
  }
  // Run this function every five minutes.
  setTimeout(syncIssuesWithDatabase, 5 * 60 * 1000)
}

// returns a dictionary with (key, value) entries such that
// key = issue_number
// value = an object containing the `page_id` of that specific issue in the database
async function getIssuesFromDatabase() {
  const issues = {}

  // async loop -- while there are issues in our database,
  // update the `issues` object at each key (issue number) to hold the proper page id
  async function getPageOfData(cursor) {
    const db = await notion.databases.query({
      database_id,
      // if method was called without passing in `cursor`, this `start_cursor` is simply `undefined`!
      start_cursor: cursor,
    })

    // for every page of data in the results
    for (const page of db.results) {
      // update `issues` at the current
      issues[page.properties["Issue Number"].number] = {
        page_id: page.id,
      }
    }

    // if there are more pages to query
    if (db.has_more) {
      // recurse to continue with the next paginated list
      await getPageOfData(db.next_cursor)
    }
  }

  // calling this here kicks off the first iteration of our async loop
  await getPageOfData();

  return issues
}

// main
// eslint-disable-next-line -- ignore 'no-extra-semi' for glitch
;(async () => {
  await syncIssuesWithDatabase()
})()
