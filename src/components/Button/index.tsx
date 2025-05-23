import { Link } from '@remix-run/react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  children: React.ReactNode;
}

export const Button = ({ to, children, ...props }: ButtonProps) => {
  const buttonElement = (
    <button
      className="border border-dashed px-5 py-1 cursor-pointer hover:bg-neutral-900"
      {...props}
    >
      {children}
    </button>
  );
  return to ? <Link to={to}>{buttonElement}</Link> : buttonElement;
};

export const BackButton = () => {
  return (
    <Link to={'../'}>
      <button className="text-neutral-400 hover:text-neutral-300 cursor-pointer hover:underline text-sm py-4">
        back
      </button>
    </Link>
  );
};
