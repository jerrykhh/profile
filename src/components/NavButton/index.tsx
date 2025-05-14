import { Link } from '@remix-run/react';
import classNames from 'classnames';

type NavButtonParams = {
  to: string;
  title: string;
  isActive?: boolean;
  underline?: boolean;
};

export const NavButton = ({
  to,
  title,
  isActive = false,
  underline = true,
}: NavButtonParams) => {
  return (
    <Link to={to}>
      <div
        className={classNames(
          'underline-offset-8 text-neutral-300 hover:text-white',
          isActive && 'text-white',
          underline &&
            (isActive
              ? 'underline'
              : 'hover:underline hover:decoration-dashed ')
        )}
      >
        <h5>{title}</h5>
      </div>
    </Link>
  );
};
