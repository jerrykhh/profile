import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

import { Navigation } from '../Navigation';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <div className="md:flex">
        <div
          className={cn(
            'fixed left-0 bottom-0 h-14 flex w-full justify-center border-t bg-background',
            'md:static md:bottom-auto md:flex-col md:justify-start md:max-w-16 md:border-r md:min-h-screen'
          )}
        >
          <Navigation items={navItems} />
        </div>
        <div className="grow">
          <div className="flex flex-col items-center py-4">
            <div className="max-w-5xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
