import { MenuIcon } from '../../icons/MenuIcon';
import { Button } from '../../ui/button';

interface NavHeaderProps {
  onToggle?: () => void;
}

export const NavHeader = ({ onToggle }: NavHeaderProps) => {
  return (
    <div className="border-b p-2 xsOnly:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label="Home"
        onClick={onToggle}
      >
        <MenuIcon className="size-5 fill-foreground" />
      </Button>
    </div>
  );
};
