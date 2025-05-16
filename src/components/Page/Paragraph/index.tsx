type PageParagraphProps = {
  data: string;
};

export const PageParagraph = ({ data }: PageParagraphProps) => {
  return <p className="leading-8 my-4">{data}</p>;
};
