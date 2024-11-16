import { navItems } from '@/config/navigation';
import { cn } from '@/lib/utils';

import { Navigation } from '../Navigation';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <div className="md:flex">
        <div
          className={cn(
            'absolute bottom-0 h-14 flex w-full justify-center border-t',
            'md:static md:bottom-auto md:flex-col md:justify-start md:max-w-16 md:border-r md:min-h-screen'
          )}
        >
          <Navigation items={navItems} />
        </div>
        <div className="grow">
          <div className="flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
};
