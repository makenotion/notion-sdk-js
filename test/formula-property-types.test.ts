import { describe, expect, it } from "@jest/globals"
import type { DateResponse } from "../src/api-endpoints/common"
import type { FormulaPropertyItemObjectResponse } from "../src/api-endpoints/pages"

describe("FormulaPropertyItemObjectResponse", () => {
  it("supports narrowing formula values by type", () => {
    const stringProperty: FormulaPropertyItemObjectResponse<string> = {
      type: "formula",
      formula: {
        type: "string",
        string: "example",
      },
      object: "property_item",
      id: "test-id",
    }

    const numberProperty: FormulaPropertyItemObjectResponse<number> = {
      type: "formula",
      formula: {
        type: "number",
        number: 42,
      },
      object: "property_item",
      id: "test-id",
    }

    const dateProperty: FormulaPropertyItemObjectResponse<DateResponse> = {
      type: "formula",
      formula: {
        type: "date",
        date: null,
      },
      object: "property_item",
      id: "test-id",
    }

    const booleanProperty: FormulaPropertyItemObjectResponse<boolean> = {
      type: "formula",
      formula: {
        type: "boolean",
        boolean: true,
      },
      object: "property_item",
      id: "test-id",
    }

    expect(stringProperty.formula.type).toBe("string")
    expect(numberProperty.formula.type).toBe("number")
    expect(dateProperty.formula.type).toBe("date")
    expect(booleanProperty.formula.type).toBe("boolean")
  })

  it("rejects formula values that do not match the generic type", () => {
    const invalidProperty: FormulaPropertyItemObjectResponse<number> = {
      type: "formula",
      formula: {
        // @ts-expect-error A string formula must not be assignable to a number response.
        type: "string",
        string: "example",
      },
      object: "property_item",
      id: "test-id",
    }

    expect(invalidProperty).toBeDefined()
  })
})
