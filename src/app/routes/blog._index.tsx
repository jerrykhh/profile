import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useFetcher, useLoaderData } from '@remix-run/react';

import { Blogs } from '@/components/Home/Module/Blogs';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { listBlogs } from '@/services/blog';
import { Blog } from '@/types/blog';
import { PaginatedData } from '@/types/data';
import { convertNotionObjectToData } from '@/utils/notion/convert';

export const loader = async ({
  context,
  request,
}: LoaderFunctionArgs): Promise<PaginatedData<Blog>> => {
  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;
  const nextCursor = new URL(request.url).searchParams.get('next') || null;

  return await listBlogs({
    authToken: notionAPIToken,
    limit: 12,
    next_cursor: nextCursor,
  }).then(async (data) => {
    const blogs =
      data.results && Array.isArray(data.results)
        ? await Promise.all(
            data.results.map((blog) => convertNotionObjectToData<Blog>(blog))
          )
        : [];
    return {
      items: blogs,
      next_cursor: data.next_cursor || null,
      has_more: data.has_more || false,
    };
  });
};

export default function BlogPage() {
  const initialData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const { items, sentinelRef, isLoading, hasMore } = useInfiniteScroll<Blog>(
    fetcher,
    initialData,
    '/blog'
  );

  return (
    <div className="flex flex-col gap-8 py-12">
      <Blogs items={items} />
      {hasMore && (
        <div
          ref={sentinelRef}
          className="h-10 flex justify-center items-center"
        >
          {isLoading && <p>Loading more blog...</p>}
        </div>
      )}
      {items.length === 0 && !hasMore && <p>No Blogs found</p>}
    </div>
  );
}
