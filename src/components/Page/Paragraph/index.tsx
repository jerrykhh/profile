type PageParagraphProps = {
  data: string;
};

export const PageParagraph = ({ data }: PageParagraphProps) => {
  return <p>{data}</p>;
};
