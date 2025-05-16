type PageVideoProps = {
  data: string;
};

export const PageVideo = ({ data }: PageVideoProps) => {
  return (
    <div className="relative aspect-video">
      <iframe
        title={`page-video ${data}`}
        className="absolute inset-0 w-full h-full"
        src={data}
      />
    </div>
  );
};
