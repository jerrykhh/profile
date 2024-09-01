'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';

import { ShareButton } from '@/components/ShareButton';
import { H1, Muted } from '@/components/ui/typography';
import { BlogPost } from '@/types/blog';

import { MDX } from '../MDX';

type BlogPostWrapperProps = {
  post: BlogPost;
};

const BlogPostWrapper = ({ post }: BlogPostWrapperProps) => {
  const { metadata, content } = post;
  const locale = useLocale();

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex flex-col gap-2 flex-1">
          <H1>{metadata.title}</H1>
          <Muted>
            Published on{' '}
            {metadata.createdAt.toLocaleDateString(`${locale}-HK`, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Muted>
        </div>
        <div className="w-12">
          <ShareButton />
        </div>
      </div>
      <div className="w-full h-[320px] sm:h-[480px] max-h-[600px] aspect-video">
        <Image
          src={metadata.banner}
          alt={metadata.title}
          width={1200}
          height={600}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="my-2">
        <MDX source={content} />
      </div>
    </React.Fragment>
  );
};

export default BlogPostWrapper;
