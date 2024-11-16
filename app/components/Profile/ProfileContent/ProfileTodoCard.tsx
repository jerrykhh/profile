import { PinIcon } from 'lucide-react';

import { Todo } from '@/types/profile/todo';

export const ProfileTodoCard = ({ todo }: { todo: Todo }) => {
  return (
    <div className="card">
      <div className="flex items-center gap-1">
        <PinIcon className="w-4 h-4 text-muted-foreground" />
        <h3>{todo.title}</h3>
      </div>

      <p className="text-secondary-foreground text-sm p-0">
        {todo.description}
      </p>
      <ul className="list-disc list-inside mt-3">
        {todo.items.map((item, index) => (
          <li key={index} className="list-item">
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
