import { LoaderFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const clientLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const { slug } = params;

  return { slug };
};

export const ProjectDetail = () => {
  const { slug } = useLoaderData<typeof clientLoader>();

  return <div>ProjectDetailPage {slug}</div>;
};

export default ProjectDetail;
