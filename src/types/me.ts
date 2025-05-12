import {
  NotionDataProperty,
  NotionPropertyFile,
  NotionPropertyMutliSelect,
  NotionPropertyRelation,
  NotionPropertyText,
  NotionPropertyTitle,
  NotionPropertyUrl,
} from './notion/database/property';

export type NotionMeProperty = NotionDataProperty & {
  profilePic: NotionPropertyFile;
  biography: NotionPropertyText;
  versions: NotionPropertyRelation;
  todos: NotionPropertyMutliSelect;
  title: NotionPropertyTitle;
};

export type NotionVersionProperty = {
  url: NotionPropertyUrl;
  name: NotionPropertyTitle;
  tag: NotionPropertyText;
};
