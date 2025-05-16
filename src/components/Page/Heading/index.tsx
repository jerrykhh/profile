type PageHeadingProps = {
  data: string;
};

export const PageHeading1 = ({ data }: PageHeadingProps) => {
  return <h1>{data}</h1>;
};

export const PageHeading2 = ({ data }: PageHeadingProps) => {
  return <h2>{data}</h2>;
};

export const PageHeading3 = ({ data }: PageHeadingProps) => {
  return <h3>{data}</h3>;
};
