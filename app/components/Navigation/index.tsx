import { Link, useMatches } from '@remix-run/react';
import clsx from 'clsx';

import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types/navigation';

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
              'transition-colors',
              matches?.pathname === item.route
                ? 'text-primary-foreground'
                : 'text-secondary-foreground hover:text-primary-foreground'
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

type SubNavigationProps = React.HTMLAttributes<HTMLDivElement>;
export const SubNavigation = ({ children, ...props }: SubNavigationProps) => {
  return (
    <div
      className={clsx('border-r p-4  w-full fixed lg:w-80 lg:relative')}
      {...props}
    >
      <div className="">{children}</div>
    </div>
  );
};
