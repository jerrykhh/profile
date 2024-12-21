import { Project, ProjectMeta } from '@/models/project';

import { getWork, getWorks } from '.';

export const getProjects = async ({
  sort,
}: {
  sort?: (a: Project, b: Project) => number;
}) => {
  return await getWorks<Project, ProjectMeta>({
    keys: Object.keys(import.meta.glob('../../data/works/project/*.md')),
    sort,
    createInstance: (data) => new Project(data),
    createMeta: (data) => new ProjectMeta(data),
  });
};

export const getProject = async (slug: string) => {
  return await getWork<Project, ProjectMeta>({
    key: `project/${slug}`,
    createInstance: (data) => new Project(data),
    createMeta: (data) => new ProjectMeta(data),
  });
};
