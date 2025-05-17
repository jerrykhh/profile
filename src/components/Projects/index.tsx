import { Link } from '@remix-run/react';

import { Card, ContentCardType } from '@/components/Card';
import type { Project } from '@/types/project';

type ProjectsParams = {
  items: Project[];
};

export const Projects = ({ items }: ProjectsParams) => {
  return (
    <Card title="Projects" type={ContentCardType.CONTAINER}>
      <div className="flex flex-col gap-20 py-6">
        {items.map((item, i) => {
          return (
            <div key={i} className="cursor-pointer group">
              <Link to={`/project/${item.id}`}>
                <Card
                  key={i}
                  type={ContentCardType.CONTENT}
                  title={item.title}
                  publishedDate={new Date(item.createdAt.start)}
                  tags={item.tags}
                >
                  <p>{item.synopsis}</p>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
