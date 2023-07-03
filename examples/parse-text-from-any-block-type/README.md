# Sample integration: Parse text from any block type

Parse plain text from any type of block (i.e. page content), including headers, lists, media, etc.

## About the integration

This integration will retrieve Notion [page content](https://developers.notion.com/docs/working-with-page-content) and parse any plain text from the block. (Note: page content is represented by [blocks](https://developers.notion.com/docs/working-with-page-content#modeling-content-as-blocks).) The plain text is printed to the command line in this example, but can be used in your Notion projects as needed.

## About page content

When [retrieving block children](https://developers.notion.com/reference/get-block-children) (i.e. page content) with the public API, the structure of the blocks returned will vary depending on the block type. For example, a [paragraph block](https://developers.notion.com/reference/block#paragraph) and an [image block](https://developers.notion.com/reference/block#image) are modeled differently.

This example demonstrates how to parse any available text for any type of block. In many cases, [rich text](https://developers.notion.com/reference/rich-text) will be available and the `plain_text` value will be used.

Note: Not all blocks contain text to display (e.g. dividers). Additionally, not all block types are currently supported by the public API.

## Running Locally

### 1. Setup your local project

```zsh
# Clone this repository locally
git clone https://github.com/makenotion/notion-sdk-js.git

# Switch into this project
cd notion-sdk-js/examples/parse-text-from-any-block-type

# Install the dependencies
npm install
```

### 2. Set your environment variables in a `.env` file

A `.env.example` file has been included and can be renamed `.env`. Update the environment variables below:

```zsh
NOTION_API_KEY=<your-notion-api-key>
NOTION_PAGE_ID=<notion-page-id>
```

`NOTION_API_KEY`: Create a new integration in the [integrations dashboard](https://www.notion.com/my-integrations) and retrieve the API key available in the integration's `Secrets` page.

`NOTION_PAGE_ID`: Use the ID of any Notion page with content. A page with a variety of block types is recommended.

The page ID is the 32 character string at the end of any page URL.
![A Notion page URL with the ID highlighted](./assets/page_id.png)

### 3. Give the integration access to your page

Your Notion integration will need permission to retrieve the block children from the Notion page being used. To provide access, do the following:

1. Go to the page in your workspace.
2. Click the `•••` (more menu) on the top-right corner of the page.
3. Scroll to the bottom of the menu and click `Add connections`.
4. Search for and select your integration in the `Search for connections...` menu.

Once selected, your integration will have permission to read content from the page.

### 4. Run code

```zsh
node index.js
```
