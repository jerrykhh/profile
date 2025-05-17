type PageCodeProps = {
  data: string;
};

export const PageCode = ({ data }: PageCodeProps) => {
  return (
    <div className="px-8 py-4 bg-neutral-800 my-4 xsOrSm:px-4">
      <pre className="overflow-x-auto max-w-full p-4 rounded-lg">{data}</pre>
    </div>
  );
};
