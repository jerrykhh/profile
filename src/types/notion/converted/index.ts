import { NotionDataTextAnnotations } from '../data/annotations';

export type NotionFile = {
  name: string;
  file: {
    url: string;
    expiry_time: string;
  };
};

export type NoitonMultiSelect = {
  id: string;
  name: string;
  color: string;
};

export type NotionDate = {
  start: string;
  end: null | string;
};

export type NotionBlock = {
  type:
    | 'paragraph'
    | 'heading_2'
    | 'code'
    | 'heading_3'
    | 'video'
    | 'numbered_list_item'
    | 'image';
  data: NotionTextStyled[] | string;
};

export type NotionTextStyled = {
  text: {
    content: string;
    link: string;
  };
  annotations: NotionDataTextAnnotations;
};
