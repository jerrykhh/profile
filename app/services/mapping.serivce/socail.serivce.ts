import { MailIcon } from 'lucide-react';

import GithubIcon from '@/components/icons/GithubIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import ThreadsIcon from '@/components/icons/ThreadsIcon';

import { MappedSocial, Social } from '../../types/profile/social';

const SocialMedias = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  threads: ThreadsIcon,
  instagram: InstagramIcon,
  email: MailIcon,
};

export const mapSocial = (social: Social): MappedSocial => {
  const key = social.key
    .trim()
    .replace('.', '')
    .replace(' ', '')
    .replace('-', '')
    .toLowerCase();
  return {
    icon: SocialMedias[key as keyof typeof SocialMedias],
    key: social.key,
    username: social.username,
    url: social.url,
  };
};
