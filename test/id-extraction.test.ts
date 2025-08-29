import {
  extractNotionId,
  extractDatabaseId,
  extractPageId,
  extractBlockId,
} from "../src"

describe("ID Extraction Utilities", () => {
  describe("extractNotionId", () => {
    it("should extract ID from standard Notion URLs", () => {
      const examples = [
        {
          url: "https://www.notion.so/myworkspace/My-Database-abc123def456789012345678901234ab",
          expected: "abc123de-f456-7890-1234-5678901234ab"
        },
        {
          url: "https://notion.site/Database-Name-123456781234123412341234567890ab",
          expected: "12345678-1234-1234-1234-1234567890ab"
        }
      ]

      examples.forEach(({ url, expected }) => {
        expect(extractNotionId(url)).toBe(expected)
      })
    })

    it("should prioritize path ID over query parameters", () => {
      // This is the key fix - database ID in path should be extracted, not view ID in query
      const url = "https://notion.so/workspace/MyDB-abc123def456789012345678901234ab?v=def456789012345678901234abcdef12"
      const result = extractNotionId(url)
      expect(result).toBe("abc123de-f456-7890-1234-5678901234ab") // DB ID, not view ID
    })

    it("should use query parameters when no path ID available", () => {
      const url = "https://notion.so/share?p=abc123def456789012345678901234ab"
      const result = extractNotionId(url)
      expect(result).toBe("abc123de-f456-7890-1234-5678901234ab")
    })

    it("should handle already formatted UUIDs", () => {
      const uuid = "12345678-1234-1234-1234-123456789abc"
      expect(extractNotionId(uuid)).toBe("12345678-1234-1234-1234-123456789abc")
    })

    it("should format compact UUIDs", () => {
      const compactUuid = "123456781234123412341234567890ab"
      expect(extractNotionId(compactUuid)).toBe("12345678-1234-1234-1234-1234567890ab")
    })

    it("should return null for invalid inputs", () => {
      const invalidInputs = ["", "not-a-url", "12345", null, undefined]
      invalidInputs.forEach(input => {
        expect(extractNotionId(input as any)).toBe(null)
      })
    })
  })

  describe("extractDatabaseId", () => {
    it("should extract database ID", () => {
      const url = "https://www.notion.so/Tasks-abc123def456789012345678901234ab"
      expect(extractDatabaseId(url)).toBe("abc123de-f456-7890-1234-5678901234ab")
    })
  })

  describe("extractPageId", () => {
    it("should extract page ID", () => {
      const url = "https://www.notion.so/My-Page-123456781234123412341234567890ab"
      expect(extractPageId(url)).toBe("12345678-1234-1234-1234-1234567890ab")
    })
  })

  describe("extractBlockId", () => {
    it("should extract block ID from fragment", () => {
      const url = "https://www.notion.so/Page#block-def456789012345678901234abcdef12"
      expect(extractBlockId(url)).toBe("def45678-9012-3456-7890-1234abcdef12")
    })

    it("should extract block ID without block- prefix", () => {
      const url = "https://www.notion.so/Page#def456789012345678901234abcdef12"
      expect(extractBlockId(url)).toBe("def45678-9012-3456-7890-1234abcdef12")
    })

    it("should return null if no block fragment", () => {
      expect(extractBlockId("https://www.notion.so/Page")).toBe(null)
    })
  })
})