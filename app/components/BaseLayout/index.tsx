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
            'fixed left-0 bottom-0 h-14 flex w-full justify-center border-t bg-background z-50',
            'lg:bottom-auto lg:flex-col lg:justify-start lg:w-[var(--nav-narrow-width)] lg:border-r lg:min-h-screen'
          )}
        >
          <Navigation items={navItems} />
        </div>
        <div className="w-full lg:content lg:ml-auto">
          <DevicePlatformProvider>{children}</DevicePlatformProvider>
        </div>
      </div>
    </div>
  );
};
