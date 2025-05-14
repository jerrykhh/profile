import { NotionQueryDatabaseAPIResponse } from '@/types/notion/database/properties';
import { NotionProjectProperty } from '@/types/project';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

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
      };
    })
    .slice(0, limit);
};
