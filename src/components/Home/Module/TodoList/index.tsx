import { Card } from '@/components/Card';
import { Todo } from '@/types/todo';

type TodoListParams = {
  items: Todo[];
};

export const TodoList = ({ items }: TodoListParams) => {
  return (
    <Card title="Todo" hints="I need to do it." containerClassName="border">
      <ul className="list-disc list-inside">
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </Card>
  );
};
