// property.ts
import type {
  INotionProperty,
  NotionPropertyFile,
  NotionPropertyMutliSelect,
  NotionPropertyRelation,
  NotionPropertyText,
  NotionPropertyTitle,
} from '@/types/notion/database/property';

import { convertNotionPropertiesToData } from '.';

export const convertNotionPropertyFile = (property: INotionProperty) => {
  if (property.type !== 'files')
    throw Error(`convertNotionPropertyFile: cannot convert ${property.type}`);
  const filesProp = property as NotionPropertyFile;
  const files = filesProp.files.map((obj) => ({
    name: obj.name,
    file: obj.file,
  }));
  return files.length === 1 ? files[0] : files;
};

export const convertNotionPropertyText = (property: INotionProperty) => {
  if (property.type !== 'rich_text')
    throw Error(`convertNotionPropertyText: cannot convert ${property.type}`);
  const textProp = property as NotionPropertyText;
  return textProp.rich_text.map((obj) => obj.text.content).join('\n');
};

export const convertNotionPropertyMutliSelect = (property: INotionProperty) => {
  if (property.type !== 'multi_select')
    throw Error(
      `convertNotionPropertyMutliSelect: cannot convert ${property.type}`
    );
  const selectProp = property as NotionPropertyMutliSelect;
  return selectProp.multi_select;
};

export const convertNotionPropertyRelation = (property: INotionProperty) => {
  if (property.type !== 'relation')
    throw Error(
      `convertNotionPropertyRelation: cannot convert ${property.type}`
    );
  const relationProp = property as NotionPropertyRelation;
  return relationProp.relation.map((obj) =>
    convertNotionPropertiesToData(obj as Record<string, INotionProperty>)
  );
};

export const convertNotionPerpertyTitle = (property: INotionProperty) => {
  if (property.type !== 'title')
    throw Error(`convertNotionPerpertyTitle: cannot convert ${property.type}`);
  const titleProp = property as NotionPropertyTitle;
  return titleProp.title.map((obj) => obj.plain_text).join('\n');
};
