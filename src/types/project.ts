import type { NotionDate, NotionFile } from './notion/converted';
import type {
  NotionDataProperty,
  NotionPropertyCheckbox,
  NotionPropertyDate,
  NotionPropertyFile,
  NotionPropertyMutliSelect,
  NotionPropertyText,
  NotionPropertyTitle,
  NotionPropertyUrl,
} from './notion/database/property';
import type { NotionContentSocialProperty } from './social';
import type { Tag } from './tag';

export type NotionProjectProperty = NotionDataProperty &
  NotionContentSocialProperty & {
    name: NotionPropertyTitle;
    published: NotionPropertyCheckbox;
    createdAt: NotionPropertyDate;
    'github.repo': NotionPropertyUrl;
    synopsis: NotionPropertyText;
    thumbnail: NotionPropertyFile;
    title: NotionPropertyTitle;
    tags: NotionPropertyMutliSelect;
  };

export interface Project {
  id: string;
  name: string;
  createdAt: NotionDate;
  synopsis: string;
  published: boolean;
  title: string;
  thumbnail: null | NotionFile;
  'social.og.title': string;
  'social.og.description': string;
  'social.og.image': string;
  tags: Tag[];
}
