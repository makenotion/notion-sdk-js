# Introduction to using Notion's SDK for JavaScript

## Learn how to make public API requests

Use this sample code to learn how to make public API requests with varying degrees of difficulty.

The sample code is split into three sections:

1. basic
2. intermediate
3. advanced

If you are new to Notion's SDK for JavaScript, start with the code samples in the `/basic` directory to get more familiar to basic concepts.

The files in each directory will build on each other to increase in complexity. For example, in `/intermediate`, first you will see how to create a database, then how to create a database and add a page to it, and finally create a database, add a page, and query the database.

## Table of contents

In case you are looking for a specific task, the files are divided as follows:

- `/basic/1-new-block.js`: Create a new block that will be appended to a Notion page.
- `/basic/2-styled-block-text.js`: Update a block's text styles after creating it.
- `/intermediate/1-create-a-database.js`: Create a new database with defined properties.
- `/intermediate/2-add-page-to-database.js`: Add a new page to a newly-created database.
- `/intermediate/3-query-database.js`: Create a new database with defined properties.
- `/intermediate/3-sort-database.js`: Create a new database with defined properties.
- `/advanced/` // todo: add these - not sure what we're including

## Running locally

### 1. Clone project and install dependencies

To use this example on your local machine, clone the repo and move into the cloned repo:

```zsh
git clone https://github.com/makenotion/notion-sdk-js.git
cd /notion-sdk-js
```

Next, move into this example in the `/examples` directory and install its dependencies:

```zsh
cd /examples/intro-to-notion-api
npm install
```

### 2. Set your environment variables in a `.env` file

A `.env.example` file has been included and can be renamed `.env`. (or run `cp .env.example .env` to copy the file.)

Update the environment variables below:

```zsh
NOTION_API_KEY=<your-notion-api-key>
NOTION_PAGE_ID=<notion-page-id>
```

`NOTION_API_KEY`: Create a new integration in the [integrations dashboard](https://www.notion.com/my-integrations) and retrieve the API key from the integration's `Secrets` page.

`NOTION_PAGE_ID`: Use the ID of any Notion page that you don't mind having content added to. A page specifically for testing is useful!

The page ID is the 32 character string at the end of any page URL.
![A Notion page URL with the ID highlighted](./assets/page_id.png)

### 3. Give the integration access to your page

Your Notion integration will need permission to interact with any Notion page being used. To provide access, do the following:

1. Go to the page in your workspace.
2. Click the `•••` (more menu) on the top-right corner of the page.
3. Scroll to the bottom of the menu and click `Add connections`.
4. Search for and select your integration in the `Search for connections...` menu.

Once selected, your integration will have permission to read content from the page.

**If you are receiving authorization errors, make sure the integration has permission to access the page.**

### 3. Run individual examples

To run each individual example, use the `node` command with the file's path.

For example:

```zsh
node /basic/1-new-block.js
```
