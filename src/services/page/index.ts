import { NotionQueryDatabaseResult } from '@/types/notion/database/query';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

type GetPageParams = {
  id: string;
  authToken: string;
};

export const getPage = async <T>({ id, authToken }: GetPageParams) => {
  const res = await fetch(`${process.env.NOTION_API_BASE_URL}/pages/${id}`, {
    method: 'GET',
    headers: getNotionAPIRequestAuthHeader(authToken),
  });

  if (!res.ok) {
    console.error(`getPage:failed:${res.status}:${await res.text()}`);
    throw new Error(`Cannot GetPage:${id} data`);
  }

  return ((await res.json()) as NotionQueryDatabaseResult<T>).properties;
};
