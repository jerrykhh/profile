import { BlogPost } from '@/types/blog';

import { getMarkdownFile, getMarkdownFiles } from '../markdown';

export const getBlogPosts = async () => {
  const files = await getMarkdownFiles<BlogPost>('/blog');
  return files;
};

export const getBlogPost = async (slug: string) => {
  const file = await getMarkdownFile<BlogPost>(`/blog/${slug}.md`);
  return file;
};
