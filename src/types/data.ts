export type PaginatedData<T> = {
  items: T[];
  next_cursor: string | null;
  has_more: boolean;
};
