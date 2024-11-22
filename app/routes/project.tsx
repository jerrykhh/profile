import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Carousel, CarouselItem } from '@/components/Carousel';
import { ProjectCard } from '@/components/Project/ProjectCard';
import { TopProjects } from '@/components/Project/TopProjects';
import useDevicePlatform, { DevicePlatform } from '@/contexts/DevicePlatform';
import { getProjects } from '@/services/post.service';
import { Project } from '@/types/project';

export const clientLoader: LoaderFunction = async () => {
  return await getProjects({});
};

const ProjectPage = () => {
  const projects: Project[] = useLoaderData<typeof clientLoader>();
  console.log(projects);

  const devicePlatform = useDevicePlatform();
  const cols = {
    [DevicePlatform.MOBILE]: 3,
    [DevicePlatform.TABLET]: 3,
    [DevicePlatform.DESKTOP]: 3,
  }[devicePlatform ?? DevicePlatform.DESKTOP];

  return (
    <div>
      <TopProjects projects={projects} />

      <Carousel>
        {Array.from({
          length:
            projects.length < cols ? cols : Math.ceil(projects.length / cols),
        }).map((_, i) => {
          return (
            <CarouselItem key={projects[i].slug}>
              {Array.from({
                length: Math.min(cols, projects.length - i * cols),
              }).map((_, j) => {
                const index = i * cols + j;
                console.log('index', index);
                return (
                  <div className={`box-border`} key={projects[index].slug + j}>
                    <ProjectCard project={projects[index]} />
                  </div>
                );
              })}
            </CarouselItem>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProjectPage;
