import type { NotionDate } from './notion/converted';
import type {
  INotionObjectData,
  NotionDataCheckbox,
  NotionDataDate,
  NotionDataMutliSelect,
  NotionDataText,
  NotionDataTitle,
  NotionDataUrl,
} from './notion/data';
import type { NotionContentSocialProperty } from './social';
import type { Tag } from './tag';

export type NotionBlogProperty = INotionObjectData &
  NotionContentSocialProperty & {
    name: NotionDataTitle;
    title: NotionDataText;
    synopsis: NotionDataText;
    createdAt: NotionDataDate;
    external: NotionDataCheckbox;
    externalUrl: NotionDataUrl;
    tags: NotionDataMutliSelect;
    published: NotionDataCheckbox;
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
