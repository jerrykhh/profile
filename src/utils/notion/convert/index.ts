// convert.ts
import type { INotionData, INotionObjectData } from '@/types/notion/data';

import {
  convertNotionDataCheckbox,
  convertNotionDataDate,
  convertNotionDataFile,
  convertNotionDataMutliSelect,
  convertNotionDataRelation,
  convertNotionDataText,
  convertNotionDataTitle,
  convertNotionDataUrl,
} from './property';

type PropertyConverter = (property: INotionData) => unknown;

const propertiesConvertorMapping: Record<string, PropertyConverter> = {
  files: convertNotionDataFile,
  rich_text: convertNotionDataText,
  multi_select: convertNotionDataMutliSelect,
  title: convertNotionDataTitle,
  relation: convertNotionDataRelation,
  checkbox: convertNotionDataCheckbox,
  date: convertNotionDataDate,
  url: convertNotionDataUrl,
};

export const convertNotionObjectToData = async <T>(
  properties: INotionObjectData
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
