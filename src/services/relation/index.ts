import { NotionQueryDatabaseResult } from '@/types/notion/database/query';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

type GetRelationDataParams = {
  relationIds: string[];
  authToken: string;
};

export const getRelationData = async <T>({
  relationIds,
  authToken,
}: GetRelationDataParams) => {
  const relationRes = await Promise.all(
    relationIds.map((id) =>
      fetch(`${process.env.NOTION_API_BASE_URL}/pages/${id}`, {
        headers: getNotionAPIRequestAuthHeader(authToken),
      })
    )
  );

  const data = await Promise.all(
    relationRes.map(async (res) => {
      if (!res.ok) {
        console.error(
          `getRelationData:failed:${res.status}:${await res.text()}`
        );
        throw Error('Cannot GetRelation data');
      }

      return ((await res.json()) as NotionQueryDatabaseResult<T>).properties;
    })
  );

  return data;
};
