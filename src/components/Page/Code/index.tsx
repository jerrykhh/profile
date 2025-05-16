type PageCodeProps = {
  data: string;
};

export const PageCode = ({ data }: PageCodeProps) => {
  return (
    <div className="px-8 py-4 bg-neutral-800 my-4">
      <div className="w-full">{data}</div>
    </div>
  );
};
