/**
 * Notion API Types
 *
 * This file contains type definitions for common object types across various interfaces in the Notion API.
 * In the future, the contents of this file will be generated from an API definition.
 */

export type NotionObject = NotionSingularObject | PaginatedList;
export type NotionSingularObject = NotionDatabase | NotionPage;

interface PropertyFilter {
  property: string;
  // title?: TextFilter;
  // text?: TextFilter;
  // number?: NumberFilter;
  // checkbox?: CheckboxFilter;
  // ...
}


// TODO: fill in the rest of these types
export interface NotionDatabase {
  object: 'database';
  id: string;
}
export type NotionDatabaseFilter = PropertyFilter; // | ...
export interface NotionDatabaseSort {
  // TODO: either property or timestamp are defined but not both
  property?: string;
  timestamp?: 'created_time' | 'last_edited_time';
  direction: 'ascending' | 'descending';
}

export interface NotionPage {
  object: 'page',
  id: string;
}

export interface PaginatedList<O extends NotionSingularObject = NotionSingularObject> {
  object: 'list',
  results: O[],
  has_more: boolean;
  next_cursor: string | null;
}
