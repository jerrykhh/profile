import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useFetcher, useLoaderData } from '@remix-run/react';

import { Projects } from '@/components/Home/Module/Projects';
import { generateDefaultMetadata } from '@/constants/metadata';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { listProjects } from '@/services/content/project';
import { PaginatedData } from '@/types/data';
import type { Project } from '@/types/project';
import { convertNotionObjectToData } from '@/utils/notion/convert';

export const loader = async ({
  context,
  request,
}: LoaderFunctionArgs): Promise<PaginatedData<Project>> => {
  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;
  const nextCursor = new URL(request.url).searchParams.get('next') || null;
  return await listProjects({
    authToken: notionAPIToken,
    limit: 12,
    next_cursor: nextCursor,
  }).then(async (data) => {
    const projects =
      data.results && Array.isArray(data.results)
        ? await Promise.all(
            data.results.map((project) =>
              convertNotionObjectToData<Project>(project)
            )
          )
        : [];

    return {
      items: projects,
      next_cursor: data.next_cursor || null,
      has_more: data.has_more || false,
    };
  });
};

export const meta: MetaFunction<typeof loader> = () => {
  return generateDefaultMetadata('Project', '/project');
};

export default function ProjectPage() {
  const initialData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const { items, sentinelRef, isLoading, hasMore } = useInfiniteScroll<Project>(
    fetcher,
    initialData,
    '/project'
  );

  return (
    <div className="flex flex-col gap-8 py-12">
      <Projects items={items} />
      {hasMore && (
        <div
          ref={sentinelRef}
          className="h-10 flex justify-center items-center"
        >
          {isLoading && <p>Loading more projects...</p>}
        </div>
      )}
      {items.length === 0 && !hasMore && <p>No projects found</p>}
    </div>
  );
}
