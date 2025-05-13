// property.ts
import type {
  INotionProperty,
  NotionPropertyCheckbox,
  NotionPropertyDate,
  NotionPropertyFile,
  NotionPropertyMutliSelect,
  NotionPropertyRelation,
  NotionPropertyText,
  NotionPropertyTitle,
  NotionPropertyUrl,
} from '@/types/notion/database/property';

import { convertNotionPropertiesToData } from '.';

export const convertNotionPropertyFile = async (property: INotionProperty) => {
  if (property.type !== 'files')
    throw Error(`convertNotionPropertyFile: cannot convert ${property.type}`);
  const filesProp = property as NotionPropertyFile;
  const files = filesProp.files.map((obj) => ({
    name: obj.name,
    file: obj.file,
  }));
  if (files.length === 0) return null;
  return files.length === 1 ? files[0] : files;
};

export const convertNotionPropertyText = async (property: INotionProperty) => {
  if (property.type !== 'rich_text')
    throw Error(`convertNotionPropertyText: cannot convert ${property.type}`);
  const textProp = property as NotionPropertyText;
  return textProp.rich_text.map((obj) => obj.text.content).join('\n');
};

export const convertNotionPropertyMutliSelect = async (
  property: INotionProperty
) => {
  if (property.type !== 'multi_select')
    throw Error(
      `convertNotionPropertyMutliSelect: cannot convert ${property.type}`
    );
  const selectProp = property as NotionPropertyMutliSelect;
  return selectProp.multi_select;
};

export const convertNotionPropertyRelation = async (
  property: INotionProperty
) => {
  if (property.type !== 'relation')
    throw Error(
      `convertNotionPropertyRelation: cannot convert ${property.type}`
    );
  const relationProp = property as NotionPropertyRelation;
  return await Promise.all(
    relationProp.relation.map(
      async (obj) =>
        await convertNotionPropertiesToData(
          obj as Record<string, INotionProperty>
        )
    )
  );
};

export const convertNotionPropertyTitle = async (property: INotionProperty) => {
  if (property.type !== 'title')
    throw Error(`convertNotionPropertyTitle: cannot convert ${property.type}`);
  const titleProp = property as NotionPropertyTitle;
  return titleProp.title.map((obj) => obj.plain_text).join('\n');
};

export const convertNotionPropertyCheckbox = async (
  property: INotionProperty
) => {
  if (property.type !== 'checkbox')
    throw Error(
      `convertNotionPropertyCheckbox: cannot convert ${property.type}`
    );
  const checkboxProps = property as NotionPropertyCheckbox;
  return Boolean(checkboxProps.checkbox);
};

export const convertNotionPropertyDate = async (property: INotionProperty) => {
  if (property.type !== 'date')
    throw Error(`convertNotionPropertyDate: cannot convert ${property.type}`);
  const dateProps = property as NotionPropertyDate;
  return dateProps.date;
};

export const convertNotionPropertyUrl = async (property: INotionProperty) => {
  if (property.type !== 'url')
    throw Error(`convertNotionPropertyUrl: cannot convert ${property.type}`);
  const urlProps = property as NotionPropertyUrl;
  return urlProps.url;
};
