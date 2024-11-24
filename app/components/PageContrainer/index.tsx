interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageContainer = ({ children, ...props }: PageContainerProps) => {
  return (
    <div className="flex flex-col items-center p-4" {...props}>
      <div className="max-w-5xl justify-self-center">{children}</div>
    </div>
  );
};
