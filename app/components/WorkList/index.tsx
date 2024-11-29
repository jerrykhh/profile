import { Link } from '@remix-run/react';

import { Work } from '@/types/work';

import { WorkCard } from './WordCard';

interface WorkListProps {
  header: {
    title: string;
    description: string;
  };
  items: Work[];
}

export const WorkList = ({ header, items }: WorkListProps) => {
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
            <Link to={`/project/${item.slug}`} key={index}>
              <WorkCard work={item} />
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
