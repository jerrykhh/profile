'use client';

import { toast } from '@/hooks/useToast';

import { ShareIcon } from '../icons/ShareIcon';
import { Button } from '../ui/button';

export const ShareButton = () => {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Copied to clipboard',
      description: 'The link has been copied to your clipboard',
    });
  };
  return (
    <Button
      className="w-10 h-10"
      variant="outline"
      size="icon"
      onClick={handleShare}
    >
      <ShareIcon className="w-4 h-4" />
    </Button>
  );
};
