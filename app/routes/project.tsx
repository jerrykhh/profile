import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Carousel, CarouselItem } from '@/components/Carousel';
import { ProjectCard } from '@/components/Project/ProjectCard';
import { TopProjects } from '@/components/Project/TopProjects';
import { getProjects } from '@/services/post.service';
import { Project } from '@/types/project';

export const clientLoader: LoaderFunction = async () => {
  return await getProjects({});
};

const ProjectPage = () => {
  const projects: Project[] = useLoaderData<typeof clientLoader>();
  console.log(projects);

  return (
    <div>
      <TopProjects projects={projects} />
      <div>
        <Carousel>
          <CarouselItem>
            <div className="w-1/3 box-border" key={projects[0].slug}>
              <ProjectCard project={projects[0]} />
            </div>
            <div className="w-1/3 box-border" key={projects[0].slug}>
              <ProjectCard project={projects[0]} />
            </div>
            <div className="w-1/3 box-border" key={projects[0].slug}>
              <ProjectCard project={projects[0]} />
            </div>
          </CarouselItem>

          <CarouselItem>
            <div className="w-1/3 box-border" key={projects[0].slug}>
              <ProjectCard project={projects[0]} />
            </div>
            <div className="w-1/3 box-border" key={projects[0].slug}>
              <ProjectCard project={projects[0]} />
            </div>
            <div className="w-1/3 box-border" key={projects[0].slug}>
              <ProjectCard project={projects[0]} />
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  );
};

export default ProjectPage;
