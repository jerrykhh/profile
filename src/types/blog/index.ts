import { IMarkdown, IMarkdownMetadata } from '../markdown';

export interface BlogPostMetadata extends IMarkdownMetadata {
  banner: string;
}
export interface BlogPost extends IMarkdown {
  metadata: BlogPostMetadata;
}
