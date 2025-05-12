import type { Tag } from '@/types/tag';

import { CardHeader } from './Header';
import { CardTags } from './Tag';

type CardProps = {
  title: string;
  publishedDate: Date;
  description: string;
  tags: Tag[];
};

export const Card = ({
  title,
  publishedDate,
  description,
  tags,
}: CardProps) => {
  return (
    <div className="flex flex-col">
      <CardHeader title={title} publishedDate={publishedDate} />
      <p>{description}</p>
      <CardTags items={tags} />
    </div>
  );
};
