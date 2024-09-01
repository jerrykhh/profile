import React from 'react';

import BlogPostWrapper from '@/components/BlogPostWrapper';
import { PreviousPageButton } from '@/components/PreviouePageButton';
import { getBlogPost, getBlogPosts } from '@/service/blog';

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.metadata.slug }));
};

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getBlogPost(params.slug);
  return (
    <React.Fragment>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <PreviousPageButton />
        </div>
        <BlogPostWrapper post={post} />
      </div>
    </React.Fragment>
  );
};

export default BlogDetailPage;
