import type { Tag } from '@/types/tag';

type CardTagsProps = {
  items: Tag[];
};

export const CardTags = ({ items }: CardTagsProps) => {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <CardTag key={item.id} item={item} />
      ))}
    </div>
  );
};

type CardTagProps = {
  item: Tag;
};
const CardTag = ({ item: { name } }: CardTagProps) => {
  return <div className="py-1 px-2">{name}</div>;
};
