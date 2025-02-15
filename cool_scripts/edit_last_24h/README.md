### `edit-last-24h.js`

This script fetches the Notion data and create a new page mentioning all the pages that have been edited in the past N days.

1. Create a Notion integration (https://www.notion.so/my-integrations)
1. Add the new integration to your workspace
1. Add the new integration to the page that you want to search from
1. Create a `.env` file that contains the keys in `.env.example`.
1. Setup workspace configuration (constants.js)
1. `node edit-last-24h.js`
