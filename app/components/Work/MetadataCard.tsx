import { type WorkMeta } from '@/models/work';

export const WorkMetadataCard = ({ workMeta }: { workMeta: WorkMeta }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full rounded border self-center mb-3">
        <img
          src={workMeta.image}
          alt={workMeta.title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3>{workMeta.title}</h3>
      <p className="text-xs text-muted-foreground text-justify">
        {workMeta.description}
      </p>
    </div>
  );
};
