# Sample Integration: Types Page Update

## About the Integration

This Notion integration simply updates a page, but the request body is validated by a given page type.

## Running Locally

### 1. Setup your local project

```zsh
# Clone this repository locally
git clone https://github.com/makenotion/notion-sdk-js.git

# Switch into this project
cd notion-sdk-js/examples/typed-page-update
# Install the dependencies
npm install
```

### 2. Set your environment variables in a `.env` file

```zsh
NOTION_KEY=<your-notion-api-key>
PAGE_ID=<page-id>
```

You can create your Notion API key [here](https://www.notion.com/my-integrations).

### 3. Run code

```zsh
npx node-ts index.ts
```
