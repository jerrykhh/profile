import { Blog } from '@/models/blog';

import { getWork, getWorks } from '.';

export const getBlogs = async ({
  sort,
}: {
  sort?: (a: Blog, b: Blog) => number;
}) => {
  return await getWorks<Blog>({
    keys: Object.keys(import.meta.glob('../../data/works/blog/*.md')),
    sort,
    createInstance: (data) => new Blog(data),
  });
};

export const getBlog = async (slug: string) => {
  return await getWork<Blog>(`blog/${slug}`, (data) => new Blog(data));
};
