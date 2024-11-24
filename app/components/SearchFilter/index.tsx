import type React from 'react';
import type { OptionHTMLAttributes, ReactElement } from 'react';

import { cn } from '@/lib/utils';

interface FilterOptionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children:
    | ReactElement<OptionHTMLAttributes<HTMLOptionElement>>
    | ReactElement<OptionHTMLAttributes<HTMLOptionElement>>[];
}

export const FilterOptionGroup = ({
  children,
  ...props
}: FilterOptionGroupProps) => {
  return (
    <div className="flex gap-1" {...props}>
      {children}
    </div>
  );
};

interface FilterOptionProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  isChecked: boolean;
}

export const FilterOption = ({
  label,
  isChecked = false,
  ...props
}: FilterOptionProps) => {
  return (
    <button
      className={cn(
        'bg-accent text-accent-foreground px-2 py-1 rounded-md cursor-pointer hover:bg-accent-foreground hover:text-accent',
        isChecked && 'bg-accent-foreground text-accent'
      )}
      value={label}
      {...props}
    >
      {label}
    </button>
  );
};
