import { Work, WorkMeta } from './work';

export class BlogMeta extends WorkMeta {
  constructor(data: {
    slug: string;
    title: string;
    image: string;
    description: string;
    createdAt: Date;
    tags: string[];
  }) {
    super(data);
  }
}

export class Blog extends Work {
  constructor(data: { slug: string; meta: BlogMeta; content: string }) {
    super(data);
  }

  getRoute(): string {
    return `blog/${this.slug}`;
  }
}
