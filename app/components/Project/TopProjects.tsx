import { Project } from '@/types/project';

import { ProjectCard } from './ProjectCard';

interface TopProjectsProps {
  projects: Project[];
}

export const TopProjects = ({ projects }: TopProjectsProps) => {
  return (
    <div className="my-2">
      <h3>Top Projects</h3>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {projects.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};
