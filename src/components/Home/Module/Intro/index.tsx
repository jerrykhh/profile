import { Button } from '@/components/Button';
import { Todo } from '@/types/todo';
import { ReleasedVersion } from '@/types/version';

import { ReleasedVersionList } from '../ReleasedVersionList';
import { TodoList } from '../TodoList';

type IntroParams = {
  title: string;
  biography: string;
  todos?: Todo[];
  versions?: ReleasedVersion[];
};

export const Intro = ({ title, biography, todos, versions }: IntroParams) => {
  return (
    <div className="py-10">
      <h1>{title}</h1>
      <p className="py-8">{biography}</p>
      <Button to="/ext/link">Get in Touch</Button>
      {(todos || versions) && (
        <div className="flex gap-4 py-4">
          <div className="grow">{todos && <TodoList items={todos} />}</div>
          {versions && <ReleasedVersionList items={versions} />}
        </div>
      )}
    </div>
  );
};
