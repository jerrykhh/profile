import { Link } from '@remix-run/react';
import classNames from 'classnames';
import * as R from 'ramda';

import { Card } from '@/components/Card';
import type { ReleasedVersion } from '@/types/version';

type ReleasedVersionParams = {
  items: ReleasedVersion[];
};

export const ReleasedVersionList = ({ items }: ReleasedVersionParams) => {
  return (
    <Card
      title={`Releases (${items.length})`}
      containerClassName="border px-4 py-4"
    >
      <ul>
        {items.map((item, i) => {
          // const isCurrentRelease = item.url ? new URL(item.url).hostname === new URL(pathname)
          const isProvidedUrl = R.isNotEmpty(item.url) && R.isNotNil(item.url);
          const isLatestVersion = i === items.length - 1;
          const releaseEle = (
            <li
              key={item.tag}
              className={classNames(
                'py-1 border-b',
                !isLatestVersion
                  ? isProvidedUrl
                    ? 'hover:bg-neutral-800 cursor-pointer'
                    : 'cursor-not-allowed'
                  : 'cursor-pointer'
              )}
            >
              {' '}
              {item.tag}
            </li>
          );
          return isProvidedUrl && !isLatestVersion ? (
            <Link
              key={item.tag}
              to={item.url!}
              target="_blank"
              rel="noreferrer"
            >
              {releaseEle}
            </Link>
          ) : (
            releaseEle
          );
        })}
      </ul>
    </Card>
  );
};
