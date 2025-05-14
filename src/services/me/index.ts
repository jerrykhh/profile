import type { NotionMeProperty, NotionVersionProperty } from '@/types/me';
import { NotionQueryDatabaseAPIResponse } from '@/types/notion/database/properties';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

import { getRelationData } from '../relation';

type GetMeParams = {
  authToken: string;
};

export const getMe = async ({ authToken }: GetMeParams) => {
  const res = await fetch(
    `${process.env.NOTION_API_BASE_URL}/databases/${process.env.NOTION_TABLE_ME_ID}/query`,
    {
      method: 'POST',
      headers: getNotionAPIRequestAuthHeader(authToken),
    }
  );
  if (!res.ok) {
    console.error(`getMe:failed:${res.status}:${await res.text()}`);
    throw Error('Cannot GetMe data');
  }
  const data =
    (await res.json()) as NotionQueryDatabaseAPIResponse<NotionMeProperty>;
  let properties: NotionMeProperty = data.results[0].properties;

  if (properties.versions) {
    const relation = await getRelationData<NotionVersionProperty>({
      relationIds: properties.versions.relation.map(
        (obj) => obj.id
      ) as string[],
      authToken,
    });
    properties = {
      ...properties,
      versions: {
        ...properties.versions,
        relation,
      },
    };
  }

  return properties;
};
