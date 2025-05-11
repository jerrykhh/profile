import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';

import { getMe } from '@/services/me';
import { convertNotionPropertiesToData } from '@/utils/notion/convert';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const data = await getMe({
    authToken: context.cloudflare.env.NOTION_API_TOKEN,
  });

  console.log('Data', data);

  console.log('converted', convertNotionPropertiesToData(data));
  return data;
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
