import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { PageContainer } from '@/components/Page';
import { blockWrapper } from '@/components/Page/block';
import { getBlog } from '@/services/content/blog';
import { Blog } from '@/types/blog';
import {
  convertNotionBlockToData,
  convertNotionObjectToData,
} from '@/utils/notion/convert';

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { blogId } = params;
  if (!blogId) return;
  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;

  return await getBlog({
    id: blogId,
    authToken: notionAPIToken,
  }).then(async (data) => {
    const converted = await Promise.all([
      convertNotionObjectToData<Blog>(data.properties),
      convertNotionBlockToData(data.content),
    ]);
    return {
      properties: converted[0],
      content: converted[1],
    };
  });
};

const BlogDetailPage = () => {
  const { properties, content } = useLoaderData<typeof loader>();
  const pageContent = blockWrapper(content);
  console.log('content', content);
  return (
    <PageContainer
      title={properties.title}
      createdAt={properties.createdAt.start}
      tags={properties.tags}
      notionBlocks={content}
    >
      {pageContent}
    </PageContainer>
  );
};

export default BlogDetailPage;
