import { Work } from './work';

export class Blog extends Work {
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

  getRoute(): string {
    return `blog/${this.slug}`;
  }
}
