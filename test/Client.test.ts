import { Client } from "../src"

describe("Notion SDK Client", () => {
  it("Constructs without throwing", () => {
    new Client({ auth: "foo" })
  })

  describe("request param building", () => {
    let mockFetch: jest.MockedFn<typeof fetch>
    let notion: Client

    beforeEach(() => {
      mockFetch = jest.fn()
      mockFetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve("{}"),
        headers: new Headers(),
        status: 200,
      } as Response)

      notion = new Client({ fetch: mockFetch })
    })

    it("calls revoke API with basic auth", async () => {
      await notion.oauth.revoke({
        client_id: "client_id",
        client_secret: "client_secret",
        token: "token",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/oauth/revoke",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2022-06-28",
            "user-agent": expect.stringContaining("notionhq-client"),
            authorization: `Basic ${Buffer.from(
              "client_id:client_secret"
            ).toString("base64")}`,
          }),
        })
      )
    })

    it("calls create file upload API", async () => {
      await notion.fileUploads.create({
        filename: "test.txt",
        content_type: "text/plain",
        mode: "single_part",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.notion.com/v1/file_uploads",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2022-06-28",
            "user-agent": expect.stringContaining("notionhq-client"),
            "content-type": "application/json",
          }),
        })
      )

      const calls = mockFetch.mock.calls
      const firstCall = calls[0]
      const firstCallParams = firstCall?.[1]
      const requestBody = JSON.parse(String(firstCallParams?.body) ?? "{}")

      expect(requestBody).toMatchObject({
        filename: "test.txt",
        content_type: "text/plain",
        mode: "single_part",
      })
    })

    it("calls send file upload API", async () => {
      const fileUploadId = "62af0fc3-efaa-4c48-bf2a-7d6ce510fa59"

      await notion.fileUploads.send({
        file_upload_id: fileUploadId,
        file: {
          filename: "test.txt",
          data: "test",
        },
        part_number: "2",
      })

      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.notion.com/v1/file_uploads/${fileUploadId}/send`,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Notion-Version": "2022-06-28",
            "user-agent": expect.stringContaining("notionhq-client"),
          }),
        })
      )

      const calls = mockFetch.mock.calls
      const firstCall = calls[0]
      const firstCallParams = firstCall?.[1]

      expect(firstCallParams?.headers).not.toContain("content-type")
      expect(firstCallParams?.headers).not.toContain("Content-Type")

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const body = { ...(firstCallParams?.body as any) }
      const streams = body["_streams"]

      expect(streams).toEqual(
        expect.arrayContaining([
          expect.stringContaining(
            'Content-Disposition: form-data; name="file"; filename="test.txt"'
          ),
          expect.stringContaining(
            'Content-Disposition: form-data; name="part_number"'
          ),
        ])
      )
    })
  })
})
