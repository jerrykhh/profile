import classNames from 'classnames';

import type { Tag } from '@/types/tag';

import { Tags } from '../Tags';
import { CardHeader } from './Header';

export enum ContentCardType {
  DEFAULT = 'default',
  CONTENT = 'content',
  CONTAINER = 'container',
}

type CardProps = {
  title?: string;
  publishedDate?: Date;
  hints?: string;
  children?: React.ReactNode;
  tags?: Tag[];

  type?: ContentCardType;
  containerClassName?: string;
};

export const Card = ({
  title,
  publishedDate,
  hints,
  children,
  tags,
  containerClassName,
  type = ContentCardType.DEFAULT,
}: CardProps) => {
  return (
    <div className={classNames('flex flex-col', containerClassName)}>
      {(title || publishedDate || hints) && (
        <CardHeader
          type={type}
          title={title}
          hints={hints}
          publishedDate={publishedDate}
        />
      )}
      <div
        className={classNames(
          'py-2',
          type === ContentCardType.CONTENT && 'text-sm'
        )}
      >
        {children}
      </div>
      {type === ContentCardType.CONTENT && tags && <Tags items={tags} />}
    </div>
  );
};
