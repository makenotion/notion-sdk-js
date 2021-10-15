// cspell:disable-file
// Note: This is a generated file.

export type IdRequest = string | string

export type TextRequest = string

export type RichTextItemRequest =
  | {
      text: { content: string; link?: { url: TextRequest } | null }
      type?: "text"
      annotations?: {
        bold?: boolean
        italic?: boolean
        strikethrough?: boolean
        underline?: boolean
        code?: boolean
        color?: annotationColorLookup
      }
    }
  | {
      mention:
        | {
            user:
              | { id: IdRequest }
              | {
                  person: { email: string }
                  id: IdRequest
                  type?: "person"
                  name?: string | null
                  avatar_url?: string | null
                  object?: "user"
                }
              | {
                  bot: botLookup
                  id: IdRequest
                  type?: "bot"
                  name?: string | null
                  avatar_url?: string | null
                  object?: "user"
                }
          }
        | { date: { start: string; end?: string | null } }
        | { page: { id: IdRequest } }
        | { database: { id: IdRequest } }
      type?: "mention"
      annotations?: {
        bold?: boolean
        italic?: boolean
        strikethrough?: boolean
        underline?: boolean
        code?: boolean
        color?: annotationColorLookup
      }
    }
  | {
      equation: { expression: TextRequest }
      type?: "equation"
      annotations?: {
        bold?: boolean
        italic?: boolean
        strikethrough?: boolean
        underline?: boolean
        code?: boolean
        color?: annotationColorLookup
      }
    }

export type StringRequest = string

export type BlockObjectRequest =
  | {
      heading_1: { text: Array<RichTextItemRequest> }
      type?: "heading_1"
      object?: "block"
    }
  | {
      heading_2: { text: Array<RichTextItemRequest> }
      type?: "heading_2"
      object?: "block"
    }
  | {
      heading_3: { text: Array<RichTextItemRequest> }
      type?: "heading_3"
      object?: "block"
    }
  | {
      embed: { url: string; caption?: Array<RichTextItemRequest> }
      type?: "embed"
      object?: "block"
    }
  | {
      bookmark: { url: string; caption?: Array<RichTextItemRequest> }
      type?: "bookmark"
      object?: "block"
    }
  | {
      image: mediaBlockLookup
      type?: "image"
      object?: "block"
    }
  | {
      video: mediaBlockLookup
      type?: "video"
      object?: "block"
    }
  | {
      pdf: mediaBlockLookup
      type?: "pdf"
      object?: "block"
    }
  | {
      file: mediaBlockLookup
      type?: "file"
      object?: "block"
    }
  | {
      audio: mediaBlockLookup
      type?: "audio"
      object?: "block"
    }
  | {
      code: {
        text: Array<RichTextItemRequest>
        language: languageLookup
      }
      type?: "code"
      object?: "block"
    }
  | { equation: { expression: string }; type?: "equation"; object?: "block" }
  | { divider: Record<string, never>; type?: "divider"; object?: "block" }
  | { breadcrumb: Record<string, never>; type?: "breadcrumb"; object?: "block" }
  | {
      table_of_contents: Record<string, never>
      type?: "table_of_contents"
      object?: "block"
    }
  | {
      paragraph: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
      }
      type?: "paragraph"
      object?: "block"
    }
  | {
      bulleted_list_item: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
      }
      type?: "bulleted_list_item"
      object?: "block"
    }
  | {
      numbered_list_item: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
      }
      type?: "numbered_list_item"
      object?: "block"
    }
  | {
      quote: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
      }
      type?: "quote"
      object?: "block"
    }
  | {
      to_do: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
        checked?: boolean
      }
      type?: "to_do"
      object?: "block"
    }
  | {
      toggle: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
      }
      type?: "toggle"
      object?: "block"
    }
  | {
      callout: {
        text: Array<RichTextItemRequest>
        children?: Array<
          | {
              heading_1: { text: Array<RichTextItemRequest> }
              type?: "heading_1"
              object?: "block"
            }
          | {
              heading_2: { text: Array<RichTextItemRequest> }
              type?: "heading_2"
              object?: "block"
            }
          | {
              heading_3: { text: Array<RichTextItemRequest> }
              type?: "heading_3"
              object?: "block"
            }
          | {
              embed: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "embed"
              object?: "block"
            }
          | {
              bookmark: { url: string; caption?: Array<RichTextItemRequest> }
              type?: "bookmark"
              object?: "block"
            }
          | {
              image: mediaBlockLookup
              type?: "image"
              object?: "block"
            }
          | {
              video: mediaBlockLookup
              type?: "video"
              object?: "block"
            }
          | {
              pdf: mediaBlockLookup
              type?: "pdf"
              object?: "block"
            }
          | {
              file: mediaBlockLookup
              type?: "file"
              object?: "block"
            }
          | {
              audio: mediaBlockLookup
              type?: "audio"
              object?: "block"
            }
          | {
              code: {
                text: Array<RichTextItemRequest>
                language: languageLookup
              }
              type?: "code"
              object?: "block"
            }
          | {
              equation: { expression: string }
              type?: "equation"
              object?: "block"
            }
          | {
              divider: Record<string, never>
              type?: "divider"
              object?: "block"
            }
          | {
              breadcrumb: Record<string, never>
              type?: "breadcrumb"
              object?: "block"
            }
          | {
              table_of_contents: Record<string, never>
              type?: "table_of_contents"
              object?: "block"
            }
          | {
              paragraph: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "paragraph"
              object?: "block"
            }
          | {
              bulleted_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "bulleted_list_item"
              object?: "block"
            }
          | {
              numbered_list_item: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "numbered_list_item"
              object?: "block"
            }
          | {
              quote: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "quote"
              object?: "block"
            }
          | {
              to_do: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                checked?: boolean
              }
              type?: "to_do"
              object?: "block"
            }
          | {
              toggle: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
              }
              type?: "toggle"
              object?: "block"
            }
          | {
              callout: {
                text: Array<RichTextItemRequest>
                children?: Array<
                  | {
                      heading_1: { text: Array<RichTextItemRequest> }
                      type?: "heading_1"
                      object?: "block"
                    }
                  | {
                      heading_2: { text: Array<RichTextItemRequest> }
                      type?: "heading_2"
                      object?: "block"
                    }
                  | {
                      heading_3: { text: Array<RichTextItemRequest> }
                      type?: "heading_3"
                      object?: "block"
                    }
                  | {
                      embed: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "embed"
                      object?: "block"
                    }
                  | {
                      bookmark: {
                        url: string
                        caption?: Array<RichTextItemRequest>
                      }
                      type?: "bookmark"
                      object?: "block"
                    }
                  | {
                      image: mediaBlockLookup
                      type?: "image"
                      object?: "block"
                    }
                  | {
                      video: mediaBlockLookup
                      type?: "video"
                      object?: "block"
                    }
                  | {
                      pdf: mediaBlockLookup
                      type?: "pdf"
                      object?: "block"
                    }
                  | {
                      file: mediaBlockLookup
                      type?: "file"
                      object?: "block"
                    }
                  | {
                      audio: mediaBlockLookup
                      type?: "audio"
                      object?: "block"
                    }
                  | {
                      code: {
                        text: Array<RichTextItemRequest>
                        language: languageLookup
                      }
                      type?: "code"
                      object?: "block"
                    }
                  | {
                      equation: { expression: string }
                      type?: "equation"
                      object?: "block"
                    }
                  | {
                      divider: Record<string, never>
                      type?: "divider"
                      object?: "block"
                    }
                  | {
                      breadcrumb: Record<string, never>
                      type?: "breadcrumb"
                      object?: "block"
                    }
                  | {
                      table_of_contents: Record<string, never>
                      type?: "table_of_contents"
                      object?: "block"
                    }
                  | {
                      paragraph: { text: Array<RichTextItemRequest> }
                      type?: "paragraph"
                      object?: "block"
                    }
                  | {
                      bulleted_list_item: { text: Array<RichTextItemRequest> }
                      type?: "bulleted_list_item"
                      object?: "block"
                    }
                  | {
                      numbered_list_item: { text: Array<RichTextItemRequest> }
                      type?: "numbered_list_item"
                      object?: "block"
                    }
                  | {
                      quote: { text: Array<RichTextItemRequest> }
                      type?: "quote"
                      object?: "block"
                    }
                  | {
                      to_do: {
                        text: Array<RichTextItemRequest>
                        checked?: boolean
                      }
                      type?: "to_do"
                      object?: "block"
                    }
                  | {
                      toggle: { text: Array<RichTextItemRequest> }
                      type?: "toggle"
                      object?: "block"
                    }
                  | {
                      callout: {
                        text: Array<RichTextItemRequest>
                        icon?:
                          | {
                              emoji: emojiLookup
                              type?: "emoji"
                            }
                          | { external: { url: string }; type?: "external" }
                      }
                      type?: "callout"
                      object?: "block"
                    }
                >
                icon?:
                  | {
                      emoji: emojiLookup
                      type?: "emoji"
                    }
                  | { external: { url: string }; type?: "external" }
              }
              type?: "callout"
              object?: "block"
            }
        >
        icon?:
          | {
              emoji: emojiLookup
              type?: "emoji"
            }
          | { external: { url: string }; type?: "external" }
      }
      type?: "callout"
      object?: "block"
    }
export type GetSelfParameters = Record<string, never>

export type GetSelfResponse =
  | {
      type: "person"
      person: { email: string }
      name: string | null
      avatar_url: string | null
      id: IdRequest
      object: "user"
    }
  | {
      type: "bot"
      bot: botLookup
      name: string | null
      avatar_url: string | null
      id: IdRequest
      object: "user"
    }

export const getSelf = {
  method: "get",
  pathParams: [],
  queryParams: [],
  bodyParams: [],
  path: (): string => `users/me`,
} as const

export type GetUserPathParameters = {
  user_id: IdRequest
}

export type GetUserParameters = GetUserPathParameters

export type GetUserResponse =
  | {
      type: "person"
      person: { email: string }
      name: string | null
      avatar_url: string | null
      id: IdRequest
      object: "user"
    }
  | {
      type: "bot"
      bot: botLookup
      name: string | null
      avatar_url: string | null
      id: IdRequest
      object: "user"
    }

export const getUser = {
  method: "get",
  pathParams: ["user_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetUserPathParameters): string => `users/${p.user_id}`,
} as const

export type ListUsersQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListUsersParameters = ListUsersQueryParameters

export type ListUsersResponse =
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<
        | {
            type: "person"
            person: { email: string }
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | {
            type: "bot"
            bot: botLookup
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
      >
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<
        | {
            type: "person"
            person: { email: string }
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | {
            type: "bot"
            bot: botLookup
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
      >
      next_cursor: string | null
      has_more: boolean
    }

export const listUsers = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (): string => `users`,
} as const

export type CreatePageBodyParameters =
  | {
      parent: { database_id: IdRequest }
      properties:
        | Record<
            string,
            | { title: Array<RichTextItemRequest>; type?: "title" }
            | { rich_text: Array<RichTextItemRequest>; type?: "rich_text" }
            | { number: number | null; type?: "number" }
            | { url: TextRequest | null; type?: "url" }
            | {
                select:
                  | {
                      id: StringRequest
                      name?: StringRequest
                      color?: selectColorLookup
                    }
                  | null
                  | {
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }
                  | null
                type?: "select"
              }
            | {
                multi_select: Array<
                  | {
                      id: StringRequest
                      name?: StringRequest
                      color?: selectColorLookup
                    }
                  | {
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }
                >
                type?: "multi_select"
              }
            | {
                people: Array<
                  | { id: IdRequest }
                  | {
                      person: { email: string }
                      id: IdRequest
                      type?: "person"
                      name?: string | null
                      avatar_url?: string | null
                      object?: "user"
                    }
                  | {
                      bot: botLookup
                      id: IdRequest
                      type?: "bot"
                      name?: string | null
                      avatar_url?: string | null
                      object?: "user"
                    }
                >
                type?: "people"
              }
            | { email: StringRequest | null; type?: "email" }
            | { phone_number: StringRequest | null; type?: "phone_number" }
            | {
                date: { start: string; end?: string | null } | null
                type?: "date"
              }
            | { checkbox: boolean; type?: "checkbox" }
            | { relation: Array<{ id: IdRequest }>; type?: "relation" }
            | {
                files: Array<
                  | {
                      file: { url: string; expiry_time?: string }
                      name: string
                      type?: "file"
                    }
                  | {
                      external: { url: string }
                      name: string
                      type?: "external"
                    }
                >
                type?: "files"
              }
          >
        | Record<
            string,
            | Array<RichTextItemRequest>
            | Array<RichTextItemRequest>
            | number
            | null
            | TextRequest
            | null
            | {
                id: StringRequest
                name?: StringRequest
                color?: selectColorLookup
              }
            | null
            | {
                name: StringRequest
                id?: StringRequest
                color?: selectColorLookup
              }
            | null
            | Array<
                | {
                    id: StringRequest
                    name?: StringRequest
                    color?: selectColorLookup
                  }
                | {
                    name: StringRequest
                    id?: StringRequest
                    color?: selectColorLookup
                  }
              >
            | Array<
                | { id: IdRequest }
                | {
                    person: { email: string }
                    id: IdRequest
                    type?: "person"
                    name?: string | null
                    avatar_url?: string | null
                    object?: "user"
                  }
                | {
                    bot: botLookup
                    id: IdRequest
                    type?: "bot"
                    name?: string | null
                    avatar_url?: string | null
                    object?: "user"
                  }
              >
            | StringRequest
            | null
            | StringRequest
            | null
            | { start: string; end?: string | null }
            | null
            | boolean
            | Array<{ id: IdRequest }>
            | Array<
                | {
                    file: { url: string; expiry_time?: string }
                    name: string
                    type?: "file"
                  }
                | { external: { url: string }; name: string; type?: "external" }
              >
          >
      icon?:
        | {
            emoji: emojiLookup
            type?: "emoji"
          }
        | null
        | { external: { url: string }; type?: "external" }
        | null
      cover?: { external: { url: string }; type?: "external" } | null
      content?: Array<BlockObjectRequest>
      children?: Array<BlockObjectRequest>
    }
  | {
      parent: { page_id: IdRequest }
      properties: {
        title?:
          | { title: Array<RichTextItemRequest>; type?: "title" }
          | Array<RichTextItemRequest>
      }
      icon?:
        | {
            emoji: emojiLookup
            type?: "emoji"
          }
        | null
        | { external: { url: string }; type?: "external" }
        | null
      cover?: { external: { url: string }; type?: "external" } | null
      children?: Array<BlockObjectRequest>
    }

export type CreatePageParameters = CreatePageBodyParameters

export type CreatePageResponse = {
  parent:
    | { type: "database_id"; database_id: IdRequest }
    | { type: "page_id"; page_id: IdRequest }
    | { type: "workspace"; workspace: true }
  properties: Record<
    string,
    | {
        type: "title"
        title: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        id: string
      }
    | {
        type: "rich_text"
        rich_text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        id: string
      }
    | { type: "number"; number: number; id: string }
    | { type: "url"; url: string; id: string }
    | {
        type: "select"
        select: {
          id: StringRequest
          name: StringRequest
          color: selectColorLookup
        }
        id: string
      }
    | {
        type: "multi_select"
        multi_select: Array<{
          id: StringRequest
          name: StringRequest
          color: selectColorLookup
        }>
        id: string
      }
    | {
        type: "people"
        people: Array<
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        >
        id: string
      }
    | { type: "email"; email: string; id: string }
    | { type: "phone_number"; phone_number: string; id: string }
    | { type: "date"; date: { start: string; end: string | null }; id: string }
    | {
        type: "files"
        files: Array<
          | {
              file: { url: string; expiry_time: string }
              name: string
              type?: "file"
            }
          | { external: { url: string }; name: string; type?: "external" }
        >
        id: string
      }
    | { type: "checkbox"; checkbox: boolean; id: string }
    | {
        type: "formula"
        formula:
          | { type: "string"; string: string | null }
          | { type: "date"; date: { start: string; end: string | null } | null }
          | { type: "number"; number: number | null }
          | { type: "boolean"; boolean: boolean | null }
        id: string
      }
    | { type: "relation"; relation: Array<{ id: string }>; id: string }
    | {
        type: "rollup"
        rollup:
          | {
              type: "number"
              number: number | null
              function: functionLookup
            }
          | {
              type: "date"
              date: { start: string; end: string | null } | null
              function: functionLookup
            }
          | {
              type: "array"
              array: Array<
                | {
                    type: "number"
                    number: {
                      format: formatLookup
                    }
                  }
                | { type: "formula"; formula: { expression: string } }
                | {
                    type: "select"
                    select: {
                      options: Array<{
                        name: StringRequest
                        id?: StringRequest
                        color?: selectColorLookup
                      }>
                    }
                  }
                | {
                    type: "multi_select"
                    multi_select: {
                      options: Array<{
                        name: StringRequest
                        id?: StringRequest
                        color?: selectColorLookup
                      }>
                    }
                  }
                | {
                    type: "relation"
                    relation: {
                      database_id: IdRequest
                      synced_property_id: string
                      synced_property_name: string
                    }
                  }
                | {
                    type: "rollup"
                    rollup: {
                      rollup_property_name: string
                      relation_property_name: string
                      rollup_property_id: string
                      relation_property_id: string
                      function: functionLookup
                    }
                  }
                | { type: "title"; title: Record<string, never> }
                | { type: "rich_text"; rich_text: Record<string, never> }
                | { type: "url"; url: Record<string, never> }
                | { type: "people"; people: Record<string, never> }
                | { type: "files"; files: Record<string, never> }
                | { type: "email"; email: Record<string, never> }
                | { type: "phone_number"; phone_number: Record<string, never> }
                | { type: "date"; date: Record<string, never> }
                | { type: "checkbox"; checkbox: Record<string, never> }
                | { type: "created_by"; created_by: Record<string, never> }
                | { type: "created_time"; created_time: Record<string, never> }
                | {
                    type: "last_edited_by"
                    last_edited_by: Record<string, never>
                  }
                | {
                    type: "last_edited_time"
                    last_edited_time: Record<string, never>
                  }
              >
              function: functionLookup
            }
          | {
              type: "unsupported"
              unsupported: Record<string, never>
              function: functionLookup
            }
        id: string
      }
    | { type: "created_time"; created_time: string; id: string }
    | {
        type: "created_by"
        created_by:
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        id: string
      }
    | { type: "last_edited_time"; last_edited_time: string; id: string }
    | {
        type: "last_edited_by"
        last_edited_by:
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        id: string
      }
  >
  icon:
    | {
        type: "emoji"
        emoji: emojiLookup
      }
    | null
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
}

export const createPage = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "icon", "cover", "content", "children"],
  path: (): string => `pages`,
} as const

export type GetPagePathParameters = {
  page_id: IdRequest
}

export type GetPageParameters = GetPagePathParameters

export type GetPageResponse = {
  parent:
    | { type: "database_id"; database_id: IdRequest }
    | { type: "page_id"; page_id: IdRequest }
    | { type: "workspace"; workspace: true }
  properties: Record<
    string,
    | {
        type: "title"
        title: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        id: string
      }
    | {
        type: "rich_text"
        rich_text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        id: string
      }
    | { type: "number"; number: number; id: string }
    | { type: "url"; url: string; id: string }
    | {
        type: "select"
        select: {
          id: StringRequest
          name: StringRequest
          color: selectColorLookup
        }
        id: string
      }
    | {
        type: "multi_select"
        multi_select: Array<{
          id: StringRequest
          name: StringRequest
          color: selectColorLookup
        }>
        id: string
      }
    | {
        type: "people"
        people: Array<
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        >
        id: string
      }
    | { type: "email"; email: string; id: string }
    | { type: "phone_number"; phone_number: string; id: string }
    | { type: "date"; date: { start: string; end: string | null }; id: string }
    | {
        type: "files"
        files: Array<
          | {
              file: { url: string; expiry_time: string }
              name: string
              type?: "file"
            }
          | { external: { url: string }; name: string; type?: "external" }
        >
        id: string
      }
    | { type: "checkbox"; checkbox: boolean; id: string }
    | {
        type: "formula"
        formula:
          | { type: "string"; string: string | null }
          | { type: "date"; date: { start: string; end: string | null } | null }
          | { type: "number"; number: number | null }
          | { type: "boolean"; boolean: boolean | null }
        id: string
      }
    | { type: "relation"; relation: Array<{ id: string }>; id: string }
    | {
        type: "rollup"
        rollup:
          | {
              type: "number"
              number: number | null
              function: functionLookup
            }
          | {
              type: "date"
              date: { start: string; end: string | null } | null
              function: functionLookup
            }
          | {
              type: "array"
              array: Array<
                | {
                    type: "number"
                    number: {
                      format: formatLookup
                    }
                  }
                | { type: "formula"; formula: { expression: string } }
                | {
                    type: "select"
                    select: {
                      options: Array<{
                        name: StringRequest
                        id?: StringRequest
                        color?: selectColorLookup
                      }>
                    }
                  }
                | {
                    type: "multi_select"
                    multi_select: {
                      options: Array<{
                        name: StringRequest
                        id?: StringRequest
                        color?: selectColorLookup
                      }>
                    }
                  }
                | {
                    type: "relation"
                    relation: {
                      database_id: IdRequest
                      synced_property_id: string
                      synced_property_name: string
                    }
                  }
                | {
                    type: "rollup"
                    rollup: {
                      rollup_property_name: string
                      relation_property_name: string
                      rollup_property_id: string
                      relation_property_id: string
                      function: functionLookup
                    }
                  }
                | { type: "title"; title: Record<string, never> }
                | { type: "rich_text"; rich_text: Record<string, never> }
                | { type: "url"; url: Record<string, never> }
                | { type: "people"; people: Record<string, never> }
                | { type: "files"; files: Record<string, never> }
                | { type: "email"; email: Record<string, never> }
                | { type: "phone_number"; phone_number: Record<string, never> }
                | { type: "date"; date: Record<string, never> }
                | { type: "checkbox"; checkbox: Record<string, never> }
                | { type: "created_by"; created_by: Record<string, never> }
                | { type: "created_time"; created_time: Record<string, never> }
                | {
                    type: "last_edited_by"
                    last_edited_by: Record<string, never>
                  }
                | {
                    type: "last_edited_time"
                    last_edited_time: Record<string, never>
                  }
              >
              function: functionLookup
            }
          | {
              type: "unsupported"
              unsupported: Record<string, never>
              function: functionLookup
            }
        id: string
      }
    | { type: "created_time"; created_time: string; id: string }
    | {
        type: "created_by"
        created_by:
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        id: string
      }
    | { type: "last_edited_time"; last_edited_time: string; id: string }
    | {
        type: "last_edited_by"
        last_edited_by:
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        id: string
      }
  >
  icon:
    | {
        type: "emoji"
        emoji: emojiLookup
      }
    | null
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
}

export const getPage = {
  method: "get",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetPagePathParameters): string => `pages/${p.page_id}`,
} as const

export type UpdatePagePathParameters = {
  page_id: IdRequest
}

export type UpdatePageBodyParameters = {
  properties?:
    | Record<
        string,
        | { title: Array<RichTextItemRequest>; type?: "title" }
        | { rich_text: Array<RichTextItemRequest>; type?: "rich_text" }
        | { number: number | null; type?: "number" }
        | { url: TextRequest | null; type?: "url" }
        | {
            select:
              | {
                  id: StringRequest
                  name?: StringRequest
                  color?: selectColorLookup
                }
              | null
              | {
                  name: StringRequest
                  id?: StringRequest
                  color?: selectColorLookup
                }
              | null
            type?: "select"
          }
        | {
            multi_select: Array<
              | {
                  id: StringRequest
                  name?: StringRequest
                  color?: selectColorLookup
                }
              | {
                  name: StringRequest
                  id?: StringRequest
                  color?: selectColorLookup
                }
            >
            type?: "multi_select"
          }
        | {
            people: Array<
              | { id: IdRequest }
              | {
                  person: { email: string }
                  id: IdRequest
                  type?: "person"
                  name?: string | null
                  avatar_url?: string | null
                  object?: "user"
                }
              | {
                  bot: botLookup
                  id: IdRequest
                  type?: "bot"
                  name?: string | null
                  avatar_url?: string | null
                  object?: "user"
                }
            >
            type?: "people"
          }
        | { email: StringRequest | null; type?: "email" }
        | { phone_number: StringRequest | null; type?: "phone_number" }
        | { date: { start: string; end?: string | null } | null; type?: "date" }
        | { checkbox: boolean; type?: "checkbox" }
        | { relation: Array<{ id: IdRequest }>; type?: "relation" }
        | {
            files: Array<
              | {
                  file: { url: string; expiry_time?: string }
                  name: string
                  type?: "file"
                }
              | { external: { url: string }; name: string; type?: "external" }
            >
            type?: "files"
          }
      >
    | Record<
        string,
        | Array<RichTextItemRequest>
        | Array<RichTextItemRequest>
        | number
        | null
        | TextRequest
        | null
        | {
            id: StringRequest
            name?: StringRequest
            color?: selectColorLookup
          }
        | null
        | {
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }
        | null
        | Array<
            | {
                id: StringRequest
                name?: StringRequest
                color?: selectColorLookup
              }
            | {
                name: StringRequest
                id?: StringRequest
                color?: selectColorLookup
              }
          >
        | Array<
            | { id: IdRequest }
            | {
                person: { email: string }
                id: IdRequest
                type?: "person"
                name?: string | null
                avatar_url?: string | null
                object?: "user"
              }
            | {
                bot: botLookup
                id: IdRequest
                type?: "bot"
                name?: string | null
                avatar_url?: string | null
                object?: "user"
              }
          >
        | StringRequest
        | null
        | StringRequest
        | null
        | { start: string; end?: string | null }
        | null
        | boolean
        | Array<{ id: IdRequest }>
        | Array<
            | {
                file: { url: string; expiry_time?: string }
                name: string
                type?: "file"
              }
            | { external: { url: string }; name: string; type?: "external" }
          >
      >
  icon?:
    | {
        emoji: emojiLookup
        type?: "emoji"
      }
    | null
    | { external: { url: string }; type?: "external" }
    | null
  cover?: { external: { url: string }; type?: "external" } | null
  archived?: boolean
}

export type UpdatePageParameters = UpdatePagePathParameters &
  UpdatePageBodyParameters

export type UpdatePageResponse = {
  parent:
    | { type: "database_id"; database_id: IdRequest }
    | { type: "page_id"; page_id: IdRequest }
    | { type: "workspace"; workspace: true }
  properties: Record<
    string,
    | {
        type: "title"
        title: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        id: string
      }
    | {
        type: "rich_text"
        rich_text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        id: string
      }
    | { type: "number"; number: number; id: string }
    | { type: "url"; url: string; id: string }
    | {
        type: "select"
        select: {
          id: StringRequest
          name: StringRequest
          color: selectColorLookup
        }
        id: string
      }
    | {
        type: "multi_select"
        multi_select: Array<{
          id: StringRequest
          name: StringRequest
          color: selectColorLookup
        }>
        id: string
      }
    | {
        type: "people"
        people: Array<
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        >
        id: string
      }
    | { type: "email"; email: string; id: string }
    | { type: "phone_number"; phone_number: string; id: string }
    | { type: "date"; date: { start: string; end: string | null }; id: string }
    | {
        type: "files"
        files: Array<
          | {
              file: { url: string; expiry_time: string }
              name: string
              type?: "file"
            }
          | { external: { url: string }; name: string; type?: "external" }
        >
        id: string
      }
    | { type: "checkbox"; checkbox: boolean; id: string }
    | {
        type: "formula"
        formula:
          | { type: "string"; string: string | null }
          | { type: "date"; date: { start: string; end: string | null } | null }
          | { type: "number"; number: number | null }
          | { type: "boolean"; boolean: boolean | null }
        id: string
      }
    | { type: "relation"; relation: Array<{ id: string }>; id: string }
    | {
        type: "rollup"
        rollup:
          | {
              type: "number"
              number: number | null
              function: functionLookup
            }
          | {
              type: "date"
              date: { start: string; end: string | null } | null
              function: functionLookup
            }
          | {
              type: "array"
              array: Array<
                | {
                    type: "number"
                    number: {
                      format: formatLookup
                    }
                  }
                | { type: "formula"; formula: { expression: string } }
                | {
                    type: "select"
                    select: {
                      options: Array<{
                        name: StringRequest
                        id?: StringRequest
                        color?: selectColorLookup
                      }>
                    }
                  }
                | {
                    type: "multi_select"
                    multi_select: {
                      options: Array<{
                        name: StringRequest
                        id?: StringRequest
                        color?: selectColorLookup
                      }>
                    }
                  }
                | {
                    type: "relation"
                    relation: {
                      database_id: IdRequest
                      synced_property_id: string
                      synced_property_name: string
                    }
                  }
                | {
                    type: "rollup"
                    rollup: {
                      rollup_property_name: string
                      relation_property_name: string
                      rollup_property_id: string
                      relation_property_id: string
                      function: functionLookup
                    }
                  }
                | { type: "title"; title: Record<string, never> }
                | { type: "rich_text"; rich_text: Record<string, never> }
                | { type: "url"; url: Record<string, never> }
                | { type: "people"; people: Record<string, never> }
                | { type: "files"; files: Record<string, never> }
                | { type: "email"; email: Record<string, never> }
                | { type: "phone_number"; phone_number: Record<string, never> }
                | { type: "date"; date: Record<string, never> }
                | { type: "checkbox"; checkbox: Record<string, never> }
                | { type: "created_by"; created_by: Record<string, never> }
                | { type: "created_time"; created_time: Record<string, never> }
                | {
                    type: "last_edited_by"
                    last_edited_by: Record<string, never>
                  }
                | {
                    type: "last_edited_time"
                    last_edited_time: Record<string, never>
                  }
              >
              function: functionLookup
            }
          | {
              type: "unsupported"
              unsupported: Record<string, never>
              function: functionLookup
            }
        id: string
      }
    | { type: "created_time"; created_time: string; id: string }
    | {
        type: "created_by"
        created_by:
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        id: string
      }
    | { type: "last_edited_time"; last_edited_time: string; id: string }
    | {
        type: "last_edited_by"
        last_edited_by:
          | { id: IdRequest; object: "user" }
          | {
              type: "person"
              person: { email: string }
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
          | {
              type: "bot"
              bot: botLookup
              name: string | null
              avatar_url: string | null
              id: IdRequest
              object: "user"
            }
        id: string
      }
  >
  icon:
    | {
        type: "emoji"
        emoji: emojiLookup
      }
    | null
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  archived: boolean
  url: string
}

export const updatePage = {
  method: "patch",
  pathParams: ["page_id"],
  queryParams: [],
  bodyParams: ["properties", "icon", "cover", "archived"],
  path: (p: UpdatePagePathParameters): string => `pages/${p.page_id}`,
} as const

export type GetPagePropertyPathParameters = {
  page_id: IdRequest
  property_id: string
}

export type GetPagePropertyQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type GetPagePropertyParameters = GetPagePropertyPathParameters &
  GetPagePropertyQueryParameters

export type GetPagePropertyResponse =
  | { type: "number"; number: number | null; object: "property_item" }
  | { type: "url"; url: string | null; object: "property_item" }
  | {
      type: "select"
      select: {
        id: StringRequest
        name: StringRequest
        color: selectColorLookup
      } | null
      object: "property_item"
    }
  | {
      type: "multi_select"
      multi_select: Array<{
        id: StringRequest
        name: StringRequest
        color: selectColorLookup
      }> | null
      object: "property_item"
    }
  | {
      type: "date"
      date: { start: string; end: string | null } | null
      object: "property_item"
    }
  | { type: "email"; email: string | null; object: "property_item" }
  | {
      type: "phone_number"
      phone_number: string | null
      object: "property_item"
    }
  | { type: "checkbox"; checkbox: boolean | null; object: "property_item" }
  | {
      type: "files"
      files: Array<
        | {
            file: { url: string; expiry_time: string }
            name: string
            type?: "file"
          }
        | { external: { url: string }; name: string; type?: "external" }
      > | null
      object: "property_item"
    }
  | {
      type: "created_by"
      created_by:
        | { id: IdRequest; object: "user" }
        | null
        | {
            type: "person"
            person: { email: string }
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | null
        | {
            type: "bot"
            bot: botLookup
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | null
      object: "property_item"
    }
  | {
      type: "created_time"
      created_time: string | null
      object: "property_item"
    }
  | {
      type: "last_edited_by"
      last_edited_by:
        | { id: IdRequest; object: "user" }
        | null
        | {
            type: "person"
            person: { email: string }
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | null
        | {
            type: "bot"
            bot: botLookup
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | null
      object: "property_item"
    }
  | {
      type: "last_edited_time"
      last_edited_time: string | null
      object: "property_item"
    }
  | {
      type: "formula"
      formula:
        | { type: "string"; string: string | null }
        | null
        | { type: "date"; date: { start: string; end: string | null } | null }
        | null
        | { type: "number"; number: number | null }
        | null
        | { type: "boolean"; boolean: boolean | null }
        | null
      object: "property_item"
    }
  | {
      type: "title"
      title:
        | {
            type: "text"
            text: { content: string; link: { url: TextRequest } | null }
            annotations: annotationsLookup
            plain_text: string
            href: string | null
          }
        | {
            type: "mention"
            mention: mentionLookup
            annotations: annotationsLookup
            plain_text: string
            href: string | null
          }
        | {
            type: "equation"
            equation: { expression: TextRequest }
            annotations: annotationsLookup
            plain_text: string
            href: string | null
          }
      object: "property_item"
    }
  | {
      type: "rich_text"
      rich_text:
        | {
            type: "text"
            text: { content: string; link: { url: TextRequest } | null }
            annotations: annotationsLookup
            plain_text: string
            href: string | null
          }
        | {
            type: "mention"
            mention: mentionLookup
            annotations: annotationsLookup
            plain_text: string
            href: string | null
          }
        | {
            type: "equation"
            equation: { expression: TextRequest }
            annotations: annotationsLookup
            plain_text: string
            href: string | null
          }
      object: "property_item"
    }
  | {
      type: "people"
      people:
        | { id: IdRequest; object: "user" }
        | {
            type: "person"
            person: { email: string }
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
        | {
            type: "bot"
            bot: botLookup
            name: string | null
            avatar_url: string | null
            id: IdRequest
            object: "user"
          }
      object: "property_item"
    }
  | { type: "relation"; relation: { id: string }; object: "property_item" }
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<
        | { type: "number"; number: number | null; object: "property_item" }
        | { type: "url"; url: string | null; object: "property_item" }
        | {
            type: "select"
            select: {
              id: StringRequest
              name: StringRequest
              color: selectColorLookup
            } | null
            object: "property_item"
          }
        | {
            type: "multi_select"
            multi_select: Array<{
              id: StringRequest
              name: StringRequest
              color: selectColorLookup
            }> | null
            object: "property_item"
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            object: "property_item"
          }
        | { type: "email"; email: string | null; object: "property_item" }
        | {
            type: "phone_number"
            phone_number: string | null
            object: "property_item"
          }
        | {
            type: "checkbox"
            checkbox: boolean | null
            object: "property_item"
          }
        | {
            type: "files"
            files: Array<
              | {
                  file: { url: string; expiry_time: string }
                  name: string
                  type?: "file"
                }
              | { external: { url: string }; name: string; type?: "external" }
            > | null
            object: "property_item"
          }
        | {
            type: "created_by"
            created_by:
              | { id: IdRequest; object: "user" }
              | null
              | {
                  type: "person"
                  person: { email: string }
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
              | {
                  type: "bot"
                  bot: botLookup
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
            object: "property_item"
          }
        | {
            type: "created_time"
            created_time: string | null
            object: "property_item"
          }
        | {
            type: "last_edited_by"
            last_edited_by:
              | { id: IdRequest; object: "user" }
              | null
              | {
                  type: "person"
                  person: { email: string }
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
              | {
                  type: "bot"
                  bot: botLookup
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
            object: "property_item"
          }
        | {
            type: "last_edited_time"
            last_edited_time: string | null
            object: "property_item"
          }
        | {
            type: "formula"
            formula:
              | { type: "string"; string: string | null }
              | null
              | {
                  type: "date"
                  date: { start: string; end: string | null } | null
                }
              | null
              | { type: "number"; number: number | null }
              | null
              | { type: "boolean"; boolean: boolean | null }
              | null
            object: "property_item"
          }
        | {
            type: "title"
            title:
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            object: "property_item"
          }
        | {
            type: "rich_text"
            rich_text:
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            object: "property_item"
          }
        | {
            type: "people"
            people:
              | { id: IdRequest; object: "user" }
              | {
                  type: "person"
                  person: { email: string }
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | {
                  type: "bot"
                  bot: botLookup
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
            object: "property_item"
          }
        | {
            type: "relation"
            relation: { id: string }
            object: "property_item"
          }
      >
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<
        | { type: "number"; number: number | null; object: "property_item" }
        | { type: "url"; url: string | null; object: "property_item" }
        | {
            type: "select"
            select: {
              id: StringRequest
              name: StringRequest
              color: selectColorLookup
            } | null
            object: "property_item"
          }
        | {
            type: "multi_select"
            multi_select: Array<{
              id: StringRequest
              name: StringRequest
              color: selectColorLookup
            }> | null
            object: "property_item"
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            object: "property_item"
          }
        | { type: "email"; email: string | null; object: "property_item" }
        | {
            type: "phone_number"
            phone_number: string | null
            object: "property_item"
          }
        | {
            type: "checkbox"
            checkbox: boolean | null
            object: "property_item"
          }
        | {
            type: "files"
            files: Array<
              | {
                  file: { url: string; expiry_time: string }
                  name: string
                  type?: "file"
                }
              | { external: { url: string }; name: string; type?: "external" }
            > | null
            object: "property_item"
          }
        | {
            type: "created_by"
            created_by:
              | { id: IdRequest; object: "user" }
              | null
              | {
                  type: "person"
                  person: { email: string }
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
              | {
                  type: "bot"
                  bot: botLookup
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
            object: "property_item"
          }
        | {
            type: "created_time"
            created_time: string | null
            object: "property_item"
          }
        | {
            type: "last_edited_by"
            last_edited_by:
              | { id: IdRequest; object: "user" }
              | null
              | {
                  type: "person"
                  person: { email: string }
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
              | {
                  type: "bot"
                  bot: botLookup
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | null
            object: "property_item"
          }
        | {
            type: "last_edited_time"
            last_edited_time: string | null
            object: "property_item"
          }
        | {
            type: "formula"
            formula:
              | { type: "string"; string: string | null }
              | null
              | {
                  type: "date"
                  date: { start: string; end: string | null } | null
                }
              | null
              | { type: "number"; number: number | null }
              | null
              | { type: "boolean"; boolean: boolean | null }
              | null
            object: "property_item"
          }
        | {
            type: "title"
            title:
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            object: "property_item"
          }
        | {
            type: "rich_text"
            rich_text:
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            object: "property_item"
          }
        | {
            type: "people"
            people:
              | { id: IdRequest; object: "user" }
              | {
                  type: "person"
                  person: { email: string }
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
              | {
                  type: "bot"
                  bot: botLookup
                  name: string | null
                  avatar_url: string | null
                  id: IdRequest
                  object: "user"
                }
            object: "property_item"
          }
        | {
            type: "relation"
            relation: { id: string }
            object: "property_item"
          }
      >
      next_cursor: string | null
      has_more: boolean
    }

export const getPageProperty = {
  method: "get",
  pathParams: ["page_id", "property_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (p: GetPagePropertyPathParameters): string =>
    `pages/${p.page_id}/properties/${p.property_id}`,
} as const

export type GetBlockPathParameters = {
  block_id: IdRequest
}

export type GetBlockParameters = GetBlockPathParameters

export type GetBlockResponse =
  | {
      type: "paragraph"
      paragraph: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_1"
      heading_1: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_2"
      heading_2: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_3"
      heading_3: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "bulleted_list_item"
      bulleted_list_item: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "numbered_list_item"
      numbered_list_item: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "quote"
      quote: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "to_do"
      to_do: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        checked: boolean
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "toggle"
      toggle: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "child_page"
      child_page: { title: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "child_database"
      child_database: { title: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "equation"
      equation: { expression: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "code"
      code: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        language: languageLookup
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "callout"
      callout: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "divider"
      divider: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "breadcrumb"
      breadcrumb: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "table_of_contents"
      table_of_contents: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "embed"
      embed: {
        url: string
        caption: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "bookmark"
      bookmark: {
        url: string
        caption: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "image"
      image:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "video"
      video:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "pdf"
      pdf:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "file"
      file:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "audio"
      audio:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "unsupported"
      unsupported: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }

export const getBlock = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

export type UpdateBlockPathParameters = {
  block_id: IdRequest
}

export type UpdateBlockBodyParameters =
  | {
      heading_1: { text: Array<RichTextItemRequest> }
      type?: "heading_1"
      archived?: boolean
    }
  | {
      heading_2: { text: Array<RichTextItemRequest> }
      type?: "heading_2"
      archived?: boolean
    }
  | {
      heading_3: { text: Array<RichTextItemRequest> }
      type?: "heading_3"
      archived?: boolean
    }
  | {
      embed: { url?: string; caption?: Array<RichTextItemRequest> }
      type?: "embed"
      archived?: boolean
    }
  | {
      bookmark: { url?: string; caption?: Array<RichTextItemRequest> }
      type?: "bookmark"
      archived?: boolean
    }
  | {
      image: {
        caption?: Array<RichTextItemRequest>
        external?: { url: string }
      }
      type?: "image"
      archived?: boolean
    }
  | {
      video: {
        caption?: Array<RichTextItemRequest>
        external?: { url: string }
      }
      type?: "video"
      archived?: boolean
    }
  | {
      pdf: { caption?: Array<RichTextItemRequest>; external?: { url: string } }
      type?: "pdf"
      archived?: boolean
    }
  | {
      file: { caption?: Array<RichTextItemRequest>; external?: { url: string } }
      type?: "file"
      archived?: boolean
    }
  | {
      audio: {
        caption?: Array<RichTextItemRequest>
        external?: { url: string }
      }
      type?: "audio"
      archived?: boolean
    }
  | {
      code: {
        text: Array<RichTextItemRequest>
        language: languageLookup
      }
      type?: "code"
      archived?: boolean
    }
  | { equation: { expression: string }; type?: "equation"; archived?: boolean }
  | { divider: Record<string, never>; type?: "divider"; archived?: boolean }
  | {
      breadcrumb: Record<string, never>
      type?: "breadcrumb"
      archived?: boolean
    }
  | {
      table_of_contents: Record<string, never>
      type?: "table_of_contents"
      archived?: boolean
    }
  | {
      paragraph: { text: Array<RichTextItemRequest> }
      type?: "paragraph"
      archived?: boolean
    }
  | {
      bulleted_list_item: { text: Array<RichTextItemRequest> }
      type?: "bulleted_list_item"
      archived?: boolean
    }
  | {
      numbered_list_item: { text: Array<RichTextItemRequest> }
      type?: "numbered_list_item"
      archived?: boolean
    }
  | {
      quote: { text: Array<RichTextItemRequest> }
      type?: "quote"
      archived?: boolean
    }
  | {
      to_do: { text?: Array<RichTextItemRequest>; checked?: boolean }
      type?: "to_do"
      archived?: boolean
    }
  | {
      toggle: { text: Array<RichTextItemRequest> }
      type?: "toggle"
      archived?: boolean
    }
  | {
      callout: {
        text?: Array<RichTextItemRequest>
        icon?:
          | {
              emoji: emojiLookup
              type?: "emoji"
            }
          | { external: { url: string }; type?: "external" }
      }
      type?: "callout"
      archived?: boolean
    }
  | { archived?: boolean }

export type UpdateBlockParameters = UpdateBlockPathParameters &
  UpdateBlockBodyParameters

export type UpdateBlockResponse =
  | {
      type: "paragraph"
      paragraph: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_1"
      heading_1: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_2"
      heading_2: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_3"
      heading_3: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "bulleted_list_item"
      bulleted_list_item: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "numbered_list_item"
      numbered_list_item: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "quote"
      quote: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "to_do"
      to_do: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        checked: boolean
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "toggle"
      toggle: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "child_page"
      child_page: { title: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "child_database"
      child_database: { title: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "equation"
      equation: { expression: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "code"
      code: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        language: languageLookup
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "callout"
      callout: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "divider"
      divider: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "breadcrumb"
      breadcrumb: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "table_of_contents"
      table_of_contents: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "embed"
      embed: {
        url: string
        caption: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "bookmark"
      bookmark: {
        url: string
        caption: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "image"
      image:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "video"
      video:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "pdf"
      pdf:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "file"
      file:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "audio"
      audio:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "unsupported"
      unsupported: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }

export const updateBlock = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [
    "heading_1",
    "type",
    "archived",
    "heading_2",
    "heading_3",
    "embed",
    "bookmark",
    "image",
    "video",
    "pdf",
    "file",
    "audio",
    "code",
    "equation",
    "divider",
    "breadcrumb",
    "table_of_contents",
    "paragraph",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "to_do",
    "toggle",
    "callout",
  ],
  path: (p: UpdateBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

export type DeleteBlockPathParameters = {
  block_id: IdRequest
}

export type DeleteBlockParameters = DeleteBlockPathParameters

export type DeleteBlockResponse =
  | {
      type: "paragraph"
      paragraph: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_1"
      heading_1: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_2"
      heading_2: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "heading_3"
      heading_3: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "bulleted_list_item"
      bulleted_list_item: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "numbered_list_item"
      numbered_list_item: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "quote"
      quote: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "to_do"
      to_do: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        checked: boolean
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "toggle"
      toggle: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "child_page"
      child_page: { title: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "child_database"
      child_database: { title: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "equation"
      equation: { expression: string }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "code"
      code: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        language: languageLookup
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "callout"
      callout: {
        text: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "divider"
      divider: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "breadcrumb"
      breadcrumb: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "table_of_contents"
      table_of_contents: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "embed"
      embed: {
        url: string
        caption: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "bookmark"
      bookmark: {
        url: string
        caption: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
      }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "image"
      image:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "video"
      video:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "pdf"
      pdf:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "file"
      file:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "audio"
      audio:
        | {
            type: "external"
            external: { url: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
        | {
            type: "file"
            file: { url: string; expiry_time: string }
            caption: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
          }
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }
  | {
      type: "unsupported"
      unsupported: Record<string, never>
      object: "block"
      id: string
      created_time: string
      last_edited_time: string
      has_children: boolean
      archived: boolean
    }

export const deleteBlock = {
  method: "delete",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: DeleteBlockPathParameters): string => `blocks/${p.block_id}`,
} as const

export type ListBlockChildrenPathParameters = {
  block_id: IdRequest
}

export type ListBlockChildrenQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListBlockChildrenParameters = ListBlockChildrenPathParameters &
  ListBlockChildrenQueryParameters

export type ListBlockChildrenResponse =
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<
        | {
            type: "paragraph"
            paragraph: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_1"
            heading_1: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_2"
            heading_2: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_3"
            heading_3: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bulleted_list_item"
            bulleted_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "numbered_list_item"
            numbered_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "quote"
            quote: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "to_do"
            to_do: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              checked: boolean
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "toggle"
            toggle: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_page"
            child_page: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_database"
            child_database: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "equation"
            equation: { expression: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "code"
            code: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              language: languageLookup
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "callout"
            callout: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              icon:
                | {
                    type: "emoji"
                    emoji: emojiLookup
                  }
                | null
                | { type: "external"; external: { url: string } }
                | null
                | { type: "file"; file: { url: string; expiry_time: string } }
                | null
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "divider"
            divider: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "breadcrumb"
            breadcrumb: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "table_of_contents"
            table_of_contents: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "embed"
            embed: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bookmark"
            bookmark: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "image"
            image:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "video"
            video:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "pdf"
            pdf:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "file"
            file:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "audio"
            audio:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
      >
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<
        | {
            type: "paragraph"
            paragraph: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_1"
            heading_1: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_2"
            heading_2: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_3"
            heading_3: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bulleted_list_item"
            bulleted_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "numbered_list_item"
            numbered_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "quote"
            quote: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "to_do"
            to_do: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              checked: boolean
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "toggle"
            toggle: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_page"
            child_page: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_database"
            child_database: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "equation"
            equation: { expression: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "code"
            code: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              language: languageLookup
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "callout"
            callout: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              icon:
                | {
                    type: "emoji"
                    emoji: emojiLookup
                  }
                | null
                | { type: "external"; external: { url: string } }
                | null
                | { type: "file"; file: { url: string; expiry_time: string } }
                | null
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "divider"
            divider: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "breadcrumb"
            breadcrumb: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "table_of_contents"
            table_of_contents: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "embed"
            embed: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bookmark"
            bookmark: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "image"
            image:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "video"
            video:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "pdf"
            pdf:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "file"
            file:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "audio"
            audio:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
      >
      next_cursor: string | null
      has_more: boolean
    }

export const listBlockChildren = {
  method: "get",
  pathParams: ["block_id"],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (p: ListBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const

export type AppendBlockChildrenPathParameters = {
  block_id: IdRequest
}

export type AppendBlockChildrenBodyParameters = { children: Array<BlockObjectRequest> }

export type AppendBlockChildrenParameters = AppendBlockChildrenPathParameters &
  AppendBlockChildrenBodyParameters

export type AppendBlockChildrenResponse =
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<
        | {
            type: "paragraph"
            paragraph: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_1"
            heading_1: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_2"
            heading_2: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_3"
            heading_3: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bulleted_list_item"
            bulleted_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "numbered_list_item"
            numbered_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "quote"
            quote: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "to_do"
            to_do: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              checked: boolean
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "toggle"
            toggle: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_page"
            child_page: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_database"
            child_database: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "equation"
            equation: { expression: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "code"
            code: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              language: languageLookup
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "callout"
            callout: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              icon:
                | {
                    type: "emoji"
                    emoji: emojiLookup
                  }
                | null
                | { type: "external"; external: { url: string } }
                | null
                | { type: "file"; file: { url: string; expiry_time: string } }
                | null
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "divider"
            divider: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "breadcrumb"
            breadcrumb: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "table_of_contents"
            table_of_contents: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "embed"
            embed: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bookmark"
            bookmark: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "image"
            image:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "video"
            video:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "pdf"
            pdf:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "file"
            file:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "audio"
            audio:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
      >
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<
        | {
            type: "paragraph"
            paragraph: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_1"
            heading_1: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_2"
            heading_2: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "heading_3"
            heading_3: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bulleted_list_item"
            bulleted_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "numbered_list_item"
            numbered_list_item: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "quote"
            quote: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "to_do"
            to_do: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              checked: boolean
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "toggle"
            toggle: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_page"
            child_page: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "child_database"
            child_database: { title: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "equation"
            equation: { expression: string }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "code"
            code: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              language: languageLookup
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "callout"
            callout: {
              text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              icon:
                | {
                    type: "emoji"
                    emoji: emojiLookup
                  }
                | null
                | { type: "external"; external: { url: string } }
                | null
                | { type: "file"; file: { url: string; expiry_time: string } }
                | null
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "divider"
            divider: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "breadcrumb"
            breadcrumb: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "table_of_contents"
            table_of_contents: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "embed"
            embed: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "bookmark"
            bookmark: {
              url: string
              caption: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
            }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "image"
            image:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "video"
            video:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "pdf"
            pdf:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "file"
            file:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "audio"
            audio:
              | {
                  type: "external"
                  external: { url: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
              | {
                  type: "file"
                  file: { url: string; expiry_time: string }
                  caption: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                }
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            object: "block"
            id: string
            created_time: string
            last_edited_time: string
            has_children: boolean
            archived: boolean
          }
      >
      next_cursor: string | null
      has_more: boolean
    }

export const appendBlockChildren = {
  method: "patch",
  pathParams: ["block_id"],
  queryParams: [],
  bodyParams: ["children"],
  path: (p: AppendBlockChildrenPathParameters): string =>
    `blocks/${p.block_id}/children`,
} as const

export type GetDatabasePathParameters = {
  database_id: IdRequest
}

export type GetDatabaseParameters = GetDatabasePathParameters

export type GetDatabaseResponse = {
  title: Array<
    | {
        type: "text"
        text: { content: string; link: { url: TextRequest } | null }
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
    | {
        type: "mention"
        mention: mentionLookup
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
    | {
        type: "equation"
        equation: { expression: TextRequest }
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
  >
  icon:
    | {
        type: "emoji"
        emoji: emojiLookup
      }
    | null
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  properties: Record<
    string,
    | {
        type: "number"
        number: {
          format: formatLookup
        }
        id: string
        name: string
      }
    | {
        type: "formula"
        formula: { expression: string }
        id: string
        name: string
      }
    | {
        type: "select"
        select: {
          options: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        id: string
        name: string
      }
    | {
        type: "multi_select"
        multi_select: {
          options: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        id: string
        name: string
      }
    | {
        type: "relation"
        relation: {
          database_id: IdRequest
          synced_property_id: string
          synced_property_name: string
        }
        id: string
        name: string
      }
    | {
        type: "rollup"
        rollup: {
          rollup_property_name: string
          relation_property_name: string
          rollup_property_id: string
          relation_property_id: string
          function: functionLookup
        }
        id: string
        name: string
      }
    | { type: "title"; title: Record<string, never>; id: string; name: string }
    | {
        type: "rich_text"
        rich_text: Record<string, never>
        id: string
        name: string
      }
    | { type: "url"; url: Record<string, never>; id: string; name: string }
    | {
        type: "people"
        people: Record<string, never>
        id: string
        name: string
      }
    | { type: "files"; files: Record<string, never>; id: string; name: string }
    | { type: "email"; email: Record<string, never>; id: string; name: string }
    | {
        type: "phone_number"
        phone_number: Record<string, never>
        id: string
        name: string
      }
    | { type: "date"; date: Record<string, never>; id: string; name: string }
    | {
        type: "checkbox"
        checkbox: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "created_by"
        created_by: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "created_time"
        created_time: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "last_edited_by"
        last_edited_by: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "last_edited_time"
        last_edited_time: Record<string, never>
        id: string
        name: string
      }
  >
  parent:
    | { type: "page_id"; page_id: string }
    | { type: "workspace"; workspace: true }
  object: "database"
  id: string
  created_time: string
  last_edited_time: string
  url: string
}

export const getDatabase = {
  method: "get",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: [],
  path: (p: GetDatabasePathParameters): string => `databases/${p.database_id}`,
} as const

export type UpdateDatabasePathParameters = {
  database_id: IdRequest
}

export type UpdateDatabaseBodyParameters = {
  title?: Array<RichTextItemRequest>
  icon?:
    | {
        emoji: emojiLookup
        type?: "emoji"
      }
    | null
    | { external: { url: string }; type?: "external" }
    | null
  cover?: { external: { url: string }; type?: "external" } | null
  properties?: Record<
    string,
    | {
        number: {
          format?: formatLookup
        }
        type?: "number"
        name?: string
      }
    | null
    | { formula: { expression?: string }; type?: "formula"; name?: string }
    | null
    | {
        select: {
          options?: Array<
            | {
                id: StringRequest
                name?: StringRequest
                color?: selectColorLookup
              }
            | {
                name: StringRequest
                id?: StringRequest
                color?: selectColorLookup
              }
          >
        }
        type?: "select"
        name?: string
      }
    | null
    | {
        multi_select: {
          options?: Array<
            | {
                id: StringRequest
                name?: StringRequest
                color?: selectColorLookup
              }
            | {
                name: StringRequest
                id?: StringRequest
                color?: selectColorLookup
              }
          >
        }
        type?: "multi_select"
        name?: string
      }
    | null
    | {
        relation: {
          database_id: IdRequest
          synced_property_id?: string
          synced_property_name?: string
        }
        type?: "relation"
        name?: string
      }
    | null
    | {
        rollup:
          | {
              rollup_property_name: string
              relation_property_name: string
              function: functionLookup
              rollup_property_id?: string
              relation_property_id?: string
            }
          | {
              rollup_property_name: string
              relation_property_id: string
              function: functionLookup
              relation_property_name?: string
              rollup_property_id?: string
            }
          | {
              relation_property_name: string
              rollup_property_id: string
              function: functionLookup
              rollup_property_name?: string
              relation_property_id?: string
            }
          | {
              rollup_property_id: string
              relation_property_id: string
              function: functionLookup
              rollup_property_name?: string
              relation_property_name?: string
            }
        type?: "rollup"
        name?: string
      }
    | null
    | { title: Record<string, never>; type?: "title"; name?: string }
    | null
    | { rich_text: Record<string, never>; type?: "rich_text"; name?: string }
    | null
    | { url: Record<string, never>; type?: "url"; name?: string }
    | null
    | { people: Record<string, never>; type?: "people"; name?: string }
    | null
    | { files: Record<string, never>; type?: "files"; name?: string }
    | null
    | { email: Record<string, never>; type?: "email"; name?: string }
    | null
    | {
        phone_number: Record<string, never>
        type?: "phone_number"
        name?: string
      }
    | null
    | { date: Record<string, never>; type?: "date"; name?: string }
    | null
    | { checkbox: Record<string, never>; type?: "checkbox"; name?: string }
    | null
    | { created_by: Record<string, never>; type?: "created_by"; name?: string }
    | null
    | {
        created_time: Record<string, never>
        type?: "created_time"
        name?: string
      }
    | null
    | {
        last_edited_by: Record<string, never>
        type?: "last_edited_by"
        name?: string
      }
    | null
    | {
        last_edited_time: Record<string, never>
        type?: "last_edited_time"
        name?: string
      }
    | null
    | { name: string }
    | null
  >
}

export type UpdateDatabaseParameters = UpdateDatabasePathParameters &
  UpdateDatabaseBodyParameters

export type UpdateDatabaseResponse = {
  title: Array<
    | {
        type: "text"
        text: { content: string; link: { url: TextRequest } | null }
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
    | {
        type: "mention"
        mention: mentionLookup
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
    | {
        type: "equation"
        equation: { expression: TextRequest }
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
  >
  icon:
    | {
        type: "emoji"
        emoji: emojiLookup
      }
    | null
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  properties: Record<
    string,
    | {
        type: "number"
        number: {
          format: formatLookup
        }
        id: string
        name: string
      }
    | {
        type: "formula"
        formula: { expression: string }
        id: string
        name: string
      }
    | {
        type: "select"
        select: {
          options: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        id: string
        name: string
      }
    | {
        type: "multi_select"
        multi_select: {
          options: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        id: string
        name: string
      }
    | {
        type: "relation"
        relation: {
          database_id: IdRequest
          synced_property_id: string
          synced_property_name: string
        }
        id: string
        name: string
      }
    | {
        type: "rollup"
        rollup: {
          rollup_property_name: string
          relation_property_name: string
          rollup_property_id: string
          relation_property_id: string
          function: functionLookup
        }
        id: string
        name: string
      }
    | { type: "title"; title: Record<string, never>; id: string; name: string }
    | {
        type: "rich_text"
        rich_text: Record<string, never>
        id: string
        name: string
      }
    | { type: "url"; url: Record<string, never>; id: string; name: string }
    | {
        type: "people"
        people: Record<string, never>
        id: string
        name: string
      }
    | { type: "files"; files: Record<string, never>; id: string; name: string }
    | { type: "email"; email: Record<string, never>; id: string; name: string }
    | {
        type: "phone_number"
        phone_number: Record<string, never>
        id: string
        name: string
      }
    | { type: "date"; date: Record<string, never>; id: string; name: string }
    | {
        type: "checkbox"
        checkbox: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "created_by"
        created_by: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "created_time"
        created_time: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "last_edited_by"
        last_edited_by: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "last_edited_time"
        last_edited_time: Record<string, never>
        id: string
        name: string
      }
  >
  parent:
    | { type: "page_id"; page_id: string }
    | { type: "workspace"; workspace: true }
  object: "database"
  id: string
  created_time: string
  last_edited_time: string
  url: string
}

export const updateDatabase = {
  method: "patch",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: ["title", "icon", "cover", "properties"],
  path: (p: UpdateDatabasePathParameters): string =>
    `databases/${p.database_id}`,
} as const

export type QueryDatabasePathParameters = {
  database_id: IdRequest
}

export type QueryDatabaseBodyParameters = {
  sorts?: Array<
    | { property: string; direction: "ascending" | "descending" }
    | {
        timestamp: "created_time" | "last_edited_time"
        direction: "ascending" | "descending"
      }
  >
  filter?:
    | {
        or: Array<
          | {
              title: stringQueryLookup
              property: string
              type?: "title"
            }
          | {
              text: stringQueryLookup
              property: string
              type?: "text"
            }
          | {
              rich_text: stringQueryLookup
              property: string
              type?: "rich_text"
            }
          | {
              number: numberQueryLookup
              property: string
              type?: "number"
            }
          | {
              checkbox: { equals: boolean } | { does_not_equal: boolean }
              property: string
              type?: "checkbox"
            }
          | {
              select: selectQueryLookup
              property: string
              type?: "select"
            }
          | {
              multi_select: multiSelectQueryLookup
              property: string
              type?: "multi_select"
            }
          | {
              date: dateQueryLookup
              property: string
              type?: "date"
            }
          | {
              people: peopleQueryLookup
              property: string
              type?: "people"
            }
          | {
              files: { is_empty: true } | { is_not_empty: true }
              property: string
              type?: "files"
            }
          | {
              url: stringQueryLookup
              property: string
              type?: "url"
            }
          | {
              email: stringQueryLookup
              property: string
              type?: "email"
            }
          | {
              phone: stringQueryLookup
              property: string
              type?: "phone"
            }
          | {
              phone_number: stringQueryLookup
              property: string
              type?: "phone_number"
            }
          | {
              relation: relationQueryLookup
              property: string
              type?: "relation"
            }
          | {
              created_by:
                | { contains: IdRequest }
                | { does_not_contain: IdRequest }
                | { is_empty: true }
                | { is_not_empty: true }
              property: string
              type?: "created_by"
            }
          | {
              created_time: dateQueryLookup
              property: string
              type?: "created_time"
            }
          | {
              last_edited_by:
                | { contains: IdRequest }
                | { does_not_contain: IdRequest }
                | { is_empty: true }
                | { is_not_empty: true }
              property: string
              type?: "last_edited_by"
            }
          | {
              last_edited_time: dateQueryLookup
              property: string
              type?: "last_edited_time"
            }
          | {
              formula:
                | {
                    text: stringQueryLookup
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                  }
                | {
                    number: numberQueryLookup
                  }
                | {
                    date: dateQueryLookup
                  }
              property: string
              type?: "formula"
            }
          | {
              rollup:
                | {
                    any:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          select: selectQueryLookup
                        }
                      | {
                          multi_select: multiSelectQueryLookup
                        }
                      | {
                          relation: relationQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          people: peopleQueryLookup
                        }
                      | { files: { is_empty: true } | { is_not_empty: true } }
                  }
                | {
                    none:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          select: selectQueryLookup
                        }
                      | {
                          multi_select: multiSelectQueryLookup
                        }
                      | {
                          relation: relationQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          people: peopleQueryLookup
                        }
                      | { files: { is_empty: true } | { is_not_empty: true } }
                  }
                | {
                    every:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          select: selectQueryLookup
                        }
                      | {
                          multi_select: multiSelectQueryLookup
                        }
                      | {
                          relation: relationQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          people: peopleQueryLookup
                        }
                      | { files: { is_empty: true } | { is_not_empty: true } }
                  }
                | {
                    date: dateQueryLookup
                  }
                | {
                    number: numberQueryLookup
                  }
              property: string
              type?: "rollup"
            }
          | {
              or: Array<
                | {
                    title: stringQueryLookup
                    property: string
                    type?: "title"
                  }
                | {
                    text: stringQueryLookup
                    property: string
                    type?: "text"
                  }
                | {
                    rich_text: stringQueryLookup
                    property: string
                    type?: "rich_text"
                  }
                | {
                    number: numberQueryLookup
                    property: string
                    type?: "number"
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                    property: string
                    type?: "checkbox"
                  }
                | {
                    select: selectQueryLookup
                    property: string
                    type?: "select"
                  }
                | {
                    multi_select: multiSelectQueryLookup
                    property: string
                    type?: "multi_select"
                  }
                | {
                    date: dateQueryLookup
                    property: string
                    type?: "date"
                  }
                | {
                    people: peopleQueryLookup
                    property: string
                    type?: "people"
                  }
                | {
                    files: { is_empty: true } | { is_not_empty: true }
                    property: string
                    type?: "files"
                  }
                | {
                    url: stringQueryLookup
                    property: string
                    type?: "url"
                  }
                | {
                    email: stringQueryLookup
                    property: string
                    type?: "email"
                  }
                | {
                    phone: stringQueryLookup
                    property: string
                    type?: "phone"
                  }
                | {
                    phone_number: stringQueryLookup
                    property: string
                    type?: "phone_number"
                  }
                | {
                    relation: relationQueryLookup
                    property: string
                    type?: "relation"
                  }
                | {
                    created_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "created_by"
                  }
                | {
                    created_time: dateQueryLookup
                    property: string
                    type?: "created_time"
                  }
                | {
                    last_edited_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "last_edited_by"
                  }
                | {
                    last_edited_time: dateQueryLookup
                    property: string
                    type?: "last_edited_time"
                  }
                | {
                    formula:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                    property: string
                    type?: "formula"
                  }
                | {
                    rollup:
                      | {
                          any:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          none:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          every:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                    property: string
                    type?: "rollup"
                  }
              >
            }
          | {
              and: Array<
                | {
                    title: stringQueryLookup
                    property: string
                    type?: "title"
                  }
                | {
                    text: stringQueryLookup
                    property: string
                    type?: "text"
                  }
                | {
                    rich_text: stringQueryLookup
                    property: string
                    type?: "rich_text"
                  }
                | {
                    number: numberQueryLookup
                    property: string
                    type?: "number"
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                    property: string
                    type?: "checkbox"
                  }
                | {
                    select: selectQueryLookup
                    property: string
                    type?: "select"
                  }
                | {
                    multi_select: multiSelectQueryLookup
                    property: string
                    type?: "multi_select"
                  }
                | {
                    date: dateQueryLookup
                    property: string
                    type?: "date"
                  }
                | {
                    people: peopleQueryLookup
                    property: string
                    type?: "people"
                  }
                | {
                    files: { is_empty: true } | { is_not_empty: true }
                    property: string
                    type?: "files"
                  }
                | {
                    url: stringQueryLookup
                    property: string
                    type?: "url"
                  }
                | {
                    email: stringQueryLookup
                    property: string
                    type?: "email"
                  }
                | {
                    phone: stringQueryLookup
                    property: string
                    type?: "phone"
                  }
                | {
                    phone_number: stringQueryLookup
                    property: string
                    type?: "phone_number"
                  }
                | {
                    relation: relationQueryLookup
                    property: string
                    type?: "relation"
                  }
                | {
                    created_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "created_by"
                  }
                | {
                    created_time: dateQueryLookup
                    property: string
                    type?: "created_time"
                  }
                | {
                    last_edited_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "last_edited_by"
                  }
                | {
                    last_edited_time: dateQueryLookup
                    property: string
                    type?: "last_edited_time"
                  }
                | {
                    formula:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                    property: string
                    type?: "formula"
                  }
                | {
                    rollup:
                      | {
                          any:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          none:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          every:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                    property: string
                    type?: "rollup"
                  }
              >
            }
        >
      }
    | {
        and: Array<
          | {
              title: stringQueryLookup
              property: string
              type?: "title"
            }
          | {
              text: stringQueryLookup
              property: string
              type?: "text"
            }
          | {
              rich_text: stringQueryLookup
              property: string
              type?: "rich_text"
            }
          | {
              number: numberQueryLookup
              property: string
              type?: "number"
            }
          | {
              checkbox: { equals: boolean } | { does_not_equal: boolean }
              property: string
              type?: "checkbox"
            }
          | {
              select: selectQueryLookup
              property: string
              type?: "select"
            }
          | {
              multi_select: multiSelectQueryLookup
              property: string
              type?: "multi_select"
            }
          | {
              date: dateQueryLookup
              property: string
              type?: "date"
            }
          | {
              people: peopleQueryLookup
              property: string
              type?: "people"
            }
          | {
              files: { is_empty: true } | { is_not_empty: true }
              property: string
              type?: "files"
            }
          | {
              url: stringQueryLookup
              property: string
              type?: "url"
            }
          | {
              email: stringQueryLookup
              property: string
              type?: "email"
            }
          | {
              phone: stringQueryLookup
              property: string
              type?: "phone"
            }
          | {
              phone_number: stringQueryLookup
              property: string
              type?: "phone_number"
            }
          | {
              relation: relationQueryLookup
              property: string
              type?: "relation"
            }
          | {
              created_by:
                | { contains: IdRequest }
                | { does_not_contain: IdRequest }
                | { is_empty: true }
                | { is_not_empty: true }
              property: string
              type?: "created_by"
            }
          | {
              created_time: dateQueryLookup
              property: string
              type?: "created_time"
            }
          | {
              last_edited_by:
                | { contains: IdRequest }
                | { does_not_contain: IdRequest }
                | { is_empty: true }
                | { is_not_empty: true }
              property: string
              type?: "last_edited_by"
            }
          | {
              last_edited_time: dateQueryLookup
              property: string
              type?: "last_edited_time"
            }
          | {
              formula:
                | {
                    text: stringQueryLookup
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                  }
                | {
                    number: numberQueryLookup
                  }
                | {
                    date: dateQueryLookup
                  }
              property: string
              type?: "formula"
            }
          | {
              rollup:
                | {
                    any:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          select: selectQueryLookup
                        }
                      | {
                          multi_select: multiSelectQueryLookup
                        }
                      | {
                          relation: relationQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          people: peopleQueryLookup
                        }
                      | { files: { is_empty: true } | { is_not_empty: true } }
                  }
                | {
                    none:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          select: selectQueryLookup
                        }
                      | {
                          multi_select: multiSelectQueryLookup
                        }
                      | {
                          relation: relationQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          people: peopleQueryLookup
                        }
                      | { files: { is_empty: true } | { is_not_empty: true } }
                  }
                | {
                    every:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          select: selectQueryLookup
                        }
                      | {
                          multi_select: multiSelectQueryLookup
                        }
                      | {
                          relation: relationQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          people: peopleQueryLookup
                        }
                      | { files: { is_empty: true } | { is_not_empty: true } }
                  }
                | {
                    date: dateQueryLookup
                  }
                | {
                    number: numberQueryLookup
                  }
              property: string
              type?: "rollup"
            }
          | {
              or: Array<
                | {
                    title: stringQueryLookup
                    property: string
                    type?: "title"
                  }
                | {
                    text: stringQueryLookup
                    property: string
                    type?: "text"
                  }
                | {
                    rich_text: stringQueryLookup
                    property: string
                    type?: "rich_text"
                  }
                | {
                    number: numberQueryLookup
                    property: string
                    type?: "number"
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                    property: string
                    type?: "checkbox"
                  }
                | {
                    select: selectQueryLookup
                    property: string
                    type?: "select"
                  }
                | {
                    multi_select: multiSelectQueryLookup
                    property: string
                    type?: "multi_select"
                  }
                | {
                    date: dateQueryLookup
                    property: string
                    type?: "date"
                  }
                | {
                    people: peopleQueryLookup
                    property: string
                    type?: "people"
                  }
                | {
                    files: { is_empty: true } | { is_not_empty: true }
                    property: string
                    type?: "files"
                  }
                | {
                    url: stringQueryLookup
                    property: string
                    type?: "url"
                  }
                | {
                    email: stringQueryLookup
                    property: string
                    type?: "email"
                  }
                | {
                    phone: stringQueryLookup
                    property: string
                    type?: "phone"
                  }
                | {
                    phone_number: stringQueryLookup
                    property: string
                    type?: "phone_number"
                  }
                | {
                    relation: relationQueryLookup
                    property: string
                    type?: "relation"
                  }
                | {
                    created_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "created_by"
                  }
                | {
                    created_time: dateQueryLookup
                    property: string
                    type?: "created_time"
                  }
                | {
                    last_edited_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "last_edited_by"
                  }
                | {
                    last_edited_time: dateQueryLookup
                    property: string
                    type?: "last_edited_time"
                  }
                | {
                    formula:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                    property: string
                    type?: "formula"
                  }
                | {
                    rollup:
                      | {
                          any:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          none:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          every:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                    property: string
                    type?: "rollup"
                  }
              >
            }
          | {
              and: Array<
                | {
                    title: stringQueryLookup
                    property: string
                    type?: "title"
                  }
                | {
                    text: stringQueryLookup
                    property: string
                    type?: "text"
                  }
                | {
                    rich_text: stringQueryLookup
                    property: string
                    type?: "rich_text"
                  }
                | {
                    number: numberQueryLookup
                    property: string
                    type?: "number"
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                    property: string
                    type?: "checkbox"
                  }
                | {
                    select: selectQueryLookup
                    property: string
                    type?: "select"
                  }
                | {
                    multi_select: multiSelectQueryLookup
                    property: string
                    type?: "multi_select"
                  }
                | {
                    date: dateQueryLookup
                    property: string
                    type?: "date"
                  }
                | {
                    people: peopleQueryLookup
                    property: string
                    type?: "people"
                  }
                | {
                    files: { is_empty: true } | { is_not_empty: true }
                    property: string
                    type?: "files"
                  }
                | {
                    url: stringQueryLookup
                    property: string
                    type?: "url"
                  }
                | {
                    email: stringQueryLookup
                    property: string
                    type?: "email"
                  }
                | {
                    phone: stringQueryLookup
                    property: string
                    type?: "phone"
                  }
                | {
                    phone_number: stringQueryLookup
                    property: string
                    type?: "phone_number"
                  }
                | {
                    relation: relationQueryLookup
                    property: string
                    type?: "relation"
                  }
                | {
                    created_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "created_by"
                  }
                | {
                    created_time: dateQueryLookup
                    property: string
                    type?: "created_time"
                  }
                | {
                    last_edited_by:
                      | { contains: IdRequest }
                      | { does_not_contain: IdRequest }
                      | { is_empty: true }
                      | { is_not_empty: true }
                    property: string
                    type?: "last_edited_by"
                  }
                | {
                    last_edited_time: dateQueryLookup
                    property: string
                    type?: "last_edited_time"
                  }
                | {
                    formula:
                      | {
                          text: stringQueryLookup
                        }
                      | {
                          checkbox:
                            | { equals: boolean }
                            | { does_not_equal: boolean }
                        }
                      | {
                          number: numberQueryLookup
                        }
                      | {
                          date: dateQueryLookup
                        }
                    property: string
                    type?: "formula"
                  }
                | {
                    rollup:
                      | {
                          any:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          none:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          every:
                            | {
                                text: stringQueryLookup
                              }
                            | {
                                number: numberQueryLookup
                              }
                            | {
                                checkbox:
                                  | { equals: boolean }
                                  | { does_not_equal: boolean }
                              }
                            | {
                                select: selectQueryLookup
                              }
                            | {
                                multi_select: multiSelectQueryLookup
                              }
                            | {
                                relation: relationQueryLookup
                              }
                            | {
                                date: dateQueryLookup
                              }
                            | {
                                people: peopleQueryLookup
                              }
                            | {
                                files:
                                  | { is_empty: true }
                                  | { is_not_empty: true }
                              }
                        }
                      | {
                          date: dateQueryLookup
                        }
                      | {
                          number: numberQueryLookup
                        }
                    property: string
                    type?: "rollup"
                  }
              >
            }
        >
      }
    | {
        title: stringQueryLookup
        property: string
        type?: "title"
      }
    | {
        text: stringQueryLookup
        property: string
        type?: "text"
      }
    | {
        rich_text: stringQueryLookup
        property: string
        type?: "rich_text"
      }
    | {
        number: numberQueryLookup
        property: string
        type?: "number"
      }
    | {
        checkbox: { equals: boolean } | { does_not_equal: boolean }
        property: string
        type?: "checkbox"
      }
    | {
        select: selectQueryLookup
        property: string
        type?: "select"
      }
    | {
        multi_select: multiSelectQueryLookup
        property: string
        type?: "multi_select"
      }
    | {
        date: dateQueryLookup
        property: string
        type?: "date"
      }
    | {
        people: peopleQueryLookup
        property: string
        type?: "people"
      }
    | {
        files: { is_empty: true } | { is_not_empty: true }
        property: string
        type?: "files"
      }
    | {
        url: stringQueryLookup
        property: string
        type?: "url"
      }
    | {
        email: stringQueryLookup
        property: string
        type?: "email"
      }
    | {
        phone: stringQueryLookup
        property: string
        type?: "phone"
      }
    | {
        phone_number: stringQueryLookup
        property: string
        type?: "phone_number"
      }
    | {
        relation: relationQueryLookup
        property: string
        type?: "relation"
      }
    | {
        created_by:
          | { contains: IdRequest }
          | { does_not_contain: IdRequest }
          | { is_empty: true }
          | { is_not_empty: true }
        property: string
        type?: "created_by"
      }
    | {
        created_time: dateQueryLookup
        property: string
        type?: "created_time"
      }
    | {
        last_edited_by:
          | { contains: IdRequest }
          | { does_not_contain: IdRequest }
          | { is_empty: true }
          | { is_not_empty: true }
        property: string
        type?: "last_edited_by"
      }
    | {
        last_edited_time: dateQueryLookup
        property: string
        type?: "last_edited_time"
      }
    | {
        formula:
          | {
              text: stringQueryLookup
            }
          | { checkbox: { equals: boolean } | { does_not_equal: boolean } }
          | {
              number: numberQueryLookup
            }
          | {
              date: dateQueryLookup
            }
        property: string
        type?: "formula"
      }
    | {
        rollup:
          | {
              any:
                | {
                    text: stringQueryLookup
                  }
                | {
                    number: numberQueryLookup
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                  }
                | {
                    select: selectQueryLookup
                  }
                | {
                    multi_select: multiSelectQueryLookup
                  }
                | {
                    relation: relationQueryLookup
                  }
                | {
                    date: dateQueryLookup
                  }
                | {
                    people: peopleQueryLookup
                  }
                | { files: { is_empty: true } | { is_not_empty: true } }
            }
          | {
              none:
                | {
                    text: stringQueryLookup
                  }
                | {
                    number: numberQueryLookup
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                  }
                | {
                    select: selectQueryLookup
                  }
                | {
                    multi_select: multiSelectQueryLookup
                  }
                | {
                    relation: relationQueryLookup
                  }
                | {
                    date: dateQueryLookup
                  }
                | {
                    people: peopleQueryLookup
                  }
                | { files: { is_empty: true } | { is_not_empty: true } }
            }
          | {
              every:
                | {
                    text: stringQueryLookup
                  }
                | {
                    number: numberQueryLookup
                  }
                | {
                    checkbox: { equals: boolean } | { does_not_equal: boolean }
                  }
                | {
                    select: selectQueryLookup
                  }
                | {
                    multi_select: multiSelectQueryLookup
                  }
                | {
                    relation: relationQueryLookup
                  }
                | {
                    date: dateQueryLookup
                  }
                | {
                    people: peopleQueryLookup
                  }
                | { files: { is_empty: true } | { is_not_empty: true } }
            }
          | {
              date: dateQueryLookup
            }
          | {
              number: numberQueryLookup
            }
        property: string
        type?: "rollup"
      }
  start_cursor?: string
  page_size?: number
  archived?: boolean
}

export type QueryDatabaseParameters = QueryDatabasePathParameters &
  QueryDatabaseBodyParameters

export type QueryDatabaseResponse =
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<{
        parent:
          | { type: "database_id"; database_id: IdRequest }
          | { type: "page_id"; page_id: IdRequest }
          | { type: "workspace"; workspace: true }
        properties: Record<
          string,
          | {
              type: "title"
              title: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              id: string
            }
          | {
              type: "rich_text"
              rich_text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              id: string
            }
          | { type: "number"; number: number; id: string }
          | { type: "url"; url: string; id: string }
          | {
              type: "select"
              select: {
                id: StringRequest
                name: StringRequest
                color: selectColorLookup
              }
              id: string
            }
          | {
              type: "multi_select"
              multi_select: Array<{
                id: StringRequest
                name: StringRequest
                color: selectColorLookup
              }>
              id: string
            }
          | {
              type: "people"
              people: Array<
                | { id: IdRequest; object: "user" }
                | {
                    type: "person"
                    person: { email: string }
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
                | {
                    type: "bot"
                    bot: botLookup
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
              >
              id: string
            }
          | { type: "email"; email: string; id: string }
          | { type: "phone_number"; phone_number: string; id: string }
          | {
              type: "date"
              date: { start: string; end: string | null }
              id: string
            }
          | {
              type: "files"
              files: Array<
                | {
                    file: { url: string; expiry_time: string }
                    name: string
                    type?: "file"
                  }
                | { external: { url: string }; name: string; type?: "external" }
              >
              id: string
            }
          | { type: "checkbox"; checkbox: boolean; id: string }
          | {
              type: "formula"
              formula:
                | { type: "string"; string: string | null }
                | {
                    type: "date"
                    date: { start: string; end: string | null } | null
                  }
                | { type: "number"; number: number | null }
                | { type: "boolean"; boolean: boolean | null }
              id: string
            }
          | { type: "relation"; relation: Array<{ id: string }>; id: string }
          | {
              type: "rollup"
              rollup:
                | {
                    type: "number"
                    number: number | null
                    function: functionLookup
                  }
                | {
                    type: "date"
                    date: { start: string; end: string | null } | null
                    function: functionLookup
                  }
                | {
                    type: "array"
                    array: Array<
                      | {
                          type: "number"
                          number: {
                            format: formatLookup
                          }
                        }
                      | { type: "formula"; formula: { expression: string } }
                      | {
                          type: "select"
                          select: {
                            options: Array<{
                              name: StringRequest
                              id?: StringRequest
                              color?: selectColorLookup
                            }>
                          }
                        }
                      | {
                          type: "multi_select"
                          multi_select: {
                            options: Array<{
                              name: StringRequest
                              id?: StringRequest
                              color?: selectColorLookup
                            }>
                          }
                        }
                      | {
                          type: "relation"
                          relation: {
                            database_id: IdRequest
                            synced_property_id: string
                            synced_property_name: string
                          }
                        }
                      | {
                          type: "rollup"
                          rollup: {
                            rollup_property_name: string
                            relation_property_name: string
                            rollup_property_id: string
                            relation_property_id: string
                            function: functionLookup
                          }
                        }
                      | { type: "title"; title: Record<string, never> }
                      | { type: "rich_text"; rich_text: Record<string, never> }
                      | { type: "url"; url: Record<string, never> }
                      | { type: "people"; people: Record<string, never> }
                      | { type: "files"; files: Record<string, never> }
                      | { type: "email"; email: Record<string, never> }
                      | {
                          type: "phone_number"
                          phone_number: Record<string, never>
                        }
                      | { type: "date"; date: Record<string, never> }
                      | { type: "checkbox"; checkbox: Record<string, never> }
                      | {
                          type: "created_by"
                          created_by: Record<string, never>
                        }
                      | {
                          type: "created_time"
                          created_time: Record<string, never>
                        }
                      | {
                          type: "last_edited_by"
                          last_edited_by: Record<string, never>
                        }
                      | {
                          type: "last_edited_time"
                          last_edited_time: Record<string, never>
                        }
                    >
                    function: functionLookup
                  }
                | {
                    type: "unsupported"
                    unsupported: Record<string, never>
                    function: functionLookup
                  }
              id: string
            }
          | { type: "created_time"; created_time: string; id: string }
          | {
              type: "created_by"
              created_by:
                | { id: IdRequest; object: "user" }
                | {
                    type: "person"
                    person: { email: string }
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
                | {
                    type: "bot"
                    bot: botLookup
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
              id: string
            }
          | { type: "last_edited_time"; last_edited_time: string; id: string }
          | {
              type: "last_edited_by"
              last_edited_by:
                | { id: IdRequest; object: "user" }
                | {
                    type: "person"
                    person: { email: string }
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
                | {
                    type: "bot"
                    bot: botLookup
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
              id: string
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        cover:
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        object: "page"
        id: string
        created_time: string
        last_edited_time: string
        archived: boolean
        url: string
      }>
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<{
        parent:
          | { type: "database_id"; database_id: IdRequest }
          | { type: "page_id"; page_id: IdRequest }
          | { type: "workspace"; workspace: true }
        properties: Record<
          string,
          | {
              type: "title"
              title: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              id: string
            }
          | {
              type: "rich_text"
              rich_text: Array<
                | {
                    type: "text"
                    text: { content: string; link: { url: TextRequest } | null }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "mention"
                    mention: mentionLookup
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
                | {
                    type: "equation"
                    equation: { expression: TextRequest }
                    annotations: annotationsLookup
                    plain_text: string
                    href: string | null
                  }
              >
              id: string
            }
          | { type: "number"; number: number; id: string }
          | { type: "url"; url: string; id: string }
          | {
              type: "select"
              select: {
                id: StringRequest
                name: StringRequest
                color: selectColorLookup
              }
              id: string
            }
          | {
              type: "multi_select"
              multi_select: Array<{
                id: StringRequest
                name: StringRequest
                color: selectColorLookup
              }>
              id: string
            }
          | {
              type: "people"
              people: Array<
                | { id: IdRequest; object: "user" }
                | {
                    type: "person"
                    person: { email: string }
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
                | {
                    type: "bot"
                    bot: botLookup
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
              >
              id: string
            }
          | { type: "email"; email: string; id: string }
          | { type: "phone_number"; phone_number: string; id: string }
          | {
              type: "date"
              date: { start: string; end: string | null }
              id: string
            }
          | {
              type: "files"
              files: Array<
                | {
                    file: { url: string; expiry_time: string }
                    name: string
                    type?: "file"
                  }
                | { external: { url: string }; name: string; type?: "external" }
              >
              id: string
            }
          | { type: "checkbox"; checkbox: boolean; id: string }
          | {
              type: "formula"
              formula:
                | { type: "string"; string: string | null }
                | {
                    type: "date"
                    date: { start: string; end: string | null } | null
                  }
                | { type: "number"; number: number | null }
                | { type: "boolean"; boolean: boolean | null }
              id: string
            }
          | { type: "relation"; relation: Array<{ id: string }>; id: string }
          | {
              type: "rollup"
              rollup:
                | {
                    type: "number"
                    number: number | null
                    function: functionLookup
                  }
                | {
                    type: "date"
                    date: { start: string; end: string | null } | null
                    function: functionLookup
                  }
                | {
                    type: "array"
                    array: Array<
                      | {
                          type: "number"
                          number: {
                            format: formatLookup
                          }
                        }
                      | { type: "formula"; formula: { expression: string } }
                      | {
                          type: "select"
                          select: {
                            options: Array<{
                              name: StringRequest
                              id?: StringRequest
                              color?: selectColorLookup
                            }>
                          }
                        }
                      | {
                          type: "multi_select"
                          multi_select: {
                            options: Array<{
                              name: StringRequest
                              id?: StringRequest
                              color?: selectColorLookup
                            }>
                          }
                        }
                      | {
                          type: "relation"
                          relation: {
                            database_id: IdRequest
                            synced_property_id: string
                            synced_property_name: string
                          }
                        }
                      | {
                          type: "rollup"
                          rollup: {
                            rollup_property_name: string
                            relation_property_name: string
                            rollup_property_id: string
                            relation_property_id: string
                            function: functionLookup
                          }
                        }
                      | { type: "title"; title: Record<string, never> }
                      | { type: "rich_text"; rich_text: Record<string, never> }
                      | { type: "url"; url: Record<string, never> }
                      | { type: "people"; people: Record<string, never> }
                      | { type: "files"; files: Record<string, never> }
                      | { type: "email"; email: Record<string, never> }
                      | {
                          type: "phone_number"
                          phone_number: Record<string, never>
                        }
                      | { type: "date"; date: Record<string, never> }
                      | { type: "checkbox"; checkbox: Record<string, never> }
                      | {
                          type: "created_by"
                          created_by: Record<string, never>
                        }
                      | {
                          type: "created_time"
                          created_time: Record<string, never>
                        }
                      | {
                          type: "last_edited_by"
                          last_edited_by: Record<string, never>
                        }
                      | {
                          type: "last_edited_time"
                          last_edited_time: Record<string, never>
                        }
                    >
                    function: functionLookup
                  }
                | {
                    type: "unsupported"
                    unsupported: Record<string, never>
                    function: functionLookup
                  }
              id: string
            }
          | { type: "created_time"; created_time: string; id: string }
          | {
              type: "created_by"
              created_by:
                | { id: IdRequest; object: "user" }
                | {
                    type: "person"
                    person: { email: string }
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
                | {
                    type: "bot"
                    bot: botLookup
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
              id: string
            }
          | { type: "last_edited_time"; last_edited_time: string; id: string }
          | {
              type: "last_edited_by"
              last_edited_by:
                | { id: IdRequest; object: "user" }
                | {
                    type: "person"
                    person: { email: string }
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
                | {
                    type: "bot"
                    bot: botLookup
                    name: string | null
                    avatar_url: string | null
                    id: IdRequest
                    object: "user"
                  }
              id: string
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        cover:
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        object: "page"
        id: string
        created_time: string
        last_edited_time: string
        archived: boolean
        url: string
      }>
      next_cursor: string | null
      has_more: boolean
    }

export const queryDatabase = {
  method: "post",
  pathParams: ["database_id"],
  queryParams: [],
  bodyParams: ["sorts", "filter", "start_cursor", "page_size", "archived"],
  path: (p: QueryDatabasePathParameters): string =>
    `databases/${p.database_id}/query`,
} as const

export type ListDatabasesQueryParameters = {
  start_cursor?: string
  page_size?: number
}

export type ListDatabasesParameters = ListDatabasesQueryParameters

export type ListDatabasesResponse =
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<{
        title: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        cover:
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        properties: Record<
          string,
          | {
              type: "number"
              number: {
                format: formatLookup
              }
              id: string
              name: string
            }
          | {
              type: "formula"
              formula: { expression: string }
              id: string
              name: string
            }
          | {
              type: "select"
              select: {
                options: Array<{
                  name: StringRequest
                  id?: StringRequest
                  color?: selectColorLookup
                }>
              }
              id: string
              name: string
            }
          | {
              type: "multi_select"
              multi_select: {
                options: Array<{
                  name: StringRequest
                  id?: StringRequest
                  color?: selectColorLookup
                }>
              }
              id: string
              name: string
            }
          | {
              type: "relation"
              relation: {
                database_id: IdRequest
                synced_property_id: string
                synced_property_name: string
              }
              id: string
              name: string
            }
          | {
              type: "rollup"
              rollup: {
                rollup_property_name: string
                relation_property_name: string
                rollup_property_id: string
                relation_property_id: string
                function: functionLookup
              }
              id: string
              name: string
            }
          | {
              type: "title"
              title: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "rich_text"
              rich_text: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "url"
              url: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "people"
              people: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "files"
              files: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "email"
              email: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "phone_number"
              phone_number: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "date"
              date: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "checkbox"
              checkbox: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "created_by"
              created_by: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "created_time"
              created_time: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "last_edited_by"
              last_edited_by: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "last_edited_time"
              last_edited_time: Record<string, never>
              id: string
              name: string
            }
        >
        parent:
          | { type: "page_id"; page_id: string }
          | { type: "workspace"; workspace: true }
        object: "database"
        id: string
        created_time: string
        last_edited_time: string
        url: string
      }>
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<{
        title: Array<
          | {
              type: "text"
              text: { content: string; link: { url: TextRequest } | null }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "mention"
              mention: mentionLookup
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
          | {
              type: "equation"
              equation: { expression: TextRequest }
              annotations: annotationsLookup
              plain_text: string
              href: string | null
            }
        >
        icon:
          | {
              type: "emoji"
              emoji: emojiLookup
            }
          | null
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        cover:
          | { type: "external"; external: { url: string } }
          | null
          | { type: "file"; file: { url: string; expiry_time: string } }
          | null
        properties: Record<
          string,
          | {
              type: "number"
              number: {
                format: formatLookup
              }
              id: string
              name: string
            }
          | {
              type: "formula"
              formula: { expression: string }
              id: string
              name: string
            }
          | {
              type: "select"
              select: {
                options: Array<{
                  name: StringRequest
                  id?: StringRequest
                  color?: selectColorLookup
                }>
              }
              id: string
              name: string
            }
          | {
              type: "multi_select"
              multi_select: {
                options: Array<{
                  name: StringRequest
                  id?: StringRequest
                  color?: selectColorLookup
                }>
              }
              id: string
              name: string
            }
          | {
              type: "relation"
              relation: {
                database_id: IdRequest
                synced_property_id: string
                synced_property_name: string
              }
              id: string
              name: string
            }
          | {
              type: "rollup"
              rollup: {
                rollup_property_name: string
                relation_property_name: string
                rollup_property_id: string
                relation_property_id: string
                function: functionLookup
              }
              id: string
              name: string
            }
          | {
              type: "title"
              title: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "rich_text"
              rich_text: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "url"
              url: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "people"
              people: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "files"
              files: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "email"
              email: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "phone_number"
              phone_number: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "date"
              date: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "checkbox"
              checkbox: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "created_by"
              created_by: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "created_time"
              created_time: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "last_edited_by"
              last_edited_by: Record<string, never>
              id: string
              name: string
            }
          | {
              type: "last_edited_time"
              last_edited_time: Record<string, never>
              id: string
              name: string
            }
        >
        parent:
          | { type: "page_id"; page_id: string }
          | { type: "workspace"; workspace: true }
        object: "database"
        id: string
        created_time: string
        last_edited_time: string
        url: string
      }>
      next_cursor: string | null
      has_more: boolean
    }

export const listDatabases = {
  method: "get",
  pathParams: [],
  queryParams: ["start_cursor", "page_size"],
  bodyParams: [],
  path: (): string => `databases`,
} as const

export type CreateDatabaseBodyParameters = {
  parent: { page_id: IdRequest; type?: "page_id" }
  properties: Record<
    string,
    | {
        number: {
          format?: formatLookup
        }
        type?: "number"
      }
    | { formula: { expression?: string }; type?: "formula" }
    | {
        select: {
          options?: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        type?: "select"
      }
    | {
        multi_select: {
          options?: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        type?: "multi_select"
      }
    | {
        relation: {
          database_id: IdRequest
          synced_property_id?: string
          synced_property_name?: string
        }
        type?: "relation"
      }
    | {
        rollup:
          | {
              rollup_property_name: string
              relation_property_name: string
              function: functionLookup
              rollup_property_id?: string
              relation_property_id?: string
            }
          | {
              rollup_property_name: string
              relation_property_id: string
              function: functionLookup
              relation_property_name?: string
              rollup_property_id?: string
            }
          | {
              relation_property_name: string
              rollup_property_id: string
              function: functionLookup
              rollup_property_name?: string
              relation_property_id?: string
            }
          | {
              rollup_property_id: string
              relation_property_id: string
              function: functionLookup
              rollup_property_name?: string
              relation_property_name?: string
            }
        type?: "rollup"
      }
    | { title: Record<string, never>; type?: "title" }
    | { rich_text: Record<string, never>; type?: "rich_text" }
    | { url: Record<string, never>; type?: "url" }
    | { people: Record<string, never>; type?: "people" }
    | { files: Record<string, never>; type?: "files" }
    | { email: Record<string, never>; type?: "email" }
    | { phone_number: Record<string, never>; type?: "phone_number" }
    | { date: Record<string, never>; type?: "date" }
    | { checkbox: Record<string, never>; type?: "checkbox" }
    | { created_by: Record<string, never>; type?: "created_by" }
    | { created_time: Record<string, never>; type?: "created_time" }
    | { last_edited_by: Record<string, never>; type?: "last_edited_by" }
    | { last_edited_time: Record<string, never>; type?: "last_edited_time" }
  >
  icon?:
    | {
        emoji: emojiLookup
        type?: "emoji"
      }
    | null
    | { external: { url: string }; type?: "external" }
    | null
  cover?: { external: { url: string }; type?: "external" } | null
  title?: Array<RichTextItemRequest>
}

export type CreateDatabaseParameters = CreateDatabaseBodyParameters

export type CreateDatabaseResponse = {
  title: Array<
    | {
        type: "text"
        text: { content: string; link: { url: TextRequest } | null }
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
    | {
        type: "mention"
        mention: mentionLookup
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
    | {
        type: "equation"
        equation: { expression: TextRequest }
        annotations: annotationsLookup
        plain_text: string
        href: string | null
      }
  >
  icon:
    | {
        type: "emoji"
        emoji: emojiLookup
      }
    | null
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  cover:
    | { type: "external"; external: { url: string } }
    | null
    | { type: "file"; file: { url: string; expiry_time: string } }
    | null
  properties: Record<
    string,
    | {
        type: "number"
        number: {
          format: formatLookup
        }
        id: string
        name: string
      }
    | {
        type: "formula"
        formula: { expression: string }
        id: string
        name: string
      }
    | {
        type: "select"
        select: {
          options: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        id: string
        name: string
      }
    | {
        type: "multi_select"
        multi_select: {
          options: Array<{
            name: StringRequest
            id?: StringRequest
            color?: selectColorLookup
          }>
        }
        id: string
        name: string
      }
    | {
        type: "relation"
        relation: {
          database_id: IdRequest
          synced_property_id: string
          synced_property_name: string
        }
        id: string
        name: string
      }
    | {
        type: "rollup"
        rollup: {
          rollup_property_name: string
          relation_property_name: string
          rollup_property_id: string
          relation_property_id: string
          function: functionLookup
        }
        id: string
        name: string
      }
    | { type: "title"; title: Record<string, never>; id: string; name: string }
    | {
        type: "rich_text"
        rich_text: Record<string, never>
        id: string
        name: string
      }
    | { type: "url"; url: Record<string, never>; id: string; name: string }
    | {
        type: "people"
        people: Record<string, never>
        id: string
        name: string
      }
    | { type: "files"; files: Record<string, never>; id: string; name: string }
    | { type: "email"; email: Record<string, never>; id: string; name: string }
    | {
        type: "phone_number"
        phone_number: Record<string, never>
        id: string
        name: string
      }
    | { type: "date"; date: Record<string, never>; id: string; name: string }
    | {
        type: "checkbox"
        checkbox: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "created_by"
        created_by: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "created_time"
        created_time: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "last_edited_by"
        last_edited_by: Record<string, never>
        id: string
        name: string
      }
    | {
        type: "last_edited_time"
        last_edited_time: Record<string, never>
        id: string
        name: string
      }
  >
  parent:
    | { type: "page_id"; page_id: string }
    | { type: "workspace"; workspace: true }
  object: "database"
  id: string
  created_time: string
  last_edited_time: string
  url: string
}

export const createDatabase = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["parent", "properties", "icon", "cover", "title"],
  path: (): string => `databases`,
} as const

export type SearchBodyParameters = {
  sort?: {
    timestamp: "last_edited_time"
    direction: "ascending" | "descending"
  }
  query?: string
  start_cursor?: string
  page_size?: number
  filter?: { property: "object"; value: "page" | "database" }
}

export type SearchParameters = SearchBodyParameters

export type SearchResponse =
  | {
      type: "rollup"
      rollup:
        | {
            type: "number"
            number: number | null
            function: functionLookup
          }
        | {
            type: "date"
            date: { start: string; end: string | null } | null
            function: functionLookup
          }
        | {
            type: "array"
            array: Array<
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                }
              | { type: "formula"; formula: { expression: string } }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                }
              | { type: "title"; title: Record<string, never> }
              | { type: "rich_text"; rich_text: Record<string, never> }
              | { type: "url"; url: Record<string, never> }
              | { type: "people"; people: Record<string, never> }
              | { type: "files"; files: Record<string, never> }
              | { type: "email"; email: Record<string, never> }
              | { type: "phone_number"; phone_number: Record<string, never> }
              | { type: "date"; date: Record<string, never> }
              | { type: "checkbox"; checkbox: Record<string, never> }
              | { type: "created_by"; created_by: Record<string, never> }
              | { type: "created_time"; created_time: Record<string, never> }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                }
            >
            function: functionLookup
          }
        | {
            type: "unsupported"
            unsupported: Record<string, never>
            function: functionLookup
          }
      object: "list"
      results: Array<
        | {
            parent:
              | { type: "database_id"; database_id: IdRequest }
              | { type: "page_id"; page_id: IdRequest }
              | { type: "workspace"; workspace: true }
            properties: Record<
              string,
              | {
                  type: "title"
                  title: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                  id: string
                }
              | {
                  type: "rich_text"
                  rich_text: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                  id: string
                }
              | { type: "number"; number: number; id: string }
              | { type: "url"; url: string; id: string }
              | {
                  type: "select"
                  select: {
                    id: StringRequest
                    name: StringRequest
                    color: selectColorLookup
                  }
                  id: string
                }
              | {
                  type: "multi_select"
                  multi_select: Array<{
                    id: StringRequest
                    name: StringRequest
                    color: selectColorLookup
                  }>
                  id: string
                }
              | {
                  type: "people"
                  people: Array<
                    | { id: IdRequest; object: "user" }
                    | {
                        type: "person"
                        person: { email: string }
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                    | {
                        type: "bot"
                        bot: botLookup
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                  >
                  id: string
                }
              | { type: "email"; email: string; id: string }
              | { type: "phone_number"; phone_number: string; id: string }
              | {
                  type: "date"
                  date: { start: string; end: string | null }
                  id: string
                }
              | {
                  type: "files"
                  files: Array<
                    | {
                        file: { url: string; expiry_time: string }
                        name: string
                        type?: "file"
                      }
                    | {
                        external: { url: string }
                        name: string
                        type?: "external"
                      }
                  >
                  id: string
                }
              | { type: "checkbox"; checkbox: boolean; id: string }
              | {
                  type: "formula"
                  formula:
                    | { type: "string"; string: string | null }
                    | {
                        type: "date"
                        date: { start: string; end: string | null } | null
                      }
                    | { type: "number"; number: number | null }
                    | { type: "boolean"; boolean: boolean | null }
                  id: string
                }
              | {
                  type: "relation"
                  relation: Array<{ id: string }>
                  id: string
                }
              | {
                  type: "rollup"
                  rollup:
                    | {
                        type: "number"
                        number: number | null
                        function: functionLookup
                      }
                    | {
                        type: "date"
                        date: { start: string; end: string | null } | null
                        function: functionLookup
                      }
                    | {
                        type: "array"
                        array: Array<
                          | {
                              type: "number"
                              number: {
                                format: formatLookup
                              }
                            }
                          | { type: "formula"; formula: { expression: string } }
                          | {
                              type: "select"
                              select: {
                                options: Array<{
                                  name: StringRequest
                                  id?: StringRequest
                                  color?: selectColorLookup
                                }>
                              }
                            }
                          | {
                              type: "multi_select"
                              multi_select: {
                                options: Array<{
                                  name: StringRequest
                                  id?: StringRequest
                                  color?: selectColorLookup
                                }>
                              }
                            }
                          | {
                              type: "relation"
                              relation: {
                                database_id: IdRequest
                                synced_property_id: string
                                synced_property_name: string
                              }
                            }
                          | {
                              type: "rollup"
                              rollup: {
                                rollup_property_name: string
                                relation_property_name: string
                                rollup_property_id: string
                                relation_property_id: string
                                function: functionLookup
                              }
                            }
                          | { type: "title"; title: Record<string, never> }
                          | {
                              type: "rich_text"
                              rich_text: Record<string, never>
                            }
                          | { type: "url"; url: Record<string, never> }
                          | { type: "people"; people: Record<string, never> }
                          | { type: "files"; files: Record<string, never> }
                          | { type: "email"; email: Record<string, never> }
                          | {
                              type: "phone_number"
                              phone_number: Record<string, never>
                            }
                          | { type: "date"; date: Record<string, never> }
                          | {
                              type: "checkbox"
                              checkbox: Record<string, never>
                            }
                          | {
                              type: "created_by"
                              created_by: Record<string, never>
                            }
                          | {
                              type: "created_time"
                              created_time: Record<string, never>
                            }
                          | {
                              type: "last_edited_by"
                              last_edited_by: Record<string, never>
                            }
                          | {
                              type: "last_edited_time"
                              last_edited_time: Record<string, never>
                            }
                        >
                        function: functionLookup
                      }
                    | {
                        type: "unsupported"
                        unsupported: Record<string, never>
                        function: functionLookup
                      }
                  id: string
                }
              | { type: "created_time"; created_time: string; id: string }
              | {
                  type: "created_by"
                  created_by:
                    | { id: IdRequest; object: "user" }
                    | {
                        type: "person"
                        person: { email: string }
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                    | {
                        type: "bot"
                        bot: botLookup
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                  id: string
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: string
                  id: string
                }
              | {
                  type: "last_edited_by"
                  last_edited_by:
                    | { id: IdRequest; object: "user" }
                    | {
                        type: "person"
                        person: { email: string }
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                    | {
                        type: "bot"
                        bot: botLookup
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                  id: string
                }
            >
            icon:
              | {
                  type: "emoji"
                  emoji: emojiLookup
                }
              | null
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            cover:
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            object: "page"
            id: string
            created_time: string
            last_edited_time: string
            archived: boolean
            url: string
          }
        | {
            title: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
            icon:
              | {
                  type: "emoji"
                  emoji: emojiLookup
                }
              | null
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            cover:
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            properties: Record<
              string,
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                  id: string
                  name: string
                }
              | {
                  type: "formula"
                  formula: { expression: string }
                  id: string
                  name: string
                }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                  id: string
                  name: string
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                  id: string
                  name: string
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                  id: string
                  name: string
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                  id: string
                  name: string
                }
              | {
                  type: "title"
                  title: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "rich_text"
                  rich_text: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "url"
                  url: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "people"
                  people: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "files"
                  files: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "email"
                  email: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "phone_number"
                  phone_number: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "date"
                  date: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "checkbox"
                  checkbox: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "created_by"
                  created_by: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "created_time"
                  created_time: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                  id: string
                  name: string
                }
            >
            parent:
              | { type: "page_id"; page_id: string }
              | { type: "workspace"; workspace: true }
            object: "database"
            id: string
            created_time: string
            last_edited_time: string
            url: string
          }
      >
      next_cursor: string | null
      has_more: boolean
    }
  | {
      object: "list"
      results: Array<
        | {
            parent:
              | { type: "database_id"; database_id: IdRequest }
              | { type: "page_id"; page_id: IdRequest }
              | { type: "workspace"; workspace: true }
            properties: Record<
              string,
              | {
                  type: "title"
                  title: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                  id: string
                }
              | {
                  type: "rich_text"
                  rich_text: Array<
                    | {
                        type: "text"
                        text: {
                          content: string
                          link: { url: TextRequest } | null
                        }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "mention"
                        mention: mentionLookup
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                    | {
                        type: "equation"
                        equation: { expression: TextRequest }
                        annotations: annotationsLookup
                        plain_text: string
                        href: string | null
                      }
                  >
                  id: string
                }
              | { type: "number"; number: number; id: string }
              | { type: "url"; url: string; id: string }
              | {
                  type: "select"
                  select: {
                    id: StringRequest
                    name: StringRequest
                    color: selectColorLookup
                  }
                  id: string
                }
              | {
                  type: "multi_select"
                  multi_select: Array<{
                    id: StringRequest
                    name: StringRequest
                    color: selectColorLookup
                  }>
                  id: string
                }
              | {
                  type: "people"
                  people: Array<
                    | { id: IdRequest; object: "user" }
                    | {
                        type: "person"
                        person: { email: string }
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                    | {
                        type: "bot"
                        bot: botLookup
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                  >
                  id: string
                }
              | { type: "email"; email: string; id: string }
              | { type: "phone_number"; phone_number: string; id: string }
              | {
                  type: "date"
                  date: { start: string; end: string | null }
                  id: string
                }
              | {
                  type: "files"
                  files: Array<
                    | {
                        file: { url: string; expiry_time: string }
                        name: string
                        type?: "file"
                      }
                    | {
                        external: { url: string }
                        name: string
                        type?: "external"
                      }
                  >
                  id: string
                }
              | { type: "checkbox"; checkbox: boolean; id: string }
              | {
                  type: "formula"
                  formula:
                    | { type: "string"; string: string | null }
                    | {
                        type: "date"
                        date: { start: string; end: string | null } | null
                      }
                    | { type: "number"; number: number | null }
                    | { type: "boolean"; boolean: boolean | null }
                  id: string
                }
              | {
                  type: "relation"
                  relation: Array<{ id: string }>
                  id: string
                }
              | {
                  type: "rollup"
                  rollup:
                    | {
                        type: "number"
                        number: number | null
                        function: functionLookup
                      }
                    | {
                        type: "date"
                        date: { start: string; end: string | null } | null
                        function: functionLookup
                      }
                    | {
                        type: "array"
                        array: Array<
                          | {
                              type: "number"
                              number: {
                                format: formatLookup
                              }
                            }
                          | { type: "formula"; formula: { expression: string } }
                          | {
                              type: "select"
                              select: {
                                options: Array<{
                                  name: StringRequest
                                  id?: StringRequest
                                  color?: selectColorLookup
                                }>
                              }
                            }
                          | {
                              type: "multi_select"
                              multi_select: {
                                options: Array<{
                                  name: StringRequest
                                  id?: StringRequest
                                  color?: selectColorLookup
                                }>
                              }
                            }
                          | {
                              type: "relation"
                              relation: {
                                database_id: IdRequest
                                synced_property_id: string
                                synced_property_name: string
                              }
                            }
                          | {
                              type: "rollup"
                              rollup: {
                                rollup_property_name: string
                                relation_property_name: string
                                rollup_property_id: string
                                relation_property_id: string
                                function: functionLookup
                              }
                            }
                          | { type: "title"; title: Record<string, never> }
                          | {
                              type: "rich_text"
                              rich_text: Record<string, never>
                            }
                          | { type: "url"; url: Record<string, never> }
                          | { type: "people"; people: Record<string, never> }
                          | { type: "files"; files: Record<string, never> }
                          | { type: "email"; email: Record<string, never> }
                          | {
                              type: "phone_number"
                              phone_number: Record<string, never>
                            }
                          | { type: "date"; date: Record<string, never> }
                          | {
                              type: "checkbox"
                              checkbox: Record<string, never>
                            }
                          | {
                              type: "created_by"
                              created_by: Record<string, never>
                            }
                          | {
                              type: "created_time"
                              created_time: Record<string, never>
                            }
                          | {
                              type: "last_edited_by"
                              last_edited_by: Record<string, never>
                            }
                          | {
                              type: "last_edited_time"
                              last_edited_time: Record<string, never>
                            }
                        >
                        function: functionLookup
                      }
                    | {
                        type: "unsupported"
                        unsupported: Record<string, never>
                        function: functionLookup
                      }
                  id: string
                }
              | { type: "created_time"; created_time: string; id: string }
              | {
                  type: "created_by"
                  created_by:
                    | { id: IdRequest; object: "user" }
                    | {
                        type: "person"
                        person: { email: string }
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                    | {
                        type: "bot"
                        bot: botLookup
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                  id: string
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: string
                  id: string
                }
              | {
                  type: "last_edited_by"
                  last_edited_by:
                    | { id: IdRequest; object: "user" }
                    | {
                        type: "person"
                        person: { email: string }
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                    | {
                        type: "bot"
                        bot: botLookup
                        name: string | null
                        avatar_url: string | null
                        id: IdRequest
                        object: "user"
                      }
                  id: string
                }
            >
            icon:
              | {
                  type: "emoji"
                  emoji: emojiLookup
                }
              | null
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            cover:
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            object: "page"
            id: string
            created_time: string
            last_edited_time: string
            archived: boolean
            url: string
          }
        | {
            title: Array<
              | {
                  type: "text"
                  text: { content: string; link: { url: TextRequest } | null }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "mention"
                  mention: mentionLookup
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
              | {
                  type: "equation"
                  equation: { expression: TextRequest }
                  annotations: annotationsLookup
                  plain_text: string
                  href: string | null
                }
            >
            icon:
              | {
                  type: "emoji"
                  emoji: emojiLookup
                }
              | null
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            cover:
              | { type: "external"; external: { url: string } }
              | null
              | { type: "file"; file: { url: string; expiry_time: string } }
              | null
            properties: Record<
              string,
              | {
                  type: "number"
                  number: {
                    format: formatLookup
                  }
                  id: string
                  name: string
                }
              | {
                  type: "formula"
                  formula: { expression: string }
                  id: string
                  name: string
                }
              | {
                  type: "select"
                  select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                  id: string
                  name: string
                }
              | {
                  type: "multi_select"
                  multi_select: {
                    options: Array<{
                      name: StringRequest
                      id?: StringRequest
                      color?: selectColorLookup
                    }>
                  }
                  id: string
                  name: string
                }
              | {
                  type: "relation"
                  relation: {
                    database_id: IdRequest
                    synced_property_id: string
                    synced_property_name: string
                  }
                  id: string
                  name: string
                }
              | {
                  type: "rollup"
                  rollup: {
                    rollup_property_name: string
                    relation_property_name: string
                    rollup_property_id: string
                    relation_property_id: string
                    function: functionLookup
                  }
                  id: string
                  name: string
                }
              | {
                  type: "title"
                  title: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "rich_text"
                  rich_text: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "url"
                  url: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "people"
                  people: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "files"
                  files: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "email"
                  email: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "phone_number"
                  phone_number: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "date"
                  date: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "checkbox"
                  checkbox: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "created_by"
                  created_by: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "created_time"
                  created_time: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "last_edited_by"
                  last_edited_by: Record<string, never>
                  id: string
                  name: string
                }
              | {
                  type: "last_edited_time"
                  last_edited_time: Record<string, never>
                  id: string
                  name: string
                }
            >
            parent:
              | { type: "page_id"; page_id: string }
              | { type: "workspace"; workspace: true }
            object: "database"
            id: string
            created_time: string
            last_edited_time: string
            url: string
          }
      >
      next_cursor: string | null
      has_more: boolean
    }

export const search = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["sort", "query", "start_cursor", "page_size", "filter"],
  path: (): string => `search`,
} as const


export type annotationColorLookup =
| "default"
| "gray"
| "brown"
| "orange"
| "yellow"
| "green"
| "blue"
| "purple"
| "pink"
| "red"
| "gray_background"
| "brown_background"
| "orange_background"
| "yellow_background"
| "green_background"
| "blue_background"
| "purple_background"
| "pink_background"
| "red_background"

export type botLookup =
| Record<string, never>
| {
    owner:
      | {
          type: "user"
          user:
            | {
                type: "person"
                person: { email: string }
                name: string | null
                avatar_url: string | null
                id: IdRequest
                object: "user"
              }
            | { id: IdRequest; object: "user" }
        }
      | { type: "workspace"; workspace: true }
  }

export type mediaBlockLookup = {
  external: { url: string }
  type?: "external"
  caption?: Array<RichTextItemRequest>
}

export type languageLookup =
| "abap"
| "arduino"
| "bash"
| "basic"
| "c"
| "clojure"
| "coffeescript"
| "c++"
| "c#"
| "css"
| "dart"
| "diff"
| "docker"
| "elixir"
| "elm"
| "erlang"
| "flow"
| "fortran"
| "f#"
| "gherkin"
| "glsl"
| "go"
| "graphql"
| "groovy"
| "haskell"
| "html"
| "java"
| "javascript"
| "json"
| "julia"
| "kotlin"
| "latex"
| "less"
| "lisp"
| "livescript"
| "lua"
| "makefile"
| "markdown"
| "markup"
| "matlab"
| "mermaid"
| "nix"
| "objective-c"
| "ocaml"
| "pascal"
| "perl"
| "php"
| "plain text"
| "powershell"
| "prolog"
| "protobuf"
| "python"
| "r"
| "reason"
| "ruby"
| "rust"
| "sass"
| "scala"
| "scheme"
| "scss"
| "shell"
| "sql"
| "swift"
| "typescript"
| "vb.net"
| "verilog"
| "vhdl"
| "visual basic"
| "webassembly"
| "xml"
| "yaml"
| "java/c/c++/c#"

export type emojiLookup =
| "😀"
| "😃"
| "😄"
| "😁"
| "😆"
| "😅"
| "🤣"
| "😂"
| "🙂"
| "🙃"
| "😉"
| "😊"
| "😇"
| "🥰"
| "😍"
| "🤩"
| "😘"
| "😗"
| "☺️"
| "☺"
| "😚"
| "😙"
| "🥲"
| "😋"
| "😛"
| "😜"
| "🤪"
| "😝"
| "🤑"
| "🤗"
| "🤭"
| "🤫"
| "🤔"
| "🤐"
| "🤨"
| "😐"
| "😑"
| "😶"
| "😶‍🌫️"
| "😶‍🌫"
| "😏"
| "😒"
| "🙄"
| "😬"
| "😮‍💨"
| "🤥"
| "😌"
| "😔"
| "😪"
| "🤤"
| "😴"
| "😷"
| "🤒"
| "🤕"
| "🤢"
| "🤮"
| "🤧"
| "🥵"
| "🥶"
| "🥴"
| "😵"
| "😵‍💫"
| "🤯"
| "🤠"
| "🥳"
| "🥸"
| "😎"
| "🤓"
| "🧐"
| "😕"
| "😟"
| "🙁"
| "☹️"
| "☹"
| "😮"
| "😯"
| "😲"
| "😳"
| "🥺"
| "😦"
| "😧"
| "😨"
| "😰"
| "😥"
| "😢"
| "😭"
| "😱"
| "😖"
| "😣"
| "😞"
| "😓"
| "😩"
| "😫"
| "🥱"
| "😤"
| "😡"
| "😠"
| "🤬"
| "😈"
| "👿"
| "💀"
| "☠️"
| "☠"
| "💩"
| "🤡"
| "👹"
| "👺"
| "👻"
| "👽"
| "👾"
| "🤖"
| "😺"
| "😸"
| "😹"
| "😻"
| "😼"
| "😽"
| "🙀"
| "😿"
| "😾"
| "🙈"
| "🙉"
| "🙊"
| "💋"
| "💌"
| "💘"
| "💝"
| "💖"
| "💗"
| "💓"
| "💞"
| "💕"
| "💟"
| "❣️"
| "❣"
| "💔"
| "❤️‍🔥"
| "❤‍🔥"
| "❤️‍🩹"
| "❤‍🩹"
| "❤️"
| "❤"
| "🧡"
| "💛"
| "💚"
| "💙"
| "💜"
| "🤎"
| "🖤"
| "🤍"
| "💯"
| "💢"
| "💥"
| "💫"
| "💦"
| "💨"
| "🕳️"
| "🕳"
| "💣"
| "💬"
| "👁️‍🗨️"
| "🗨️"
| "🗨"
| "🗯️"
| "🗯"
| "💭"
| "💤"
| "👋🏻"
| "👋🏼"
| "👋🏽"
| "👋🏾"
| "👋🏿"
| "👋"
| "🤚🏻"
| "🤚🏼"
| "🤚🏽"
| "🤚🏾"
| "🤚🏿"
| "🤚"
| "🖐🏻"
| "🖐🏼"
| "🖐🏽"
| "🖐🏾"
| "🖐🏿"
| "🖐️"
| "🖐"
| "✋🏻"
| "✋🏼"
| "✋🏽"
| "✋🏾"
| "✋🏿"
| "✋"
| "🖖🏻"
| "🖖🏼"
| "🖖🏽"
| "🖖🏾"
| "🖖🏿"
| "🖖"
| "👌🏻"
| "👌🏼"
| "👌🏽"
| "👌🏾"
| "👌🏿"
| "👌"
| "🤌🏻"
| "🤌🏼"
| "🤌🏽"
| "🤌🏾"
| "🤌🏿"
| "🤌"
| "🤏🏻"
| "🤏🏼"
| "🤏🏽"
| "🤏🏾"
| "🤏🏿"
| "🤏"
| "✌🏻"
| "✌🏼"
| "✌🏽"
| "✌🏾"
| "✌🏿"
| "✌️"
| "✌"
| "🤞🏻"
| "🤞🏼"
| "🤞🏽"
| "🤞🏾"
| "🤞🏿"
| "🤞"
| "🤟🏻"
| "🤟🏼"
| "🤟🏽"
| "🤟🏾"
| "🤟🏿"
| "🤟"
| "🤘🏻"
| "🤘🏼"
| "🤘🏽"
| "🤘🏾"
| "🤘🏿"
| "🤘"
| "🤙🏻"
| "🤙🏼"
| "🤙🏽"
| "🤙🏾"
| "🤙🏿"
| "🤙"
| "👈🏻"
| "👈🏼"
| "👈🏽"
| "👈🏾"
| "👈🏿"
| "👈"
| "👉🏻"
| "👉🏼"
| "👉🏽"
| "👉🏾"
| "👉🏿"
| "👉"
| "👆🏻"
| "👆🏼"
| "👆🏽"
| "👆🏾"
| "👆🏿"
| "👆"
| "🖕🏻"
| "🖕🏼"
| "🖕🏽"
| "🖕🏾"
| "🖕🏿"
| "🖕"
| "👇🏻"
| "👇🏼"
| "👇🏽"
| "👇🏾"
| "👇🏿"
| "👇"
| "☝🏻"
| "☝🏼"
| "☝🏽"
| "☝🏾"
| "☝🏿"
| "☝️"
| "☝"
| "👍🏻"
| "👍🏼"
| "👍🏽"
| "👍🏾"
| "👍🏿"
| "👍"
| "👎🏻"
| "👎🏼"
| "👎🏽"
| "👎🏾"
| "👎🏿"
| "👎"
| "✊🏻"
| "✊🏼"
| "✊🏽"
| "✊🏾"
| "✊🏿"
| "✊"
| "👊🏻"
| "👊🏼"
| "👊🏽"
| "👊🏾"
| "👊🏿"
| "👊"
| "🤛🏻"
| "🤛🏼"
| "🤛🏽"
| "🤛🏾"
| "🤛🏿"
| "🤛"
| "🤜🏻"
| "🤜🏼"
| "🤜🏽"
| "🤜🏾"
| "🤜🏿"
| "🤜"
| "👏🏻"
| "👏🏼"
| "👏🏽"
| "👏🏾"
| "👏🏿"
| "👏"
| "🙌🏻"
| "🙌🏼"
| "🙌🏽"
| "🙌🏾"
| "🙌🏿"
| "🙌"
| "👐🏻"
| "👐🏼"
| "👐🏽"
| "👐🏾"
| "👐🏿"
| "👐"
| "🤲🏻"
| "🤲🏼"
| "🤲🏽"
| "🤲🏾"
| "🤲🏿"
| "🤲"
| "🤝"
| "🙏🏻"
| "🙏🏼"
| "🙏🏽"
| "🙏🏾"
| "🙏🏿"
| "🙏"
| "✍🏻"
| "✍🏼"
| "✍🏽"
| "✍🏾"
| "✍🏿"
| "✍️"
| "✍"
| "💅🏻"
| "💅🏼"
| "💅🏽"
| "💅🏾"
| "💅🏿"
| "💅"
| "🤳🏻"
| "🤳🏼"
| "🤳🏽"
| "🤳🏾"
| "🤳🏿"
| "🤳"
| "💪🏻"
| "💪🏼"
| "💪🏽"
| "💪🏾"
| "💪🏿"
| "💪"
| "🦾"
| "🦿"
| "🦵🏻"
| "🦵🏼"
| "🦵🏽"
| "🦵🏾"
| "🦵🏿"
| "🦵"
| "🦶🏻"
| "🦶🏼"
| "🦶🏽"
| "🦶🏾"
| "🦶🏿"
| "🦶"
| "👂🏻"
| "👂🏼"
| "👂🏽"
| "👂🏾"
| "👂🏿"
| "👂"
| "🦻🏻"
| "🦻🏼"
| "🦻🏽"
| "🦻🏾"
| "🦻🏿"
| "🦻"
| "👃🏻"
| "👃🏼"
| "👃🏽"
| "👃🏾"
| "👃🏿"
| "👃"
| "🧠"
| "🫀"
| "🫁"
| "🦷"
| "🦴"
| "👀"
| "👁️"
| "👁"
| "👅"
| "👄"
| "👶🏻"
| "👶🏼"
| "👶🏽"
| "👶🏾"
| "👶🏿"
| "👶"
| "🧒🏻"
| "🧒🏼"
| "🧒🏽"
| "🧒🏾"
| "🧒🏿"
| "🧒"
| "👦🏻"
| "👦🏼"
| "👦🏽"
| "👦🏾"
| "👦🏿"
| "👦"
| "👧🏻"
| "👧🏼"
| "👧🏽"
| "👧🏾"
| "👧🏿"
| "👧"
| "🧑🏻"
| "🧑🏼"
| "🧑🏽"
| "🧑🏾"
| "🧑🏿"
| "🧑"
| "👱🏻"
| "👱🏼"
| "👱🏽"
| "👱🏾"
| "👱🏿"
| "👱"
| "👨🏻"
| "👨🏼"
| "👨🏽"
| "👨🏾"
| "👨🏿"
| "👨"
| "🧔🏻"
| "🧔🏼"
| "🧔🏽"
| "🧔🏾"
| "🧔🏿"
| "🧔"
| "🧔🏻‍♂️"
| "🧔🏼‍♂️"
| "🧔🏽‍♂️"
| "🧔🏾‍♂️"
| "🧔🏿‍♂️"
| "🧔‍♂️"
| "🧔‍♂"
| "🧔🏻‍♀️"
| "🧔🏼‍♀️"
| "🧔🏽‍♀️"
| "🧔🏾‍♀️"
| "🧔🏿‍♀️"
| "🧔‍♀️"
| "🧔‍♀"
| "👨🏻‍🦰"
| "👨🏼‍🦰"
| "👨🏽‍🦰"
| "👨🏾‍🦰"
| "👨🏿‍🦰"
| "👨‍🦰"
| "👨🏻‍🦱"
| "👨🏼‍🦱"
| "👨🏽‍🦱"
| "👨🏾‍🦱"
| "👨🏿‍🦱"
| "👨‍🦱"
| "👨🏻‍🦳"
| "👨🏼‍🦳"
| "👨🏽‍🦳"
| "👨🏾‍🦳"
| "👨🏿‍🦳"
| "👨‍🦳"
| "👨🏻‍🦲"
| "👨🏼‍🦲"
| "👨🏽‍🦲"
| "👨🏾‍🦲"
| "👨🏿‍🦲"
| "👨‍🦲"
| "👩🏻"
| "👩🏼"
| "👩🏽"
| "👩🏾"
| "👩🏿"
| "👩"
| "👩🏻‍🦰"
| "👩🏼‍🦰"
| "👩🏽‍🦰"
| "👩🏾‍🦰"
| "👩🏿‍🦰"
| "👩‍🦰"
| "🧑🏻‍🦰"
| "🧑🏼‍🦰"
| "🧑🏽‍🦰"
| "🧑🏾‍🦰"
| "🧑🏿‍🦰"
| "🧑‍🦰"
| "👩🏻‍🦱"
| "👩🏼‍🦱"
| "👩🏽‍🦱"
| "👩🏾‍🦱"
| "👩🏿‍🦱"
| "👩‍🦱"
| "🧑🏻‍🦱"
| "🧑🏼‍🦱"
| "🧑🏽‍🦱"
| "🧑🏾‍🦱"
| "🧑🏿‍🦱"
| "🧑‍🦱"
| "👩🏻‍🦳"
| "👩🏼‍🦳"
| "👩🏽‍🦳"
| "👩🏾‍🦳"
| "👩🏿‍🦳"
| "👩‍🦳"
| "🧑🏻‍🦳"
| "🧑🏼‍🦳"
| "🧑🏽‍🦳"
| "🧑🏾‍🦳"
| "🧑🏿‍🦳"
| "🧑‍🦳"
| "👩🏻‍🦲"
| "👩🏼‍🦲"
| "👩🏽‍🦲"
| "👩🏾‍🦲"
| "👩🏿‍🦲"
| "👩‍🦲"
| "🧑🏻‍🦲"
| "🧑🏼‍🦲"
| "🧑🏽‍🦲"
| "🧑🏾‍🦲"
| "🧑🏿‍🦲"
| "🧑‍🦲"
| "👱🏻‍♀️"
| "👱🏼‍♀️"
| "👱🏽‍♀️"
| "👱🏾‍♀️"
| "👱🏿‍♀️"
| "👱‍♀️"
| "👱‍♀"
| "👱🏻‍♂️"
| "👱🏼‍♂️"
| "👱🏽‍♂️"
| "👱🏾‍♂️"
| "👱🏿‍♂️"
| "👱‍♂️"
| "👱‍♂"
| "🧓🏻"
| "🧓🏼"
| "🧓🏽"
| "🧓🏾"
| "🧓🏿"
| "🧓"
| "👴🏻"
| "👴🏼"
| "👴🏽"
| "👴🏾"
| "👴🏿"
| "👴"
| "👵🏻"
| "👵🏼"
| "👵🏽"
| "👵🏾"
| "👵🏿"
| "👵"
| "🙍🏻"
| "🙍🏼"
| "🙍🏽"
| "🙍🏾"
| "🙍🏿"
| "🙍"
| "🙍🏻‍♂️"
| "🙍🏼‍♂️"
| "🙍🏽‍♂️"
| "🙍🏾‍♂️"
| "🙍🏿‍♂️"
| "🙍‍♂️"
| "🙍‍♂"
| "🙍🏻‍♀️"
| "🙍🏼‍♀️"
| "🙍🏽‍♀️"
| "🙍🏾‍♀️"
| "🙍🏿‍♀️"
| "🙍‍♀️"
| "🙍‍♀"
| "🙎🏻"
| "🙎🏼"
| "🙎🏽"
| "🙎🏾"
| "🙎🏿"
| "🙎"
| "🙎🏻‍♂️"
| "🙎🏼‍♂️"
| "🙎🏽‍♂️"
| "🙎🏾‍♂️"
| "🙎🏿‍♂️"
| "🙎‍♂️"
| "🙎‍♂"
| "🙎🏻‍♀️"
| "🙎🏼‍♀️"
| "🙎🏽‍♀️"
| "🙎🏾‍♀️"
| "🙎🏿‍♀️"
| "🙎‍♀️"
| "🙎‍♀"
| "🙅🏻"
| "🙅🏼"
| "🙅🏽"
| "🙅🏾"
| "🙅🏿"
| "🙅"
| "🙅🏻‍♂️"
| "🙅🏼‍♂️"
| "🙅🏽‍♂️"
| "🙅🏾‍♂️"
| "🙅🏿‍♂️"
| "🙅‍♂️"
| "🙅‍♂"
| "🙅🏻‍♀️"
| "🙅🏼‍♀️"
| "🙅🏽‍♀️"
| "🙅🏾‍♀️"
| "🙅🏿‍♀️"
| "🙅‍♀️"
| "🙅‍♀"
| "🙆🏻"
| "🙆🏼"
| "🙆🏽"
| "🙆🏾"
| "🙆🏿"
| "🙆"
| "🙆🏻‍♂️"
| "🙆🏼‍♂️"
| "🙆🏽‍♂️"
| "🙆🏾‍♂️"
| "🙆🏿‍♂️"
| "🙆‍♂️"
| "🙆‍♂"
| "🙆🏻‍♀️"
| "🙆🏼‍♀️"
| "🙆🏽‍♀️"
| "🙆🏾‍♀️"
| "🙆🏿‍♀️"
| "🙆‍♀️"
| "🙆‍♀"
| "💁🏻"
| "💁🏼"
| "💁🏽"
| "💁🏾"
| "💁🏿"
| "💁"
| "💁🏻‍♂️"
| "💁🏼‍♂️"
| "💁🏽‍♂️"
| "💁🏾‍♂️"
| "💁🏿‍♂️"
| "💁‍♂️"
| "💁‍♂"
| "💁🏻‍♀️"
| "💁🏼‍♀️"
| "💁🏽‍♀️"
| "💁🏾‍♀️"
| "💁🏿‍♀️"
| "💁‍♀️"
| "💁‍♀"
| "🙋🏻"
| "🙋🏼"
| "🙋🏽"
| "🙋🏾"
| "🙋🏿"
| "🙋"
| "🙋🏻‍♂️"
| "🙋🏼‍♂️"
| "🙋🏽‍♂️"
| "🙋🏾‍♂️"
| "🙋🏿‍♂️"
| "🙋‍♂️"
| "🙋‍♂"
| "🙋🏻‍♀️"
| "🙋🏼‍♀️"
| "🙋🏽‍♀️"
| "🙋🏾‍♀️"
| "🙋🏿‍♀️"
| "🙋‍♀️"
| "🙋‍♀"
| "🧏🏻"
| "🧏🏼"
| "🧏🏽"
| "🧏🏾"
| "🧏🏿"
| "🧏"
| "🧏🏻‍♂️"
| "🧏🏼‍♂️"
| "🧏🏽‍♂️"
| "🧏🏾‍♂️"
| "🧏🏿‍♂️"
| "🧏‍♂️"
| "🧏‍♂"
| "🧏🏻‍♀️"
| "🧏🏼‍♀️"
| "🧏🏽‍♀️"
| "🧏🏾‍♀️"
| "🧏🏿‍♀️"
| "🧏‍♀️"
| "🧏‍♀"
| "🙇🏻"
| "🙇🏼"
| "🙇🏽"
| "🙇🏾"
| "🙇🏿"
| "🙇"
| "🙇🏻‍♂️"
| "🙇🏼‍♂️"
| "🙇🏽‍♂️"
| "🙇🏾‍♂️"
| "🙇🏿‍♂️"
| "🙇‍♂️"
| "🙇‍♂"
| "🙇🏻‍♀️"
| "🙇🏼‍♀️"
| "🙇🏽‍♀️"
| "🙇🏾‍♀️"
| "🙇🏿‍♀️"
| "🙇‍♀️"
| "🙇‍♀"
| "🤦🏻"
| "🤦🏼"
| "🤦🏽"
| "🤦🏾"
| "🤦🏿"
| "🤦"
| "🤦🏻‍♂️"
| "🤦🏼‍♂️"
| "🤦🏽‍♂️"
| "🤦🏾‍♂️"
| "🤦🏿‍♂️"
| "🤦‍♂️"
| "🤦‍♂"
| "🤦🏻‍♀️"
| "🤦🏼‍♀️"
| "🤦🏽‍♀️"
| "🤦🏾‍♀️"
| "🤦🏿‍♀️"
| "🤦‍♀️"
| "🤦‍♀"
| "🤷🏻"
| "🤷🏼"
| "🤷🏽"
| "🤷🏾"
| "🤷🏿"
| "🤷"
| "🤷🏻‍♂️"
| "🤷🏼‍♂️"
| "🤷🏽‍♂️"
| "🤷🏾‍♂️"
| "🤷🏿‍♂️"
| "🤷‍♂️"
| "🤷‍♂"
| "🤷🏻‍♀️"
| "🤷🏼‍♀️"
| "🤷🏽‍♀️"
| "🤷🏾‍♀️"
| "🤷🏿‍♀️"
| "🤷‍♀️"
| "🤷‍♀"
| "🧑🏻‍⚕️"
| "🧑🏼‍⚕️"
| "🧑🏽‍⚕️"
| "🧑🏾‍⚕️"
| "🧑🏿‍⚕️"
| "🧑‍⚕️"
| "🧑‍⚕"
| "👨🏻‍⚕️"
| "👨🏼‍⚕️"
| "👨🏽‍⚕️"
| "👨🏾‍⚕️"
| "👨🏿‍⚕️"
| "👨‍⚕️"
| "👨‍⚕"
| "👩🏻‍⚕️"
| "👩🏼‍⚕️"
| "👩🏽‍⚕️"
| "👩🏾‍⚕️"
| "👩🏿‍⚕️"
| "👩‍⚕️"
| "👩‍⚕"
| "🧑🏻‍🎓"
| "🧑🏼‍🎓"
| "🧑🏽‍🎓"
| "🧑🏾‍🎓"
| "🧑🏿‍🎓"
| "🧑‍🎓"
| "👨🏻‍🎓"
| "👨🏼‍🎓"
| "👨🏽‍🎓"
| "👨🏾‍🎓"
| "👨🏿‍🎓"
| "👨‍🎓"
| "👩🏻‍🎓"
| "👩🏼‍🎓"
| "👩🏽‍🎓"
| "👩🏾‍🎓"
| "👩🏿‍🎓"
| "👩‍🎓"
| "🧑🏻‍🏫"
| "🧑🏼‍🏫"
| "🧑🏽‍🏫"
| "🧑🏾‍🏫"
| "🧑🏿‍🏫"
| "🧑‍🏫"
| "👨🏻‍🏫"
| "👨🏼‍🏫"
| "👨🏽‍🏫"
| "👨🏾‍🏫"
| "👨🏿‍🏫"
| "👨‍🏫"
| "👩🏻‍🏫"
| "👩🏼‍🏫"
| "👩🏽‍🏫"
| "👩🏾‍🏫"
| "👩🏿‍🏫"
| "👩‍🏫"
| "🧑🏻‍⚖️"
| "🧑🏼‍⚖️"
| "🧑🏽‍⚖️"
| "🧑🏾‍⚖️"
| "🧑🏿‍⚖️"
| "🧑‍⚖️"
| "🧑‍⚖"
| "👨🏻‍⚖️"
| "👨🏼‍⚖️"
| "👨🏽‍⚖️"
| "👨🏾‍⚖️"
| "👨🏿‍⚖️"
| "👨‍⚖️"
| "👨‍⚖"
| "👩🏻‍⚖️"
| "👩🏼‍⚖️"
| "👩🏽‍⚖️"
| "👩🏾‍⚖️"
| "👩🏿‍⚖️"
| "👩‍⚖️"
| "👩‍⚖"
| "🧑🏻‍🌾"
| "🧑🏼‍🌾"
| "🧑🏽‍🌾"
| "🧑🏾‍🌾"
| "🧑🏿‍🌾"
| "🧑‍🌾"
| "👨🏻‍🌾"
| "👨🏼‍🌾"
| "👨🏽‍🌾"
| "👨🏾‍🌾"
| "👨🏿‍🌾"
| "👨‍🌾"
| "👩🏻‍🌾"
| "👩🏼‍🌾"
| "👩🏽‍🌾"
| "👩🏾‍🌾"
| "👩🏿‍🌾"
| "👩‍🌾"
| "🧑🏻‍🍳"
| "🧑🏼‍🍳"
| "🧑🏽‍🍳"
| "🧑🏾‍🍳"
| "🧑🏿‍🍳"
| "🧑‍🍳"
| "👨🏻‍🍳"
| "👨🏼‍🍳"
| "👨🏽‍🍳"
| "👨🏾‍🍳"
| "👨🏿‍🍳"
| "👨‍🍳"
| "👩🏻‍🍳"
| "👩🏼‍🍳"
| "👩🏽‍🍳"
| "👩🏾‍🍳"
| "👩🏿‍🍳"
| "👩‍🍳"
| "🧑🏻‍🔧"
| "🧑🏼‍🔧"
| "🧑🏽‍🔧"
| "🧑🏾‍🔧"
| "🧑🏿‍🔧"
| "🧑‍🔧"
| "👨🏻‍🔧"
| "👨🏼‍🔧"
| "👨🏽‍🔧"
| "👨🏾‍🔧"
| "👨🏿‍🔧"
| "👨‍🔧"
| "👩🏻‍🔧"
| "👩🏼‍🔧"
| "👩🏽‍🔧"
| "👩🏾‍🔧"
| "👩🏿‍🔧"
| "👩‍🔧"
| "🧑🏻‍🏭"
| "🧑🏼‍🏭"
| "🧑🏽‍🏭"
| "🧑🏾‍🏭"
| "🧑🏿‍🏭"
| "🧑‍🏭"
| "👨🏻‍🏭"
| "👨🏼‍🏭"
| "👨🏽‍🏭"
| "👨🏾‍🏭"
| "👨🏿‍🏭"
| "👨‍🏭"
| "👩🏻‍🏭"
| "👩🏼‍🏭"
| "👩🏽‍🏭"
| "👩🏾‍🏭"
| "👩🏿‍🏭"
| "👩‍🏭"
| "🧑🏻‍💼"
| "🧑🏼‍💼"
| "🧑🏽‍💼"
| "🧑🏾‍💼"
| "🧑🏿‍💼"
| "🧑‍💼"
| "👨🏻‍💼"
| "👨🏼‍💼"
| "👨🏽‍💼"
| "👨🏾‍💼"
| "👨🏿‍💼"
| "👨‍💼"
| "👩🏻‍💼"
| "👩🏼‍💼"
| "👩🏽‍💼"
| "👩🏾‍💼"
| "👩🏿‍💼"
| "👩‍💼"
| "🧑🏻‍🔬"
| "🧑🏼‍🔬"
| "🧑🏽‍🔬"
| "🧑🏾‍🔬"
| "🧑🏿‍🔬"
| "🧑‍🔬"
| "👨🏻‍🔬"
| "👨🏼‍🔬"
| "👨🏽‍🔬"
| "👨🏾‍🔬"
| "👨🏿‍🔬"
| "👨‍🔬"
| "👩🏻‍🔬"
| "👩🏼‍🔬"
| "👩🏽‍🔬"
| "👩🏾‍🔬"
| "👩🏿‍🔬"
| "👩‍🔬"
| "🧑🏻‍💻"
| "🧑🏼‍💻"
| "🧑🏽‍💻"
| "🧑🏾‍💻"
| "🧑🏿‍💻"
| "🧑‍💻"
| "👨🏻‍💻"
| "👨🏼‍💻"
| "👨🏽‍💻"
| "👨🏾‍💻"
| "👨🏿‍💻"
| "👨‍💻"
| "👩🏻‍💻"
| "👩🏼‍💻"
| "👩🏽‍💻"
| "👩🏾‍💻"
| "👩🏿‍💻"
| "👩‍💻"
| "🧑🏻‍🎤"
| "🧑🏼‍🎤"
| "🧑🏽‍🎤"
| "🧑🏾‍🎤"
| "🧑🏿‍🎤"
| "🧑‍🎤"
| "👨🏻‍🎤"
| "👨🏼‍🎤"
| "👨🏽‍🎤"
| "👨🏾‍🎤"
| "👨🏿‍🎤"
| "👨‍🎤"
| "👩🏻‍🎤"
| "👩🏼‍🎤"
| "👩🏽‍🎤"
| "👩🏾‍🎤"
| "👩🏿‍🎤"
| "👩‍🎤"
| "🧑🏻‍🎨"
| "🧑🏼‍🎨"
| "🧑🏽‍🎨"
| "🧑🏾‍🎨"
| "🧑🏿‍🎨"
| "🧑‍🎨"
| "👨🏻‍🎨"
| "👨🏼‍🎨"
| "👨🏽‍🎨"
| "👨🏾‍🎨"
| "👨🏿‍🎨"
| "👨‍🎨"
| "👩🏻‍🎨"
| "👩🏼‍🎨"
| "👩🏽‍🎨"
| "👩🏾‍🎨"
| "👩🏿‍🎨"
| "👩‍🎨"
| "🧑🏻‍✈️"
| "🧑🏼‍✈️"
| "🧑🏽‍✈️"
| "🧑🏾‍✈️"
| "🧑🏿‍✈️"
| "🧑‍✈️"
| "🧑‍✈"
| "👨🏻‍✈️"
| "👨🏼‍✈️"
| "👨🏽‍✈️"
| "👨🏾‍✈️"
| "👨🏿‍✈️"
| "👨‍✈️"
| "👨‍✈"
| "👩🏻‍✈️"
| "👩🏼‍✈️"
| "👩🏽‍✈️"
| "👩🏾‍✈️"
| "👩🏿‍✈️"
| "👩‍✈️"
| "👩‍✈"
| "🧑🏻‍🚀"
| "🧑🏼‍🚀"
| "🧑🏽‍🚀"
| "🧑🏾‍🚀"
| "🧑🏿‍🚀"
| "🧑‍🚀"
| "👨🏻‍🚀"
| "👨🏼‍🚀"
| "👨🏽‍🚀"
| "👨🏾‍🚀"
| "👨🏿‍🚀"
| "👨‍🚀"
| "👩🏻‍🚀"
| "👩🏼‍🚀"
| "👩🏽‍🚀"
| "👩🏾‍🚀"
| "👩🏿‍🚀"
| "👩‍🚀"
| "🧑🏻‍🚒"
| "🧑🏼‍🚒"
| "🧑🏽‍🚒"
| "🧑🏾‍🚒"
| "🧑🏿‍🚒"
| "🧑‍🚒"
| "👨🏻‍🚒"
| "👨🏼‍🚒"
| "👨🏽‍🚒"
| "👨🏾‍🚒"
| "👨🏿‍🚒"
| "👨‍🚒"
| "👩🏻‍🚒"
| "👩🏼‍🚒"
| "👩🏽‍🚒"
| "👩🏾‍🚒"
| "👩🏿‍🚒"
| "👩‍🚒"
| "👮🏻"
| "👮🏼"
| "👮🏽"
| "👮🏾"
| "👮🏿"
| "👮"
| "👮🏻‍♂️"
| "👮🏼‍♂️"
| "👮🏽‍♂️"
| "👮🏾‍♂️"
| "👮🏿‍♂️"
| "👮‍♂️"
| "👮‍♂"
| "👮🏻‍♀️"
| "👮🏼‍♀️"
| "👮🏽‍♀️"
| "👮🏾‍♀️"
| "👮🏿‍♀️"
| "👮‍♀️"
| "👮‍♀"
| "🕵🏻"
| "🕵🏼"
| "🕵🏽"
| "🕵🏾"
| "🕵🏿"
| "🕵️"
| "🕵"
| "🕵🏻‍♂️"
| "🕵🏼‍♂️"
| "🕵🏽‍♂️"
| "🕵🏾‍♂️"
| "🕵🏿‍♂️"
| "🕵️‍♂️"
| "🕵🏻‍♀️"
| "🕵🏼‍♀️"
| "🕵🏽‍♀️"
| "🕵🏾‍♀️"
| "🕵🏿‍♀️"
| "🕵️‍♀️"
| "💂🏻"
| "💂🏼"
| "💂🏽"
| "💂🏾"
| "💂🏿"
| "💂"
| "💂🏻‍♂️"
| "💂🏼‍♂️"
| "💂🏽‍♂️"
| "💂🏾‍♂️"
| "💂🏿‍♂️"
| "💂‍♂️"
| "💂‍♂"
| "💂🏻‍♀️"
| "💂🏼‍♀️"
| "💂🏽‍♀️"
| "💂🏾‍♀️"
| "💂🏿‍♀️"
| "💂‍♀️"
| "💂‍♀"
| "🥷🏻"
| "🥷🏼"
| "🥷🏽"
| "🥷🏾"
| "🥷🏿"
| "🥷"
| "👷🏻"
| "👷🏼"
| "👷🏽"
| "👷🏾"
| "👷🏿"
| "👷"
| "👷🏻‍♂️"
| "👷🏼‍♂️"
| "👷🏽‍♂️"
| "👷🏾‍♂️"
| "👷🏿‍♂️"
| "👷‍♂️"
| "👷‍♂"
| "👷🏻‍♀️"
| "👷🏼‍♀️"
| "👷🏽‍♀️"
| "👷🏾‍♀️"
| "👷🏿‍♀️"
| "👷‍♀️"
| "👷‍♀"
| "🤴🏻"
| "🤴🏼"
| "🤴🏽"
| "🤴🏾"
| "🤴🏿"
| "🤴"
| "👸🏻"
| "👸🏼"
| "👸🏽"
| "👸🏾"
| "👸🏿"
| "👸"
| "👳🏻"
| "👳🏼"
| "👳🏽"
| "👳🏾"
| "👳🏿"
| "👳"
| "👳🏻‍♂️"
| "👳🏼‍♂️"
| "👳🏽‍♂️"
| "👳🏾‍♂️"
| "👳🏿‍♂️"
| "👳‍♂️"
| "👳‍♂"
| "👳🏻‍♀️"
| "👳🏼‍♀️"
| "👳🏽‍♀️"
| "👳🏾‍♀️"
| "👳🏿‍♀️"
| "👳‍♀️"
| "👳‍♀"
| "👲🏻"
| "👲🏼"
| "👲🏽"
| "👲🏾"
| "👲🏿"
| "👲"
| "🧕🏻"
| "🧕🏼"
| "🧕🏽"
| "🧕🏾"
| "🧕🏿"
| "🧕"
| "🤵🏻"
| "🤵🏼"
| "🤵🏽"
| "🤵🏾"
| "🤵🏿"
| "🤵"
| "🤵🏻‍♂️"
| "🤵🏼‍♂️"
| "🤵🏽‍♂️"
| "🤵🏾‍♂️"
| "🤵🏿‍♂️"
| "🤵‍♂️"
| "🤵‍♂"
| "🤵🏻‍♀️"
| "🤵🏼‍♀️"
| "🤵🏽‍♀️"
| "🤵🏾‍♀️"
| "🤵🏿‍♀️"
| "🤵‍♀️"
| "🤵‍♀"
| "👰🏻"
| "👰🏼"
| "👰🏽"
| "👰🏾"
| "👰🏿"
| "👰"
| "👰🏻‍♂️"
| "👰🏼‍♂️"
| "👰🏽‍♂️"
| "👰🏾‍♂️"
| "👰🏿‍♂️"
| "👰‍♂️"
| "👰‍♂"
| "👰🏻‍♀️"
| "👰🏼‍♀️"
| "👰🏽‍♀️"
| "👰🏾‍♀️"
| "👰🏿‍♀️"
| "👰‍♀️"
| "👰‍♀"
| "🤰🏻"
| "🤰🏼"
| "🤰🏽"
| "🤰🏾"
| "🤰🏿"
| "🤰"
| "🤱🏻"
| "🤱🏼"
| "🤱🏽"
| "🤱🏾"
| "🤱🏿"
| "🤱"
| "👩🏻‍🍼"
| "👩🏼‍🍼"
| "👩🏽‍🍼"
| "👩🏾‍🍼"
| "👩🏿‍🍼"
| "👩‍🍼"
| "👨🏻‍🍼"
| "👨🏼‍🍼"
| "👨🏽‍🍼"
| "👨🏾‍🍼"
| "👨🏿‍🍼"
| "👨‍🍼"
| "🧑🏻‍🍼"
| "🧑🏼‍🍼"
| "🧑🏽‍🍼"
| "🧑🏾‍🍼"
| "🧑🏿‍🍼"
| "🧑‍🍼"
| "👼🏻"
| "👼🏼"
| "👼🏽"
| "👼🏾"
| "👼🏿"
| "👼"
| "🎅🏻"
| "🎅🏼"
| "🎅🏽"
| "🎅🏾"
| "🎅🏿"
| "🎅"
| "🤶🏻"
| "🤶🏼"
| "🤶🏽"
| "🤶🏾"
| "🤶🏿"
| "🤶"
| "🧑🏻‍🎄"
| "🧑🏼‍🎄"
| "🧑🏽‍🎄"
| "🧑🏾‍🎄"
| "🧑🏿‍🎄"
| "🧑‍🎄"
| "🦸🏻"
| "🦸🏼"
| "🦸🏽"
| "🦸🏾"
| "🦸🏿"
| "🦸"
| "🦸🏻‍♂️"
| "🦸🏼‍♂️"
| "🦸🏽‍♂️"
| "🦸🏾‍♂️"
| "🦸🏿‍♂️"
| "🦸‍♂️"
| "🦸‍♂"
| "🦸🏻‍♀️"
| "🦸🏼‍♀️"
| "🦸🏽‍♀️"
| "🦸🏾‍♀️"
| "🦸🏿‍♀️"
| "🦸‍♀️"
| "🦸‍♀"
| "🦹🏻"
| "🦹🏼"
| "🦹🏽"
| "🦹🏾"
| "🦹🏿"
| "🦹"
| "🦹🏻‍♂️"
| "🦹🏼‍♂️"
| "🦹🏽‍♂️"
| "🦹🏾‍♂️"
| "🦹🏿‍♂️"
| "🦹‍♂️"
| "🦹‍♂"
| "🦹🏻‍♀️"
| "🦹🏼‍♀️"
| "🦹🏽‍♀️"
| "🦹🏾‍♀️"
| "🦹🏿‍♀️"
| "🦹‍♀️"
| "🦹‍♀"
| "🧙🏻"
| "🧙🏼"
| "🧙🏽"
| "🧙🏾"
| "🧙🏿"
| "🧙"
| "🧙🏻‍♂️"
| "🧙🏼‍♂️"
| "🧙🏽‍♂️"
| "🧙🏾‍♂️"
| "🧙🏿‍♂️"
| "🧙‍♂️"
| "🧙‍♂"
| "🧙🏻‍♀️"
| "🧙🏼‍♀️"
| "🧙🏽‍♀️"
| "🧙🏾‍♀️"
| "🧙🏿‍♀️"
| "🧙‍♀️"
| "🧙‍♀"
| "🧚🏻"
| "🧚🏼"
| "🧚🏽"
| "🧚🏾"
| "🧚🏿"
| "🧚"
| "🧚🏻‍♂️"
| "🧚🏼‍♂️"
| "🧚🏽‍♂️"
| "🧚🏾‍♂️"
| "🧚🏿‍♂️"
| "🧚‍♂️"
| "🧚‍♂"
| "🧚🏻‍♀️"
| "🧚🏼‍♀️"
| "🧚🏽‍♀️"
| "🧚🏾‍♀️"
| "🧚🏿‍♀️"
| "🧚‍♀️"
| "🧚‍♀"
| "🧛🏻"
| "🧛🏼"
| "🧛🏽"
| "🧛🏾"
| "🧛🏿"
| "🧛"
| "🧛🏻‍♂️"
| "🧛🏼‍♂️"
| "🧛🏽‍♂️"
| "🧛🏾‍♂️"
| "🧛🏿‍♂️"
| "🧛‍♂️"
| "🧛‍♂"
| "🧛🏻‍♀️"
| "🧛🏼‍♀️"
| "🧛🏽‍♀️"
| "🧛🏾‍♀️"
| "🧛🏿‍♀️"
| "🧛‍♀️"
| "🧛‍♀"
| "🧜🏻"
| "🧜🏼"
| "🧜🏽"
| "🧜🏾"
| "🧜🏿"
| "🧜"
| "🧜🏻‍♂️"
| "🧜🏼‍♂️"
| "🧜🏽‍♂️"
| "🧜🏾‍♂️"
| "🧜🏿‍♂️"
| "🧜‍♂️"
| "🧜‍♂"
| "🧜🏻‍♀️"
| "🧜🏼‍♀️"
| "🧜🏽‍♀️"
| "🧜🏾‍♀️"
| "🧜🏿‍♀️"
| "🧜‍♀️"
| "🧜‍♀"
| "🧝🏻"
| "🧝🏼"
| "🧝🏽"
| "🧝🏾"
| "🧝🏿"
| "🧝"
| "🧝🏻‍♂️"
| "🧝🏼‍♂️"
| "🧝🏽‍♂️"
| "🧝🏾‍♂️"
| "🧝🏿‍♂️"
| "🧝‍♂️"
| "🧝‍♂"
| "🧝🏻‍♀️"
| "🧝🏼‍♀️"
| "🧝🏽‍♀️"
| "🧝🏾‍♀️"
| "🧝🏿‍♀️"
| "🧝‍♀️"
| "🧝‍♀"
| "🧞"
| "🧞‍♂️"
| "🧞‍♂"
| "🧞‍♀️"
| "🧞‍♀"
| "🧟"
| "🧟‍♂️"
| "🧟‍♂"
| "🧟‍♀️"
| "🧟‍♀"
| "💆🏻"
| "💆🏼"
| "💆🏽"
| "💆🏾"
| "💆🏿"
| "💆"
| "💆🏻‍♂️"
| "💆🏼‍♂️"
| "💆🏽‍♂️"
| "💆🏾‍♂️"
| "💆🏿‍♂️"
| "💆‍♂️"
| "💆‍♂"
| "💆🏻‍♀️"
| "💆🏼‍♀️"
| "💆🏽‍♀️"
| "💆🏾‍♀️"
| "💆🏿‍♀️"
| "💆‍♀️"
| "💆‍♀"
| "💇🏻"
| "💇🏼"
| "💇🏽"
| "💇🏾"
| "💇🏿"
| "💇"
| "💇🏻‍♂️"
| "💇🏼‍♂️"
| "💇🏽‍♂️"
| "💇🏾‍♂️"
| "💇🏿‍♂️"
| "💇‍♂️"
| "💇‍♂"
| "💇🏻‍♀️"
| "💇🏼‍♀️"
| "💇🏽‍♀️"
| "💇🏾‍♀️"
| "💇🏿‍♀️"
| "💇‍♀️"
| "💇‍♀"
| "🚶🏻"
| "🚶🏼"
| "🚶🏽"
| "🚶🏾"
| "🚶🏿"
| "🚶"
| "🚶🏻‍♂️"
| "🚶🏼‍♂️"
| "🚶🏽‍♂️"
| "🚶🏾‍♂️"
| "🚶🏿‍♂️"
| "🚶‍♂️"
| "🚶‍♂"
| "🚶🏻‍♀️"
| "🚶🏼‍♀️"
| "🚶🏽‍♀️"
| "🚶🏾‍♀️"
| "🚶🏿‍♀️"
| "🚶‍♀️"
| "🚶‍♀"
| "🧍🏻"
| "🧍🏼"
| "🧍🏽"
| "🧍🏾"
| "🧍🏿"
| "🧍"
| "🧍🏻‍♂️"
| "🧍🏼‍♂️"
| "🧍🏽‍♂️"
| "🧍🏾‍♂️"
| "🧍🏿‍♂️"
| "🧍‍♂️"
| "🧍‍♂"
| "🧍🏻‍♀️"
| "🧍🏼‍♀️"
| "🧍🏽‍♀️"
| "🧍🏾‍♀️"
| "🧍🏿‍♀️"
| "🧍‍♀️"
| "🧍‍♀"
| "🧎🏻"
| "🧎🏼"
| "🧎🏽"
| "🧎🏾"
| "🧎🏿"
| "🧎"
| "🧎🏻‍♂️"
| "🧎🏼‍♂️"
| "🧎🏽‍♂️"
| "🧎🏾‍♂️"
| "🧎🏿‍♂️"
| "🧎‍♂️"
| "🧎‍♂"
| "🧎🏻‍♀️"
| "🧎🏼‍♀️"
| "🧎🏽‍♀️"
| "🧎🏾‍♀️"
| "🧎🏿‍♀️"
| "🧎‍♀️"
| "🧎‍♀"
| "🧑🏻‍🦯"
| "🧑🏼‍🦯"
| "🧑🏽‍🦯"
| "🧑🏾‍🦯"
| "🧑🏿‍🦯"
| "🧑‍🦯"
| "👨🏻‍🦯"
| "👨🏼‍🦯"
| "👨🏽‍🦯"
| "👨🏾‍🦯"
| "👨🏿‍🦯"
| "👨‍🦯"
| "👩🏻‍🦯"
| "👩🏼‍🦯"
| "👩🏽‍🦯"
| "👩🏾‍🦯"
| "👩🏿‍🦯"
| "👩‍🦯"
| "🧑🏻‍🦼"
| "🧑🏼‍🦼"
| "🧑🏽‍🦼"
| "🧑🏾‍🦼"
| "🧑🏿‍🦼"
| "🧑‍🦼"
| "👨🏻‍🦼"
| "👨🏼‍🦼"
| "👨🏽‍🦼"
| "👨🏾‍🦼"
| "👨🏿‍🦼"
| "👨‍🦼"
| "👩🏻‍🦼"
| "👩🏼‍🦼"
| "👩🏽‍🦼"
| "👩🏾‍🦼"
| "👩🏿‍🦼"
| "👩‍🦼"
| "🧑🏻‍🦽"
| "🧑🏼‍🦽"
| "🧑🏽‍🦽"
| "🧑🏾‍🦽"
| "🧑🏿‍🦽"
| "🧑‍🦽"
| "👨🏻‍🦽"
| "👨🏼‍🦽"
| "👨🏽‍🦽"
| "👨🏾‍🦽"
| "👨🏿‍🦽"
| "👨‍🦽"
| "👩🏻‍🦽"
| "👩🏼‍🦽"
| "👩🏽‍🦽"
| "👩🏾‍🦽"
| "👩🏿‍🦽"
| "👩‍🦽"
| "🏃🏻"
| "🏃🏼"
| "🏃🏽"
| "🏃🏾"
| "🏃🏿"
| "🏃"
| "🏃🏻‍♂️"
| "🏃🏼‍♂️"
| "🏃🏽‍♂️"
| "🏃🏾‍♂️"
| "🏃🏿‍♂️"
| "🏃‍♂️"
| "🏃‍♂"
| "🏃🏻‍♀️"
| "🏃🏼‍♀️"
| "🏃🏽‍♀️"
| "🏃🏾‍♀️"
| "🏃🏿‍♀️"
| "🏃‍♀️"
| "🏃‍♀"
| "💃🏻"
| "💃🏼"
| "💃🏽"
| "💃🏾"
| "💃🏿"
| "💃"
| "🕺🏻"
| "🕺🏼"
| "🕺🏽"
| "🕺🏾"
| "🕺🏿"
| "🕺"
| "🕴🏻"
| "🕴🏼"
| "🕴🏽"
| "🕴🏾"
| "🕴🏿"
| "🕴️"
| "🕴"
| "👯"
| "👯‍♂️"
| "👯‍♂"
| "👯‍♀️"
| "👯‍♀"
| "🧖🏻"
| "🧖🏼"
| "🧖🏽"
| "🧖🏾"
| "🧖🏿"
| "🧖"
| "🧖🏻‍♂️"
| "🧖🏼‍♂️"
| "🧖🏽‍♂️"
| "🧖🏾‍♂️"
| "🧖🏿‍♂️"
| "🧖‍♂️"
| "🧖‍♂"
| "🧖🏻‍♀️"
| "🧖🏼‍♀️"
| "🧖🏽‍♀️"
| "🧖🏾‍♀️"
| "🧖🏿‍♀️"
| "🧖‍♀️"
| "🧖‍♀"
| "🧗🏻"
| "🧗🏼"
| "🧗🏽"
| "🧗🏾"
| "🧗🏿"
| "🧗"
| "🧗🏻‍♂️"
| "🧗🏼‍♂️"
| "🧗🏽‍♂️"
| "🧗🏾‍♂️"
| "🧗🏿‍♂️"
| "🧗‍♂️"
| "🧗‍♂"
| "🧗🏻‍♀️"
| "🧗🏼‍♀️"
| "🧗🏽‍♀️"
| "🧗🏾‍♀️"
| "🧗🏿‍♀️"
| "🧗‍♀️"
| "🧗‍♀"
| "🤺"
| "🏇🏻"
| "🏇🏼"
| "🏇🏽"
| "🏇🏾"
| "🏇🏿"
| "🏇"
| "⛷️"
| "⛷"
| "🏂🏻"
| "🏂🏼"
| "🏂🏽"
| "🏂🏾"
| "🏂🏿"
| "🏂"
| "🏌🏻"
| "🏌🏼"
| "🏌🏽"
| "🏌🏾"
| "🏌🏿"
| "🏌️"
| "🏌"
| "🏌🏻‍♂️"
| "🏌🏼‍♂️"
| "🏌🏽‍♂️"
| "🏌🏾‍♂️"
| "🏌🏿‍♂️"
| "🏌️‍♂️"
| "🏌🏻‍♀️"
| "🏌🏼‍♀️"
| "🏌🏽‍♀️"
| "🏌🏾‍♀️"
| "🏌🏿‍♀️"
| "🏌️‍♀️"
| "🏄🏻"
| "🏄🏼"
| "🏄🏽"
| "🏄🏾"
| "🏄🏿"
| "🏄"
| "🏄🏻‍♂️"
| "🏄🏼‍♂️"
| "🏄🏽‍♂️"
| "🏄🏾‍♂️"
| "🏄🏿‍♂️"
| "🏄‍♂️"
| "🏄‍♂"
| "🏄🏻‍♀️"
| "🏄🏼‍♀️"
| "🏄🏽‍♀️"
| "🏄🏾‍♀️"
| "🏄🏿‍♀️"
| "🏄‍♀️"
| "🏄‍♀"
| "🚣🏻"
| "🚣🏼"
| "🚣🏽"
| "🚣🏾"
| "🚣🏿"
| "🚣"
| "🚣🏻‍♂️"
| "🚣🏼‍♂️"
| "🚣🏽‍♂️"
| "🚣🏾‍♂️"
| "🚣🏿‍♂️"
| "🚣‍♂️"
| "🚣‍♂"
| "🚣🏻‍♀️"
| "🚣🏼‍♀️"
| "🚣🏽‍♀️"
| "🚣🏾‍♀️"
| "🚣🏿‍♀️"
| "🚣‍♀️"
| "🚣‍♀"
| "🏊🏻"
| "🏊🏼"
| "🏊🏽"
| "🏊🏾"
| "🏊🏿"
| "🏊"
| "🏊🏻‍♂️"
| "🏊🏼‍♂️"
| "🏊🏽‍♂️"
| "🏊🏾‍♂️"
| "🏊🏿‍♂️"
| "🏊‍♂️"
| "🏊‍♂"
| "🏊🏻‍♀️"
| "🏊🏼‍♀️"
| "🏊🏽‍♀️"
| "🏊🏾‍♀️"
| "🏊🏿‍♀️"
| "🏊‍♀️"
| "🏊‍♀"
| "⛹🏻"
| "⛹🏼"
| "⛹🏽"
| "⛹🏾"
| "⛹🏿"
| "⛹️"
| "⛹"
| "⛹🏻‍♂️"
| "⛹🏼‍♂️"
| "⛹🏽‍♂️"
| "⛹🏾‍♂️"
| "⛹🏿‍♂️"
| "⛹️‍♂️"
| "⛹🏻‍♀️"
| "⛹🏼‍♀️"
| "⛹🏽‍♀️"
| "⛹🏾‍♀️"
| "⛹🏿‍♀️"
| "⛹️‍♀️"
| "🏋🏻"
| "🏋🏼"
| "🏋🏽"
| "🏋🏾"
| "🏋🏿"
| "🏋️"
| "🏋"
| "🏋🏻‍♂️"
| "🏋🏼‍♂️"
| "🏋🏽‍♂️"
| "🏋🏾‍♂️"
| "🏋🏿‍♂️"
| "🏋️‍♂️"
| "🏋🏻‍♀️"
| "🏋🏼‍♀️"
| "🏋🏽‍♀️"
| "🏋🏾‍♀️"
| "🏋🏿‍♀️"
| "🏋️‍♀️"
| "🚴🏻"
| "🚴🏼"
| "🚴🏽"
| "🚴🏾"
| "🚴🏿"
| "🚴"
| "🚴🏻‍♂️"
| "🚴🏼‍♂️"
| "🚴🏽‍♂️"
| "🚴🏾‍♂️"
| "🚴🏿‍♂️"
| "🚴‍♂️"
| "🚴‍♂"
| "🚴🏻‍♀️"
| "🚴🏼‍♀️"
| "🚴🏽‍♀️"
| "🚴🏾‍♀️"
| "🚴🏿‍♀️"
| "🚴‍♀️"
| "🚴‍♀"
| "🚵🏻"
| "🚵🏼"
| "🚵🏽"
| "🚵🏾"
| "🚵🏿"
| "🚵"
| "🚵🏻‍♂️"
| "🚵🏼‍♂️"
| "🚵🏽‍♂️"
| "🚵🏾‍♂️"
| "🚵🏿‍♂️"
| "🚵‍♂️"
| "🚵‍♂"
| "🚵🏻‍♀️"
| "🚵🏼‍♀️"
| "🚵🏽‍♀️"
| "🚵🏾‍♀️"
| "🚵🏿‍♀️"
| "🚵‍♀️"
| "🚵‍♀"
| "🤸🏻"
| "🤸🏼"
| "🤸🏽"
| "🤸🏾"
| "🤸🏿"
| "🤸"
| "🤸🏻‍♂️"
| "🤸🏼‍♂️"
| "🤸🏽‍♂️"
| "🤸🏾‍♂️"
| "🤸🏿‍♂️"
| "🤸‍♂️"
| "🤸‍♂"
| "🤸🏻‍♀️"
| "🤸🏼‍♀️"
| "🤸🏽‍♀️"
| "🤸🏾‍♀️"
| "🤸🏿‍♀️"
| "🤸‍♀️"
| "🤸‍♀"
| "🤼"
| "🤼‍♂️"
| "🤼‍♂"
| "🤼‍♀️"
| "🤼‍♀"
| "🤽🏻"
| "🤽🏼"
| "🤽🏽"
| "🤽🏾"
| "🤽🏿"
| "🤽"
| "🤽🏻‍♂️"
| "🤽🏼‍♂️"
| "🤽🏽‍♂️"
| "🤽🏾‍♂️"
| "🤽🏿‍♂️"
| "🤽‍♂️"
| "🤽‍♂"
| "🤽🏻‍♀️"
| "🤽🏼‍♀️"
| "🤽🏽‍♀️"
| "🤽🏾‍♀️"
| "🤽🏿‍♀️"
| "🤽‍♀️"
| "🤽‍♀"
| "🤾🏻"
| "🤾🏼"
| "🤾🏽"
| "🤾🏾"
| "🤾🏿"
| "🤾"
| "🤾🏻‍♂️"
| "🤾🏼‍♂️"
| "🤾🏽‍♂️"
| "🤾🏾‍♂️"
| "🤾🏿‍♂️"
| "🤾‍♂️"
| "🤾‍♂"
| "🤾🏻‍♀️"
| "🤾🏼‍♀️"
| "🤾🏽‍♀️"
| "🤾🏾‍♀️"
| "🤾🏿‍♀️"
| "🤾‍♀️"
| "🤾‍♀"
| "🤹🏻"
| "🤹🏼"
| "🤹🏽"
| "🤹🏾"
| "🤹🏿"
| "🤹"
| "🤹🏻‍♂️"
| "🤹🏼‍♂️"
| "🤹🏽‍♂️"
| "🤹🏾‍♂️"
| "🤹🏿‍♂️"
| "🤹‍♂️"
| "🤹‍♂"
| "🤹🏻‍♀️"
| "🤹🏼‍♀️"
| "🤹🏽‍♀️"
| "🤹🏾‍♀️"
| "🤹🏿‍♀️"
| "🤹‍♀️"
| "🤹‍♀"
| "🧘🏻"
| "🧘🏼"
| "🧘🏽"
| "🧘🏾"
| "🧘🏿"
| "🧘"
| "🧘🏻‍♂️"
| "🧘🏼‍♂️"
| "🧘🏽‍♂️"
| "🧘🏾‍♂️"
| "🧘🏿‍♂️"
| "🧘‍♂️"
| "🧘‍♂"
| "🧘🏻‍♀️"
| "🧘🏼‍♀️"
| "🧘🏽‍♀️"
| "🧘🏾‍♀️"
| "🧘🏿‍♀️"
| "🧘‍♀️"
| "🧘‍♀"
| "🛀🏻"
| "🛀🏼"
| "🛀🏽"
| "🛀🏾"
| "🛀🏿"
| "🛀"
| "🛌🏻"
| "🛌🏼"
| "🛌🏽"
| "🛌🏾"
| "🛌🏿"
| "🛌"
| "🧑🏻‍🤝‍🧑🏻"
| "🧑🏻‍🤝‍🧑🏼"
| "🧑🏻‍🤝‍🧑🏽"
| "🧑🏻‍🤝‍🧑🏾"
| "🧑🏻‍🤝‍🧑🏿"
| "🧑🏼‍🤝‍🧑🏻"
| "🧑🏼‍🤝‍🧑🏼"
| "🧑🏼‍🤝‍🧑🏽"
| "🧑🏼‍🤝‍🧑🏾"
| "🧑🏼‍🤝‍🧑🏿"
| "🧑🏽‍🤝‍🧑🏻"
| "🧑🏽‍🤝‍🧑🏼"
| "🧑🏽‍🤝‍🧑🏽"
| "🧑🏽‍🤝‍🧑🏾"
| "🧑🏽‍🤝‍🧑🏿"
| "🧑🏾‍🤝‍🧑🏻"
| "🧑🏾‍🤝‍🧑🏼"
| "🧑🏾‍🤝‍🧑🏽"
| "🧑🏾‍🤝‍🧑🏾"
| "🧑🏾‍🤝‍🧑🏿"
| "🧑🏿‍🤝‍🧑🏻"
| "🧑🏿‍🤝‍🧑🏼"
| "🧑🏿‍🤝‍🧑🏽"
| "🧑🏿‍🤝‍🧑🏾"
| "🧑🏿‍🤝‍🧑🏿"
| "🧑‍🤝‍🧑"
| "👭"
| "👫"
| "👬"
| "💏"
| "💑"
| "👪"
| "👨‍👩‍👦"
| "👨‍👩‍👧"
| "👨‍👩‍👧‍👦"
| "👨‍👩‍👦‍👦"
| "👨‍👩‍👧‍👧"
| "👨‍👨‍👦"
| "👨‍👨‍👧"
| "👨‍👨‍👧‍👦"
| "👨‍👨‍👦‍👦"
| "👨‍👨‍👧‍👧"
| "👩‍👩‍👦"
| "👩‍👩‍👧"
| "👩‍👩‍👧‍👦"
| "👩‍👩‍👦‍👦"
| "👩‍👩‍👧‍👧"
| "👨‍👦"
| "👨‍👦‍👦"
| "👨‍👧"
| "👨‍👧‍👦"
| "👨‍👧‍👧"
| "👩‍👦"
| "👩‍👦‍👦"
| "👩‍👧"
| "👩‍👧‍👦"
| "👩‍👧‍👧"
| "🗣️"
| "🗣"
| "👤"
| "👥"
| "🫂"
| "👣"
| "🐵"
| "🐒"
| "🦍"
| "🦧"
| "🐶"
| "🐕"
| "🦮"
| "🐕‍🦺"
| "🐩"
| "🐺"
| "🦊"
| "🦝"
| "🐱"
| "🐈"
| "🐈‍⬛"
| "🦁"
| "🐯"
| "🐅"
| "🐆"
| "🐴"
| "🐎"
| "🦄"
| "🦓"
| "🦌"
| "🦬"
| "🐮"
| "🐂"
| "🐃"
| "🐄"
| "🐷"
| "🐖"
| "🐗"
| "🐽"
| "🐏"
| "🐑"
| "🐐"
| "🐪"
| "🐫"
| "🦙"
| "🦒"
| "🐘"
| "🦣"
| "🦏"
| "🦛"
| "🐭"
| "🐁"
| "🐀"
| "🐹"
| "🐰"
| "🐇"
| "🐿️"
| "🐿"
| "🦫"
| "🦔"
| "🦇"
| "🐻"
| "🐻‍❄️"
| "🐻‍❄"
| "🐨"
| "🐼"
| "🦥"
| "🦦"
| "🦨"
| "🦘"
| "🦡"
| "🐾"
| "🦃"
| "🐔"
| "🐓"
| "🐣"
| "🐤"
| "🐥"
| "🐦"
| "🐧"
| "🕊️"
| "🕊"
| "🦅"
| "🦆"
| "🦢"
| "🦉"
| "🦤"
| "🪶"
| "🦩"
| "🦚"
| "🦜"
| "🐸"
| "🐊"
| "🐢"
| "🦎"
| "🐍"
| "🐲"
| "🐉"
| "🦕"
| "🦖"
| "🐳"
| "🐋"
| "🐬"
| "🦭"
| "🐟"
| "🐠"
| "🐡"
| "🦈"
| "🐙"
| "🐚"
| "🐌"
| "🦋"
| "🐛"
| "🐜"
| "🐝"
| "🪲"
| "🐞"
| "🦗"
| "🪳"
| "🕷️"
| "🕷"
| "🕸️"
| "🕸"
| "🦂"
| "🦟"
| "🪰"
| "🪱"
| "🦠"
| "💐"
| "🌸"
| "💮"
| "🏵️"
| "🏵"
| "🌹"
| "🥀"
| "🌺"
| "🌻"
| "🌼"
| "🌷"
| "🌱"
| "🪴"
| "🌲"
| "🌳"
| "🌴"
| "🌵"
| "🌾"
| "🌿"
| "☘️"
| "☘"
| "🍀"
| "🍁"
| "🍂"
| "🍃"
| "🍇"
| "🍈"
| "🍉"
| "🍊"
| "🍋"
| "🍌"
| "🍍"
| "🥭"
| "🍎"
| "🍏"
| "🍐"
| "🍑"
| "🍒"
| "🍓"
| "🫐"
| "🥝"
| "🍅"
| "🫒"
| "🥥"
| "🥑"
| "🍆"
| "🥔"
| "🥕"
| "🌽"
| "🌶️"
| "🌶"
| "🫑"
| "🥒"
| "🥬"
| "🥦"
| "🧄"
| "🧅"
| "🍄"
| "🥜"
| "🌰"
| "🍞"
| "🥐"
| "🥖"
| "🫓"
| "🥨"
| "🥯"
| "🥞"
| "🧇"
| "🧀"
| "🍖"
| "🍗"
| "🥩"
| "🥓"
| "🍔"
| "🍟"
| "🍕"
| "🌭"
| "🥪"
| "🌮"
| "🌯"
| "🫔"
| "🥙"
| "🧆"
| "🥚"
| "🍳"
| "🥘"
| "🍲"
| "🫕"
| "🥣"
| "🥗"
| "🍿"
| "🧈"
| "🧂"
| "🥫"
| "🍱"
| "🍘"
| "🍙"
| "🍚"
| "🍛"
| "🍜"
| "🍝"
| "🍠"
| "🍢"
| "🍣"
| "🍤"
| "🍥"
| "🥮"
| "🍡"
| "🥟"
| "🥠"
| "🥡"
| "🦀"
| "🦞"
| "🦐"
| "🦑"
| "🦪"
| "🍦"
| "🍧"
| "🍨"
| "🍩"
| "🍪"
| "🎂"
| "🍰"
| "🧁"
| "🥧"
| "🍫"
| "🍬"
| "🍭"
| "🍮"
| "🍯"
| "🍼"
| "🥛"
| "☕"
| "🫖"
| "🍵"
| "🍶"
| "🍾"
| "🍷"
| "🍸"
| "🍹"
| "🍺"
| "🍻"
| "🥂"
| "🥃"
| "🥤"
| "🧋"
| "🧃"
| "🧉"
| "🧊"
| "🥢"
| "🍽️"
| "🍽"
| "🍴"
| "🥄"
| "🔪"
| "🏺"
| "🌍"
| "🌎"
| "🌏"
| "🌐"
| "🗺️"
| "🗺"
| "🗾"
| "🧭"
| "🏔️"
| "🏔"
| "⛰️"
| "⛰"
| "🌋"
| "🗻"
| "🏕️"
| "🏕"
| "🏖️"
| "🏖"
| "🏜️"
| "🏜"
| "🏝️"
| "🏝"
| "🏞️"
| "🏞"
| "🏟️"
| "🏟"
| "🏛️"
| "🏛"
| "🏗️"
| "🏗"
| "🧱"
| "🪨"
| "🪵"
| "🛖"
| "🏘️"
| "🏘"
| "🏚️"
| "🏚"
| "🏠"
| "🏡"
| "🏢"
| "🏣"
| "🏤"
| "🏥"
| "🏦"
| "🏨"
| "🏩"
| "🏪"
| "🏫"
| "🏬"
| "🏭"
| "🏯"
| "🏰"
| "💒"
| "🗼"
| "🗽"
| "⛪"
| "🕌"
| "🛕"
| "🕍"
| "⛩️"
| "⛩"
| "🕋"
| "⛲"
| "⛺"
| "🌁"
| "🌃"
| "🏙️"
| "🏙"
| "🌄"
| "🌅"
| "🌆"
| "🌇"
| "🌉"
| "♨️"
| "♨"
| "🎠"
| "🎡"
| "🎢"
| "💈"
| "🎪"
| "🚂"
| "🚃"
| "🚄"
| "🚅"
| "🚆"
| "🚇"
| "🚈"
| "🚉"
| "🚊"
| "🚝"
| "🚞"
| "🚋"
| "🚌"
| "🚍"
| "🚎"
| "🚐"
| "🚑"
| "🚒"
| "🚓"
| "🚔"
| "🚕"
| "🚖"
| "🚗"
| "🚘"
| "🚙"
| "🛻"
| "🚚"
| "🚛"
| "🚜"
| "🏎️"
| "🏎"
| "🏍️"
| "🏍"
| "🛵"
| "🦽"
| "🦼"
| "🛺"
| "🚲"
| "🛴"
| "🛹"
| "🛼"
| "🚏"
| "🛣️"
| "🛣"
| "🛤️"
| "🛤"
| "🛢️"
| "🛢"
| "⛽"
| "🚨"
| "🚥"
| "🚦"
| "🛑"
| "🚧"
| "⚓"
| "⛵"
| "🛶"
| "🚤"
| "🛳️"
| "🛳"
| "⛴️"
| "⛴"
| "🛥️"
| "🛥"
| "🚢"
| "✈️"
| "✈"
| "🛩️"
| "🛩"
| "🛫"
| "🛬"
| "🪂"
| "💺"
| "🚁"
| "🚟"
| "🚠"
| "🚡"
| "🛰️"
| "🛰"
| "🚀"
| "🛸"
| "🛎️"
| "🛎"
| "🧳"
| "⌛"
| "⏳"
| "⌚"
| "⏰"
| "⏱️"
| "⏱"
| "⏲️"
| "⏲"
| "🕰️"
| "🕰"
| "🕛"
| "🕧"
| "🕐"
| "🕜"
| "🕑"
| "🕝"
| "🕒"
| "🕞"
| "🕓"
| "🕟"
| "🕔"
| "🕠"
| "🕕"
| "🕡"
| "🕖"
| "🕢"
| "🕗"
| "🕣"
| "🕘"
| "🕤"
| "🕙"
| "🕥"
| "🕚"
| "🕦"
| "🌑"
| "🌒"
| "🌓"
| "🌔"
| "🌕"
| "🌖"
| "🌗"
| "🌘"
| "🌙"
| "🌚"
| "🌛"
| "🌜"
| "🌡️"
| "🌡"
| "☀️"
| "☀"
| "🌝"
| "🌞"
| "🪐"
| "⭐"
| "🌟"
| "🌠"
| "🌌"
| "☁️"
| "☁"
| "⛅"
| "⛈️"
| "⛈"
| "🌤️"
| "🌤"
| "🌥️"
| "🌥"
| "🌦️"
| "🌦"
| "🌧️"
| "🌧"
| "🌨️"
| "🌨"
| "🌩️"
| "🌩"
| "🌪️"
| "🌪"
| "🌫️"
| "🌫"
| "🌬️"
| "🌬"
| "🌀"
| "🌈"
| "🌂"
| "☂️"
| "☂"
| "☔"
| "⛱️"
| "⛱"
| "⚡"
| "❄️"
| "❄"
| "☃️"
| "☃"
| "⛄"
| "☄️"
| "☄"
| "🔥"
| "💧"
| "🌊"
| "🎃"
| "🎄"
| "🎆"
| "🎇"
| "🧨"
| "✨"
| "🎈"
| "🎉"
| "🎊"
| "🎋"
| "🎍"
| "🎎"
| "🎏"
| "🎐"
| "🎑"
| "🧧"
| "🎀"
| "🎁"
| "🎗️"
| "🎗"
| "🎟️"
| "🎟"
| "🎫"
| "🎖️"
| "🎖"
| "🏆"
| "🏅"
| "🥇"
| "🥈"
| "🥉"
| "⚽"
| "⚾"
| "🥎"
| "🏀"
| "🏐"
| "🏈"
| "🏉"
| "🎾"
| "🥏"
| "🎳"
| "🏏"
| "🏑"
| "🏒"
| "🥍"
| "🏓"
| "🏸"
| "🥊"
| "🥋"
| "🥅"
| "⛳"
| "⛸️"
| "⛸"
| "🎣"
| "🤿"
| "🎽"
| "🎿"
| "🛷"
| "🥌"
| "🎯"
| "🪀"
| "🪁"
| "🎱"
| "🔮"
| "🪄"
| "🧿"
| "🎮"
| "🕹️"
| "🕹"
| "🎰"
| "🎲"
| "🧩"
| "🧸"
| "🪅"
| "🪆"
| "♠️"
| "♠"
| "♥️"
| "♥"
| "♦️"
| "♦"
| "♣️"
| "♣"
| "♟️"
| "♟"
| "🃏"
| "🀄"
| "🎴"
| "🎭"
| "🖼️"
| "🖼"
| "🎨"
| "🧵"
| "🪡"
| "🧶"
| "🪢"
| "👓"
| "🕶️"
| "🕶"
| "🥽"
| "🥼"
| "🦺"
| "👔"
| "👕"
| "👖"
| "🧣"
| "🧤"
| "🧥"
| "🧦"
| "👗"
| "👘"
| "🥻"
| "🩱"
| "🩲"
| "🩳"
| "👙"
| "👚"
| "👛"
| "👜"
| "👝"
| "🛍️"
| "🛍"
| "🎒"
| "🩴"
| "👞"
| "👟"
| "🥾"
| "🥿"
| "👠"
| "👡"
| "🩰"
| "👢"
| "👑"
| "👒"
| "🎩"
| "🎓"
| "🧢"
| "🪖"
| "⛑️"
| "⛑"
| "📿"
| "💄"
| "💍"
| "💎"
| "🔇"
| "🔈"
| "🔉"
| "🔊"
| "📢"
| "📣"
| "📯"
| "🔔"
| "🔕"
| "🎼"
| "🎵"
| "🎶"
| "🎙️"
| "🎙"
| "🎚️"
| "🎚"
| "🎛️"
| "🎛"
| "🎤"
| "🎧"
| "📻"
| "🎷"
| "🪗"
| "🎸"
| "🎹"
| "🎺"
| "🎻"
| "🪕"
| "🥁"
| "🪘"
| "📱"
| "📲"
| "☎️"
| "☎"
| "📞"
| "📟"
| "📠"
| "🔋"
| "🔌"
| "💻"
| "🖥️"
| "🖥"
| "🖨️"
| "🖨"
| "⌨️"
| "⌨"
| "🖱️"
| "🖱"
| "🖲️"
| "🖲"
| "💽"
| "💾"
| "💿"
| "📀"
| "🧮"
| "🎥"
| "🎞️"
| "🎞"
| "📽️"
| "📽"
| "🎬"
| "📺"
| "📷"
| "📸"
| "📹"
| "📼"
| "🔍"
| "🔎"
| "🕯️"
| "🕯"
| "💡"
| "🔦"
| "🏮"
| "🪔"
| "📔"
| "📕"
| "📖"
| "📗"
| "📘"
| "📙"
| "📚"
| "📓"
| "📒"
| "📃"
| "📜"
| "📄"
| "📰"
| "🗞️"
| "🗞"
| "📑"
| "🔖"
| "🏷️"
| "🏷"
| "💰"
| "🪙"
| "💴"
| "💵"
| "💶"
| "💷"
| "💸"
| "💳"
| "🧾"
| "💹"
| "✉️"
| "✉"
| "📧"
| "📨"
| "📩"
| "📤"
| "📥"
| "📦"
| "📫"
| "📪"
| "📬"
| "📭"
| "📮"
| "🗳️"
| "🗳"
| "✏️"
| "✏"
| "✒️"
| "✒"
| "🖋️"
| "🖋"
| "🖊️"
| "🖊"
| "🖌️"
| "🖌"
| "🖍️"
| "🖍"
| "📝"
| "💼"
| "📁"
| "📂"
| "🗂️"
| "🗂"
| "📅"
| "📆"
| "🗒️"
| "🗒"
| "🗓️"
| "🗓"
| "📇"
| "📈"
| "📉"
| "📊"
| "📋"
| "📌"
| "📍"
| "📎"
| "🖇️"
| "🖇"
| "📏"
| "📐"
| "✂️"
| "✂"
| "🗃️"
| "🗃"
| "🗄️"
| "🗄"
| "🗑️"
| "🗑"
| "🔒"
| "🔓"
| "🔏"
| "🔐"
| "🔑"
| "🗝️"
| "🗝"
| "🔨"
| "🪓"
| "⛏️"
| "⛏"
| "⚒️"
| "⚒"
| "🛠️"
| "🛠"
| "🗡️"
| "🗡"
| "⚔️"
| "⚔"
| "🔫"
| "🪃"
| "🏹"
| "🛡️"
| "🛡"
| "🪚"
| "🔧"
| "🪛"
| "🔩"
| "⚙️"
| "⚙"
| "🗜️"
| "🗜"
| "⚖️"
| "⚖"
| "🦯"
| "🔗"
| "⛓️"
| "⛓"
| "🪝"
| "🧰"
| "🧲"
| "🪜"
| "⚗️"
| "⚗"
| "🧪"
| "🧫"
| "🧬"
| "🔬"
| "🔭"
| "📡"
| "💉"
| "🩸"
| "💊"
| "🩹"
| "🩺"
| "🚪"
| "🛗"
| "🪞"
| "🪟"
| "🛏️"
| "🛏"
| "🛋️"
| "🛋"
| "🪑"
| "🚽"
| "🪠"
| "🚿"
| "🛁"
| "🪤"
| "🪒"
| "🧴"
| "🧷"
| "🧹"
| "🧺"
| "🧻"
| "🪣"
| "🧼"
| "🪥"
| "🧽"
| "🧯"
| "🛒"
| "🚬"
| "⚰️"
| "⚰"
| "🪦"
| "⚱️"
| "⚱"
| "🗿"
| "🪧"
| "🏧"
| "🚮"
| "🚰"
| "♿"
| "🚹"
| "🚺"
| "🚻"
| "🚼"
| "🚾"
| "🛂"
| "🛃"
| "🛄"
| "🛅"
| "⚠️"
| "⚠"
| "🚸"
| "⛔"
| "🚫"
| "🚳"
| "🚭"
| "🚯"
| "🚱"
| "🚷"
| "📵"
| "🔞"
| "☢️"
| "☢"
| "☣️"
| "☣"
| "⬆️"
| "⬆"
| "↗️"
| "↗"
| "➡️"
| "➡"
| "↘️"
| "↘"
| "⬇️"
| "⬇"
| "↙️"
| "↙"
| "⬅️"
| "⬅"
| "↖️"
| "↖"
| "↕️"
| "↕"
| "↔️"
| "↔"
| "↩️"
| "↩"
| "↪️"
| "↪"
| "⤴️"
| "⤴"
| "⤵️"
| "⤵"
| "🔃"
| "🔄"
| "🔙"
| "🔚"
| "🔛"
| "🔜"
| "🔝"
| "🛐"
| "⚛️"
| "⚛"
| "🕉️"
| "🕉"
| "✡️"
| "✡"
| "☸️"
| "☸"
| "☯️"
| "☯"
| "✝️"
| "✝"
| "☦️"
| "☦"
| "☪️"
| "☪"
| "☮️"
| "☮"
| "🕎"
| "🔯"
| "♈"
| "♉"
| "♊"
| "♋"
| "♌"
| "♍"
| "♎"
| "♏"
| "♐"
| "♑"
| "♒"
| "♓"
| "⛎"
| "🔀"
| "🔁"
| "🔂"
| "▶️"
| "▶"
| "⏩"
| "⏭️"
| "⏭"
| "⏯️"
| "⏯"
| "◀️"
| "◀"
| "⏪"
| "⏮️"
| "⏮"
| "🔼"
| "⏫"
| "🔽"
| "⏬"
| "⏸️"
| "⏸"
| "⏹️"
| "⏹"
| "⏺️"
| "⏺"
| "⏏️"
| "⏏"
| "🎦"
| "🔅"
| "🔆"
| "📶"
| "📳"
| "📴"
| "♀️"
| "♀"
| "♂️"
| "♂"
| "⚧️"
| "⚧"
| "✖️"
| "✖"
| "➕"
| "➖"
| "➗"
| "♾️"
| "♾"
| "‼️"
| "‼"
| "⁉️"
| "⁉"
| "❓"
| "❔"
| "❕"
| "❗"
| "〰️"
| "〰"
| "💱"
| "💲"
| "⚕️"
| "⚕"
| "♻️"
| "♻"
| "⚜️"
| "⚜"
| "🔱"
| "📛"
| "🔰"
| "⭕"
| "✅"
| "☑️"
| "☑"
| "✔️"
| "✔"
| "❌"
| "❎"
| "➰"
| "➿"
| "〽️"
| "〽"
| "✳️"
| "✳"
| "✴️"
| "✴"
| "❇️"
| "❇"
| "©️"
| "©"
| "®️"
| "®"
| "™️"
| "™"
| "#️⃣"
| "#⃣"
| "*️⃣"
| "*⃣"
| "0️⃣"
| "0⃣"
| "1️⃣"
| "1⃣"
| "2️⃣"
| "2⃣"
| "3️⃣"
| "3⃣"
| "4️⃣"
| "4⃣"
| "5️⃣"
| "5⃣"
| "6️⃣"
| "6⃣"
| "7️⃣"
| "7⃣"
| "8️⃣"
| "8⃣"
| "9️⃣"
| "9⃣"
| "🔟"
| "🔠"
| "🔡"
| "🔢"
| "🔣"
| "🔤"
| "🅰️"
| "🅰"
| "🆎"
| "🅱️"
| "🅱"
| "🆑"
| "🆒"
| "🆓"
| "ℹ️"
| "ℹ"
| "🆔"
| "Ⓜ️"
| "Ⓜ"
| "🆕"
| "🆖"
| "🅾️"
| "🅾"
| "🆗"
| "🅿️"
| "🅿"
| "🆘"
| "🆙"
| "🆚"
| "🈁"
| "🈂️"
| "🈂"
| "🈷️"
| "🈷"
| "🈶"
| "🈯"
| "🉐"
| "🈹"
| "🈚"
| "🈲"
| "🉑"
| "🈸"
| "🈴"
| "🈳"
| "㊗️"
| "㊗"
| "㊙️"
| "㊙"
| "🈺"
| "🈵"
| "🔴"
| "🟠"
| "🟡"
| "🟢"
| "🔵"
| "🟣"
| "🟤"
| "⚫"
| "⚪"
| "🟥"
| "🟧"
| "🟨"
| "🟩"
| "🟦"
| "🟪"
| "🟫"
| "⬛"
| "⬜"
| "◼️"
| "◼"
| "◻️"
| "◻"
| "◾"
| "◽"
| "▪️"
| "▪"
| "▫️"
| "▫"
| "🔶"
| "🔷"
| "🔸"
| "🔹"
| "🔺"
| "🔻"
| "💠"
| "🔘"
| "🔳"
| "🔲"
| "🏁"
| "🚩"
| "🎌"
| "🏴"
| "🏳️"
| "🏳"
| "🏳️‍🌈"
| "🏳‍🌈"
| "🏳️‍⚧️"
| "🏴‍☠️"
| "🏴‍☠"
| "🇦🇨"
| "🇦🇩"
| "🇦🇪"
| "🇦🇫"
| "🇦🇬"
| "🇦🇮"
| "🇦🇱"
| "🇦🇲"
| "🇦🇴"
| "🇦🇶"
| "🇦🇷"
| "🇦🇸"
| "🇦🇹"
| "🇦🇺"
| "🇦🇼"
| "🇦🇽"
| "🇦🇿"
| "🇧🇦"
| "🇧🇧"
| "🇧🇩"
| "🇧🇪"
| "🇧🇫"
| "🇧🇬"
| "🇧🇭"
| "🇧🇮"
| "🇧🇯"
| "🇧🇱"
| "🇧🇲"
| "🇧🇳"
| "🇧🇴"
| "🇧🇶"
| "🇧🇷"
| "🇧🇸"
| "🇧🇹"
| "🇧🇻"
| "🇧🇼"
| "🇧🇾"
| "🇧🇿"
| "🇨🇦"
| "🇨🇨"
| "🇨🇩"
| "🇨🇫"
| "🇨🇬"
| "🇨🇭"
| "🇨🇮"
| "🇨🇰"
| "🇨🇱"
| "🇨🇲"
| "🇨🇳"
| "🇨🇴"
| "🇨🇵"
| "🇨🇷"
| "🇨🇺"
| "🇨🇻"
| "🇨🇼"
| "🇨🇽"
| "🇨🇾"
| "🇨🇿"
| "🇩🇪"
| "🇩🇬"
| "🇩🇯"
| "🇩🇰"
| "🇩🇲"
| "🇩🇴"
| "🇩🇿"
| "🇪🇦"
| "🇪🇨"
| "🇪🇪"
| "🇪🇬"
| "🇪🇭"
| "🇪🇷"
| "🇪🇸"
| "🇪🇹"
| "🇪🇺"
| "🇫🇮"
| "🇫🇯"
| "🇫🇰"
| "🇫🇲"
| "🇫🇴"
| "🇫🇷"
| "🇬🇦"
| "🇬🇧"
| "🇬🇩"
| "🇬🇪"
| "🇬🇫"
| "🇬🇬"
| "🇬🇭"
| "🇬🇮"
| "🇬🇱"
| "🇬🇲"
| "🇬🇳"
| "🇬🇵"
| "🇬🇶"
| "🇬🇷"
| "🇬🇸"
| "🇬🇹"
| "🇬🇺"
| "🇬🇼"
| "🇬🇾"
| "🇭🇰"
| "🇭🇲"
| "🇭🇳"
| "🇭🇷"
| "🇭🇹"
| "🇭🇺"
| "🇮🇨"
| "🇮🇩"
| "🇮🇪"
| "🇮🇱"
| "🇮🇲"
| "🇮🇳"
| "🇮🇴"
| "🇮🇶"
| "🇮🇷"
| "🇮🇸"
| "🇮🇹"
| "🇯🇪"
| "🇯🇲"
| "🇯🇴"
| "🇯🇵"
| "🇰🇪"
| "🇰🇬"
| "🇰🇭"
| "🇰🇮"
| "🇰🇲"
| "🇰🇳"
| "🇰🇵"
| "🇰🇷"
| "🇰🇼"
| "🇰🇾"
| "🇰🇿"
| "🇱🇦"
| "🇱🇧"
| "🇱🇨"
| "🇱🇮"
| "🇱🇰"
| "🇱🇷"
| "🇱🇸"
| "🇱🇹"
| "🇱🇺"
| "🇱🇻"
| "🇱🇾"
| "🇲🇦"
| "🇲🇨"
| "🇲🇩"
| "🇲🇪"
| "🇲🇫"
| "🇲🇬"
| "🇲🇭"
| "🇲🇰"
| "🇲🇱"
| "🇲🇲"
| "🇲🇳"
| "🇲🇴"
| "🇲🇵"
| "🇲🇶"
| "🇲🇷"
| "🇲🇸"
| "🇲🇹"
| "🇲🇺"
| "🇲🇻"
| "🇲🇼"
| "🇲🇽"
| "🇲🇾"
| "🇲🇿"
| "🇳🇦"
| "🇳🇨"
| "🇳🇪"
| "🇳🇫"
| "🇳🇬"
| "🇳🇮"
| "🇳🇱"
| "🇳🇴"
| "🇳🇵"
| "🇳🇷"
| "🇳🇺"
| "🇳🇿"
| "🇴🇲"
| "🇵🇦"
| "🇵🇪"
| "🇵🇫"
| "🇵🇬"
| "🇵🇭"
| "🇵🇰"
| "🇵🇱"
| "🇵🇲"
| "🇵🇳"
| "🇵🇷"
| "🇵🇸"
| "🇵🇹"
| "🇵🇼"
| "🇵🇾"
| "🇶🇦"
| "🇷🇪"
| "🇷🇴"
| "🇷🇸"
| "🇷🇺"
| "🇷🇼"
| "🇸🇦"
| "🇸🇧"
| "🇸🇨"
| "🇸🇩"
| "🇸🇪"
| "🇸🇬"
| "🇸🇭"
| "🇸🇮"
| "🇸🇯"
| "🇸🇰"
| "🇸🇱"
| "🇸🇲"
| "🇸🇳"
| "🇸🇴"
| "🇸🇷"
| "🇸🇸"
| "🇸🇹"
| "🇸🇻"
| "🇸🇽"
| "🇸🇾"
| "🇸🇿"
| "🇹🇦"
| "🇹🇨"
| "🇹🇩"
| "🇹🇫"
| "🇹🇬"
| "🇹🇭"
| "🇹🇯"
| "🇹🇰"
| "🇹🇱"
| "🇹🇲"
| "🇹🇳"
| "🇹🇴"
| "🇹🇷"
| "🇹🇹"
| "🇹🇻"
| "🇹🇼"
| "🇹🇿"
| "🇺🇦"
| "🇺🇬"
| "🇺🇲"
| "🇺🇳"
| "🇺🇸"
| "🇺🇾"
| "🇺🇿"
| "🇻🇦"
| "🇻🇨"
| "🇻🇪"
| "🇻🇬"
| "🇻🇮"
| "🇻🇳"
| "🇻🇺"
| "🇼🇫"
| "🇼🇸"
| "🇽🇰"
| "🇾🇪"
| "🇾🇹"
| "🇿🇦"
| "🇿🇲"
| "🇿🇼"
| "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
| "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
| "🏴󠁧󠁢󠁷󠁬󠁳󠁿"

export type functionLookup =
| "count"
| "count_values"
| "empty"
| "not_empty"
| "unique"
| "show_unique"
| "percent_empty"
| "percent_not_empty"
| "sum"
| "average"
| "median"
| "min"
| "max"
| "range"
| "earliest_date"
| "latest_date"
| "date_range"
| "checked"
| "unchecked"
| "percent_checked"
| "percent_unchecked"
| "show_original"

export type formatLookup =
| "number"
| "number_with_commas"
| "percent"
| "dollar"
| "canadian_dollar"
| "euro"
| "pound"
| "yen"
| "ruble"
| "rupee"
| "won"
| "yuan"
| "real"
| "lira"
| "rupiah"
| "franc"
| "hong_kong_dollar"
| "new_zealand_dollar"
| "krona"
| "norwegian_krone"
| "mexican_peso"
| "rand"
| "new_taiwan_dollar"
| "danish_krone"
| "zloty"
| "baht"
| "forint"
| "koruna"
| "shekel"
| "chilean_peso"
| "philippine_peso"
| "dirham"
| "colombian_peso"
| "riyal"
| "ringgit"
| "leu"

export type selectColorLookup =
| "default"
| "pink"
| "purple"
| "green"
| "gray"
| "orange"
| "brown"
| "red"
| "yellow"
| "blue"

export type annotationsLookup = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color:
    | "default"
    | "gray"
    | "brown"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "red"
    | "gray_background"
    | "brown_background"
    | "orange_background"
    | "yellow_background"
    | "green_background"
    | "blue_background"
    | "purple_background"
    | "pink_background"
    | "red_background"
}

export type mentionLookup =
| {
    type: "user"
    user:
      | { id: IdRequest; object: "user" }
      | {
          type: "person"
          person: { email: string }
          name: string | null
          avatar_url: string | null
          id: IdRequest
          object: "user"
        }
      | {
          type: "bot"
          bot:
            | Record<string, never>
            | {
                owner:
                  | {
                      type: "user"
                      user:
                        | {
                            type: "person"
                            person: { email: string }
                            name: string | null
                            avatar_url: string | null
                            id: IdRequest
                            object: "user"
                          }
                        | { id: IdRequest; object: "user" }
                    }
                  | { type: "workspace"; workspace: true }
              }
          name: string | null
          avatar_url: string | null
          id: IdRequest
          object: "user"
        }
  }
| { type: "date"; date: { start: string; end: string | null } }
| { type: "page"; page: { id: IdRequest } }
| { type: "database"; database: { id: IdRequest } }

export type stringQueryLookup =
| { equals: string }
| { does_not_equal: string }
| { contains: string }
| { does_not_contain: string }
| { starts_with: string }
| { ends_with: string }
| { is_empty: true }
| { is_not_empty: true }

export type numberQueryLookup =
| { equals: number }
| { does_not_equal: number }
| { greater_than: number }
| { less_than: number }
| { greater_than_or_equal_to: number }
| { less_than_or_equal_to: number }
| { is_empty: true }
| { is_not_empty: true }

export type selectQueryLookup =
| { equals: string }
| { does_not_equal: string }
| { is_empty: true }
| { is_not_empty: true }

export type multiSelectQueryLookup =
| { contains: string }
| { does_not_contain: string }
| { is_empty: true }
| { is_not_empty: true }

export type dateQueryLookup =
| { equals: string }
| { before: string }
| { after: string }
| { on_or_before: string }
| { on_or_after: string }
| { past_week: Record<string, never> }
| { past_month: Record<string, never> }
| { past_year: Record<string, never> }
| { next_week: Record<string, never> }
| { next_month: Record<string, never> }
| { next_year: Record<string, never> }
| { is_empty: true }
| { is_not_empty: true }

export type peopleQueryLookup =
| { contains: IdRequest }
| { does_not_contain: IdRequest }
| { is_empty: true }
| { is_not_empty: true }

export type relationQueryLookup =
| { contains: IdRequest }
| { does_not_contain: IdRequest }
| { is_empty: true }
| { is_not_empty: true }

