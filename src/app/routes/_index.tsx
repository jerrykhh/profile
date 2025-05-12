import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { listBlogs } from '@/services/blog';
import { getMe } from '@/services/me';
import { listProjects } from '@/services/project';
import { Blog } from '@/types/blog';
import { Me } from '@/types/me';
import { Project } from '@/types/project';
import { convertNotionPropertiesToData } from '@/utils/notion/convert';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;
  const [me, blogs, projects] = await Promise.all([
    getMe({
      authToken: notionAPIToken,
    }).then(async (data) => await convertNotionPropertiesToData(data)),
    listBlogs({
      authToken: notionAPIToken,
    }).then(
      async (data) =>
        await Promise.all(data.map((d) => convertNotionPropertiesToData(d)))
    ),
    listProjects({
      authToken: notionAPIToken,
    }).then(
      async (data) =>
        await Promise.all(data.map((d) => convertNotionPropertiesToData(d)))
    ),
  ]);

  return {
    me,
    blogs,
    projects,
  } as {
    me: Me;
    blogs: Blog[];
    projects: Project[];
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return <div></div>;
}
