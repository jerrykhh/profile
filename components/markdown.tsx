import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-[family-name:var(--font-display)] prose-a:text-[#ff488b] prose-img:rounded-2xl prose-pre:rounded-2xl prose-pre:bg-[#1b0e17]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
