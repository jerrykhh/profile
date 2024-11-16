import { Profile } from '@/types/profile';

import { ProfileTodoCard } from './ProfileTodoCard';

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
    <div>
      <h1>{welcomeHeading?.toString()}</h1>
      <div className="text-muted-foreground text-sm">
        {description.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      {todo && <ProfileTodoCard todo={todo} />}
    </div>
  );
};
