import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ReactElement, ReactNode, useRef } from 'react';

interface CarouselProps {
  children:
    | ReactElement<typeof CarouselItem>
    | ReactElement<typeof CarouselItem>[];
}

export const Carousel = ({ children }: CarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex gap-2 items-center">
      <button
        className=" border rounded-full p-2 text-muted-foreground border-muted-foreground/50 hover:text-primary-foreground hover:border-primary-foreground transition-colors duration-200"
        onClick={() => {
          console.log(ref.current?.clientWidth);
          ref.current?.scrollBy({
            left: -ref.current?.clientWidth,
            behavior: 'smooth',
          });
        }}
      >
        <ArrowLeftIcon />
      </button>

      <div className="grow px-2">
        <div
          className="flex flex-nowrap overflow-x-auto h-full no-scrollbar "
          ref={ref}
        >
          {children}
        </div>
      </div>

      <button
        className=" border rounded-full p-2 text-muted-foreground border-muted-foreground/50 hover:text-primary-foreground hover:border-primary-foreground transition-colors duration-200"
        onClick={() => {
          ref.current?.scrollBy({
            left: ref.current?.clientWidth,
            behavior: 'smooth',
          });
        }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

interface CarouselItemProps {
  children?: ReactNode;
}

export const CarouselItem = ({ children }: CarouselItemProps) => {
  return (
    <div className="flex justify-between gap-3 flex-shrink-0 w-full">
      {children}
    </div>
  );
};
