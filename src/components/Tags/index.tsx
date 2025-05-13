import classNames from 'classnames';

import type { Tag as ITag } from '@/types/tag';
import { getTagColorClasses } from '@/utils/theme';

type TagsProps = {
  items: ITag[];
};

export const Tags = ({ items }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-2 content-center">
      {items.map((item) => (
        <Tag key={item.id} item={item} />
      ))}
    </div>
  );
};

type CardTagProps = {
  item: ITag;
};

export const Tag = ({ item: { name, color } }: CardTagProps) => {
  const { text, bg } = getTagColorClasses(color);

  return <div className={classNames('py-1 px-2', text, bg)}>{name}</div>;
};
