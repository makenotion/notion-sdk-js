// Find the official Notion API client @ https://  github.com/makenotion/notion-sdk-js/
// npm install @notionhq/client
import { Client } from "@notionhq/client"

import * as _ from "lodash"

// TODO(blackmad): fix this import
import { Property } from "../../build/src/api-types"
import { InputPropertyValueMap } from "../../build/src/api-endpoints"

import { config } from "dotenv"
config()

import * as faker from "faker"

const notion = new Client({ auth: process.env["NOTION_KEY"] })

function makeFakePropertiesData(
  properties: Record<string, Property>
): InputPropertyValueMap {
  const propertyValues: InputPropertyValueMap = {}
  Object.entries(properties).forEach(([name, property]) => {
    if (property.type === "date") {
      propertyValues[name] = {
        id: property.id,
        type: "date",
        date: {
          start: faker.date.past().toISOString(),
        },
      }
    } else if (property.type === "multi_select") {
      const multiSelectOption = _.sample(property.multi_select.options)
      if (multiSelectOption) {
        propertyValues[name] = {
          type: "multi_select",
          id: property.id,
          multi_select: [multiSelectOption],
        }
      }
    } else if (property.type === "select") {
      console.dir({ property }, { depth: 10 })
      const selectOption = _.sample(property.select.options)
      if (selectOption) {
        propertyValues[name] = {
          type: "select",
          id: property.id,
          select: selectOption,
        }
      }
    } else if (property.type === "email") {
      propertyValues[name] = {
        type: "email",
        id: property.id,
        email: faker.internet.email(),
      }
    } else if (property.type === "checkbox") {
      propertyValues[name] = {
        type: "checkbox",
        id: property.id,
        checkbox: faker.datatype.boolean(),
      }
    } else if (property.type === "url") {
      propertyValues[name] = {
        type: "url",
        id: property.id,
        url: faker.internet.url(),
      }
    } else if (property.type === "number") {
      propertyValues[name] = {
        type: "number",
        id: property.id,
        number: faker.datatype.number(),
      }
    } else if (property.type === "title") {
      propertyValues[name] = {
        type: "title",
        id: property.id,
        title: [
          {
            type: "text",
            text: { content: faker.lorem.words(3) },
          },
        ],
      }
    } else if (property.type === "rich_text") {
      propertyValues[name] = {
        type: "rich_text",
        id: property.id,
        rich_text: [
          {
            type: "text",
            text: { content: faker.name.firstName() },
          },
        ],
      }
    } else if (property.type === "phone_number") {
      propertyValues[name] = {
        type: "phone_number",
        id: property.id,
        phone_number: faker.phone.phoneNumber(),
      }
    } else {
      console.log("unimplemented property type: ", property.type)
    }
  })
  return propertyValues
}

async function main() {
  // Find the first database this bot has access to
  // TODO(blackmad): move to notion.search()
  const databases = await notion.databases.list({})

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

  // generate a bunch of fake pages with fake data
  for (let i = 0; i < 10; i++) {
    const propertiesData = makeFakePropertiesData(properties)
    await notion.pages.create({
      parent: {
        database_id: database.id,
      },
      properties: propertiesData,
    })
  }
}

main()
