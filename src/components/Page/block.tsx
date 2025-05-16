import { PageCode } from '@/components/Page/Code';
import { PageHeading2, PageHeading3 } from '@/components/Page/Heading';
import { PageParagraph } from '@/components/Page/Paragraph';
import { NotionBlock } from '@/types/notion/converted';

import { PageImage } from './Image';
import { PageNumberedListItem } from './NumberedListItem';
import { PageVideo } from './Video';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockToComponentMapping: Record<string, (data: any) => JSX.Element> = {
  paragraph: PageParagraph,
  heading_2: PageHeading2,
  heading_3: PageHeading3,
  code: PageCode,
  video: PageVideo,
  image: PageImage,
  numbered_list_item: PageNumberedListItem,
} as const;

export const blockWrapper = (blocks: NotionBlock[]) => {
  const elements: React.ReactNode[] = [];
  let tmpNumberedListItem: React.ReactNode[] = [];

  const filteredBlocks = blocks.filter((block) => block);

  for (let i = 0; i < filteredBlocks.length; i++) {
    const block = filteredBlocks[i];
    const Component = blockToComponentMapping[block.type];
    if (!Component) continue;

    if (block.type === 'numbered_list_item') {
      const renderComponent = <Component key={i} data={block.data} />;
      tmpNumberedListItem.push(renderComponent);
    } else {
      // If there are accumulated numbered items, flush them into a ul
      if (tmpNumberedListItem.length > 0) {
        elements.push(
          <ol className="list-decimal list-inside" key={`numbered-${i}`}>
            {tmpNumberedListItem}
          </ol>
        );
        tmpNumberedListItem = [];
      }
      // Add the current component
      elements.push(<Component key={i} data={block.data} />);
    }
  }

  // After processing all blocks, check if there are remaining numbered items
  if (tmpNumberedListItem.length > 0) {
    elements.push(<ul key="numbered-end">{tmpNumberedListItem}</ul>);
  }

  return elements;
};
