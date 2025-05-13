import type { NotionDate } from './notion/converted';
import type {
  NotionDataProperty,
  NotionPropertyCheckbox,
  NotionPropertyDate,
  NotionPropertyMutliSelect,
  NotionPropertyText,
  NotionPropertyTitle,
  NotionPropertyUrl,
} from './notion/database/property';
import type { NotionContentSocialProperty } from './social';
import type { Tag } from './tag';

export type NotionBlogProperty = NotionDataProperty &
  NotionContentSocialProperty & {
    name: NotionPropertyTitle;
    title: NotionPropertyText;
    synopsis: NotionPropertyText;
    createdAt: NotionPropertyDate;
    external: NotionPropertyCheckbox;
    externalUrl: NotionPropertyUrl;
    tags: NotionPropertyMutliSelect;
    published: NotionPropertyCheckbox;
  };

export interface Blog {
  id: string;
  published: boolean;
  synopsis: string;
  external: boolean;
  externalUrl: string;
  title: string;
  'social.og.title': string;
  'social.og.image': string;
  'social.og.description': string;
  name: string;
  createdAt: NotionDate;
  tags: Tag[];
}
