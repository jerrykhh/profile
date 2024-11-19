export interface Project {
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  tags: string[];
  repository?: string;
  techs?: string[];
}
