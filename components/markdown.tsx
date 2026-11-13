import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { isAllowedYoutubeEmbed, markdownSanitizeSchema } from "@/lib/markdown-schema";
import { cn } from "@/lib/utils";

type MarkdownProps = {
  content: string;
  className?: string;
};

function YoutubeFrame({
  src,
  title,
  width,
  height,
  allow,
  className,
}: {
  src?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  allow?: string;
  className?: string;
}) {
  if (!isAllowedYoutubeEmbed(src)) return null;

  return (
    <iframe
      src={src}
      title={title || "YouTube video"}
      width={width}
      height={height}
      allow={
        allow ||
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      }
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
      className={cn("absolute inset-0 size-full border-0", className)}
    />
  );
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose prose-stone max-w-none dark:prose-invert",
        "prose-headings:font-[family-name:var(--font-display)] prose-headings:font-semibold",
        "prose-a:text-primary prose-img:rounded-2xl prose-pre:rounded-2xl",
        "prose-iframe:my-0",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeRaw], [rehypeSanitize, markdownSanitizeSchema]]}
        components={{
          iframe: ({ src, title, width, height, allow, className, ...rest }) => {
            void rest;
            // Author markdown already wraps embeds in `.iframe-container`; render the frame only.
            return (
              <YoutubeFrame
                src={typeof src === "string" ? src : undefined}
                title={typeof title === "string" ? title : undefined}
                width={width}
                height={height}
                allow={typeof allow === "string" ? allow : undefined}
                className={typeof className === "string" ? className : undefined}
              />
            );
          },
          div: ({ className, children, ...props }: ComponentPropsWithoutRef<"div">) => {
            const classes = typeof className === "string" ? className : "";
            const isIframeShell = classes.includes("iframe-container");
            return (
              <div
                {...props}
                className={cn(
                  classes,
                  isIframeShell && "iframe-container relative my-6 w-full overflow-hidden rounded-xl",
                )}
              >
                {children}
              </div>
            );
          },
          img: ({ src, alt, className, ...props }) => {
            if (!src || typeof src !== "string") return null;
            return (
              // Content images are author-controlled local/public paths or remote https (sanitized).
              // eslint-disable-next-line @next/next/no-img-element
              <img
                {...props}
                src={src}
                alt={typeof alt === "string" ? alt : ""}
                className={cn("h-auto max-w-full rounded-xl", className)}
                loading="lazy"
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
