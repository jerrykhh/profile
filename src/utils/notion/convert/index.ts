import { NotionBlock } from '@/types/notion/converted';
import type { INotionData } from '@/types/notion/data';
import { INotionBlock } from '@/types/notion/data/block';

import {
  convertNotionBlockCode,
  convertNotionBlockHeading,
  convertNotionBlockImage,
  convertNotionBlockParagraph,
  convertNotionBlockVideo,
} from './block';
import {
  convertNotionDataCheckbox,
  convertNotionDataDate,
  convertNotionDataFile,
  convertNotionDataMutliSelect,
  convertNotionDataRelation,
  convertNotionDataText,
  convertNotionDataTitle,
  convertNotionDataUrl,
} from './data';

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
  properties: Record<string, INotionData>
): Promise<T> => {
  const data: { [key: string]: unknown } = {};
  Object.keys(properties).forEach(async (key) => {
    console.log('key', key);
    if (['string', 'number', 'boolean'].includes(typeof properties[key])) {
      data[key] = properties[key];
      return;
    }
    const property = properties[key];
    console.log('property', property);
    if (!property) return;
    const converter = propertiesConvertorMapping[property.type];
    if (converter) {
      key === 'paragraph' && console.log('property', property);
      data[key] = await converter(property);
      key === 'paragraph' && console.log('data[key]', data[key]);
    }
  });
  return data as T;
};

type BlockConverter = (property: INotionData) => unknown;

const blockConvertorMapping: Record<string, BlockConverter> = {
  paragraph: convertNotionBlockParagraph,
  image: convertNotionBlockImage,
  heading_2: convertNotionBlockHeading,
  heading_3: convertNotionBlockHeading,
  code: convertNotionBlockCode,
  video: convertNotionBlockVideo,
};
export const convertNotionBlockToData = async (
  results: INotionBlock[]
): Promise<Array<NotionBlock>> => {
  return await Promise.all(
    results.map(async (data) => blockConvertorMapping[data.type]?.(data))
  );
};
