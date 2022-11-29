/* ================================================================================

	notion-task-github-pr-sync
  
  Glitch example: https://glitch.com/edit/#!/notion-github-sync
  Find the official Notion API client @ https://github.com/makenotion/notion-sdk-js/

================================================================================ */

function print(x) {console.log(x)}
const { Client } = require("@notionhq/client")
const dotenv = require("dotenv")
const { Octokit } = require("octokit")
const _ = require("lodash")

dotenv.config()
const octokit = new Octokit({ auth: process.env.GITHUB_KEY })
const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID
const OPERATION_BATCH_SIZE = 10

/**
 * Entry Point
 */
updateNotionDBwithGithubPRs();

/**
 * Fetches PRs from Github and updates the according Notion Task
 */
async function updateNotionDBwithGithubPRs(){
  const prs = await fetchPRsFromGitHub();
  const prsToUpdate = []  
  for (pr of prs){
    if (! await hasIntegrationCommentedOnPage(pr.page_id)) {
      prsToUpdate.push(pr);
    }
  }
  updatePages(prsToUpdate);
}

/**
 * Returns whether integration has commented 
 * @params page_id: string 
 * @returns {Promise<Boolean>}
 */
async function hasIntegrationCommentedOnPage(page_id){ 
  const commentedUsers = [];
  const comments = await notion.comments.list({ block_id: page_id });
  const bot = await notion.users.me()
  if (comments.results) {
    for (const comment of comments.results){ 
      commentedUsers.push(comment.created_by.id);
    }
    if (commentedUsers.includes(bot.id) && commentedUsers != []) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * Fetch PRs from Github 
 * @returns {Promise<Array<{ title: string, task_link: string, state: "open" | "closed"}>>}
 */
async function fetchPRsFromGitHub() {
  // Get all issues currently in the provided GitHub repository.
  console.log("\nFetching PRs from GitHub repository...")
  const pull_requests = await getGitHubPRsForRepository()
  console.log(`Fetched ${pull_requests.length} closed PRs from GitHub repository.`)

  return pull_requests
}


/**
 * Gets closed PRs from a GitHub repository.
 *
 * https://docs.github.com/en/rest/guides/traversing-with-pagination
 * https://docs.github.com/en/rest/pulls/pulls#list-pull-requests
 * https://octokit.github.io/rest.js/v19#pulls-list
 *
 * @returns {Promise<Array<{ title: string, task_link: string, state: "open" | "closed"}>>}
 */
async function getGitHubPRsForRepository() {
  const pullRequests = []
  const iterator = octokit.paginate.iterator(octokit.rest.pulls.list, {
    owner: process.env.GITHUB_REPO_OWNER,
    repo: process.env.GITHUB_REPO_NAME,
    state: "all",
    per_page: 100,
  })
  for await (const { data } of iterator) {
    for (const pr of data) {
      //The PR description has a Notion task Link in it
      notionPRLinkMatch = (pr.body.match(/https:\/\/www\.notion\.so\/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)$/));
      if (notionPRLinkMatch && pr.state == "closed"){
        const page_id = notionPRLinkMatch[0].split('-').pop().replaceAll('-', '');

        pullRequests.push({
          title: pr.title,
          task_link: (notionPRLinkMatch[0]),
          state: pr.state,
          page_id: page_id
        })
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
    await Promise.all(
      pagesToUpdateBatch.map(({ pageId, ...pr}) =>
        notion.comments.create({
          "parent": {
            "page_id": pr.page_id
          },
          "rich_text": [
            {
              "text": {
                "content": "Your PR has been merged!"
              }
            }
          ]
        })
      )
    )
    console.log(`Completed batch size: ${pagesToUpdateBatch.length}`)
  }
}
