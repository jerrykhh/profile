import React from 'react';

import { BlogSelection } from '@/components/BlogSelection';
import { BlogPost } from '@/types/blog';

const BlogPage = async () => {
  const blogPosts = [
    {
      metadata: {
        slug: 'my-first-blog-post',
        createdAt: '2024-02-14',
        title: 'My First Blog PostMy First Blog PostMy First Blog Post',
        description: 'This is the description for my first blog post.',
        image: 'https://placehold.co/600x600',
        banner: 'https://placehold.co/1200x400',
      },
      content: 'This is the content for my first blog post.',
    },
    {
      metadata: {
        slug: 'my-first-blog-post',
        createdAt: '2024-02-14',
        title: 'My First Blog Post',
        description: 'This is the description for my first blog post.',
        image: 'https://placehold.co/600x400',
        banner: 'https://placehold.co/1200x400',
      },
      content: 'This is the content for my first blog post.',
    },
    {
      metadata: {
        slug: 'my-first-blog-post',
        createdAt: '2024-02-14',
        title: 'My First Blog Post',
        description: 'This is the description for my first blog post.',
        image: 'https://placehold.co/600x200',
        banner: 'https://placehold.co/1200x400',
      },
      content: 'This is the content for my first blog post.',
    },
    {
      metadata: {
        slug: 'my-first-blog-post',
        createdAt: '2024-02-14',
        title: 'My First Blog Post',
        description: 'This is the description for my first blog post.',
        image: 'https://placehold.co/600x450',
        banner: 'https://placehold.co/1200x400',
      },
      content: 'This is the content for my first blog post.',
    },
  ] as BlogPost[];

  return (
    <React.Fragment>
      <BlogSelection posts={blogPosts} />
    </React.Fragment>
  );
};

export default BlogPage;
