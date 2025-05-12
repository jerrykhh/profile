import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';

import { listBlogs } from '@/services/blog';
import { getMe } from '@/services/me';
import { convertNotionPropertiesToData } from '@/utils/notion/convert';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { NOTION_API_TOKEN: notionAPIToken } = context.cloudflare.env;
  const [me, blogs] = await Promise.all([
    getMe({
      authToken: notionAPIToken,
    }).then(async (data) => await convertNotionPropertiesToData(data)),
    listBlogs({
      authToken: notionAPIToken,
    }).then(
      async (data) =>
        await Promise.all(data.map((d) => convertNotionPropertiesToData(d)))
    ),
  ]);

  // console.log('converted', convertNotionPropertiesToData(data));
  return {
    me,
    blogs,
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return <div></div>;
}
