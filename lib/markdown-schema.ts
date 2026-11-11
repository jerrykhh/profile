import { defaultSchema, type Schema } from "hast-util-sanitize";

/**
 * Allow safe HTML from Jerry’s markdown (div/img/flex layouts) plus YouTube iframes.
 * Scripts, event handlers, and non-YouTube iframe src are stripped.
 */
export const markdownSanitizeSchema: Schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "iframe", "figure", "figcaption", "video", "source"],
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), "className", "class", "style"],
    span: [...(defaultSchema.attributes?.span ?? []), "className", "class", "style"],
    img: [...(defaultSchema.attributes?.img ?? []), "className", "class", "width", "height", "loading"],
    a: [...(defaultSchema.attributes?.a ?? []), "className", "class", "target", "rel"],
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowFullScreen",
      "allowfullscreen",
      "frameBorder",
      "frameborder",
      "loading",
      "referrerPolicy",
      "referrerpolicy",
      "sandbox",
      "className",
      "class",
    ],
    figure: ["className", "class"],
    figcaption: ["className", "class"],
    video: ["src", "controls", "width", "height", "className", "class"],
    source: ["src", "type"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
  clobber: defaultSchema.clobber,
};

const YOUTUBE_SRC =
  /^(https?:)?\/\/((www|m)\.)?(youtube\.com|youtube-nocookie\.com)\/embed\/[A-Za-z0-9_-]+(\?[^"'\s]*)?$/i;

export function isAllowedYoutubeEmbed(src: string | undefined | null): boolean {
  if (!src) return false;
  return YOUTUBE_SRC.test(src.trim());
}
