# Sample Integration: Notion to Email

<img src="https://dev.notion.so/front-static/external/readme/images/notion-email-example@2x.png" alt="drawing" width="500"/>

## About the Integration

This Notion integration sends an email whenever the Status of a page in a database is updated. This sample was built using [this database template](https://www.notion.com/5b593126d3eb401db62c83cbe362d2d5?v=a44397b3675545f389a6f28282c402ae) and emails are sent using [SendGrid's API](https://sendgrid.com).

## Running Locally

### 1. Setup your local project

```zsh
# Clone this repository locally
git clone https://github.com/makenotion/notion-sdk-js.git

# Switch into this project
cd notion-sdk-js/examples/database-update-send-email

# Install the dependencies
npm install
```

### 2. Set your environment variables in a `.env` file

```zsh
NOTION_KEY= <your-notion-api-key>
SENDGRID_KEY=<your-sendgrid-api-key>
NOTION_DATABASE_ID=<your-notion-database-id>
EMAIL_TO_FIELD=<email-recipients>
EMAIL_FROM_FIELD=<email-from-field>
```

You can create your Notion API key [here](https://www.notion.com/my-integrations).

You can create your SendGrid API key [here](https://signup.sendgrid.com).

To create a Notion database that will work with this example, duplicate [this template](https://www.notion.com/5b593126d3eb401db62c83cbe362d2d5?v=a44397b3675545f389a6f28282c402ae).

### 3. Run code

```zsh
node index.js
```
