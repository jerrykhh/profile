export type ContentKind = "blog" | "project";

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  external: boolean;
  externalUrl?: string;
  repository?: string;
  language?: string;
  name?: string;
};

export type ContentItem = ContentMeta & {
  kind: ContentKind;
  body: string;
  href: string;
};
