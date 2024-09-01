import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { MARKDOWN_ROOT_DIR } from '@/constants/markdown';
import { IMarkdown } from '@/types/markdown';

export const getMarkdownFile = async <T extends IMarkdown>(
  filePath: string
) => {
  console.log(path.join(process.cwd(), MARKDOWN_ROOT_DIR, filePath));
  const file = await fs.readFile(
    path.join(process.cwd(), MARKDOWN_ROOT_DIR, filePath),
    'utf-8'
  );
  const { data: metadata, content } = matter(file);
  return { metadata, content } as T;
};

export const getMarkdownFiles = async <T extends IMarkdown>(
  dirPath: string
) => {
  const files = await fs.readdir(
    path.join(process.cwd(), MARKDOWN_ROOT_DIR, dirPath)
  );
  const markdownFiles = files.filter(
    (file) => file.endsWith('.md') || file.endsWith('.mdx')
  );
  const markdownFilesWithMetadata = await Promise.all(
    markdownFiles.map(async (file) => {
      return (await getMarkdownFile(path.join(dirPath, file))) as T;
    })
  );
  return markdownFilesWithMetadata;
};
