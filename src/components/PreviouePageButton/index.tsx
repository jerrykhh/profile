import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';

type PreviousPageButtonProps = {
  onClick?: () => void;
};

export const PreviousPageButton = ({ onClick }: PreviousPageButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="link"
      className="p-0"
      onClick={onClick ?? (() => router.back())}
    >
      <p className="text-lg sm:text-base">&lt; back</p>
    </Button>
  );
};
