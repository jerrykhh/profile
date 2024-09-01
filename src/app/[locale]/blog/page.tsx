import React from 'react';

import { BlogSelection } from '@/components/BlogSelection';
import { getBlogPosts } from '@/service/blog';

const BlogPage = async () => {
  const blogPosts = await getBlogPosts();
  return (
    <React.Fragment>
      <BlogSelection posts={blogPosts} />
    </React.Fragment>
  );
};

export default BlogPage;
