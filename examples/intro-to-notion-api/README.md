# Introduction to using Notion's SDK for JavaScript

## Learn how to make public API requests

Use this sample code to learn how to make public API requests with varying degrees of difficulty.

The sample code is split into three sections:

1. basic
2. intermediate
3. advanced

If you are new to Notion's SDK for JavaScript, start with the code samples in the `/basic` directory to get more familiar to basic concepts.

The files in each directory will build on each other to increase in complexity. For example, in `/intermediate`, first you will see how to create a database, then how to create a database and add a page to it, and finally create a database, add a page, and query the database.

## Table of contents

In case you are looking for a specific task, the files are divided as follows:

- `/basic/1-new-block.js`: Create a new block that will be appended to a Notion page.
- `/basic/2-styled-block-text.js`: Update a block's text styles after creating it.
- `/intermediate/1-create-a-database.js`: Create a new database with defined properties.
- `/intermediate/2-add-page-to-database.js`: Add a new page to a newly-created database.
- `/intermediate/3-query-database.js`: Create a new database with defined properties.
- `/intermediate/3-sort-database.js`: Create a new database with defined properties.
- `/advanced/` // todo: add these - not sure what we're including

## Run locally

To use this example on your local machine, clone the repo and move into the cloned repo:

```zsh
git clone https://github.com/makenotion/notion-sdk-js.git
cd /notion-sdk-js
```

Next, move into this example in the `/examples` directory and install its dependencies:

```zsh
cd /examples/intro-to-notion-api
npm install
```

To run each individual example, use the `node` command with the file's path.

For example:

```zsh
node /basic/1-new-block.js
```
