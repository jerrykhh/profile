import React from 'react';

type CardHeaderProps = {
  title: string;
  publishedDate: Date;
};

export const CardHeader = ({ title, publishedDate }: CardHeaderProps) => {
  return (
    <React.Fragment>
      <h3>{title}</h3>
      <h5>
        {publishedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </h5>
    </React.Fragment>
  );
};
