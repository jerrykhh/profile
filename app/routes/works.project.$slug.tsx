import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { ProjectMetadataCard } from '@/components/Project/MetadataCard';
import { type Project } from '@/models/project';
import { getProject } from '@/services/work.service/project.service';

export const clientLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { slug } = params;
  if (!slug) {
    return new Response('Not Found', { status: 404 });
  }

  const project = await getProject(slug);

  return { project };
};

export const ProjectDetail = () => {
  const { project }: { project: Project } =
    useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col gap-8 lg:gap-4 items-center lg:items-start lg:flex-row ">
      <div className="grow">
        <article className="prose-md prose  self-center dark:text-gray-200 lg:mt-0">
          <Markdown rehypePlugins={[rehypeRaw]}>{project.content}</Markdown>
        </article>
      </div>
      <ProjectMetadataCard
        className="order-first lg:order-last"
        project={project}
      />
    </div>
  );
};

export default ProjectDetail;
