/**
 * Notion API Types
 *
 * This file contains type definitions for common object types across various interfaces in the Notion API.
 * In the future, the contents of this file will be generated from an API definition.
 */

export type NotionObject = NotionDatabase | NotionPage | PaginatedList;

// TODO: fill in the rest of these types
export interface NotionDatabase {
  object: 'database';
  id: string;
}
export interface NotionDatabaseFilter {}
export interface NotionDatabaseSorts {}

export interface NotionPage {
  object: 'page',
  id: string;
}

export interface PaginatedList<O extends NotionObject = NotionObject> {
  object: 'list',
  results: O[],
  has_more: boolean;
  next_cursor: string | null;
}
