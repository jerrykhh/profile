import type { NotionBlogProperty } from '@/types/blog';
import type { NotionRetrieveQueryDatabaseAPIResponse } from '@/types/notion/database/query';
import { getNotionAPIRequestAuthHeader } from '@/utils/notion';

type ListBlogParams = {
  authToken: string;
  limit?: number;
};

export const listBlogs = async ({ authToken, limit = 3 }: ListBlogParams) => {
  const res = await fetch(
    `${process.env.NOTION_API_BASE_URL}/databases/${process.env.NOTION_TABLE_BLOG_ID}/query`,
    {
      method: 'POST',
      headers: getNotionAPIRequestAuthHeader(authToken),
    }
  );
  if (!res.ok) {
    console.error(`getBlogs:failed:${res.status}:${await res.text()}`);
    throw new Error('Cannot GetBlogs data');
  }

  const data =
    (await res.json()) as NotionRetrieveQueryDatabaseAPIResponse<NotionBlogProperty>;
  return data.results.map((result) => result.properties).slice(0, limit);
};
