require('dotenv').config()
const express = require('express')
const app = express()

const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_KEY })

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
	response.sendFile(__dirname + '/views/index.html')
})

// Create new database. The page ID is set in the environment variables.
app.post('/databases', async function (request, response) {
	const pageId = process.env.NOTION_PAGE_ID
	const title = request.body.dbName

	try {
		const newDb = await notion.databases.create({
			parent: {
				type: 'page_id',
				page_id: pageId,
			},
			title: [
				{
					type: 'text',
					text: {
						content: title,
					},
				},
			],
			properties: {
				Name: {
					title: {},
				},
			},
		})
		response.json({ message: 'success!', data: newDb })
	} catch (error) {
		response.json({ message: 'error', error })
	}
})

// Create new page. The database ID is provided in the web form.
app.post('/pages', async function (request, response) {
	const { dbID, pageName, header } = request.body

	try {
		const newPage = await notion.pages.create({
			parent: {
				type: 'database_id',
				database_id: dbID,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: pageName,
							},
						},
					],
				},
			},
			children: [
				{
					object: 'block',
					heading_2: {
						rich_text: [
							{
								text: {
									content: header,
								},
							},
						],
					},
				},
			],
		})
		response.json({ message: 'success!', data: newPage })
	} catch (error) {
		response.json({ message: 'error', error })
	}
})

// Create new block (page content). The page ID is provided in the web form.
app.post('/blocks', async function (request, response) {
	const { pageID, content } = request.body

	try {
		const newBlock = await notion.blocks.children.append({
			block_id: pageID, // a block ID can be a page ID
			children: [
				{
					// Use a paragraph as a default but the form or request can be updated to allow for other block types: https://developers.notion.com/reference/block#keys
					paragraph: {
						rich_text: [
							{
								text: {
									content: content,
								},
							},
						],
					},
				},
			],
		})
		response.json({ message: 'success!', data: newBlock })
	} catch (error) {
		response.json({ message: 'error', error })
	}
})

// Create new page comments. The page ID is provided in the web form.
app.post('/comments', async function (request, response) {
	const { pageID, comment } = request.body

	try {
		const newComment = await notion.comments.create({
			parent: {
				page_id: pageID,
			},
			rich_text: [
				{
					text: {
						content: comment,
					},
				},
			],
		})
		response.json({ message: 'success!', data: newComment })
	} catch (error) {
		response.json({ message: 'error', error })
	}
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port)
})
