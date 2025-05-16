type PageCodeProps = {
  data: string;
};

export const PageCode = ({ data }: PageCodeProps) => {
  return <code>{data}</code>;
};
