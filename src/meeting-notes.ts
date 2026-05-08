import type { QueryMeetingNotesParameters as ApiQueryMeetingNotesParameters } from "./api-endpoints/meeting-notes"

// cspell:ignore daterange

export const meetingNotesFilterableProperties = [
  "title",
  "created_time",
  "last_edited_time",
  "created_by",
  "last_edited_by",
  "attendees",
] as const

const meetingNotesTextFilterOperators = [
  "string_is",
  "string_is_not",
  "string_contains",
  "string_does_not_contain",
  "string_starts_with",
  "string_ends_with",
  "is_empty",
  "is_not_empty",
] as const

const meetingNotesDateFilterOperators = [
  "date_is",
  "date_is_before",
  "date_is_after",
  "date_is_on_or_before",
  "date_is_on_or_after",
  "date_is_within",
  "date_is_relative_to",
  "is_empty",
  "is_not_empty",
] as const

const meetingNotesPersonFilterOperators = [
  "person_contains",
  "person_does_not_contain",
  "is_empty",
  "is_not_empty",
] as const

export type MeetingNotesPropertyName =
  (typeof meetingNotesFilterableProperties)[number]

type MeetingNotesTextFilterOperator =
  (typeof meetingNotesTextFilterOperators)[number]

type MeetingNotesDateFilterOperator =
  (typeof meetingNotesDateFilterOperators)[number]

type MeetingNotesPersonFilterOperator =
  (typeof meetingNotesPersonFilterOperators)[number]

type MeetingNotesNoValueFilter<TOperator extends string> = {
  operator: TOperator
}

type MeetingNotesValueFilter<TOperator extends string, TValue> = {
  operator: TOperator
  value: TValue
}

type MeetingNotesEmptyFilter = MeetingNotesNoValueFilter<
  "is_empty" | "is_not_empty"
>

type MeetingNotesTextFilterValue = {
  type: "exact"
  value: string
}

type MeetingNotesDatePointFilterValue = {
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

type MeetingNotesDateRangeFilterValue = {
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

type MeetingNotesPersonOperatorValue = {
  type: "exact"
  value: {
    table: "notion_user"
    id: string
  }
}

type MeetingNotesTextFilter =
  | MeetingNotesValueFilter<
      Exclude<
        MeetingNotesTextFilterOperator,
        MeetingNotesEmptyFilter["operator"]
      >,
      MeetingNotesTextFilterValue
    >
  | MeetingNotesEmptyFilter

type MeetingNotesDateRangeOperator = "date_is_within" | "date_is_relative_to"

type MeetingNotesDateFilter =
  | MeetingNotesValueFilter<
      Exclude<
        MeetingNotesDateFilterOperator,
        MeetingNotesDateRangeOperator | MeetingNotesEmptyFilter["operator"]
      >,
      MeetingNotesDatePointFilterValue
    >
  | MeetingNotesValueFilter<
      MeetingNotesDateRangeOperator,
      MeetingNotesDateRangeFilterValue
    >
  | MeetingNotesEmptyFilter

type MeetingNotesPersonFilter =
  | MeetingNotesValueFilter<
      Exclude<
        MeetingNotesPersonFilterOperator,
        MeetingNotesEmptyFilter["operator"]
      >,
      MeetingNotesPersonOperatorValue | MeetingNotesPersonOperatorValue[]
    >
  | MeetingNotesEmptyFilter

type MeetingNotesPropertyFilterByProperty = {
  title: MeetingNotesTextFilter
  created_time: MeetingNotesDateFilter
  last_edited_time: MeetingNotesDateFilter
  created_by: MeetingNotesPersonFilter
  last_edited_by: MeetingNotesPersonFilter
  attendees: MeetingNotesPersonFilter
}

export type MeetingNotesPropertyFilter = {
  [Property in keyof MeetingNotesPropertyFilterByProperty]: {
    property: Property
    filter: MeetingNotesPropertyFilterByProperty[Property]
  }
}[keyof MeetingNotesPropertyFilterByProperty]

export type MeetingNotesFilterNode =
  | MeetingNotesCombinatorFilter
  | MeetingNotesPropertyFilter

export type MeetingNotesCombinatorFilter = {
  operator: "and" | "or"
  filters?: MeetingNotesFilterNode[]
}

export type MeetingNotesSort = {
  property: MeetingNotesPropertyName
  direction: "ascending" | "descending"
}

export type QueryMeetingNotesParameters = Omit<
  ApiQueryMeetingNotesParameters,
  "filter" | "sort"
> & {
  filter?: MeetingNotesCombinatorFilter
  sort?: MeetingNotesSort[]
}
