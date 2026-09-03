import type {
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from "../src"

const richText = {} as RichTextPropertyItemObjectResponse
const title = {} as TitlePropertyItemObjectResponse

// These should compile because both properties are arrays.
richText.rich_text[0]!.plain_text
title.title[0]!.plain_text
