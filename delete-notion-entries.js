const { Client } = require('@notionhq/client');
require('dotenv').config();

// Initialize the Notion client with your API key from .env
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Function to delete all entries in a Notion database
async function deleteAllDatabaseEntries() {
  try {
    console.log('🗑️ Deleting all entries from Notion database...');
    console.log('Database ID:', databaseId);
    
    // First, check if the database exists
    try {
      const database = await notion.databases.retrieve({ database_id: databaseId });
      console.log(`Found database: "${database.title?.[0]?.plain_text || 'Untitled'}"`);
    } catch (error) {
      console.error('Error retrieving database:', error.message);
      return;
    }
    
    // Track our progress
    let deletedCount = 0;
    let failedCount = 0;
    let hasMore = true;
    let nextCursor = undefined;
    
    // Loop through all pages and delete them
    while (hasMore) {
      console.log('\nFetching batch of database entries...');
      
      try {
        // Query for pages to delete
        const response = await notion.databases.query({
          database_id: databaseId,
          start_cursor: nextCursor,
          page_size: 100, // Maximum allowed by the API
        });
        
        const pages = response.results;
        nextCursor = response.next_cursor;
        hasMore = !!nextCursor;
        
        console.log(`Found ${pages.length} entries to process.`);
        
        // Process pages in small batches to avoid rate limits
        const batchSize = 5;
        for (let i = 0; i < pages.length; i += batchSize) {
          const batch = pages.slice(i, i + batchSize);
          
          // Process each page in the batch
          const batchPromises = batch.map(async (page) => {
            try {
              // Archive the page (soft delete)
              await notion.pages.update({
                page_id: page.id,
                archived: true
              });
              
              deletedCount++;
              process.stdout.write(`\rDeleted: ${deletedCount}, Failed: ${failedCount}`);
              return true;
            } catch (error) {
              console.error(`\nError deleting page ${page.id}: ${error.message}`);
              failedCount++;
              process.stdout.write(`\rDeleted: ${deletedCount}, Failed: ${failedCount}`);
              return false;
            }
          });
          
          // Wait for all operations in this batch to complete
          await Promise.all(batchPromises);
          
          // Add a small delay between batches to avoid rate limits
          if (i + batchSize < pages.length) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
        
        // If we've processed all entries and there are more, continue
        if (hasMore) {
          console.log('\nFetching next batch...');
        } else {
          console.log('\nNo more entries to process.');
        }
      } catch (error) {
        console.error('\nError during batch processing:', error.message);
        hasMore = false; // Stop on error
      }
    }
    
    console.log('\n\n✅ Deletion process complete!');
    console.log(`Successfully deleted ${deletedCount} entries.`);
    
    if (failedCount > 0) {
      console.log(`Failed to delete ${failedCount} entries. Check logs for details.`);
    }
    
    if (deletedCount === 0 && failedCount === 0) {
      console.log('No entries found in the database.');
    }
    
    return { deletedCount, failedCount };
  } catch (error) {
    console.error('Unhandled error:', error);
    return { deletedCount: 0, failedCount: 0, error };
  }
}

// Execute the function
deleteAllDatabaseEntries()
  .then(() => console.log('\nOperation completed.'))
  .catch(error => console.error('Unhandled exception:', error));