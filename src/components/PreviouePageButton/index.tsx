'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/navigation';

import { P } from '../ui/typography';

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
      <P>&lt; back</P>
    </Button>
  );
};
