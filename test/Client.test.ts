import { Client } from "../src"

describe("Notion SDK Client", () => {
  it("Constructs without throwing", () => {
    new Client({ auth: "foo" })
  })

  it("calls revoke API with basic auth", async () => {
    const mockFetch = jest.fn()
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => "{}",
      headers: {},
      status: 200,
    })

    const notion = new Client({ fetch: mockFetch })

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
})
