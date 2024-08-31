import React from 'react';

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
      <h1 className="text-2xl font-bold ">Blog</h1>
      {showDescription && (
        <p className="text-muted-foreground text-xs text-justify">
          Welcome to my collection of blogs, where I share insights and
          knowledge on topics like AI model training, software development,
          cloud technologies, and more. Explore posts that delve into the latest
          advancements and practical guides in the IT world, tailored for both
          enthusiasts and professionals.
        </p>
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
