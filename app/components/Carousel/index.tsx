import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import React, {
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CarouselItem = ({
  children,
  className,
  ...props
}: CarouselItemProps) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-3 justify-start flex-shrink-0 w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CarouselProps {
  children: ReactElement<CarouselItemProps> | ReactElement<CarouselItemProps>[];
}

export const Carousel = ({ children }: CarouselProps) => {
  const items = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="w-full flex gap-2 items-center">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="border rounded-full p-2 text-muted-foreground border-muted-foreground/50 hover:text-primary-foreground hover:border-primary-foreground transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Carousel Content */}
      <div className="grow overflow-hidden">
        <div
          ref={ref}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`, // Shift items based on active index
          }}
        >
          {items.map((item, index) =>
            React.cloneElement(item as ReactElement<CarouselItemProps>, {
              className: clsx(
                'flex-shrink-0 w-full',
                index === activeIndex ? 'opacity-100' : 'opacity-50', // Adjust visibility
                item.props.className
              ),
            })
          )}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="border rounded-full p-2 text-muted-foreground border-muted-foreground/50 hover:text-primary-foreground hover:border-primary-foreground transition-colors duration-200"
      >
        <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
      </button>
    </div>
  );
};
