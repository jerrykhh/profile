import { Link } from '@remix-run/react';

import { type Project } from '@/models/project';

export const ProjectMetadataCard = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col gap-1 border rounded-lg max-w-sm px-8 py-4">
      <div className="w-full">
        <img
          src={project.meta.image}
          alt={project.meta.title}
          className="object-contain"
        />
      </div>
      <h3>Project: {project.meta.title}</h3>
      <p className="text-sm text-muted-foreground">
        {project.meta.description}
      </p>

      <div className="my-4">
        <button className="w-full bg-primary text-white p-2 rounded">
          <Link to={`project.repository`} target="_blank" rel="noreferrer">
            View Repository
          </Link>
        </button>
      </div>
    </div>
  );
};
