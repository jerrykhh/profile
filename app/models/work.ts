export abstract class Work {
  slug: string;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  tags: string[];

  constructor(data: {
    slug: string;
    title: string;
    image: string;
    description: string;
    createdAt: Date;
    tags: string[];
  }) {
    this.slug = data.slug;
    this.title = data.title;
    this.image = data.image;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.tags = data.tags;
  }

  abstract getRoute(): string;
}
