export interface Todo {
  title?: string;
  description?: string;
  items: TodoItems[];
}

export interface TodoItems {
  description: string;
  completed: boolean;
}
