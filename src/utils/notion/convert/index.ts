// convert.ts
import type { INotionProperty } from '@/types/notion/database/property';

import {
  convertNotionPerpertyTitle,
  convertNotionPropertyFile,
  convertNotionPropertyMutliSelect,
  convertNotionPropertyRelation,
  convertNotionPropertyText,
} from './property';

type PropertyConverter = (property: INotionProperty) => unknown;

const propertiesConvertorMapping: Record<string, PropertyConverter> = {
  files: convertNotionPropertyFile,
  rich_text: convertNotionPropertyText,
  multi_select: convertNotionPropertyMutliSelect,
  title: convertNotionPerpertyTitle,
  relation: convertNotionPropertyRelation,
};

export const convertNotionPropertiesToData = <T>(
  properties: Record<string, INotionProperty>
): T => {
  const data: { [key: string]: unknown } = {};
  Object.keys(properties).forEach((key) => {
    const property = properties[key];
    if (!property) return;
    const converter = propertiesConvertorMapping[property.type];
    if (converter) {
      data[key] = converter(property);
    }
  });
  return data as T;
};
