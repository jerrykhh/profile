import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { PageContainer } from '@/components/Page';
import { blockWrapper } from '@/components/Page/block';
import {
  generateContentDefaultMetadata,
  generateDefaultMetadata,
} from '@/constants/metadata';
import { getProject } from '@/services/content/project';
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
    id: projectId ?? '__MISSING_PROJECT_ID__',
    authToken: notionAPIToken,
  }).then(async (data) => {
    const converted = await Promise.all([
      convertNotionObjectToData<Project>(data.properties),
      convertNotionBlockToData(data.content),
    ]);
    return {
      properties: converted[0],
      content: converted[1],
    };
  });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return generateDefaultMetadata('Blog', '/blog');
  return generateContentDefaultMetadata(data, '/blog');
};

const ProjectDetailPage = () => {
  const { properties, content } = useLoaderData<typeof loader>();
  const pageContent = blockWrapper(content);
  return (
    <PageContainer
      title={properties.title}
      createdAt={properties.createdAt.start}
      tags={properties.tags}
      externalUrls={
        !properties['github.repo'] ? [] : [properties['github.repo']]
      }
      notionBlocks={content}
    >
      {pageContent}
    </PageContainer>
  );
};

export default ProjectDetailPage;
