import Image from 'next/image';

import { H3, Muted } from '@/components/ui/typography';
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
      <H3 className="text-lg">{metadata.title}</H3>
      <Muted>{metadata.description}</Muted>
    </div>
  );
};
