import Image from 'next/image';

import { BlogPostMetadata } from '@/types/blog';

interface BlogPostCardProps {
  metadata: BlogPostMetadata;
}

export const BlogPostCard = ({ metadata }: BlogPostCardProps) => {
  return (
    <div className="flex flex-col gap-1 ">
      <div className="w-full aspect-square">
        <Image
          src={metadata.image}
          alt={metadata.title}
          width={150}
          height={150}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-medium">{metadata.title}</h3>
      <p className="text-sm text-muted-foreground">{metadata.description}</p>
    </div>
  );
};
