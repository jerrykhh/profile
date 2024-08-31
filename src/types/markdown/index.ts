export interface IMarkdownMetadata {
  slug: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
}

export interface IMarkdown {
  metadata: IMarkdownMetadata;
  content: string;
}
