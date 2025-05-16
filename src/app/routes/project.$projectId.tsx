import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { BackButton } from '@/components/Button';
import { ExternalUrlButton } from '@/components/Page/ExternalUrl';
import { TableOfContent } from '@/components/Page/TableOfContent';
import { blockWrapper } from '@/components/Page/block';
import { Tags } from '@/components/Tags';
import { getProject } from '@/services/project';
import type { Project } from '@/types/project';
import {
  convertNotionBlockToData,
  convertNotionObjectToData,
} from '@/utils/notion/convert';

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { projectId } = params;
  if (!projectId) return;

  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;

  return await getProject({
    id: params.projectId ?? '__MISSING_PROJECT_ID__',
    authToken: notionAPIToken,
  }).then(async (data) => {
    const converted = await Promise.all([
      convertNotionObjectToData<Project>(data.properties),
      convertNotionBlockToData(data.content),
    ]);
    console.log('converted', converted);
    return {
      properties: converted[0],
      content: converted[1],
    };
  });
};

const ProjectDetailPage = () => {
  const { properties, content } = useLoaderData<typeof loader>();
  const pageContent = blockWrapper(content);
  return (
    <div className="py-8">
      <BackButton />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1>{properties.title}</h1>
          <div className="flex justify-between xsOrSm:flex-col xsOrSm:gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-neutral-300">
                {new Date(properties.createdAt.start).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              </h4>
              <div className="text-xs">
                <Tags items={properties.tags} />
              </div>
            </div>

            {properties['github.repo'] && (
              <ExternalUrlButton url={properties['github.repo']} />
            )}
          </div>
        </div>

        <div className="py-3">
          <TableOfContent blocks={content} />
        </div>
        <div className="py-8 flex flex-col gap-4">{pageContent}</div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
