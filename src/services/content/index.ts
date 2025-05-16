import { NotionBlockAPIResponse } from '@/types/notion/data/block';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

import { getPage } from '../page';

export type GetContentParams = {
  id: string;
  authToken: string;
};

export const getContent = async <T>({ id, authToken }: GetContentParams) => {
  const [propertiesRes, pageContentRes] = await Promise.all([
    getPage<T>({ id, authToken }),
    fetch(`${process.env.NOTION_API_BASE_URL}/blocks/${id}/children`, {
      method: 'GET',
      headers: getNotionAPIRequestAuthHeader(authToken),
    }),
  ]);

  if (!pageContentRes.ok) {
    console.error(
      `getContent:failed:${pageContentRes.status}:${await pageContentRes.text()}`
    );
    throw new Error(`Cannot GetContent:${id} data`);
  }

  const data = (await pageContentRes.json()) as NotionBlockAPIResponse;
  return {
    properties: propertiesRes,
    content: data.results,
  };
};
