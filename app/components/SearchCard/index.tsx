import { Link } from '@remix-run/react';

import { cn } from '@/lib/utils';

type SearchCardProps = {
  item: {
    route: string;
    image?: string;
    title: string;
    description?: string;
  };
};

export const SearchCard = ({ item }: SearchCardProps) => {
  return (
    <Link to={item.route}>
      <div
        className={cn(
          'flex gap-2',
          !item.image &&
            !item.description &&
            'py-2 border-b-[0.5px] text-muted-foreground hover:text-primary-foreground hover:border-primary-foreground transition-colors duration-200'
        )}
      >
        {item.image && (
          <div className="w-32">
            <img
              src={item.image}
              alt={item.title}
              className="bg-accent rounded-sm w-8 h-8 object-cover"
            />
          </div>
        )}
        <div className="grow self-center">
          <h5 className={cn(item.description && 'text-justify')}>
            {item.title}
          </h5>
          {item.description && (
            <p className="p-0 text-xs overflow-hidden text-ellipsis line-clamp-4 text-muted-foreground ">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
