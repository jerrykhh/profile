import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useMemo } from 'react';

import { Carousel, CarouselItem } from '@/components/Carousel';
import { SubNavigation } from '@/components/Navigation';
import { PageContainer } from '@/components/PageContrainer';
import { ProjectCard } from '@/components/Project/ProjectCard';
import { TopProjects } from '@/components/Project/TopProjects';
import { SearchCard } from '@/components/SearchCard';
import { FilterOption, FilterOptionGroup } from '@/components/SearchFilter';
import useDevicePlatform, { DevicePlatform } from '@/contexts/DevicePlatform';
import { base64ToString, stringToBase64 } from '@/lib/converter';
import { getProjects } from '@/services/post.service';
import type { Project } from '@/types/project';

export const clientLoader: LoaderFunction = async () => {
  return await getProjects({});
};

const Project = () => {
  const projects: Project[] = useLoaderData<typeof clientLoader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTags =
    base64ToString(searchParams.get('t') ?? '').split(',') ?? [];

  const projectTags = useMemo(() => {
    const tags = projects.map((project) => project.tags).flat();
    const freqTags = {} as Record<string, number>;
    tags.forEach((tag) => {
      freqTags[tag.toLowerCase()] = (freqTags[tag.toLowerCase()] ?? 0) + 1;
    });
    return Object.keys(freqTags).sort((a, b) => freqTags[b] - freqTags[a]);
  }, [projects]);

  const devicePlatform = useDevicePlatform();
  const cols = {
    [DevicePlatform.MOBILE]: 2,
    [DevicePlatform.TABLET]: 3,
    [DevicePlatform.DESKTOP]: 3,
  }[devicePlatform ?? DevicePlatform.DESKTOP];

  console.log('project page');

  return (
    <div className="flex">
      <SubNavigation>
        <div className="flex flex-col gap-4">
          <div className="search">
            <h3>Search</h3>
            <input type="text" placeholder="Search" />

            <FilterOptionGroup>
              {projectTags.map((tag) => (
                <FilterOption
                  key={tag}
                  label={tag}
                  isChecked={selectedTags.includes(tag)}
                  onClick={() => {
                    const newTags = selectedTags.includes(tag)
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag];

                    setSearchParams({ t: stringToBase64(newTags.join(',')) });
                  }}
                />
              ))}
            </FilterOptionGroup>
          </div>

          <div>
            <h4>Projects</h4>
            <div className="flex flex-col gap-4 my-4">
              {Array.from({ length: Math.min(4, projects.length) }).map(
                (_, i) => (
                  <SearchCard
                    key={i}
                    item={{
                      ...projects[i],
                      route: `/project/${projects[i].slug}`,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        <div>
          <h4>Blog</h4>
          <div className="flex flex-col gap-4">
            <SearchCard
              item={{
                route: '/blog',
                title:
                  'Review the Captcha Challenge in Leisure Link e-Services System(康體通)',
              }}
            />
          </div>
        </div>
      </SubNavigation>
      <PageContainer className="grow p-4">
        <TopProjects projects={projects} />
        <Carousel>
          {Array.from({
            length:
              projects.length < cols
                ? projects.length
                : Math.ceil(projects.length / cols),
          }).map((_, i) => {
            return (
              <CarouselItem key={projects[i].slug}>
                {Array.from({
                  length: Math.min(cols, projects.length - i * cols),
                }).map((_, j) => {
                  const index = Math.min(i * cols + j, projects.length - 1);
                  return (
                    <ProjectCard
                      key={projects[index].slug + j}
                      project={projects[index]}
                    />
                  );
                })}
              </CarouselItem>
            );
          })}
        </Carousel>
      </PageContainer>
    </div>
  );
};

export default Project;
