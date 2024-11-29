import { Work } from '@/types/work';

export const WorkCard = ({ work }: { work: Work }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full rounded border self-center mb-3">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-contain"
        />
      </div>
      <h3>{work.title}</h3>
      <p className="text-xs text-muted-foreground text-justify">
        {work.description}
      </p>
    </div>
  );
};
