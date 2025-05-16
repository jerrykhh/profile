type PageImageProps = {
  data: string;
};

export const PageImage = ({ data }: PageImageProps) => {
  return <img src={data} alt="" />;
};
