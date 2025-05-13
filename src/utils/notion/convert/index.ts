// convert.ts
import type {
  INotionProperty,
  NotionDataProperty,
} from '@/types/notion/database/property';

import {
  convertNotionPropertyCheckbox,
  convertNotionPropertyDate,
  convertNotionPropertyFile,
  convertNotionPropertyMutliSelect,
  convertNotionPropertyRelation,
  convertNotionPropertyText,
  convertNotionPropertyTitle,
  convertNotionPropertyUrl,
} from './property';

type PropertyConverter = (property: INotionProperty) => unknown;

const propertiesConvertorMapping: Record<string, PropertyConverter> = {
  files: convertNotionPropertyFile,
  rich_text: convertNotionPropertyText,
  multi_select: convertNotionPropertyMutliSelect,
  title: convertNotionPropertyTitle,
  relation: convertNotionPropertyRelation,
  checkbox: convertNotionPropertyCheckbox,
  date: convertNotionPropertyDate,
  url: convertNotionPropertyUrl,
};

export const convertNotionPropertiesToData = async <T>(
  properties: NotionDataProperty
): Promise<T> => {
  const data: { [key: string]: unknown } = {};
  Object.keys(properties).forEach(async (key) => {
    if (['string', 'number', 'boolean'].includes(typeof properties[key])) {
      data[key] = properties[key];
      return;
    }
    const property = properties[key];
    if (!property) return;
    const converter = propertiesConvertorMapping[property.type];
    if (converter) {
      data[key] = await converter(property);
    }
  });
  return data as T;
};
