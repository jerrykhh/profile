import type { NotionDate } from './notion/converted';
import type {
  NotionDataProperty,
  NotionPropertyCheckbox,
  NotionPropertyDate,
  NotionPropertyMutliSelect,
  NotionPropertyText,
  NotionPropertyTitle,
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
    tags: NotionPropertyMutliSelect;
    published: NotionPropertyCheckbox;
  };

export interface Blog {
  published: boolean;
  synopsis: string;
  external: boolean;
  title: string;
  'social.og.title': string;
  'social.og.image': string;
  'social.og.description': string;
  name: string;
  createdAt: NotionDate;
  tags: Tag[];
}
