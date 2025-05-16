import { NotionBlock } from '@/types/notion/converted';
import { Tag } from '@/types/tag';

import { BackButton } from '../Button';
import { Tags } from '../Tags';
import { ExternalUrlButton } from './ExternalUrl';
import { TableOfContent } from './TableOfContent';

type PageContainerProps = {
  title: string;
  createdAt: string;
  tags?: Tag[];
  externalUrls?: string[];
  notionBlocks?: NotionBlock[];
  children: React.ReactNode;
};

export const PageContainer = ({
  title,
  createdAt,
  tags = [],
  externalUrls = [],
  notionBlocks = [],
  children,
}: PageContainerProps) => {
  return (
    <div className="py-8">
      <BackButton />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1>{title}</h1>
          <div className="flex justify-between xsOrSm:flex-col xsOrSm:gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-neutral-300">
                {new Date(createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </h4>
              {tags.length > 0 && (
                <div className="text-xs">
                  <Tags items={tags} />
                </div>
              )}
            </div>
            {externalUrls.map((url) => (
              <ExternalUrlButton key={url} url={url} />
            ))}
          </div>
        </div>
        <div className="py-3">
          <TableOfContent blocks={notionBlocks} />
        </div>
        <div className="py-8 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};
