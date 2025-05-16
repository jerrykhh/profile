import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import React from 'react';

import { blockWrapper } from '@/components/Page/block';
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
  const data = useLoaderData<typeof loader>();
  const pageContent = blockWrapper(data.content);
  console.log('content', pageContent);
  return (
    <React.Fragment>
      <div>{pageContent}</div>
    </React.Fragment>
  );
};

export default ProjectDetailPage;
