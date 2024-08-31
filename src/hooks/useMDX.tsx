import { MDXComponents } from 'mdx/types';

export const useMDX = (components: MDXComponents): MDXComponents => {
  return {
    ...components,
  };
};
