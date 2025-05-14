import {
  NotionDatabaseRelationMapping,
  NotionUserRelationMapping,
} from './database/relation';

export interface NotionAPIResponse {
  object: string;
  next_cursor: string | null;
  has_more: boolean;
  type: 'block' | 'page_or_database';
  developer_survey: string;
  request_id: string;
}

export interface NotionResult {
  object: string;
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

  url: string;
  public_url: null | string;
}
