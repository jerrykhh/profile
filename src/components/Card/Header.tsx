import classNames from 'classnames';
import React from 'react';

import { ContentCardType } from '.';

type CardHeaderProps = {
  title?: string;
  publishedDate?: Date;
  hints?: string;
  type?: ContentCardType;
};

export const CardHeader = ({
  title,
  publishedDate,
  hints,
  type,
}: CardHeaderProps) => {
  return (
    <React.Fragment>
      <h3
        className={classNames(
          'font-bold',
          type == ContentCardType.CONTAINER && 'text-3xl',
          type == ContentCardType.DEFAULT && 'text-lg',
          type == ContentCardType.CONTENT &&
            'text-xl group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-2'
        )}
      >
        {title}
      </h3>
      {hints && <h4 className="text-neutral-400 text-sm">{hints}</h4>}
      {publishedDate && (
        <h4 className="text-sm text-neutral-300">
          {publishedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </h4>
      )}
    </React.Fragment>
  );
};
