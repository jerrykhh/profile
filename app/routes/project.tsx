import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getProjects } from '@/services/post.service';

export const clientLoader: LoaderFunction = async () => {
  return await getProjects({});
};

const Project = () => {
  const posts = useLoaderData<typeof clientLoader>();
  console.log(posts);

  return <div>Project</div>;
};

export default Project;
