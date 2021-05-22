# API Example

## About the Integration

This integration finds the first database which your bot has access to, and creates correctly typed random rows of data.
It is designed to show and exercise the full types of the Notion API and the typescript bindings.

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

### 2. Set your environment variables in a `.env` file

```zsh
NOTION_KEY=<your-notion-api-key>
```

You can create your Notion API key [here](www.notion.com/integrations).

To create a Notion database that will work with this example, duplicate [this empty database template](https://www.notion.so/367cd67cfe8f49bfaf0ac21305ebb9bf?v=bc79ca62b36e4c54b655ceed4ef06ebd).

### 3. Run code

```zsh
npm run ts-run
```
