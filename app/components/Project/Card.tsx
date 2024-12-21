import { type Project } from '@/models/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="w-full rounded">
        <img src={project.meta.image} alt={project.meta.title} />
      </div>
      <h4>{project.meta.title}</h4>
      <p className="text-secondary-foreground text-justify text-sm ">
        {project.meta.description}
      </p>
    </div>
  );
};
