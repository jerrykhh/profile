import { NotionText } from '@/types/notion/data';

export const extractText = (rich_text: NotionText[]) =>
  rich_text.map((obj) => obj.text.content).join('\n');
