import { Link } from '@remix-run/react';

import { type Work } from '@/models/work';

import { WorkMetadataCard } from './MetadataCard';

interface WorkListProps {
  header: {
    title: string;
    description: string;
  };
  items: Work[];
}

export const WorkList = ({ header, items }: WorkListProps) => {
  console.log('items', items);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h2>{header.title}</h2>
        <p className="text-sm text-muted-foreground p-0">
          {header.description}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <Link to={`/works/${item.getRoute()}`} key={index}>
              <WorkMetadataCard workMeta={item.meta} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground h-60 content-center">
          Currently no works here. :(
        </p>
      )}
    </div>
  );
};
