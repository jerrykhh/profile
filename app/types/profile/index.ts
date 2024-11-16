import { MappedSocial, Social } from './social';
import { MappedTech } from './tech';
import { Todo } from './todo';

export interface IProfile {
  name: string;
  image: string;
  welcomeHeading?: string;
  description: string;

  todo?: Todo;
  social?: Social[];
  techs?: { [key: string]: string[] };
}

export type Profile = Omit<IProfile, 'social' | 'techs'> & {
  socials: MappedSocial[];
  techs?: { [key: string]: MappedTech[] };
};
