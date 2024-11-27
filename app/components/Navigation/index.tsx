import { Link, useMatches } from '@remix-run/react';
import { XIcon } from 'lucide-react';

import useDevicePlatform, { DevicePlatform } from '@/contexts/DevicePlatform';
import { cn } from '@/lib/utils';
import { NavigationItem } from '@/types/navigation';

export const Navigation = ({ items }: { items: NavigationItem[] }) => {
  const matches = useMatches().at(-2);
  console.log(matches);

  return (
    <div
      className={cn(
        'flex gap-6 justify-center m-3 self-center',
        'lg:flex-col md:mt-5'
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

type SubNavigationProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};
export const SubNavigation = ({
  children,
  onClose,
  isOpen,
  ...props
}: SubNavigationProps) => {
  const devicePlatform = useDevicePlatform();
  const isMobileOrTablet =
    devicePlatform === DevicePlatform.MOBILE ||
    devicePlatform === DevicePlatform.TABLET;

  return (
    <div
      className={cn(
        'fixed lg:relative border-r min-h-screen p-4 w-full lg:w-80 z-10 bg-popover',
        isMobileOrTablet ? 'fixed' : '',
        devicePlatform === DevicePlatform.DESKTOP || isOpen
          ? 'translate-x-0'
          : '-translate-x-full'
      )}
      {...props}
    >
      {isMobileOrTablet ? (
        <div className="flex flex-col">
          <div className="text-right">
            <button onClick={onClose}>
              <XIcon className="w-7 h-7 text-muted hover:text-primary-foreground transition-colors duration-200" />
            </button>
          </div>
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};
