import { NotionQueryDatabaseAPIResponse } from '@/types/notion/database/query';
import { NotionProjectProperty } from '@/types/project';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

import { GetContentParams, getContent } from '..';

type ListProjectParams = {
  authToken: string;
  limit?: number;
  next_cursor?: string | null;
};

export const listProjects = async ({
  authToken,
  limit = 100,
  next_cursor,
}: ListProjectParams) => {
  const res = await fetch(
    `${process.env.NOTION_API_BASE_URL}/databases/${process.env.NOTION_TABLE_PROJECT_ID}/query`,
    {
      method: 'POST',
      headers: getNotionAPIRequestAuthHeader(authToken),
      body: JSON.stringify({
        page_size: limit,
        ...(next_cursor && {
          start_cursor: next_cursor,
        }),
      }),
    }
  );

  if (!res.ok) {
    console.error(`listProjects:failed:${res.status}:${await res.text()}`);
    throw new Error(`Cannot ListProject data`);
  }

  const data =
    (await res.json()) as NotionQueryDatabaseAPIResponse<NotionProjectProperty>;

  return {
    has_more: data.has_more,
    next_cursor: data.next_cursor,
    results: data.results.map((result) => {
      return {
        ...result.properties,
        id: result.id,
      } as NotionProjectProperty & {
        id: string;
      };
    }),
  };
};

type GetProjectParams = GetContentParams;
export const getProject = async (params: GetProjectParams) =>
  await getContent<NotionProjectProperty>(params);
