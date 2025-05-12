import type { NotionAnnotations } from './annotations';

export type INotionProperty =
  | NotionPropertyFile
  | NotionPropertyText
  | NotionPropertyRelation
  | NotionPropertyMutliSelect
  | NotionPropertyTitle
  | NotionPropertyUrl
  | NotionPropertyDate
  | NotionPropertyCheckbox;

export type NotionDataProperty = Record<string, INotionProperty>;

export interface NotionProperty {
  id: string;
  type: string;
}

export interface NotionPropertyFile extends NotionProperty {
  id: string;
  type: 'files';
  files: Array<{
    name: string;
    type: 'file';
    file: {
      url: string;
      expiry_time: string;
    };
  }>;
}

export interface NotionPropertyText extends NotionProperty {
  id: string;
  type: 'rich_text';
  rich_text: Array<{
    type: 'text';
    text: {
      content: string;
      link: string | null;
    };
  }>;
  annotations: NotionAnnotations;
  plain_text: string;
  href: null;
}

export interface NotionPropertyRelation extends NotionProperty {
  id: string;
  type: 'relation';
  relation:
    | Array<{
        id: string;
      }>
    | Array<Record<string, INotionProperty>>;
  has_more: boolean;
}

export interface NotionPropertyMutliSelect extends NotionProperty {
  id: string;
  type: 'multi_select';
  multi_select: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export interface NotionPropertyTitle extends NotionProperty {
  id: string;
  type: 'title';
  title: Array<{
    type: 'text';
    text: {
      content: string;
      link: string | null;
    };
    annotations: NotionAnnotations;
    plain_text: string;
    href: string | null;
  }>;
}

export interface NotionPropertyUrl extends NotionProperty {
  id: string;
  type: 'url';
  url: null | string;
}

export interface NotionPropertyDate extends NotionProperty {
  id: string;
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: null | string;
  };
}

export interface NotionPropertyCheckbox extends NotionProperty {
  id: string;
  type: 'checkbox';
  checkbox: boolean;
}
