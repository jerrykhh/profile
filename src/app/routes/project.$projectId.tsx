import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { getProject } from '@/services/project';
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
      convertNotionObjectToData(data.properties),
      convertNotionBlockToData(data.content),
    ]);
    console.log('converted', converted);
    return {
      properties: converted[0],
      content: converted[1],
    };
  });
};

export const ProjectDetailPage = () => {
  const data = useLoaderData<typeof loader>();
  console.log(data);
};
