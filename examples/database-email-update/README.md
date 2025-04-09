# Sample Integration: Notion to Email

<img src="https://dev.notion.so/front-static/external/readme/images/notion-email-example@2x.png" alt="drawing" width="500"/>

## About the Integration

This Notion integration sends an email whenever the Status of a page in a database is updated.

This sample was built using [this database template](https://public-api-examples.notion.site/0def5dfb6d9b4cdaa907a0466834b9f4?v=aea75fc133e54b3382d12292291d9248) and emails are sent using [SendGrid's API](https://sendgrid.com).

### 1. Setup your local project

```zsh
# Clone this repository locally
git clone https://github.com/makenotion/notion-sdk-js.git

# Switch into this project
cd notion-sdk-js/examples/database-email-update

# Install the dependencies
npm install
```

### 2. Setup a free account at [SendGrid](https://sendgrid.com)

Sign up for a free account and follow the instructions to use the Email API.

Choose the option for integrating with the Web API and follow instructions to
get your API token.

## Running Locally

### 3. Setup your Notion workspace

You can create your Notion API key [here](https://www.notion.com/my-integrations).

To create a Notion database that will work with this example, duplicate [this database template](https://public-api-examples.notion.site/0def5dfb6d9b4cdaa907a0466834b9f4?v=aea75fc133e54b3382d12292291d9248).

Your Notion integration will need access to the Notion database you have created. To provide access, follow the instructions found in Notion's [Integration guide](https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration).

### 4. Set your environment variables to a `.env` file

Rename `example.env` to `.env` in this directory and add the following fields:

```zsh
NOTION_KEY=<your-notion-api-key>
SENDGRID_KEY=<your-sendgrid-api-key>
NOTION_DATABASE_ID=<your-notion-database-id>
EMAIL_TO_FIELD=<email-recipients>
EMAIL_FROM_FIELD=<email-from-field>
```

### 5. Run code

```zsh
npm run ts-run
```
