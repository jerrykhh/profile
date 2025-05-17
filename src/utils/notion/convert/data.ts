// property.ts
import type {
  INotionData,
  INotionObjectData,
  NotionDataCheckbox,
  NotionDataDate,
  NotionDataFile,
  NotionDataMutliSelect,
  NotionDataRelation,
  NotionDataText,
  NotionDataTitle,
  NotionDataUrl,
} from '@/types/notion/data';

import { convertNotionObjectToData } from '.';

export const convertNotionDataFile = async (property: INotionData) => {
  if (property.type !== 'files')
    throw Error(`convertNotionDataFile: cannot convert ${property.type}`);
  const filesProp = property as NotionDataFile;
  const files = filesProp.files.map((obj) => ({
    name: obj.name,
    file: obj.file,
  }));
  if (files.length === 0) return null;
  return files.length === 1 ? files[0] : files;
};

export const convertNotionDataText = async (property: INotionData) => {
  if (property.type !== 'rich_text')
    throw Error(`convertNotionDataText: cannot convert ${property.type}`);
  const textProp = property as NotionDataText;
  return textProp.rich_text.map((obj) => obj.text.content).join('\n');
};

export const convertNotionDataMutliSelect = async (property: INotionData) => {
  if (property.type !== 'multi_select')
    throw Error(
      `convertNotionDataMutliSelect: cannot convert ${property.type}`
    );
  const selectProp = property as NotionDataMutliSelect;
  return selectProp.multi_select;
};

export const convertNotionDataRelation = async (property: INotionData) => {
  if (property.type !== 'relation')
    throw Error(`convertNotionDataRelation: cannot convert ${property.type}`);
  const relationProp = property as NotionDataRelation;
  return await Promise.all(
    relationProp.relation.map(
      async (obj) => await convertNotionObjectToData(obj as INotionObjectData)
    )
  );
};

export const convertNotionDataTitle = async (property: INotionData) => {
  if (property.type !== 'title')
    throw Error(`convertNotionDataTitle: cannot convert ${property.type}`);
  const titleProp = property as NotionDataTitle;
  return titleProp.title.map((obj) => obj.plain_text).join('\n');
};

export const convertNotionDataCheckbox = async (property: INotionData) => {
  if (property.type !== 'checkbox')
    throw Error(`convertNotionDataCheckbox: cannot convert ${property.type}`);
  const checkboxProps = property as NotionDataCheckbox;
  return Boolean(checkboxProps.checkbox);
};

export const convertNotionDataDate = async (property: INotionData) => {
  if (property.type !== 'date')
    throw Error(`convertNotionDataDate: cannot convert ${property.type}`);
  const dateProps = property as NotionDataDate;
  return dateProps.date;
};

export const convertNotionDataUrl = async (property: INotionData) => {
  if (property.type !== 'url')
    throw Error(`convertNotionDataUrl: cannot convert ${property.type}`);
  const urlProps = property as NotionDataUrl;
  return urlProps.url;
};
