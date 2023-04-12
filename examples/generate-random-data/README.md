# Sample Integration: Generate Random Data with Notion API

## About the Integration

This integration finds the first database which your bot has access to, and creates correctly typed random rows of data.

## Running Locally

### 1. Setup your local project

```zsh
# Clone this repository locally
git clone https://github.com/makenotion/notion-sdk-js.git

# Switch into this project
cd notion-sdk-js/examples/generate-random-data

# Install the dependencies
npm install
```

### 2. Setup your Notion workspace

You can create your Notion API key [here](https://www.notion.com/my-integrations).

To create a Notion database that will work with this example, duplicate [this database template](https://public-api-examples.notion.site/f3e098475baa45878759ed8d04ea79af).

Your Notion integration will need access to the Notion database you have created. To provide access, follow the instructions found in Notion's [Integration guide](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration).

### 3. Set your environment variables to a `.env` file

Rename `example.env` to `.env` in this directory and add your API key.

```zsh
NOTION_KEY=<api-key-you-created-in-the-previous-step>
```

### 4. Run code

```zsh
npm run ts-run
```
