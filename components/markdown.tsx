import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-stone max-w-none dark:prose-invert prose-headings:font-[family-name:var(--font-display)] prose-a:text-primary prose-img:rounded-2xl prose-pre:rounded-2xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
