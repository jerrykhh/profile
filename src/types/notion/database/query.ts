import { NotionAPIResponse, NotionResult } from '../request';

export interface NotionQueryDatabaseAPIResponse<T> extends NotionAPIResponse {
  object: 'database';
  results: Array<NotionQueryDatabaseResult<T>>;
}

export interface NotionQueryDatabaseResult<T> extends NotionResult {
  object: 'page';
  properties: T;
}
