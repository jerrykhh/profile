import { NotionBlockAPIResponse } from '@/types/notion/data/block';
import { NotionQueryDatabaseAPIResponse } from '@/types/notion/database/query';
import { NotionProjectProperty } from '@/types/project';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

import { getPage } from '../page';

type ListProjectParams = {
  authToken: string;
  limit?: number;
};

export const listProjects = async ({
  authToken,
  limit = 3,
}: ListProjectParams) => {
  const res = await fetch(
    `${process.env.NOTION_API_BASE_URL}/databases/${process.env.NOTION_TABLE_PROJECT_ID}/query`,
    {
      method: 'POST',
      headers: getNotionAPIRequestAuthHeader(authToken),
    }
  );

  if (!res.ok) {
    console.error(`listProjects:failed:${res.status}:${await res.text()}`);
    throw new Error(`Cannot ListProject data`);
  }

  const data =
    (await res.json()) as NotionQueryDatabaseAPIResponse<NotionProjectProperty>;
  return data.results
    .map((result) => {
      return {
        ...result.properties,
        id: result.id,
      } as NotionProjectProperty & {
        id: string;
      };
    })
    .slice(0, limit);
};

type GetProjectParams = {
  id: string;
  authToken: string;
};

export const getProject = async ({ id, authToken }: GetProjectParams) => {
  const [projectPropertiesRes, pageContentRes] = await Promise.all([
    getPage<NotionProjectProperty>({ id, authToken }),
    fetch(`${process.env.NOTION_API_BASE_URL}/blocks/${id}/children`, {
      method: 'GET',
      headers: getNotionAPIRequestAuthHeader(authToken),
    }),
  ]);

  if (!pageContentRes.ok) {
    console.error(
      `getProject:failed:${pageContentRes.status}:${await pageContentRes.text()}`
    );
    throw new Error(`Cannot GetProject:${id} data`);
  }

  const data = (await pageContentRes.json()) as NotionBlockAPIResponse;
  return {
    properties: projectPropertiesRes,
    content: data.results,
  };
};
