// Find the official Notion API client @ https:// github.com/makenotion/notion-sdk-js/
// npm install @notionhq/client
const { Client } = require("@notionhq/client")

const { Octokit } = require("octokit")

const dotenv = require("dotenv")
dotenv.config()

const octokit = new Octokit({ auth: process.env.GITHUB_KEY })
const notion = new Client({ auth: process.env.NOTION_KEY })

const database_id = process.env.NOTION_DATABASE_ID

async function syncIssuesWithDatabase() {
	console.log("Syncing GitHub Issues with Notion Database")
	const issuesInDatabase = await getIssuesFromDatabse()

	// Get a list of github issues and add them to a local store
	let gitHubIssues = {}
	const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
		owner: process.env.GITHUB_REPO_OWNER,
		repo: process.env.GITHUB_REPO_NAME,
		per_page: 100,
	})

	for await (const { data: issues } of iterator) {
		for (const issue of issues) {
			gitHubIssues[issue.number] = {
				id: issue.id,
				title: issue.title,
				state: issue.state,
				comments: issue.comments,
			}
		}
	}

	// Create new issues or update existing in a Notion Database
	for (const [key, value] of Object.entries(gitHubIssues)) {
		const issue_number = key
		const issues_details = value
		// If the issue does not exist in the database yet, add it to the database
		if (!(issue_number in issuesInDatabase)) {
			await notion.request({
				path: "pages",
				method: "POST",
				body: {
					parent: { database_id: database_id },
					properties: {
						State: { name: issues_details.state },
						"Issue Number": parseInt(issue_number),
						Name: [{ text: { content: issues_details.title } }],
						Comments: parseInt(issues_details.comments),
					},
				},
			})
		}
		// This issue already exists in the database so we want to update the page
		else {
			await notion.request({
				path: "pages/" + issuesInDatabase[issue_number].page_id,
				method: "patch",
				body: {
					properties: {
						State: { name: issues_details.state },
						"Issue Number": parseInt(issue_number),
						Name: [{ text: { content: issues_details.title } }],
						Comments: parseInt(issues_details.comments),
					},
				},
			})
		}
	}
	// Run this function every five minutes
	setTimeout(syncIssuesWithDatabase, 5 * 60 * 1000)
}

;(async () => {
	syncIssuesWithDatabase()
})()

// Get a paginated list of Tasks currently in a the database.
async function getIssuesFromDatabse() {
	const issues = {}

	async function getPageOfIssues(cursor) {
		let request_payload = ""
		// Create the request payload based on the presense of a start_cursor
		if (cursor == undefined) {
			request_payload = {
				path: "databases/" + database_id + "/query",
				method: "POST",
			}
		} else {
			request_payload = {
				path: "databases/" + database_id + "/query",
				method: "POST",
				body: {
					start_cursor: cursor,
				},
			}
		}
		// While there are more pages left in the query, get pages from the database.
		const current_pages = await notion.request(request_payload)

		for (const page of current_pages.results) {
			issues[page.properties["Issue Number"].number] = {
				page_id: page.id,
			}
		}
		if (current_pages.has_more) {
			await getPageOfIssues(current_pages.next_cursor)
		}
	}
	await getPageOfIssues()
	return issues
}
