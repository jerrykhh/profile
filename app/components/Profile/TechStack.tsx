import { type MappedTech } from '@/types/profile/tech';

import GridList from '../GridList';

const TechStack = ({ items }: { items: Record<string, MappedTech[]> }) => {
  return (
    <div className="w-full">
      <h1 className="text-center">Tech Stack</h1>
      {Object.entries(items).map(([key, value]) => (
        <div key={key} className="my-4">
          <h3 className="mt-8 mb-4">{key}</h3>
          <GridList
            items={value}
            renderItem={(item) => (
              <div
                key={item.name}
                className="flex flex-col items-center self-center"
              >
                <div className="w-20 h-20 content-center bg-background">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-fill"
                  />
                </div>
                <p className="p-2 text-sm">{item.name}</p>
              </div>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default TechStack;
