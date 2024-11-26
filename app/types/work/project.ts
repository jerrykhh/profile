import { Work } from '.';

export interface Project extends Work {
  repository?: string;
  techs?: string[];
}
