import { Project } from '@/types/work/project';

import { getWork, getWorks } from '.';

export const getProjects = async ({
  sort,
}: {
  sort?: (a: Project, b: Project) => number;
}) => {
  return await getWorks<Project>({
    keys: Object.keys(import.meta.glob('../../data/works/project/*.md')),
    sort,
  });
};

export const getProject = async (slug: string) => {
  return await getWork<Project>(`project/${slug}`);
};
