import { Link, useMatches } from '@remix-run/react';
import { XIcon } from 'lucide-react';
import { useEffect } from 'react';

import useDevicePlatform, { DevicePlatform } from '@/contexts/DevicePlatform';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
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

export enum SubNavigationType {
  FILTER = 'filter',
  NAVIGATION = 'navigation',
}

type SubNavigationProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  type?: SubNavigationType;
};
export const SubNavigation = ({
  children,
  onClose,
  isOpen,
  type = SubNavigationType.NAVIGATION,
  ...props
}: SubNavigationProps) => {
  const devicePlatform = useDevicePlatform();
  const { blockScroll, allowScroll } = useLockBodyScroll();
  const isMobileOrTablet =
    devicePlatform === DevicePlatform.MOBILE ||
    devicePlatform === DevicePlatform.TABLET;

  useEffect(() => {
    if (!devicePlatform) return;
    devicePlatform !== DevicePlatform.DESKTOP &&
      type === SubNavigationType.NAVIGATION &&
      (isOpen ? blockScroll() : allowScroll());
  }, [isOpen]);

  return (
    <div
      className={cn(
        'lg:fixed lg:p-4 lg:min-h-screen',
        type === SubNavigationType.NAVIGATION && 'min-h-screen',
        'border-r p-6 w-full z-10 bg-popover lg:w-[var(--sub-nav-narrow-width)]',
        // isMobileOrTablet ? 'fixed' : '',
        devicePlatform === DevicePlatform.DESKTOP || isOpen
          ? 'translate-x-0 overflow-y-hidden'
          : 'hidden lg:block'
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
