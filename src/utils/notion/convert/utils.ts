import { NotionText } from '@/types/notion/data';

export const extractText = (rich_text: NotionText[]) =>
  rich_text.map((obj) => obj.text.content).join('\n');
export const extractTextWithStyle = (rich_text: NotionText[]) => {
  return rich_text
    .map((obj) => {
      if (obj.type !== 'text') return;
      return {
        text: {
          content: obj.text.content,
          link: obj.text.link,
        },
        annotations: obj.annotations,
      };
    })
    .filter((obj) => obj);
};
