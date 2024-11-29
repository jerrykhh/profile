import { Project } from '@/types/work/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="w-full rounded">
        <img src={project.image} alt={project.title} />
      </div>
      <h4>{project.title}</h4>
      <p className="text-secondary-foreground text-justify text-sm ">
        {project.description}
      </p>
    </div>
  );
};
