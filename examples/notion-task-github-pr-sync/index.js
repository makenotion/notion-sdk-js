/* ================================================================================

	notion-task-github-pr-sync

  Find the official Notion API client @ https://github.com/makenotion/notion-sdk-js/
  Glitch Example: https://glitch.com/~notion-task-github-pr-sync

================================================================================ */

const { Client } = require('@notionhq/client')
const dotenv = require('dotenv')
const { Octokit } = require('octokit')
const _ = require('lodash')

dotenv.config()
const octokit = new Octokit({ auth: process.env.GITHUB_KEY })
const notion = new Client({ auth: process.env.NOTION_KEY })

const OPERATION_BATCH_SIZE = 10

/**
 * Enable to change status property in Notion Database
 * When enabling this, make sure you have a set the STATUS_FIELD_NAME
 */
const UPDATE_STATUS_IN_NOTION_DB = process.env.UPDATE_STATUS_IN_NOTION_DB
const STATUS_PROPERTY_NAME = process.env.STATUS_PROPERTY_NAME

/**
 * Entry Point
 */
updateNotionDBwithGithubPRs()

/**
 * Fetches PRs from Github and updates the according Notion Task
 */
async function updateNotionDBwithGithubPRs() {
	// Get all issues currently in the provided GitHub repository.
	console.log('\nFetching PRs from GitHub repository...')
	var prs = await getGitHubPRsForRepository()
	console.log(`Fetched ${prs.length} closed PR(s) from GitHub repository.`)

	var prsToUpdate = []
	for (var pr of prs) {
		if (!(await hasIntegrationCommentedOnPage(pr.page_id))) {
			prsToUpdate.push(pr)
		}
	}
	updatePages(prsToUpdate)
}

/**
 * Returns whether integration has commented
 * @params page_id: string
 * @returns {Promise<Boolean>}
 */
async function hasIntegrationCommentedOnPage(page_id) {
	const comments = await notion.comments.list({ block_id: page_id })
	const bot = await notion.users.me()
	if (comments.results) {
		for (const comment of comments.results) {
			if (comment.created_by.id === bot.id) {
				return true
			}
		}
	}
	return false
}

/**
 * Gets closed PRs from a GitHub repository.
 *
 * https://docs.github.com/en/rest/guides/traversing-with-pagination
 * https://docs.github.com/en/rest/pulls/pulls#list-pull-requests
 * https://octokit.github.io/rest.js/v19#pulls-list
 *
 * @returns {Promise<Array<{ title: string, task_link: string, state: "open" | "closed", pr_link: string, pr_status: "Closed - Merged | "Closed - Not Merged}>>}
 */
async function getGitHubPRsForRepository() {
	const pullRequests = []
	const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
		owner: process.env.GITHUB_REPO_OWNER,
		repo: process.env.GITHUB_REPO_NAME,
		state: 'all',
		per_page: 100,
	})
	for await (const { data } of iterator) {
		for (const pr of data) {
			if (pr.body) {
				notionPRLinkMatch = pr.body.match(
					/https:\/\/www\.notion\.so\/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)$/
				)
				if (notionPRLinkMatch && pr.state == 'closed') {
					const page_id = notionPRLinkMatch[0].split('-').pop().replaceAll('-', '')

					var status = ''
					var content = ''
					if (pr.merged_at != null) {
						status = 'Closed - Merged'
						content = ' has been merged!'
					} else {
						status = 'Closed - Not Merged'
						content = ' was closed but not merged!'
					}

					pullRequests.push({
						task_link: notionPRLinkMatch[0],
						state: pr.state,
						page_id: page_id,
						pr_link: pr.html_url,
						pr_status: status,
						comment_content: content,
					})
				}
			} else {
				console.log('Error: PR body is empty')
			}
		}
		return pullRequests
	}
}

/***
 *
 * @param pagesToUpdate: [pages]
 * @returns Promise
 */
async function updatePages(pagesToUpdate) {
	const pagesToUpdateChunks = _.chunk(pagesToUpdate, OPERATION_BATCH_SIZE)
	for (const pagesToUpdateBatch of pagesToUpdateChunks) {
		//Update page status property
		if (UPDATE_STATUS_IN_NOTION_DB) {
			await Promise.all(
				pagesToUpdateBatch.map(({ ...pr }) =>
					//Update Notion Page status
					notion.pages.update({
						page_id: pr.page_id,
						properties: {
							[STATUS_PROPERTY_NAME]: {
								status: {
									name: pr.pr_status,
								},
							},
						},
					})
				)
			)
		}
		//Write Comment
		await Promise.all(
			pagesToUpdateBatch.map(({ pageId, ...pr }) =>
				notion.comments.create({
					parent: {
						page_id: pr.page_id,
					},
					rich_text: [
						{
							type: 'text',
							text: {
								content: 'Your PR',
								link: {
									url: pr.pr_link,
								},
							},
							annotations: {
								bold: true,
							},
						},
						{
							type: 'text',
							text: {
								content: pr.comment_content,
							},
						},
					],
				})
			)
		)
	}
	if (pagesToUpdate.length == 0) {
		console.log('Notion Tasks are already up-to-date')
	} else {
		console.log('Successfully updated ' + pagesToUpdate.length + ' task(s) in Notion')
	}
}
