import type {
  NotionDatabaseRelationMapping,
  NotionUserRelationMapping,
} from './relation';

export type NotionObjectType = 'database';

export interface NotionRetrieveQueryDatabaseAPIResponse<T> {
  object: 'list';
  next_cursor: string | null;
  has_more: boolean;
  results: Array<NotionRetrieveQueryDatabaseResult<T>>;
  type: string;
  page_or_database: unknown;
  developer_survey: string;
  request_id: string;
}

export type NotionRetrieveQueryDatabaseResultType = 'page';

export interface NotionRetrieveQueryDatabaseResult<T> {
  object: NotionRetrieveQueryDatabaseResultType;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUserRelationMapping;
  last_edited_by: NotionUserRelationMapping;
  cover: null;
  icon: null;
  parent: NotionDatabaseRelationMapping;
  archived: boolean;
  in_trash: boolean;
  properties: T;
  url: string;
  public_url: null | string;
}
