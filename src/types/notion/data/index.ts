import type { NotionDataTextAnnotations } from '../data/annotations';
import { INotionBlock } from './block';

export type INotionData =
  | NotionDataFile
  | NotionDataText
  | NotionDataRelation
  | NotionDataMutliSelect
  | NotionDataTitle
  | NotionDataUrl
  | NotionDataDate
  | NotionDataCheckbox
  | INotionBlock;

export type INotionObjectData = Record<string, INotionData>;

export interface NotionData {
  id: string;
  type: string;
}

export interface NotionText {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  plain_text: string;
  annotations: NotionDataTextAnnotations;
}

export interface NotionEmbeddedVideo {
  type: 'external';
  external: {
    url: string;
  };
}

export interface NotionFile {
  name?: string;
  type: 'file';
  file: {
    url: string;
    expiry_time: string;
  };
}
export interface NotionDataFile extends NotionData {
  type: 'files';
  files: Array<NotionFile>;
}

export interface NotionDataText extends NotionData {
  type: 'rich_text';
  rich_text: Array<NotionText>;
  annotations: NotionDataTextAnnotations;
  plain_text: string;
  href: null;
}

export interface NotionDataRelation extends NotionData {
  type: 'relation';
  relation:
    | Array<{
        id: string;
      }>
    | Array<Record<string, INotionData>>;
  has_more: boolean;
}

export interface NotionDataMutliSelect extends NotionData {
  type: 'multi_select';
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export interface NotionDataTitle extends NotionData {
  type: 'title';
  title: Array<NotionText>;
}

export interface NotionDataUrl extends NotionData {
  type: 'url';
  url: null | string;
}

export interface NotionDataDate extends NotionData {
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: null | string;
  };
}

export interface NotionDataCheckbox extends NotionData {
  type: 'checkbox';
  checkbox: boolean;
}
