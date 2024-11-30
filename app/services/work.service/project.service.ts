import { Project } from '@/models/project';

import { getWork, getWorks } from '.';

export const getProjects = async ({
  sort,
}: {
  sort?: (a: Project, b: Project) => number;
}) => {
  return await getWorks<Project>({
    keys: Object.keys(import.meta.glob('../../data/works/project/*.md')),
    sort,
    createInstance: (data) => new Project(data),
  });
};

export const getProject = async (slug: string) => {
  return await getWork<Project>(`project/${slug}`, (data) => new Project(data));
};
