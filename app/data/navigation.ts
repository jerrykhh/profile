import {
  GalleryHorizontalEndIcon,
  HouseIcon,
  PresentationIcon,
  TvMinimalIcon,
} from 'lucide-react';

import { NavigationItem } from '@/types/navigation';

export const navItems: NavigationItem[] = [
  {
    name: 'Home',
    route: '/',
    icon: HouseIcon,
  },
  {
    name: 'Works',
    route: '/works',
    icon: PresentationIcon,
  },
  {
    name: 'Video',
    route: '/video',
    icon: TvMinimalIcon,
  },
  {
    name: 'Gallery',
    route: '/gallery',
    icon: GalleryHorizontalEndIcon,
  },
];
