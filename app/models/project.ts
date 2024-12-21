import { Work, WorkMeta } from './work';

export class ProjectMeta extends WorkMeta {
  repository?: string;
  techs?: string[];

  constructor(data: {
    slug: string;
    title: string;
    image: string;
    description: string;
    createdAt: Date;
    tags: string[];
    repository?: string;
    techs?: string[];
  }) {
    super(data);
    this.repository = data.repository;
    this.techs = data.techs;
  }
}

export class Project extends Work {
  constructor(data: { slug: string; meta: ProjectMeta; content: string }) {
    super(data);
  }

  getRoute(): string {
    return `project/${this.slug}`;
  }
}
