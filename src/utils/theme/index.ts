import { TAG_COLOR_MAP } from '@/constants/color';

export const getTagColorClasses = (color: string) => {
  return (
    TAG_COLOR_MAP[color as keyof typeof TAG_COLOR_MAP] ?? TAG_COLOR_MAP.default
  );
};
