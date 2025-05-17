import type { NotionFile } from './notion/converted';
import type {
  INotionObjectData,
  NotionDataFile,
  NotionDataMutliSelect,
  NotionDataRelation,
  NotionDataText,
  NotionDataTitle,
  NotionDataUrl,
} from './notion/data';
import type { Todo } from './todo';
import type { ReleasedVersion } from './version';

export interface NotionMeProperty extends INotionObjectData {
  profilePic: NotionDataFile;
  biography: NotionDataText;
  versions: NotionDataRelation;
  todos: NotionDataMutliSelect;
  title: NotionDataTitle;
}

export type NotionVersionProperty = {
  url: NotionDataUrl;
  name: NotionDataTitle;
  tag: NotionDataText;
};

export interface Me {
  profilePic: NotionFile;
  biography: string;
  title: string;
  todos: Todo[];
  versions: ReleasedVersion[];
}
