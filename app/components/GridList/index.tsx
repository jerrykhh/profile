interface GridListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const GridList = <T,>({ items, renderItem }: GridListProps<T>) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10">
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default GridList;
