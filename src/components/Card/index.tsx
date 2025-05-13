import classNames from 'classnames';

import type { Tag } from '@/types/tag';

import { CardHeader } from './Header';
import { CardTags } from './Tag';

type CardProps = {
  title?: string;
  publishedDate?: Date;
  hints?: string;
  children?: React.ReactNode;
  tags?: Tag[];

  containerClassName?: string;
};

export const Card = ({
  title,
  publishedDate,
  hints,
  children,
  tags,
  containerClassName,
}: CardProps) => {
  return (
    <div className={classNames('flex flex-col p-4', containerClassName)}>
      {(title || publishedDate || hints) && (
        <CardHeader title={title} hints={hints} publishedDate={publishedDate} />
      )}
      <div className="py-2">{children}</div>
      {tags && <CardTags items={tags} />}
    </div>
  );
};
