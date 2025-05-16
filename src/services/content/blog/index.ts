import type { NotionBlogProperty } from '@/types/blog';
import { NotionQueryDatabaseAPIResponse } from '@/types/notion/database/query';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

import { GetContentParams, getContent } from '..';

type ListBlogParams = {
  authToken: string;
  limit?: number;
  next_cursor?: string | null;
};

export const listBlogs = async ({
  authToken,
  limit = 100,
  next_cursor,
}: ListBlogParams) => {
  const res = await fetch(
    `${process.env.NOTION_API_BASE_URL}/databases/${process.env.NOTION_TABLE_BLOG_ID}/query`,
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
    console.error(`getBlogs:failed:${res.status}:${await res.text()}`);
    throw new Error('Cannot GetBlogs data');
  }

  const data =
    (await res.json()) as NotionQueryDatabaseAPIResponse<NotionBlogProperty>;

  return {
    has_more: data.has_more,
    next_cursor: data.next_cursor,
    results: data.results.map((result) => {
      return {
        ...result.properties,
        id: result.id,
      } as NotionBlogProperty & {
        id: string;
      };
    }),
  };
};

type GetProjectParams = GetContentParams;

export const getBlog = async (params: GetProjectParams) =>
  await getContent<NotionBlogProperty>(params);
