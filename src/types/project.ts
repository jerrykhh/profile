import type { NotionDate, NotionFile } from './notion/converted';
import type {
  INotionObjectData,
  NotionData,
  NotionDataCheckbox,
  NotionDataDate,
  NotionDataFile,
  NotionDataMutliSelect,
  NotionDataText,
  NotionDataTitle,
  NotionDataUrl,
} from './notion/data';
import type { NotionContentSocialProperty } from './social';
import type { Tag } from './tag';

export type NotionProjectProperty = INotionObjectData &
  NotionContentSocialProperty & {
    name: NotionDataTitle;
    published: NotionDataCheckbox;
    createdAt: NotionDataDate;
    'github.repo': NotionDataUrl;
    synopsis: NotionDataText;
    thumbnail: NotionDataFile;
    title: NotionDataTitle;
    tags: NotionDataMutliSelect;
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

export interface ProjectPageContent {
  [key: string]: NotionData;
}
