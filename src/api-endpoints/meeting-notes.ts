// cspell:disable-file
// Note: This is a generated file. DO NOT EDIT!

import type {
  IdRequest,
  IdResponse,
  MeetingNotesPropertyFilter,
  PartialUserObjectResponse,
  RichTextItemResponse,
} from "./common"

type CreateMeetingNoteBodyParameters = {
  // Title for the meeting note.
  title?: string
  // Language hint for transcription. Defaults to automatic detection.
  language?:
    | "auto"
    | "en"
    | "zh-CN"
    | "zh-TW"
    | "es"
    | "fr"
    | "de"
    | "ja"
    | "ko"
    | "pt"
    | "ru"
    | "th"
    | "vi"
    | "id"
    | "da"
    | "fi"
    | "no"
    | "nl"
    | "it"
    | "sv"
    | "ar"
    | "he"
    | "pl"
  // Optional processing settings.
  options?: {
    // Whether to start summary generation after transcription.
    kickoff_summary?: boolean
  }
} & (
  | {
      // Audio or video source for the meeting note.
      source: {
        // Always "file_upload".
        type: "file_upload"
        // ID of a completed public API file upload.
        file_upload_id: IdRequest
      }
      // Parent page for the new meeting note.
      parent: {
        // Always "page_id".
        type: "page_id"
        // Page ID where the meeting note should be created. Required for file_upload sources.
        page_id: IdRequest
      }
    }
  | {
      // Audio or video source for the meeting note.
      source: {
        // Always "block".
        type: "block"
        // ID of an existing audio, video, or file block.
        block_id: IdRequest
      }
      // Not accepted for block sources.
      parent?: never
    }
)

export type CreateMeetingNoteParameters = CreateMeetingNoteBodyParameters

export type CreateMeetingNoteResponse =
  | {
      // Always "block".
      object: "block"
      // The ID of the meeting note block.
      id: IdResponse
    }
  | {
      // Always "block".
      object: "block"
      // The ID of the meeting note block.
      id: IdResponse
      // Always "meeting_notes".
      type: "meeting_notes"
      // Meeting note content fields.
      meeting_notes: {
        // Whether this is a full-page meeting note.
        is_full_page: boolean
        // Title of the meeting note as rich text.
        title?: Array<RichTextItemResponse>
        // Current processing status of the meeting note transcription.
        status?:
          | "transcription_not_started"
          | "transcription_paused"
          | "transcription_in_progress"
          | "transcription_failed"
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
          // ID of the calendar event, as returned by the calendar tools.
          event_id?: string
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
    }

/**
 * Create a meeting note
 */
export const createMeetingNote = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: ["title", "language", "options", "source", "parent"],

  path: (): string => `blocks/meeting_notes`,
} as const

type QueryMeetingNotesBodyParameters = {
  // Optional filter for querying meeting notes. Supports combinator (and/or) and property
  // filters on title, attendees, created_time, created_by, last_edited_time,
  // last_edited_by.
  filter?: {
    // Operator for combinator filters.
    operator: "and" | "or"
    // Nested filters; each may be a combinator (and/or) or property filter.
    filters?: Array<
      | MeetingNotesPropertyFilter
      | {
          // Whether every child must match, or any of them.
          operator: "and" | "or"
          // The conditions in this group. A group with no conditions matches nothing, so send at
          // least one.
          filters: Array<MeetingNotesPropertyFilter>
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
  // Meeting note block objects.
  results: Array<{
    // Always "block".
    object: "block"
    // The ID of the meeting note block.
    id: IdResponse
    // Always "meeting_notes".
    type: "meeting_notes"
    // Meeting note content fields.
    meeting_notes: {
      // Whether this is a full-page meeting note.
      is_full_page: boolean
      // Title of the meeting note as rich text.
      title?: Array<RichTextItemResponse>
      // Current processing status of the meeting note transcription.
      status?:
        | "transcription_not_started"
        | "transcription_paused"
        | "transcription_in_progress"
        | "transcription_failed"
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
        // ID of the calendar event, as returned by the calendar tools.
        event_id?: string
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

type CreateMeetingNotePageBodyParameters = {
  // Page or data source to create the meeting note in. Defaults to the user's meeting
  // notes database, which is created if they don't have one. Not accepted with
  // calendar_event.
  parent?:
    | {
        // Always `page_id`
        type: "page_id"
        // ID of the parent page.
        page_id: IdRequest
      }
    | {
        // Always `data_source_id`
        type: "data_source_id"
        // ID of the parent data source.
        data_source_id: IdRequest
      }
  // Title for the meeting note. Not accepted with calendar_event.
  title?: string
  // Content for the meeting note's Notes tab, as Markdown. Not accepted with
  // calendar_event.
  markdown?: string
  // Calendar event to get or create the meeting note for. The meeting note is filed and
  // titled like the event's other meeting notes. Add content to it afterwards.
  calendar_event?: {
    // The calendar the event belongs to.
    calendar: {
      // ID of the calendar account.
      account_id: string
      // ID of the calendar.
      calendar_id: string
    }
    // ID of the event, as returned in eventId by Notion MCP's notion-calendar-list-events.
    event_id: string
  }
  // The Markdown syntax to use. `v2` is [Notion-flavored
  // Markdown](/guides/data-apis/notion-flavored-markdown) and is recommended. `v1` is
  // enhanced markdown. It's deprecated. It's the default on current Notion-Versions. The
  // next Notion-Version rejects `v1` with a `400` `validation_error`.
  markdown_version?: "v1" | "v2"
}

export type CreateMeetingNotePageParameters =
  CreateMeetingNotePageBodyParameters

export type CreateMeetingNotePageResponse = {
  // Always "meeting_note_page_result".
  object: "meeting_note_page_result"
  // The full-page meeting note, as a meeting_notes block.
  meeting_note: {
    // Always "block".
    object: "block"
    // The ID of the meeting note block.
    id: IdResponse
    // Always "meeting_notes".
    type: "meeting_notes"
    // Meeting note content fields.
    meeting_notes: {
      // Whether this is a full-page meeting note.
      is_full_page: boolean
      // Title of the meeting note as rich text.
      title?: Array<RichTextItemResponse>
      // Current processing status of the meeting note transcription.
      status?:
        | "transcription_not_started"
        | "transcription_paused"
        | "transcription_in_progress"
        | "transcription_failed"
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
        // ID of the calendar event, as returned by the calendar tools.
        event_id?: string
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
  }
  // Whether the meeting note was created, rather than an existing meeting note for the
  // event returned.
  created: boolean
}

/**
 * Create a full-page meeting note
 */
export const createMeetingNotePage = {
  method: "post",
  pathParams: [],
  queryParams: [],
  bodyParams: [
    "parent",
    "title",
    "markdown",
    "calendar_event",
    "markdown_version",
  ],

  path: (): string => `meeting_notes`,
} as const

type UpdateMeetingNotePagePathParameters = {
  // ID of the full-page meeting note.
  meeting_note_id: IdRequest
}

type UpdateMeetingNotePageBodyParameters = {
  // Calendar event to link the meeting note to. Replaces any event it is already linked
  // to.
  calendar_event: {
    // The calendar the event belongs to.
    calendar: {
      // ID of the calendar account.
      account_id: string
      // ID of the calendar.
      calendar_id: string
    }
    // ID of the event, as returned in eventId by Notion MCP's notion-calendar-list-events.
    event_id: string
  }
  // Link even when other meeting notes are linked to the same event. Defaults to false,
  // which returns a 409 listing them instead.
  allow_other_meeting_notes?: boolean
}

export type UpdateMeetingNotePageParameters =
  UpdateMeetingNotePagePathParameters & UpdateMeetingNotePageBodyParameters

export type UpdateMeetingNotePageResponse = {
  // Always "meeting_note_page_result".
  object: "meeting_note_page_result"
  // The full-page meeting note, as a meeting_notes block.
  meeting_note: {
    // Always "block".
    object: "block"
    // The ID of the meeting note block.
    id: IdResponse
    // Always "meeting_notes".
    type: "meeting_notes"
    // Meeting note content fields.
    meeting_notes: {
      // Whether this is a full-page meeting note.
      is_full_page: boolean
      // Title of the meeting note as rich text.
      title?: Array<RichTextItemResponse>
      // Current processing status of the meeting note transcription.
      status?:
        | "transcription_not_started"
        | "transcription_paused"
        | "transcription_in_progress"
        | "transcription_failed"
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
        // ID of the calendar event, as returned by the calendar tools.
        event_id?: string
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
  }
  // IDs of other meeting notes you can read that are linked to the same event. For a
  // meeting note inside a page, this is the page's ID. Only the first 50 meeting notes
  // found are checked.
  other_meeting_note_ids: Array<IdResponse>
}

/**
 * Link a full-page meeting note to a calendar event
 */
export const updateMeetingNotePage = {
  method: "patch",
  pathParams: ["meeting_note_id"],
  queryParams: [],
  bodyParams: ["calendar_event", "allow_other_meeting_notes"],

  path: (p: UpdateMeetingNotePagePathParameters): string =>
    `meeting_notes/${p.meeting_note_id}`,
} as const
