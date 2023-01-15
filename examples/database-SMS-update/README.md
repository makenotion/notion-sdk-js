# Sample Integration: Notion to Email

<img src="https://dev.notion.so/front-static/external/readme/images/notion-email-example@2x.png" alt="drawing" width="500"/>

## About the Integration

This Notion integration sends an email whenever the Status of a page in a database is updated. This sample was built using [this database template](https://www.notion.com/5b593126d3eb401db62c83cbe362d2d5?v=a44397b3675545f389a6f28282c402ae) and SMS are sent using [Twilio's API](https://www.twilio.com).

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
TWILIO_ACCOUNT_SID=<your-Twilio-asid-key>
TWILIO_AUTH_TOKEN=<your-Twilio-auth-token>
NOTION_DATABASE_ID=<your-notion-database-id>
SMS_TO_FIELD=<SMS-recipient>
SMS_FROM_FIELD=<SMS-Twilio-Number>
```

You can create your Notion API key [here](https://www.notion.com/my-integrations).

You can create your Twilio ASID and Auth Token here [here](https://www.twilio.com).

To create a Notion database that will work with this example, duplicate [this template](https://www.notion.com/5b593126d3eb401db62c83cbe362d2d5?v=a44397b3675545f389a6f28282c402ae).

If yu are having trouble finding your database ID, refer to the following stack exchange [Stack Exchange](https://stackoverflow.com/questions/67728038/where-to-find-database-id-for-my-database-in-notion)

### 3. Run code

```zsh
node index.js
```
