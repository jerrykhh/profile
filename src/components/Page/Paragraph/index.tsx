import { Link } from '@remix-run/react';

import { NotionTextStyled } from '@/types/notion/converted';

type PageParagraphProps = {
  data: NotionTextStyled[];
};

export const PageParagraph = ({ data }: PageParagraphProps) => {
  console.log('dataasdfasdsa', data);
  const renderTextSegment = (segment: (typeof data)[number], index: number) => {
    let content: React.ReactNode = segment.text.content;

    // Apply text decorations first
    if (segment.annotations.code) {
      content = (
        <code className="bg-neutral-800 p-1 rounded font-mono text-sm">
          {content}
        </code>
      );
    }

    if (segment.annotations.bold) {
      content = <strong>{content}</strong>;
    }

    if (segment.annotations.italic) {
      content = <em>{content}</em>;
    }

    if (segment.annotations.strikethrough) {
      content = <s>{content}</s>;
    }

    if (segment.annotations.underline) {
      content = <u>{content}</u>;
    }

    // Handle links last
    if (segment.text.link) {
      content = (
        <Link
          to={segment.text.link}
          className="underline-offset-8 text-neutral-400 hover:text-white underline decoration-dashed"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </Link>
      );
    }

    // Apply color
    const colorStyle =
      segment.annotations.color !== 'default'
        ? { color: segment.annotations.color }
        : undefined;

    return (
      <span key={index} style={colorStyle} className="whitespace-pre-wrap">
        {content}
      </span>
    );
  };

  return <span>{data.map(renderTextSegment)}</span>;
};
