import { MappedTech } from '@/types/profile/tech';

export const mapTech = (tech: string): MappedTech => {
  const key = tech
    .trim()
    .replace('.', '')
    .replace(' ', '')
    .replace('-', '')
    .toLowerCase();
  return {
    name: tech,
    image: `/static/images/tech/${key}.png`,
  };
};
