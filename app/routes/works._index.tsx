import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { ListFilterIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { SubNavigation, SubNavigationType } from '@/components/Navigation';
import { PageContainer } from '@/components/PageContrainer';
import { SearchCard } from '@/components/SearchCard';
import { FilterOption, FilterOptionGroup } from '@/components/SearchFilter';
import { WorkList } from '@/components/Work';
import useDevicePlatform, { DevicePlatform } from '@/contexts/DevicePlatform';
import { base64ToString, stringToBase64 } from '@/lib/converter';
import { cn } from '@/lib/utils';
import { type Blog } from '@/models/blog';
import { type Project } from '@/models/project';
import { type Work } from '@/models/work';
import { getBlogs } from '@/services/work.service/blog.service';
import { getProjects } from '@/services/work.service/project.service';

export const clientLoader: LoaderFunction = async () => {
  const projects = await getProjects({});
  const blogs = await getBlogs({});
  return { projects, blogs };
};

const Works = () => {
  const { projects, blogs }: { projects: Project[]; blogs: Blog[] } =
    useLoaderData<typeof clientLoader>();
  const works = [...projects, ...blogs] as Work[];

  // search params
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTags = searchParams.get('t')
    ? base64ToString(searchParams.get('t') ?? '').split(',')
    : [];
  const q = searchParams.get('q') ?? '';

  // work tags
  const workTags = useMemo(() => {
    const tags = works.map((work) => work.meta.tags).flat();
    const freqTags = {} as Record<string, number>;
    tags.forEach((tag) => {
      freqTags[tag] = (freqTags[tag] ?? 0) + 1;
    });
    return Object.keys(freqTags)
      .sort((a, b) => freqTags[b] - freqTags[a])
      .slice(0, 10);
  }, [works]);

  const cachebyTagToWorks = useMemo(() => {
    const cache = {} as Record<string, Work[]>;
    workTags.forEach((tag) => {
      cache[tag] = works.filter((work) => work.meta.tags.includes(tag));
    });
    return cache;
  }, [workTags]);

  const filteredWorks = useMemo(() => {
    if (!selectedTags.length && !q) return works;

    let worksByTags = works;

    if (selectedTags.length) {
      const tmpSelectedTagWorks = selectedTags.map(
        (tag) => cachebyTagToWorks[tag] || []
      );
      if (tmpSelectedTagWorks.length < 2) {
        worksByTags = tmpSelectedTagWorks.flat();
      } else {
        const [smallestGroup, ...otherGroups] = tmpSelectedTagWorks.sort(
          (a, b) => a.length - b.length
        );
        worksByTags = smallestGroup.filter((work) =>
          otherGroups.every((group) =>
            group.some((item) => item.slug === work.slug)
          )
        );
      }
    }

    if (q) {
      const query = q.toLowerCase();
      worksByTags = worksByTags.filter((work) =>
        work.meta.title.toLowerCase().includes(query)
      );
    }

    return worksByTags;
  }, [works, selectedTags, q]);

  const devicePlatform = useDevicePlatform();
  // const cols = {
  //   [DevicePlatform.MOBILE]: 2,
  //   [DevicePlatform.TABLET]: 3,
  //   [DevicePlatform.DESKTOP]: 3,
  // }[devicePlatform ?? DevicePlatform.DESKTOP];

  const isMobileOrTablet =
    devicePlatform === DevicePlatform.MOBILE ||
    devicePlatform === DevicePlatform.TABLET;
  const [mobileTableSubNavOpen, setMobileTableSubNavOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <SubNavigation
        type={SubNavigationType.FILTER}
        isOpen={mobileTableSubNavOpen}
        onClose={() => setMobileTableSubNavOpen(false)}
      >
        <div className="flex flex-col gap-4">
          <div className="search">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="search"
              value={q}
              maxLength={64}
              onChange={(e) => {
                setSearchParams((prev) => {
                  prev.set('q', e.target.value);
                  return prev;
                });
              }}
            />

            <FilterOptionGroup>
              {workTags.map((tag) => (
                <FilterOption
                  key={tag}
                  label={tag}
                  isChecked={selectedTags.includes(tag)}
                  onClick={() => {
                    const newTags = selectedTags.includes(tag)
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag];

                    setSearchParams((prev) => {
                      prev.set('t', stringToBase64(newTags.join(',')));
                      return prev;
                    });
                  }}
                />
              ))}
            </FilterOptionGroup>
          </div>

          <div>
            <h4>Projects:latest</h4>
            <div className="flex flex-col gap-4 my-4">
              {Array.from({ length: Math.min(4, projects.length) }).map(
                (_, i) => (
                  <SearchCard
                    key={i}
                    item={{
                      ...projects[i].meta,
                      route: `/works/project/${projects[i].slug}`,
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>

        <div>
          <h4>Blogs</h4>
          <div className="flex flex-col gap-4 mt-2">
            {blogs.map((blog) => (
              <SearchCard
                key={blog.slug}
                item={{ ...blog.meta, route: blog.getRoute() }}
              />
            ))}
          </div>
        </div>
      </SubNavigation>
      <PageContainer className="p-4 lg:content-include-sub-nav">
        <div
          className={cn(
            'flex flex-col gap-4',
            !isMobileOrTablet || mobileTableSubNavOpen ? 'hidden' : ''
          )}
        >
          <div className="text-right">
            <button
              className="p-2 rounded-md border border-muted-foreground"
              onClick={() => setMobileTableSubNavOpen(true)}
            >
              <ListFilterIcon className="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors duration-200" />
            </button>
          </div>
        </div>
        <div>
          <WorkList
            header={{
              title: 'Projects',
              description: 'Projects I have worked on',
            }}
            items={filteredWorks}
          />
        </div>

        {/* <TopProjects projects={projects} />
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
</Carousel> */}
      </PageContainer>
    </div>
  );
};

export default Works;
