// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  IdResponse,
  PartialUserObjectResponse,
  RichTextItemResponse,
} from "./common"

type QueryMeetingNotesBodyParameters = {
  // Optional filter for querying meeting notes. Supports combinator (and/or) and property
  // filters on title, attendees, created_time, created_by, last_edited_time,
  // last_edited_by.
  filter?: {
    // Operator for combinator filters.
    operator: "and" | "or"
    // Nested filters; each may be a combinator (and/or) or property filter.
    filters?: Array<
      | {
          // Operator for nested combinator filters.
          operator: "and" | "or"
          // Nested filters for combinator filters.
          filters: Array<
            | {
                // Property name.
                property: string
                filter: {
                  // Operator.
                  operator: string
                  // Value for the operator.
                  value?:
                    | {
                        type: "relative" | "exact"
                        value:
                          | string
                          | {
                              type: "date" | "datetime"
                              start_date: string
                              start_time?: string
                              time_zone?: string
                            }
                      }
                    | {
                        type: "relative" | "exact"
                        value:
                          | string
                          | {
                              type: "daterange"
                              start_date: string
                              end_date?: string
                            }
                        direction?: "past" | "future"
                        unit?: "day" | "week" | "month" | "year"
                        count?: number
                      }
                    | {
                        type: "exact"
                        // The text value to filter on.
                        value: string
                      }
                    | Array<{
                        type: "exact"
                        value: { table: "notion_user"; id: string }
                      }>
                }
              }
            | {
                // Operator for nested combinator filters.
                operator: "and" | "or"
                filters: Array<{
                  // Property name.
                  property: string
                  filter: {
                    // Operator.
                    operator: string
                    // Value for the operator.
                    value?:
                      | {
                          type: "relative" | "exact"
                          value:
                            | string
                            | {
                                type: "date" | "datetime"
                                start_date: string
                                start_time?: string
                                time_zone?: string
                              }
                        }
                      | {
                          type: "relative" | "exact"
                          value:
                            | string
                            | {
                                type: "daterange"
                                start_date: string
                                end_date?: string
                              }
                          direction?: "past" | "future"
                          unit?: "day" | "week" | "month" | "year"
                          count?: number
                        }
                      | {
                          type: "exact"
                          // The text value to filter on.
                          value: string
                        }
                      | Array<{
                          type: "exact"
                          value: { table: "notion_user"; id: string }
                        }>
                  }
                }>
              }
          >
        }
      | {
          // Property name.
          property: string
          filter: {
            // Operator.
            operator: string
            // Value for the operator.
            value?:
              | {
                  type: "relative" | "exact"
                  value:
                    | string
                    | {
                        type: "date" | "datetime"
                        start_date: string
                        start_time?: string
                        time_zone?: string
                      }
                }
              | {
                  type: "relative" | "exact"
                  value:
                    | string
                    | {
                        type: "daterange"
                        start_date: string
                        end_date?: string
                      }
                  direction?: "past" | "future"
                  unit?: "day" | "week" | "month" | "year"
                  count?: number
                }
              | {
                  type: "exact"
                  // The text value to filter on.
                  value: string
                }
              | Array<{
                  type: "exact"
                  value: { table: "notion_user"; id: string }
                }>
          }
        }
    >
  }
  // Optional sort order for the results. Each entry specifies a property name and
  // direction.
  sort?: Array<{
    // Property name to sort by.
    property:
      | "title"
      | "attendees"
      | "created_time"
      | "created_by"
      | "last_edited_time"
      | "last_edited_by"
    // Sort direction. Must be 'ascending' or 'descending'.
    direction: "ascending" | "descending"
  }>
  // Maximum number of results to return. Defaults to 50.
  limit?: number
}

export type QueryMeetingNotesParameters = QueryMeetingNotesBodyParameters

export type QueryMeetingNotesResponse = {
  // Meeting note transcription block objects.
  results: Array<{
    // Always "block".
    object: "block"
    // The ID of the meeting note block.
    id: IdResponse
    // Always "meeting_notes".
    type: "meeting_notes"
    // Meeting note content fields.
    meeting_notes: {
      // Title of the meeting note as rich text.
      title?: Array<RichTextItemResponse>
      // Current processing status of the meeting note transcription.
      status?:
        | "transcription_not_started"
        | "transcription_paused"
        | "transcription_in_progress"
        | "summary_in_progress"
        | "notes_ready"
      // Block IDs for each tab (summary, notes, transcript).
      children?: {
        // Block ID of the AI summary tab.
        summary_block_id?: IdResponse
        // Block ID of the meeting notes tab.
        notes_block_id?: IdResponse
        // Block ID of the transcript tab.
        transcript_block_id?: IdResponse
      }
      // Calendar event metadata associated with this meeting note.
      calendar_event?: {
        // ISO-8601 start time of the calendar event.
        start_time: string
        // ISO-8601 end time of the calendar event.
        end_time: string
        // List of attendee user IDs.
        attendees?: Array<IdResponse>
      }
      // Start and end times of the actual recording.
      recording?: {
        // ISO-8601 timestamp when the recording started.
        start_time?: string
        // ISO-8601 timestamp when the recording ended.
        end_time?: string
      }
    }
    // ISO-8601 timestamp when this meeting note was created.
    created_time: string
    // ISO-8601 timestamp when this meeting note was last edited.
    last_edited_time: string
    // User who created this meeting note.
    created_by: PartialUserObjectResponse
    // User who last edited this meeting note.
    last_edited_by: PartialUserObjectResponse
    // Whether this block has child blocks.
    has_children: boolean
    // Whether this meeting note is in the trash.
    in_trash: boolean
    /** @deprecated Use `in_trash` instead. Present for backwards compatibility with API versions prior to 2026-03-11. */
    archived: boolean
  }>
  // Whether additional results exist beyond the returned limit.
  has_more: boolean
}

/**
 * Query meeting notes
 */
export const queryMeetingNotes = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["filter", "sort", "limit"],

  path: (): string => `blocks/meeting_notes/query`,
} as const
