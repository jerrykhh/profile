import type { NotionFile } from './notion/converted';
import type {
  NotionDataProperty,
  NotionPropertyFile,
  NotionPropertyMutliSelect,
  NotionPropertyRelation,
  NotionPropertyText,
  NotionPropertyTitle,
  NotionPropertyUrl,
} from './notion/database/property';
import type { Todo } from './todo';
import type { ReleasedVersion } from './version';

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

export interface Me {
  profilePic: NotionFile;
  biography: string;
  title: string;
  todos: Todo[];
  versions: ReleasedVersion[];
}
