import React from 'react';

import { Profile } from '@/types/profile';

import { ProfileTodoCard } from './ProfileContent/ProfileTodoCard';

type ProfileContentProps = Pick<
  Profile,
  'welcomeHeading' | 'description' | 'todo'
>;

export const ProfileContent = ({
  welcomeHeading,
  description,
  todo,
}: ProfileContentProps) => {
  return (
    <React.Fragment>
      <div className="my-2">
        <h1>{welcomeHeading}</h1>
        <div className="text-secondary-foreground">
          {description.split('\n').map((line, index) => (
            <p className="text-justify" key={index}>
              {line}
            </p>
          ))}
        </div>
        {todo && (
          <div className="my-4">
            <ProfileTodoCard todo={todo} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
