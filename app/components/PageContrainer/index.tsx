import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageContainer = ({
  children,
  className,
  ...props
}: PageContainerProps) => {
  return (
    <div className={cn('flex flex-col items-center p-4', className)} {...props}>
      <div className="w-full max-w-5xl lg:justify-self-center">{children}</div>
    </div>
  );
};
