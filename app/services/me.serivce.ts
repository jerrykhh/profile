import { profile } from '@/data/profile';
import { Profile } from '@/types/profile';
import { MappedTech } from '@/types/profile/tech';

import mapService from './mapping.serivce';

export const getMe = () => {
  const { social, techs } = profile;

  const mappedProfile: Profile = {
    ...profile,
    socials: social ? social.map(mapService.social) : [],
    techs:
      techs &&
      Object.keys(techs).reduce((acc: Record<string, MappedTech[]>, key) => {
        acc[key] = techs[key].map(mapService.tech);
        return acc;
      }, {}),
  };
  return mappedProfile;
};
