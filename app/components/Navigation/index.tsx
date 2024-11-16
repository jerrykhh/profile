import { Link, useMatches } from '@remix-run/react';

import { type NavigationItem } from '@/config/navigation';
import { cn } from '@/lib/utils';

export const Navigation = ({ items }: { items: NavigationItem[] }) => {
  const matches = useMatches().at(-2);
  console.log(matches);

  return (
    <div
      className={cn(
        'flex gap-6 justify-center m-3 self-center',
        'md:flex-col md:mt-5'
      )}
    >
      {items.map((item) => (
        <Link key={item.route} to={item.route}>
          <div
            className={cn(
              'flex items-center gap-1',
              matches?.pathname === item.route ? 'text-primary' : 'text-muted'
            )}
          >
            <item.icon className={cn('w-8 h-8', 'md:w-7 md:h-7')} />
            {/* <span className="hidden md:block text-sm">{item.name}</span> */}
          </div>
        </Link>
      ))}
    </div>
  );
};
