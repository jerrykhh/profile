import matter from 'gray-matter';

import { Work } from '@/types/work';

export const WORK_DATA_PATH = '../../data/works/';

export const getWorks = async <T extends Work>({
  keys,
  sort,
}: {
  keys: string[];
  prefix?: string;
  sort?: (a: T, b: T) => number;
}) => {
  const prefixs = keys
    .map((key) => {
      const match = key.match(/^(.*\/)[^/]+$/);
      return match ? match[1] : null;
    })
    .filter((key) => key !== null) as string[];

  if (prefixs.length !== keys.length) {
    throw new Error('prefixs length must be equal to keys length');
  }

  const works = await keys.reduce<Promise<T[]>>(
    async (accPromise, path, index) => {
      const acc = await accPromise;
      const slug = path.split('/').pop()?.replace(/\.md$/, '');
      if (!slug) return acc;
      const work = await getWork<T>(`${prefixs[index]}/${slug}`);
      return work ? [...acc, work] : acc;
    },
    Promise.resolve([])
  );

  return works.sort(sort);
};

export const getWork = async <T extends Work>(key: string) => {
  const module = await import(`${WORK_DATA_PATH}${key}.md?raw`);
  const { meta } = matter(module.default).data;
  return {
    ...meta,
    createdAt: new Date(meta.createdAt),
  } as T;
};
