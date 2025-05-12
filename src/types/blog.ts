import {
  NotionDataProperty,
  NotionPropertyCheckbox,
  NotionPropertyDate,
  NotionPropertyMutliSelect,
  NotionPropertyText,
  NotionPropertyTitle,
} from './notion/database/property';

export type NotionBlogProperty = NotionDataProperty & {
  name: NotionPropertyTitle;
  title: NotionPropertyText;
  synopsis: NotionPropertyText;
  createdAt: NotionPropertyDate;
  external: NotionPropertyCheckbox;
  tags: NotionPropertyMutliSelect;
  'social.og.title': NotionPropertyText;
  'social.og.description': NotionPropertyText;
  'social.og.image': NotionPropertyText;
  published: NotionPropertyCheckbox;
};
