import { Blog, BlogMeta } from '@/models/blog';

import { getWork, getWorks } from '.';

export const getBlogs = async ({
  sort,
}: {
  sort?: (a: Blog, b: Blog) => number;
}) => {
  return await getWorks<Blog, BlogMeta>({
    keys: Object.keys(import.meta.glob('../../data/works/blog/*.md')),
    sort,
    createInstance: (data) => new Blog(data),
    createMeta: (data) => new BlogMeta(data),
  });
};

export const getBlog = async (slug: string) => {
  return await getWork<Blog, BlogMeta>({
    key: `blog/${slug}`,
    createInstance: (data) => new Blog(data),
    createMeta: (data) => new BlogMeta(data),
  });
};
