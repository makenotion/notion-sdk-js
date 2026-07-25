import { getResponseHeader } from "../src/errors"

describe("getResponseHeader", () => {
  it("reads standard Headers objects", () => {
    const headers = new Headers({ "retry-after": "120" })

    expect(getResponseHeader(headers, "retry-after")).toEqual("120")
  })

  it("matches plain-object header names case-insensitively", () => {
    const headers = {
      "Retry-After": "120",
      "CF-RAY": "9a1b2c3d4e5f6789-SJC",
    }

    expect(getResponseHeader(headers, "retry-after")).toEqual("120")
    expect(getResponseHeader(headers, "cf-ray")).toEqual("9a1b2c3d4e5f6789-SJC")
  })

  it("reads the first value from an array-valued header", () => {
    const headers = { "retry-after": ["120"] }

    expect(getResponseHeader(headers, "retry-after")).toEqual("120")
  })
})
