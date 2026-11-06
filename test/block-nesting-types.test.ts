import type { BlockObjectRequest } from "../src"

// Regression test for https://github.com/makenotion/notion-sdk-js/issues/575
//
// `column_list`/`column` were only modeled in the top-level `BlockObjectRequest`
// union, so TypeScript rejected them as children of blocks that support one level
// of nesting (e.g. `callout`), even though the Notion API allows it. This is a
// type-only test: if the assignment below fails to compile, `npm test` fails.
describe("block nesting types", () => {
  it("allows a column_list/column layout nested inside a callout's children", () => {
    const calloutWithNestedColumns: BlockObjectRequest = {
      type: "callout",
      callout: {
        rich_text: [],
        color: "gray_background",
        children: [
          {
            type: "column_list",
            column_list: {
              children: [
                {
                  type: "column",
                  column: {
                    children: [
                      { type: "paragraph", paragraph: { rich_text: [] } },
                    ],
                  },
                },
                {
                  type: "column",
                  column: {
                    children: [
                      { type: "paragraph", paragraph: { rich_text: [] } },
                    ],
                  },
                },
              ],
            },
          },
          { type: "paragraph", paragraph: { rich_text: [] } },
        ],
      },
    }

    expect(calloutWithNestedColumns.type).toBe("callout")
  })

  it("still rejects a third level of nested children under a column", () => {
    const invalid: BlockObjectRequest = {
      type: "callout",
      callout: {
        rich_text: [],
        children: [
          {
            type: "column_list",
            column_list: {
              children: [
                {
                  type: "column",
                  column: {
                    children: [
                      {
                        type: "quote",
                        // @ts-expect-error a block at this depth cannot itself have `children`
                        quote: { rich_text: [], children: [] },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }

    expect(invalid.type).toBe("callout")
  })
})
