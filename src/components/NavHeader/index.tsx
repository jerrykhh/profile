import { useLocation } from '@remix-run/react';
import * as R from 'ramda';

import { NavButton } from '../NavButton';

export const NavHeader = () => {
  const curPathname = useLocation().pathname;
  const menus = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Projects',
      path: '/project',
    },
    {
      title: 'Blog',
      path: '/blog',
    },
  ];

  return (
    <div className="flex">
      <div className="flex grow gap-4">
        {menus.map((item) => {
          const isActive =
            item.path === '/'
              ? curPathname === item.path
              : R.match(/\/[^\\/]+/, curPathname)[0] === item.path;
          return (
            <NavButton
              key={item.path}
              to={item.path}
              title={item.title}
              isActive={isActive}
            />
          );
        })}
      </div>
      {/* "right menu" */}
      <div className="flex-shrink-0"></div>
    </div>
  );
};
