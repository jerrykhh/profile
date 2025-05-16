import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import React from 'react';

import { Blogs } from '@/components/Home/Module/Blogs';
import { Intro } from '@/components/Home/Module/Intro';
import { Projects } from '@/components/Home/Module/Projects';
import { listBlogs } from '@/services/blog';
import { getMe } from '@/services/me';
import { listProjects } from '@/services/project';
import { Blog } from '@/types/blog';
import { Me } from '@/types/me';
import { Project } from '@/types/project';
import { convertNotionObjectToData } from '@/utils/notion/convert';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;
  const [me, blogs, projects] = await Promise.all([
    getMe({
      authToken: notionAPIToken,
    }).then(async (data) => await convertNotionObjectToData<Me>(data)),
    listBlogs({
      authToken: notionAPIToken,
    }).then(
      async (data) =>
        await Promise.all(
          data.results.map((d) => convertNotionObjectToData<Blog>(d))
        )
    ),
    listProjects({
      authToken: notionAPIToken,
      limit: 3,
    }).then(
      async (data) =>
        await Promise.all(
          data.results.map((d) => convertNotionObjectToData<Project>(d))
        )
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
  return (
    <React.Fragment>
      <Intro
        title={data.me.title}
        biography={data.me.biography}
        todos={data.me.todos}
        versions={data.me.versions}
      />
      <div className="flex flex-col gap-8">
        <Blogs items={data.blogs} />
        <Projects items={data.projects} />
      </div>
    </React.Fragment>
  );
}
