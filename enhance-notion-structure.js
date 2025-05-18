const { Client } = require('@notionhq/client');
require('dotenv').config();

// Initialize the Notion client with your API key from .env
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Function to add a hierarchical prefix to names for better visualization
async function enhanceStructureVisualization() {
  try {
    console.log('🌳 Enhancing project structure visualization in Notion...');
    
    // First, get all entries from the database
    console.log('Fetching all entries from the database...');
    
    // Create a map to hold all pages by path
    const pagesByPath = new Map();
    let nextCursor = undefined;
    let totalPages = 0;
    
    try {
      // First, let's check if the database exists and is accessible
      const dbInfo = await notion.databases.retrieve({ database_id: databaseId });
      console.log(`Database found: "${dbInfo.title?.[0]?.plain_text || 'Untitled'}" (ID: ${databaseId})`);
      console.log('Properties found:');
      Object.keys(dbInfo.properties).forEach(propName => {
        console.log(`- ${propName} (${dbInfo.properties[propName].type})`);
      });

      // Paginate through all database entries
      let pageNumber = 0;
      do {
        pageNumber++;
        console.log(`\nFetching page ${pageNumber} of results...`);
        
        const response = await notion.databases.query({
          database_id: databaseId,
          start_cursor: nextCursor,
          page_size: 100, // Maximum allowed by Notion API
        });
        
        console.log(`Retrieved ${response.results.length} entries in this batch`);
        
        if (response.results.length === 0) {
          console.log('No entries found in this batch');
          break;
        }
        
        // Process this batch of pages
        for (const page of response.results) {
          // Extract the core properties we need
          let name = '';
          let path = '';
          let isDirectory = false;
          
          // Get the name (title)
          if (page.properties.Name && page.properties.Name.title && page.properties.Name.title.length > 0) {
            name = page.properties.Name.title[0].plain_text;
          }
          
          // Get the path
          if (page.properties.Path && page.properties.Path.rich_text && page.properties.Path.rich_text.length > 0) {
            path = page.properties.Path.rich_text[0].plain_text;
          }
          
          // Check if it's a directory
          if (page.properties.Type && page.properties.Type.select) {
            isDirectory = page.properties.Type.select.name === 'Directory';
          }
          
          // Only add if we have a name and path
          if (name && path) {
            // Store in our map
            pagesByPath.set(path, {
              id: page.id,
              name,
              path,
              isDirectory,
            });
            
            totalPages++;
          } else {
            console.log(`Skipping entry with missing data: Name=${name}, Path=${path}`);
          }
        }
        
        // Update cursor for next batch
        nextCursor = response.next_cursor;
        console.log(`Next cursor: ${nextCursor || 'none'}`);
      } while (nextCursor);
      
      console.log(`\nFound ${totalPages} valid entries in the database`);
      
      // Debug: Check what's in the map
      if (totalPages === 0 || totalPages < 10) {
        console.log('\nDebug: All entries in the map:');
        for (const [path, data] of pagesByPath.entries()) {
          console.log(`- ${path}: ${data.name} (${data.isDirectory ? 'Directory' : 'File'})`);
        }
      } else {
        console.log('\nDebug: First 5 entries in the map:');
        let count = 0;
        for (const [path, data] of pagesByPath.entries()) {
          console.log(`- ${path}: ${data.name} (${data.isDirectory ? 'Directory' : 'File'})`);
          count++;
          if (count >= 5) break;
        }
      }
    } catch (error) {
      console.error('Error fetching database entries:', error);
      console.error('Error details:', error.message);
      throw error;
    }
    
    // Create a hierarchical depth mapping
    console.log('Creating hierarchical visualization...');
    
    const updatePromises = [];
    
    for (const [path, page] of pagesByPath) {
      // Calculate depth by counting path separators
      const depth = (path.match(/\//g) || []).length;
      
      // Create a hierarchical prefix
      let prefix = '';
      if (depth > 0) {
        prefix = '│ '.repeat(depth - 1) + '├─ ';
      }
      
      // Special symbol for directories
      const typeSymbol = page.isDirectory ? '📁 ' : '📄 ';
      
      // New name with prefix and symbol
      const newName = `${prefix}${typeSymbol}${page.name}`;
      
      // Add this to updatePromises - we'll process in batches to avoid rate limits
      updatePromises.push({
        pageId: page.id,
        path: page.path,
        newName: newName,
        depth: depth
      });
      
      // Show progress
      if (updatePromises.length % 20 === 0 || updatePromises.length === pagesByPath.size) {
        process.stdout.write(`\rPrepared ${updatePromises.length}/${totalPages} entries for updating`);
      }
    }
    
    // Process updates in batches with retry logic
    console.log('\n\nUpdating entries in batches to avoid rate limits...');
    
    // Break into batches of 5 for better handling of rate limits
    const batchSize = 5;
    const batches = [];
    for (let i = 0; i < updatePromises.length; i += batchSize) {
      batches.push(updatePromises.slice(i, i + batchSize));
    }
    
    let successCount = 0;
    let failCount = 0;
    
    // Process each batch with a pause between batches
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\nProcessing batch ${i + 1}/${batches.length} (${batch.length} entries)...`);
      
      // Process each entry in the batch
      const batchPromises = batch.map(async (entry) => {
        try {
          // Try to update with retry logic
          let attempts = 0;
          const maxAttempts = 3;
          let success = false;
          
          while (attempts < maxAttempts && !success) {
            try {
              await notion.pages.update({
                page_id: entry.pageId,
                properties: {
                  // Add the hierarchy visualization
                  'Hierarchy': {
                    rich_text: [{
                      text: {
                        content: entry.newName
                      }
                    }]
                  },
                  // Add depth for sorting
                  'Depth': {
                    number: entry.depth
                  }
                }
              });
              
              success = true;
              successCount++;
              process.stdout.write(`\rUpdated: ${successCount}, Failed: ${failCount}`);
            } catch (error) {
              attempts++;
              console.log(`\nRetry ${attempts}/${maxAttempts} for ${entry.path}: ${error.message}`);
              
              // Wait longer between retries
              await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
              
              if (attempts >= maxAttempts) {
                failCount++;
                console.error(`\nFailed to update ${entry.path} after ${maxAttempts} attempts`);
              }
            }
          }
        } catch (error) {
          failCount++;
          console.error(`\nError processing ${entry.path}: ${error.message}`);
        }
      });
      
      // Wait for all entries in this batch to complete
      await Promise.all(batchPromises);
      
      // Pause between batches to avoid rate limits
      if (i < batches.length - 1) {
        console.log(`\nPausing for 2 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('\n\n✅ Visualization complete!');
    console.log(`Enhanced ${successCount} entries with hierarchical visualization`);
    console.log(`Failed to update ${failCount} entries`);
    
    console.log('\n📝 Next steps:');
    console.log('1. Open your Notion database');
    console.log('2. Add the "Hierarchy" property to your view');
    console.log('3. Sort by the "Depth" property to maintain correct hierarchical order');
    
    console.log('\n🔗 View your database at:');
    console.log(`https://www.notion.so/${databaseId.replace(/-/g, '')}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Functions to add the required properties if they don't exist
async function setupVisualizationProperties() {
  try {
    console.log('Setting up visualization properties...');
    
    // Get the database to see its current properties
    const database = await notion.databases.retrieve({ database_id: databaseId });
    
    // Check if the database has the required properties
    const requiredProperties = [
      { name: 'Hierarchy', type: 'rich_text' },
      { name: 'Depth', type: 'number' }
    ];
    
    // Check if each required property exists
    const missingProperties = [];
    for (const prop of requiredProperties) {
      if (!database.properties[prop.name]) {
        missingProperties.push(prop);
      }
    }
    
    // If there are missing properties, update the database
    if (missingProperties.length > 0) {
      console.log('Adding missing visualization properties...');
      
      const propertiesToAdd = {};
      
      // Create property configurations
      missingProperties.forEach(prop => {
        if (prop.type === 'rich_text') {
          propertiesToAdd[prop.name] = {
            rich_text: {}
          };
        } else if (prop.type === 'number') {
          propertiesToAdd[prop.name] = {
            number: {
              format: 'number'
            }
          };
        }
      });
      
      // Update the database
      if (Object.keys(propertiesToAdd).length > 0) {
        await notion.databases.update({
          database_id: databaseId,
          properties: propertiesToAdd
        });
        console.log('Visualization properties added successfully');
      }
    } else {
      console.log('Visualization properties already exist');
    }
  } catch (error) {
    console.error('Error setting up visualization properties:', error);
    throw error;
  }
}

// Main function to execute the script
async function main() {
  try {
    // First set up the properties
    await setupVisualizationProperties();
    
    // Then enhance the visualization
    await enhanceStructureVisualization();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();