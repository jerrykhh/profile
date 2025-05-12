import { Link, useLocation } from '@remix-run/react';
import classNames from 'classnames';
import * as R from 'ramda';

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
      <div className="flex grow gap-2">
        {menus.map((item) => {
          const isActive =
            item.path === '/'
              ? curPathname === item.path
              : R.match(/\/[^\\/]+/, curPathname)[0] === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className="px-1">
                <div
                  className={classNames(
                    isActive
                      ? 'border-b-[1.5px]'
                      : 'hover:border-b-[1.5px] hover:border-dashed'
                  )}
                >
                  <h5>{item.title}</h5>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* "right menu" */}
      <div className="flex-shrink-0"></div>
    </div>
  );
};
