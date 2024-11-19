import matter from 'gray-matter';

import { Project } from '@/types/project';

export const getProjects = async ({
  sort,
}: {
  sort?: (a: Project, b: Project) => number;
}) => {
  const posts = await Object.keys(
    import.meta.glob('../data/project/*.md')
  ).reduce<Promise<Project[]>>(async (accPromise, path) => {
    const acc = await accPromise; // Wait for the accumulated results
    const slug = path.split('/').pop()?.replace(/\.md$/, '');
    if (!slug) return acc;
    const project = await getProject(slug);
    return project ? [...acc, project] : acc; // Add project if it exists
  }, Promise.resolve([])); // Initialize with a resolved promise containing an empty array

  return posts.sort(sort);
};

export const getProject = async (slug: string) => {
  const module = await import(`../data/project/${slug}.md?raw`);
  const { meta } = matter(module.default).data;
  return {
    ...meta,
    createdAt: new Date(meta.createdAt),
  } as Project;
};
