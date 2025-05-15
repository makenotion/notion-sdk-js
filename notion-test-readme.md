# Notion API Test Guide

This project helps you test your Notion API integration with a simple Node.js script.

## Prerequisites

Before running the test, make sure you have:

1. Created a Notion integration at https://www.notion.so/my-integrations
2. Copied the "Internal Integration Token" (API key)
3. Shared at least one database with your integration
   - Open a database in Notion
   - Click "Share" in the top right
   - Add your integration under "Add people, emails, groups, or integrations"

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Edit the `.env` file
   - Replace the placeholder in `NOTION_API_KEY=` with your actual integration token

3. **Run the Test**
   ```bash
   npm test
   # or
   node server.js
   ```

## Understanding the Results

The test script performs three main checks:

1. **Authentication Test**: Lists users to verify your API key works
2. **Database Access Test**: Lists databases shared with your integration
3. **Query Test**: Performs a simple query on the first database

If all tests pass, you'll see success messages for each step. If any test fails, you'll see an error message explaining what went wrong and how to fix it.

## Troubleshooting

- **API Key Invalid**: Double-check your integration token in `.env`
- **No Databases Found**: Make sure you've shared a database with your integration
- **Permission Errors**: Ensure your integration has the necessary capabilities enabled in the Notion dashboard

## Next Steps

Once your test is successful, you can:

1. Modify `server.js` to implement your specific use case
2. Add more advanced queries and operations
3. Build a complete application using the Notion API

Refer to the [Notion API documentation](https://developers.notion.com/reference/intro) for more details on available endpoints and operations.