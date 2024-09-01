import React from 'react';

import { H1, Muted } from '@/components/ui/typography';
import { Link } from '@/navigation';
import { BlogPost } from '@/types/blog';

import { BlogPostCard } from '../BlogCard';

type BlogSelectionProps = {
  posts: BlogPost[];
  showDescription?: boolean;
};

export const BlogSelection = ({
  posts,
  showDescription = true,
}: BlogSelectionProps) => {
  return (
    <React.Fragment>
      <H1 className="mb-0">Blog</H1>
      {showDescription && (
        <Muted className="text-justify mt-4">
          Welcome to my collection of blogs, where I share insights and
          knowledge on topics like AI model training, software development,
          cloud technologies, and more. Explore posts that delve into the latest
          advancements and practical guides in the IT world, tailored for both
          enthusiasts and professionals.
        </Muted>
      )}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {posts.map((post) => (
          <Link href={`/blog/${post.metadata.slug}`} key={post.metadata.slug}>
            <BlogPostCard metadata={post.metadata} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
};
