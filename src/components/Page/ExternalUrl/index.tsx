import { Link } from '@remix-run/react';
import classNames from 'classnames';

import GithubIcon from '@/components/Icons/GithubIcon';

type ExternalUrlButtonProps = {
  className?: string;
  url: string;
};

export const ExternalUrlButton = ({
  url,
  className,
}: ExternalUrlButtonProps) => {
  const renderElternalUrlIcon = () => {
    if (url.includes('github'))
      return (
        <GithubIcon
          className={classNames(
            'w-7 h-7 xsOrSm:w-6 xsOrSm:h-6 text-neutral-300 hover:text-neutral-100 transition-colors',
            className
          )}
        />
      );
    return null;
  };
  const icon = renderElternalUrlIcon();
  return icon !== null ? (
    <Link to={url} target="_blank" rel="noreferrer">
      {icon}
    </Link>
  ) : null;
};
