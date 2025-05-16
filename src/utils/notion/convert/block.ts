import type { INotionData } from '@/types/notion/data';
import {
  NotionBlockCode,
  NotionBlockHeading,
  NotionBlockImage,
  NotionBlockNumberedListItem,
  NotionBlockParagraph,
  NotionBlockVideo,
} from '@/types/notion/data/block';

import { extractText, extractTextWithStyle } from './utils';

export const convertNotionBlockParagraph = async (property: INotionData) => {
  if (property.type !== 'paragraph')
    throw Error(`convertNotionBlockParagraph: cannot convert ${property.type}`);
  const paragraphProps = property as NotionBlockParagraph;
  const paragraphs = paragraphProps.paragraph.rich_text;
  if (paragraphs.length === 0) return;
  return {
    type: paragraphProps.type,
    data: extractTextWithStyle(paragraphs),
  };
};

export const convertNotionBlockNumberedListItem = async (
  property: INotionData
) => {
  if (property.type !== 'numbered_list_item')
    throw Error(
      `convertNotionBlockNumberedListItem: cannot convert ${property.type}`
    );
  const numberedListItemProps = property as NotionBlockNumberedListItem;
  const numberedListItems = numberedListItemProps.numbered_list_item.rich_text;
  if (numberedListItems.length === 0) return;
  return {
    type: numberedListItemProps.type,
    data: extractTextWithStyle(numberedListItems),
  };
};

export const convertNotionBlockImage = async (property: INotionData) => {
  if (property.type !== 'image')
    throw Error(`convertNotionBlockImage: cannot convert ${property.type}`);
  const imageProps = property as NotionBlockImage;
  return {
    type: imageProps.type,
    data: imageProps.image.file.url,
  };
};

export const convertNotionBlockHeading = async (property: INotionData) => {
  if (!property.type.includes('heading'))
    throw Error(`convertNotionBlockHeading: cannot convert ${property.type}`);
  const headingProps = property as NotionBlockHeading;
  return {
    type: headingProps.type,
    data: extractText(headingProps[headingProps.type].rich_text),
  };
};

export const convertNotionBlockVideo = async (property: INotionData) => {
  if (property.type !== 'video')
    throw Error(`convertNotionBlockVideo: cannot convert ${property.type}`);
  const videoProps = property as NotionBlockVideo;
  return {
    type: 'video',
    data: videoProps.video.external.url,
  };
};

export const convertNotionBlockCode = async (property: INotionData) => {
  if (property.type !== 'code')
    throw Error(`conertNotionBlockCode: cannot convert ${property.type}`);
  const codeProps = property as NotionBlockCode;
  return {
    type: 'code',
    data: extractText(codeProps.code.rich_text),
  };
};
