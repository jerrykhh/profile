import { DevicePlatformProvider } from '@/contexts/DevicePlatform';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

import { Navigation } from '../Navigation';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <div className="md:flex">
        <div
          className={cn(
            'fixed left-0 bottom-0 h-14 flex w-full justify-center border-t bg-background z-10',
            'md:bottom-auto md:flex-col md:justify-start md:w-[var(--nav-narrow-width)] md:border-r md:min-h-screen'
          )}
        >
          <Navigation items={navItems} />
        </div>
        <div className="w-full md:content md:ml-auto p-4">
          <div className="flex flex-col items-center">
            <div className="max-w-5xl">
              <DevicePlatformProvider>{children}</DevicePlatformProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
