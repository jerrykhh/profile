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
    <Card title={`Releases (${items.length})`} containerClassName="border">
      <ul>
        {items.map((item) => {
          const isProvidedUrl = R.isNotEmpty(item.url) && R.isNotNil(item.url);
          const releaseEle = (
            <li
              className={classNames(
                'py-2 border-b',
                isProvidedUrl
                  ? 'hover:bg-neutral-800 cursor-pointer'
                  : 'cursor-not-allowed'
              )}
            >
              {' '}
              {item.tag}
            </li>
          );
          return isProvidedUrl ? (
            <Link to={item.url!} target="_blank" rel="noreferrer">
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
