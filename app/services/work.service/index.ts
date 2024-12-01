import matter from 'gray-matter';

import { Work, WorkMeta } from '@/models/work';

export const WORK_DATA_PATH = '../../data/works/';

type GetWorksParams<T extends Work, M extends WorkMeta> = {
  keys: string[];
  sort?: (a: T, b: T) => number;
  createInstance: (data: { slug: string; meta: M; content: string }) => T;
  createMeta: (data: { [K in keyof M]: M[K] }) => M;
};

export const getWorks = async <T extends Work, M extends WorkMeta>({
  keys,
  sort,
  createInstance,
  createMeta,
}: GetWorksParams<T, M>): Promise<T[]> => {
  // Added return type
  const prefixs = keys
    .map((key) => {
      const match = key.match(/^(.*\/)[^/]+$/);
      return match ? match[1] : null;
    })
    .filter((key) => key !== null) as string[];

  if (prefixs.length !== keys.length) {
    throw new Error('Prefixes length must be equal to keys length');
  }

  const works = await Promise.all(
    keys.map(async (path, index) => {
      const slug = path.split('/').pop()?.replace(/\.md$/, '');
      if (!slug) return null;

      return await getWork<T, M>({
        key: `${prefixs[index]}${slug}`,
        createInstance,
        createMeta,
      });
    })
  );

  const filteredWorks = works.filter((work) => work !== null) as T[];

  return sort ? filteredWorks.sort(sort) : filteredWorks;
};

type GetWorkParams<T extends Work, M extends WorkMeta> = {
  key: string;
  createInstance: (data: { slug: string; meta: M; content: string }) => T;
  createMeta: (data: { [K in keyof M]: M[K] }) => M;
};

export const getWork = async <T extends Work, M extends WorkMeta>({
  key,
  createInstance,
  createMeta,
}: GetWorkParams<T, M>): Promise<T> => {
  // Added return type
  const { meta, content } = await getMatter(key);
  console.log('meta', meta);
  return createInstance({
    slug: meta.slug,
    meta: createMeta({
      ...meta,
      createdAt: new Date(meta.createdAt),
    } as { [K in keyof M]: M[K] }),
    content,
  });
};

const getMatter = async (key: string) => {
  const module = await import(`${WORK_DATA_PATH}${key}.md?raw`);
  const { data, content } = matter(module.default);
  return { meta: data.meta, content };
};
