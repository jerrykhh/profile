'use client';

import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import * as R from 'ramda';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@/navigation';

import { GridIcon } from '../../icons/GridIcon';
import { HomeIcon } from '../../icons/HomeIcon';
import { NotebookIcon } from '../../icons/NotebookIcon';

interface NavDrawerProps {
  isOpen: boolean;
}

export const NavDrawer = ({ isOpen }: NavDrawerProps) => {
  const path = usePathname();
  const t = useTranslations('navBar');

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
    <nav className="xsOnly:flex sm:grid items-start px-2 gap-2 sm:mt-3 text-sm font-medium xsOnly:self-center">
      {menus.map((menu) => {
        const isActive =
          menu.path === '/'
            ? path === menu.path
            : R.match(/\/[^\\/]+/, path)[0] === menu.path;

        return (
          <TooltipProvider key={menu.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  key={menu.title}
                  href={menu.path}
                  className={classNames(
                    isActive
                      ? 'bg-primary text-secondary'
                      : ' text-muted-foreground hover:text-primary',
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all '
                  )}
                >
                  <menu.icon className="xsOnly:h-6 xsOnly:w-6 h-5 w-5 " />
                  <p
                    className={classNames(
                      isOpen ? 'sm:block hidden' : 'hidden'
                    )}
                  >
                    {' '}
                    {menu.title}
                  </p>
                </Link>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent className="smOrMd:relative" side="right">
                  {' '}
                  {menu.title}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </nav>
  );
};
