# Sample Integration: GitHub PRs to Notion

<img src="https://dev.notion.so/front-static/external/readme/images/github-notion-example@2x.png" alt="drawing" width="500"/>

## About the Integration

This Notion integration updates Notion tasks when a linked Github PR is closed/merged. This integration requires the Notion task link be mentioned in the PR description. This example will guide you through setting up a Notion database, creating a Notion integration and sharing the database with the integration.

## Running Locally

### 1. Setup your local project

```zsh
# Clone this repository locally
git clone https://github.com/makenotion/notion-sdk-js.git

# Switch into this project
cd notion-sdk-js/examples/notion-task-github-pr-sync

# Install the dependencies
npm install
```

### 2. Create Github Personal Access Token

In order for this Integration to work with Github, you'll need a Github Personal Access Token. You can create your GitHub Personal Access token by following the guide [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). Make a note of the Personal Access token, we'll need it later.

### 3. Setup Github Repository

If you don't have a Github Repository you may [click here](https://github.com/new) to set one up.

Once you've created a repository or if you already have one, make a note of the repository owner and repository name, we'll need it later.

### 4. Create a Notion Database

You may skip this step if you have a Notion database to use with this integration.

If you don't have a Notion database, you may duplicate [this empty database template](https://www.notion.so/Example-Notion-Tasks-Database-93cf694c6b8c4a829ef3fb389ac62d4e), to get started.

If you'd like this Integration to also update a Database Status property, you should create one now.

If you already have one, make note of the Status Property Name, we'll need it later.

You may choose whether or not to update the Status Property by setting

```
UPDATE_STATUS_IN_NOTION_DB = <true|false>
```

in your .env file to true or false. More on this later.

### 5. Create Notion Integration

In order to leverage the Notion API, we must first create an integration. To do that, [click here](https://www.notion.com/my-integrations), and click Create new integration.

As you progress through the fields, pay close attention to enabling the following permissions:

Capabilities > Content Capabilities > Read Content, Update Content, Insert Content.
Capabilities > Comment Capabilities > Read Comments, Insert Comments

These capabilities are required to write comments on your Notion Tasks.

Once your integration is created, make a note of your Internal Integration Token, this will be your Notion API Key, we'll need it in the next step.

<img src="https://files.readme.io/cbbd7c3-create_integration.gif" alt="drawing" width="500"/>

### 6. Connect your Integration with your Notion Page

1. Go to the database page in your workspace.
2. Click the ••• on the top right corner of the page.
3. At the bottom of the pop-up, click Add connections.
4. Search for and select your integration in the Search for connections... menu.

### 7. Set your environment variables in a `.env` file

Using the information you noted above, create a `.env` file.

```
GITHUB_KEY=<your-github-personal-access-token>
NOTION_KEY=<your-notion-api-key>
GITHUB_REPO_OWNER=<github-owner-username>
GITHUB_REPO_NAME=<github-repo-name>
UPDATE_STATUS_IN_NOTION_DB = <true|false>
STATUS_PROPERTY_NAME = <your-status-property-name>
```

### 8. Run code

```zsh
npx ts-node index.ts
```
