// Find the official Notion API client @ https://  github.com/makenotion/notion-sdk-js/
// npm install @jahands/notion-client
import { Client } from '@jahands/notion-client'
import {
	CreatePageParameters,
	GetDatabaseResponse,
	GetPagePropertyResponse,
} from '@jahands/notion-client/build/src/api-endpoints'
import { config } from 'dotenv'
import * as faker from 'faker'
import * as _ from 'lodash'

config()

const notion = new Client({ auth: process.env['NOTION_KEY'] })

const startTime = new Date()
startTime.setSeconds(0, 0)

// Given the properties of a database, generate an object full of
// random data that can be used to generate new rows in our Notion database.
function makeFakePropertiesData(
	properties: GetDatabaseResponse['properties']
): Record<string, CreatePageParameters['properties']> {
	const propertyValues: Record<string, CreatePageParameters['properties']> = {}
	Object.entries(properties).forEach(([name, property]) => {
		if (property.type === 'date') {
			propertyValues[name] = {
				type: 'date',
				date: {
					start: faker.date.past().toISOString(),
				},
			}
		} else if (property.type === 'multi_select') {
			const multiSelectOption = _.sample(property.multi_select.options)
			if (multiSelectOption) {
				propertyValues[name] = {
					type: 'multi_select',
					multi_select: [multiSelectOption],
				}
			}
		} else if (property.type === 'select') {
			const selectOption = _.sample(property.select.options)
			if (selectOption) {
				propertyValues[name] = {
					type: 'select',
					id: property.id,
					select: selectOption,
				}
			}
		} else if (property.type === 'email') {
			propertyValues[name] = {
				type: 'email',
				id: property.id,
				email: faker.internet.email(),
			}
		} else if (property.type === 'checkbox') {
			propertyValues[name] = {
				type: 'checkbox',
				id: property.id,
				checkbox: faker.datatype.boolean(),
			}
		} else if (property.type === 'url') {
			propertyValues[name] = {
				type: 'url',
				id: property.id,
				url: faker.internet.url(),
			}
		} else if (property.type === 'number') {
			propertyValues[name] = {
				type: 'number',
				id: property.id,
				number: faker.datatype.number(),
			}
		} else if (property.type === 'title') {
			propertyValues[name] = {
				type: 'title',
				id: property.id,
				title: [
					{
						type: 'text',
						text: { content: faker.lorem.words(3) },
					},
				],
			}
		} else if (property.type === 'rich_text') {
			propertyValues[name] = {
				type: 'rich_text',
				id: property.id,
				rich_text: [
					{
						type: 'text',
						text: { content: faker.name.firstName() },
					},
				],
			}
		} else if (property.type === 'phone_number') {
			propertyValues[name] = {
				type: 'phone_number',
				id: property.id,
				phone_number: faker.phone.phoneNumber(),
			}
		} else {
			console.log('unimplemented property type: ', property.type)
		}
	})
	return propertyValues
}

function assertUnreachable(_x: never): never {
	throw new Error("Didn't expect to get here")
}

function userToString(userBase: { id: string; name?: string | null }) {
	return `${userBase.id}: ${userBase.name || 'Unknown Name'}`
}

function findRandomSelectColumnNameAndValue(properties: GetDatabaseResponse['properties']): {
	name: string
	value: string | undefined
} {
	const options = _.flatMap(Object.entries(properties), ([name, property]) => {
		if (property.type === 'select') {
			return [{ name, value: _.sample(property.select.options.map((o) => o.name)) }]
		}
		return []
	})

	if (options.length > 0) {
		return _.sample(options) || { name: '', value: undefined }
	}

	return { name: '', value: undefined }
}

function extractPropertyItemValueToString(
	property: Extract<GetPagePropertyResponse, { object: 'property_item' }>
): string {
	switch (property.type) {
		case 'checkbox':
			return property.checkbox.toString()
		case 'created_by':
			return userToString(property.created_by)
		case 'created_time':
			return new Date(property.created_time).toISOString()
		case 'date':
			return property.date ? new Date(property.date.start).toISOString() : ''
		case 'email':
			return property.email ?? ''
		case 'url':
			return property.url ?? ''
		case 'number':
			return typeof property.number === 'number' ? property.number.toString() : ''
		case 'phone_number':
			return property.phone_number ?? ''
		case 'select':
			if (!property.select) {
				return ''
			}
			return `${property.select.id} ${property.select.name}`
		case 'multi_select':
			if (!property.multi_select) {
				return ''
			}
			return property.multi_select.map((select) => `${select.id} ${select.name}`).join(', ')
		case 'people':
			return userToString(property.people)
		case 'last_edited_by':
			return userToString(property.last_edited_by)
		case 'last_edited_time':
			return new Date(property.last_edited_time).toISOString()
		case 'title':
			return property.title.plain_text
		case 'rich_text':
			return property.rich_text.plain_text
		case 'files':
			return property.files.map((file) => file.name).join(', ')
		case 'formula':
			if (property.formula.type === 'string') {
				return property.formula.string || '???'
			} else if (property.formula.type === 'number') {
				return property.formula.number?.toString() || '???'
			} else if (property.formula.type === 'boolean') {
				return property.formula.boolean?.toString() || '???'
			} else if (property.formula.type === 'date') {
				return (
					(property.formula.date?.start && new Date(property.formula.date.start).toISOString()) ||
					'???'
				)
			} else {
				return assertUnreachable(property.formula)
			}
		case 'rollup':
			if (property.rollup.type === 'number') {
				return property.rollup.number?.toString() || '???'
			} else if (property.rollup.type === 'date') {
				return (
					(property.rollup.date?.start && new Date(property.rollup.date?.start).toISOString()) ||
					'???'
				)
			} else if (property.rollup.type === 'array') {
				return JSON.stringify(property.rollup.array)
			} else if (property.rollup.type === 'incomplete' || property.rollup.type === 'unsupported') {
				return property.rollup.type
			} else {
				return assertUnreachable(property.rollup)
			}
		case 'relation':
			if (property.relation) {
				return property.relation.id
			}
			return '???'
		case 'status':
			return property.status?.name ?? ''
	}
	return assertUnreachable(property)
}

function extractValueToString(property: GetPagePropertyResponse): string {
	if (property.object === 'property_item') {
		return extractPropertyItemValueToString(property)
	} else if (property.object === 'list') {
		return property.results.map((result) => extractPropertyItemValueToString(result)).join(', ')
	} else {
		return assertUnreachable(property)
	}
}

async function exerciseWriting(databaseId: string, properties: GetDatabaseResponse['properties']) {
	console.log('\n\n********* Exercising Writing *********\n\n')

	const RowsToWrite = 10

	// generate a bunch of fake pages with fake data
	for (let i = 0; i < RowsToWrite; i++) {
		const propertiesData = makeFakePropertiesData(properties)

		const parameters: CreatePageParameters = {
			parent: {
				database_id: databaseId,
			},
			properties: propertiesData,
		} as CreatePageParameters

		await notion.pages.create(parameters)
	}

	console.log(`Wrote ${RowsToWrite} rows after ${startTime}`)
}

async function exerciseReading(databaseId: string, _properties: GetDatabaseResponse['properties']) {
	console.log('\n\n********* Exercising Reading *********\n\n')
	// and read back what we just did
	const queryResponse = await notion.databases.query({
		database_id: databaseId,
	})
	let numOldRows = 0
	for (const page of queryResponse.results) {
		if (!('url' in page)) {
			// Skip partial page objects (these shouldn't be returned anyway.)
			continue
		}

		const createdTime = new Date(page.created_time)
		if (startTime > createdTime) {
			numOldRows++
			return
		}

		console.log(`New page: ${page.id}`)

		for (const [name, property] of Object.entries(page.properties)) {
			const propertyResponse = await notion.pages.properties.retrieve({
				page_id: page.id,
				property_id: property.id,
			})
			console.log(` - ${name} ${property.id} - ${extractValueToString(propertyResponse)}`)
		}
	}
	console.log(`Skipped printing ${numOldRows} rows that were written before ${startTime}`)
}

async function exerciseFilters(databaseId: string, properties: GetDatabaseResponse['properties']) {
	console.log('\n\n********* Exercising Filters *********\n\n')

	// get a random select or multi-select column from the collection with a random value for it
	const { name: selectColumnName, value: selectColumnValue } =
		findRandomSelectColumnNameAndValue(properties)

	if (!selectColumnName || !selectColumnValue) {
		throw new Error('need a select column to run this part of the example')
	}

	console.log(`Looking for ${selectColumnName}=${selectColumnValue}`)

	// Check we can search by name
	const queryFilterSelectFilterTypeBased = {
		property: selectColumnName,
		select: { equals: selectColumnValue },
	}

	const matchingSelectResults = await notion.databases.query({
		database_id: databaseId,
		filter: queryFilterSelectFilterTypeBased,
	})

	console.log(
		`had ${matchingSelectResults.results.length} matching rows for ${selectColumnName}=${selectColumnValue}`
	)

	// Let's do it again for text

	const textColumn = _.sample(Object.values(properties).filter((p) => p.type === 'rich_text'))
	if (!textColumn) {
		throw new Error('Need a rich_text column for this part of the test, could not find one')
	}
	const textColumnId = decodeURIComponent(textColumn.id)
	const letterToFind = faker.lorem.word(1)

	console.log(
		`\n\nLooking for text column with id "${textColumnId}" contains letter "${letterToFind}"`
	)

	const textFilter = {
		property: textColumnId,
		rich_text: { contains: letterToFind },
	}

	// Check we can search by id
	const matchingTextResults = await notion.databases.query({
		database_id: databaseId,
		filter: textFilter,
	})

	console.log(
		`Had ${matchingTextResults.results.length} matching rows in column with ID "${textColumnId}" containing letter "${letterToFind}"`
	)
}

async function main() {
	// Find the first database this bot has access to
	const databases = await notion.search({
		filter: {
			property: 'object',
			value: 'database',
		},
	})

	if (databases.results.length === 0) {
		throw new Error("This bot doesn't have access to any databases!")
	}

	const database = databases.results[0]
	if (!database) {
		throw new Error("This bot doesn't have access to any databases!")
	}

	// Get the database properties out of our database
	const { properties } = await notion.databases.retrieve({
		database_id: database.id,
	})

	await exerciseWriting(database.id, properties)
	await exerciseReading(database.id, properties)
	await exerciseFilters(database.id, properties)
}

main()
