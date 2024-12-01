import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

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
  console.log(project);

  return { project };
};

export const ProjectDetail = () => {
  const { project }: { project: Project } =
    useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex  gap-4">
        <div className="grow">tse</div>
        <ProjectMetadataCard project={project} />
      </div>
    </div>
  );
};

export default ProjectDetail;
