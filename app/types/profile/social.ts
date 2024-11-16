import { type LucideIcon } from 'lucide-react';

export interface MappedSocial {
  icon: LucideIcon | React.ElementType;
  key: string;
  username?: string;
  url: string;
}

export type Social = Omit<MappedSocial, 'icon'>;
