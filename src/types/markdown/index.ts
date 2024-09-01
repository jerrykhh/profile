export interface IMarkdownMetadata {
  slug: string;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
}

export interface IMarkdown {
  metadata: IMarkdownMetadata;
  content: string;
}
