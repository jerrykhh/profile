import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArrowLeftIcon } from 'lucide-react';
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
    <div className="w-full p-4">
      <div className="flex flex-col gap-12 lg:max-w-5xl lg:mx-auto">
        <div className="w-full justify-start mt-4">
          <Link to="../">
            <button className="hover:underline">
              <div className="flex items-center gap-2">
                <ArrowLeftIcon className="size-4" />
                <span className="text-sm">back</span>
              </div>
            </button>
          </Link>
        </div>
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
      </div>
    </div>
  );
};

export default ProjectDetail;
