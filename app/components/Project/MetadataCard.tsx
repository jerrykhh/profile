import { Link } from '@remix-run/react';

import { cn } from '@/lib/utils';
import { type Project, type ProjectMeta } from '@/models/project';

export const ProjectMetadataCard = ({
  className,
  project,
}: {
  className?: string;
  project: Project;
}) => {
  const metadata = project.meta as ProjectMeta;

  return (
    <div className={cn('flex flex-col gap-1 max-w-[20em]', className)}>
      <div className="border rounded-lg px-8 py-4">
        <div className="w-full">
          <img
            src={metadata.image}
            alt={metadata.title}
            className="object-contain"
          />
        </div>
        <h3>Project: {project.meta.title}</h3>
        <p className="text-sm text-muted-foreground text-justify">
          {metadata.description}
        </p>
        <div className="my-4">
          {metadata.repository ? (
            <Link to={metadata.repository} target="_blank" rel="noreferrer">
              <button className="w-full bg-primary/80 hover:bg-primary transition-colors duration-300 text-white p-2 rounded">
                <span className="text-sm">View Repository</span>
              </button>
            </Link>
          ) : (
            <button
              className="w-full bg-primary text-white p-2 rounded"
              disabled
            >
              Repository Not Available
            </button>
          )}
        </div>

        <div className="flex flex-wrap text-center gap-1 text-sm">
          {[...metadata.tags, ...(metadata.techs ?? [])].map((tag, i) => (
            <div
              key={i}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full w-fit"
            >
              {`#${tag}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
