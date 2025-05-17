import type {
  NotionData,
  NotionEmbeddedVideo,
  NotionFile,
  NotionText,
} from '.';
import type { NotionAPIResponse, NotionResult } from '../request';

export type INotionBlock =
  | NotionBlockResult
  | NotionBlockParagraph
  | NotionBlockImage
  | NotionBlockHeading
  | NotionBlockVideo;

export interface NotionBlockAPIResponse extends NotionAPIResponse {
  object: 'list';
  results: Array<NotionBlockResult>;
}

export interface NotionBlockResult extends NotionData, NotionResult {
  object: 'block';
}

export interface NotionBlockParagraph extends NotionBlockResult {
  type: 'paragraph';
  paragraph: {
    rich_text: Array<NotionText>;
  };
}

export interface NotionBlockNumberedListItem extends NotionBlockResult {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: Array<NotionText>;
  };
}

export interface NotionBlockImage extends NotionBlockResult {
  type: 'image';
  image: NotionFile;
}

export interface NotionBlockHeading extends NotionBlockResult {
  type: 'heading_2';
  heading_2: {
    rich_text: Array<NotionText>;
  };
}

export interface NotionBlockVideo extends NotionBlockResult {
  type: 'video';
  video: NotionEmbeddedVideo;
}

export interface NotionBlockCode extends NotionBlockResult {
  type: 'code';
  code: {
    rich_text: Array<NotionText>;
    language: string;
  };
}
