'use client';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';

import { H2, H3, H4, P } from '../ui/typography';

export const MDX = (props: MDXRemoteProps) => {
  return (
    <MDXRemote
      {...props}
      components={{
        h1: (props) => <H2 {...props} />,
        h2: (props) => <H2 {...props} />,
        h3: (props) => <H3 {...props} />,
        h4: (props) => <H4 {...props} />,
        p: (props) => <P {...props} />,
      }}
    />
  );
};
