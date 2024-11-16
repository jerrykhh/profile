import {
  GalleryHorizontalEndIcon,
  HouseIcon,
  type LucideIcon,
  PresentationIcon,
  TvMinimalIcon,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  route: string;
  icon: LucideIcon;
}

export const navItems: NavigationItem[] = [
  {
    name: 'Home',
    route: '/',
    icon: HouseIcon,
  },
  {
    name: 'Project',
    route: '/project',
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
