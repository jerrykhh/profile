export abstract class WorkMeta {
  slug: string;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  tags: string[];

  constructor(data: WorkMeta) {
    this.slug = data.slug;
    this.title = data.title;
    this.image = data.image;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.tags = data.tags;
  }
}

export abstract class Work {
  slug: string;
  meta: WorkMeta;
  content: string;

  constructor(data: { slug: string; meta: WorkMeta; content: string }) {
    this.slug = data.slug;
    this.meta = data.meta;
    this.content = data.content;
  }

  abstract getRoute(): string;
}
