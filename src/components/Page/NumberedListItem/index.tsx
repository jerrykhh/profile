import { NotionTextStyled } from '@/types/notion/converted';

import { PageParagraph } from '../Paragraph';

type PageNumberedListItemParams = {
  data: NotionTextStyled[];
};

export const PageNumberedListItem = ({ data }: PageNumberedListItemParams) => {
  return (
    <li className="py-4">
      <PageParagraph data={data} />
    </li>
  );
};
