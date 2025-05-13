import React from 'react';

type CardHeaderProps = {
  title?: string;
  publishedDate?: Date;
  hints?: string;
};

export const CardHeader = ({
  title,
  publishedDate,
  hints,
}: CardHeaderProps) => {
  return (
    <React.Fragment>
      <h3 className=" text-lg font-bold">{title}</h3>
      {hints && <h4 className="text-neutral-400 text-sm">{hints}</h4>}
      {publishedDate && (
        <h4 className="text-sm">
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
