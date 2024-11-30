import { Work } from './work';

export class Project extends Work {
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

  getRoute(): string {
    return `project/${this.slug}`;
  }
}
