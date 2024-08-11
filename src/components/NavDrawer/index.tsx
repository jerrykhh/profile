'use client';

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import * as R from 'ramda';

import { Link } from '@/navigation';

import { GridIcon } from '../icons/GridIcon';
import { HomeIcon } from '../icons/HomeIcon';
import { NotebookIcon } from '../icons/NotebookIcon';

interface NavDrawerProps {
  open: boolean;
}

export const NavDrawer = ({ open }: NavDrawerProps) => {
  const path = usePathname();
  const t = useTranslations('navBar');
  console.log('open', open);

  const menus = [
    {
      title: t('home'),
      path: '/',
      icon: HomeIcon,
    },
    {
      title: t('blog'),
      path: '/blog',
      icon: NotebookIcon,
    },
    {
      title: t('gallery'),
      path: '/gallery',
      icon: GridIcon,
    },
  ];

  return (
    <nav className="flex flex-col items-center gap-2 py-4">
      {menus.map((item) => {
        const isActive =
          item.path === '/'
            ? path === item.path
            : R.match(/\/[^\\/]+/, path)[0] === item.path;

        return isActive ? (
          <Link
            href={item.path}
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
          >
            {<item.icon className="h-5 w-5" />}
          </Link>
        ) : (
          <TooltipProvider key={item.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className="rounded-lg text-muted-foreground transition-colors hover:text-foreground flex h-10 w-10 items-center justify-center"
                >
                  {<item.icon className="h-6 w-6" />}
                </Link>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </nav>
  );
};
