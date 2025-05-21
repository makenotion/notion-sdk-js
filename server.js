// Import required dependencies
const { Client } = require('@notionhq/client');
require('dotenv').config();

// Initialize the Notion client with your API key from .env
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Check if a specific database ID is provided in .env
const specificDatabaseId = process.env.NOTION_DATABASE_ID;

// Test function to demonstrate various Notion API operations
async function testNotionAPI() {
  console.log('🚀 Starting Notion API Test...');
  console.log('----------------------------');

  try {
    // Step 1: Test authentication by listing users
    console.log('📋 Test 1: Listing Users');
    const usersResponse = await notion.users.list({});
    console.log(`✅ Success! Found ${usersResponse.results.length} users.`);
    console.log(`   Bot User: ${usersResponse.results.find(user => user.type === 'bot')?.name || 'Unknown'}`);
    console.log('----------------------------');

    // Step 2: Check for database access
    console.log('📋 Test 2: Checking Database Access');
    
    let databaseId;
    let searchResponse = { results: [] };
    
    // If a specific database ID was provided, use it directly
    if (specificDatabaseId && specificDatabaseId.trim() !== '') {
      databaseId = specificDatabaseId;
      console.log(`   Using specific database ID from .env: ${databaseId}`);
      
      try {
        // Try to retrieve the database to see if we have access
        const databaseResponse = await notion.databases.retrieve({ database_id: databaseId });
        console.log(`✅ Success! Found database: ${databaseResponse.title?.[0]?.plain_text || 'Untitled'}`);
        searchResponse.results = [databaseResponse]; // Add to results for consistent handling
      } catch (error) {
        console.log(`❌ Error: Unable to access the specified database (ID: ${databaseId})`);
        console.log(`   Error details: ${error.code} - ${error.message}`);
        console.log('   Please check that:');
        console.log('   1. The database ID is correct');
        console.log('   2. You\'ve shared the database with your integration "RS_NTN"');
        databaseId = null;
      }
    }
    
    // If no specific database ID or if the specific one failed, try searching
    if (!databaseId) {
      console.log('📋 Searching for accessible databases...');
      searchResponse = await notion.search({
        filter: {
          value: 'database',
          property: 'object'
        }
      });

      if (searchResponse.results.length === 0) {
        console.log('⚠️ No databases found! Make sure you\'ve shared at least one database with your integration.');
        console.log('   See: https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration');
      } else {
        console.log(`✅ Success! Found ${searchResponse.results.length} databases:`);
        
        // Display database information
        searchResponse.results.forEach((database, index) => {
          console.log(`   ${index + 1}. ${database.title?.[0]?.plain_text || 'Untitled'} (ID: ${database.id})`);
        });

        // Use the first database found
        databaseId = searchResponse.results[0].id;
      }
    }
    
    // Only proceed with database query if we have a valid database ID
    if (databaseId) {
      console.log('----------------------------');
      
      // Step 3: Query the database to test full access
      console.log(`📋 Test 3: Querying Database (ID: ${databaseId})`);
      try {
        const queryResponse = await notion.databases.query({
          database_id: databaseId,
          page_size: 3 // Limit to 3 results for brevity
        });

        console.log(`✅ Success! Database query returned ${queryResponse.results.length} results.`);
        if (queryResponse.results.length > 0) {
          console.log('   First few results:');
          queryResponse.results.forEach((page, index) => {
            console.log(`   ${index + 1}. Page ID: ${page.id}`);
          });
        }
      } catch (error) {
        console.log(`❌ Error querying the database: ${error.code} - ${error.message}`);
      }
    }
    console.log('----------------------------');

    // Overall test results
    console.log('🎉 Notion API Test Complete!');
    
    if (searchResponse.results.length === 0) {
      console.log('⚠️ Your integration "RS_NTN" is authenticated but has no database access yet.');
      console.log('👉 Next steps to complete your setup:');
      console.log('   1. Go to Notion and open a database you want to use');
      console.log('   2. Click the "Share" button in the top right corner');
      console.log('   3. Type "RS_NTN" in the search field and select your integration');
      console.log('   4. Click "Invite"');
      console.log('   5. Run this test again with: node server.js');
      console.log('\n   For more details see: https://developers.notion.com/docs/create-a-notion-integration#step-2-share-a-database-with-your-integration');
    } else {
      console.log('✨ Your integration is working perfectly!');
      console.log('👉 Next steps:');
      console.log('   - Explore more API features from the documentation');
      console.log('   - Implement specific functionality for your use case');
      console.log('   - Check out example projects at: https://github.com/makenotion/notion-sdk-js/tree/main/examples');
    }

  } catch (error) {
    console.error('❌ Error during API test:', error);
    if (error.code === 'unauthorized') {
      console.error('   Your API key may be invalid or expired. Check your .env file and Notion integration settings.');
    } else if (error.code === 'object_not_found') {
      console.error('   Database or resource not found. Make sure you\'ve shared it with your integration.');
    }
    console.error('   See error details above for more information.');
  }
}

// Execute the test
testNotionAPI();
