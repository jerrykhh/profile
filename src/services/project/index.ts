import { NotionRetrieveQueryDatabaseAPIResponse } from '@/types/notion/database/query';
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
    (await res.json()) as NotionRetrieveQueryDatabaseAPIResponse<NotionProjectProperty>;
  return data.results.map((result) => result.properties).slice(0, limit);
};
