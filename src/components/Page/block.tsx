import { PageCode } from '@/components/Page/Code';
import { PageHeading2, PageHeading3 } from '@/components/Page/Heading';
import { PageParagraph } from '@/components/Page/Paragraph';
import { NotionBlock } from '@/types/notion/converted';

import { PageImage } from './Image';
import { PageVideo } from './Video';

const blockToComponentMapping: Record<
  string,
  ({ data }: { data: string }) => JSX.Element
> = {
  paragraph: PageParagraph,
  heading_2: PageHeading2,
  heading_3: PageHeading3,
  code: PageCode,
  video: PageVideo,
  image: PageImage,
} as const;

export const blockWrapper = (blocks: NotionBlock[]) => {
  return blocks
    .filter((block) => block)
    .map((block, i) => {
      const Component = blockToComponentMapping[block.type];
      if (!Component) return null;
      return <Component key={i} data={block.data} />;
    });
};
