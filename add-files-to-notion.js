const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize the Notion client with your API key from .env
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Function to recursively get all files and directories
function getAllFiles(dirPath, parentPath = '') {
  // Skip node_modules folder and .git directory to avoid massive results
  if (dirPath.includes('node_modules') || dirPath.includes('.git')) {
    return [];
  }

  const result = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const relativePath = path.join(parentPath, entry.name);
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Add directory entry
      result.push({
        name: entry.name,
        path: relativePath,
        isDirectory: true,
        parent: parentPath || 'root',
        children: [] // Will be filled later for visualization
      });
      
      // Add all files from subdirectory
      const nestedFiles = getAllFiles(fullPath, relativePath);
      result.push(...nestedFiles);
    } else {
      // Add file entry
      result.push({
        name: entry.name,
        path: relativePath,
        isDirectory: false,
        parent: parentPath || 'root',
        size: fs.statSync(fullPath).size,
        extension: path.extname(entry.name).slice(1) // Remove the dot
      });
    }
  }
  
  return result;
}

// Function to organize files into a parent-child structure
function organizeFilesIntoTree(files) {
  const fileMap = new Map();
  const rootItems = [];
  
  // First, map each file by its path for quick lookup
  files.forEach(file => {
    fileMap.set(file.path, file);
  });
  
  // Then, for each file, add it to its parent's children array
  files.forEach(file => {
    if (file.parent === 'root') {
      rootItems.push(file);
    } else if (fileMap.has(file.parent)) {
      const parent = fileMap.get(file.parent);
      parent.children.push(file);
    }
  });
  
  return rootItems;
}

// Function to check and create properties for the database if needed
async function setupDatabaseProperties() {
  try {
    // Get the database to see its current properties
    const database = await notion.databases.retrieve({ database_id: databaseId });
    console.log('Database retrieved successfully');

    // Check if the database has the required properties
    const requiredProperties = [
      { name: 'Name', type: 'title' },
      { name: 'Type', type: 'select' },
      { name: 'Path', type: 'rich_text' },
      { name: 'Parent', type: 'rich_text' },
      { name: 'Size', type: 'number' },
      { name: 'Extension', type: 'rich_text' }
    ];

    // Check if each required property exists
    const missingProperties = [];
    for (const prop of requiredProperties) {
      if (prop.name !== 'Name' && !database.properties[prop.name]) {
        missingProperties.push(prop);
      }
    }

    // If there are missing properties, update the database
    if (missingProperties.length > 0) {
      console.log('Adding missing properties to the database...');
      
      const propertiesToAdd = {};
      
      // Create property configurations
      missingProperties.forEach(prop => {
        if (prop.type === 'select') {
          propertiesToAdd[prop.name] = {
            select: {
              options: [
                { name: 'File', color: 'blue' },
                { name: 'Directory', color: 'green' }
              ]
            }
          };
        } else if (prop.type === 'rich_text') {
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
        console.log('Database properties updated successfully');
      }
    } else {
      console.log('Database already has all required properties');
    }
    
    return database.properties;
  } catch (error) {
    console.error('Error setting up database properties:', error);
    throw error;
  }
}

// Function to add a file/directory to Notion
async function addFileToNotion(file, properties) {
  try {
    const pageProperties = {
      [properties['Name'].id]: {
        title: [
          {
            text: {
              content: file.name
            }
          }
        ]
      }
    };
    
    // Add Type property if it exists
    if (properties['Type']) {
      pageProperties[properties['Type'].id] = {
        select: {
          name: file.isDirectory ? 'Directory' : 'File'
        }
      };
    }
    
    // Add Path property if it exists
    if (properties['Path']) {
      pageProperties[properties['Path'].id] = {
        rich_text: [
          {
            text: {
              content: file.path
            }
          }
        ]
      };
    }
    
    // Add Parent property if it exists
    if (properties['Parent']) {
      pageProperties[properties['Parent'].id] = {
        rich_text: [
          {
            text: {
              content: file.parent
            }
          }
        ]
      };
    }
    
    // Add Size property if it exists and file is not a directory
    if (properties['Size'] && !file.isDirectory) {
      pageProperties[properties['Size'].id] = {
        number: file.size
      };
    }
    
    // Add Extension property if it exists and file is not a directory
    if (properties['Extension'] && !file.isDirectory) {
      pageProperties[properties['Extension'].id] = {
        rich_text: [
          {
            text: {
              content: file.extension || ''
            }
          }
        ]
      };
    }
    
    // Create the page in Notion
    await notion.pages.create({
      parent: {
        database_id: databaseId
      },
      properties: pageProperties
    });
    
    return true;
  } catch (error) {
    console.error(`Error adding ${file.path} to Notion:`, error);
    return false;
  }
}

// Main function to execute the script
async function main() {
  try {
    console.log('🚀 Starting to add project files to Notion...');
    
    // Setup database properties
    console.log('Setting up database properties...');
    const properties = await setupDatabaseProperties();
    
    // Get all files in the project directory
    console.log('Getting all files in the project directory...');
    const projectDir = process.cwd();
    const allFiles = getAllFiles(projectDir);
    console.log(`Found ${allFiles.length} files/directories`);
    
    // Organize files into a tree structure for easier visualization
    const fileTree = organizeFilesIntoTree(allFiles);
    
    // Clear existing entries in the database
    console.log('Clearing existing entries in the Notion database...');
    const existingPages = await notion.databases.query({
      database_id: databaseId
    });
    
    for (const page of existingPages.results) {
      await notion.pages.update({
        page_id: page.id,
        archived: true
      });
    }
    
    console.log(`Cleared ${existingPages.results.length} existing entries`);
    
    // Add files to Notion
    console.log('Adding files to Notion database...');
    let successCount = 0;
    
    for (const file of allFiles) {
      const success = await addFileToNotion(file, properties);
      if (success) {
        successCount++;
        process.stdout.write(`\rAdded ${successCount}/${allFiles.length} files`);
      }
    }
    
    console.log('\n✅ Done!');
    console.log(`Added ${successCount} files/directories to Notion database`);
    
    console.log('\n🔗 View your database at:');
    console.log(`https://www.notion.so/${databaseId.replace(/-/g, '')}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the script
main();