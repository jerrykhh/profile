import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import ProfileCard from '@/components/Profile/ProfileCard';
import TechStack from '@/components/Profile/TechStack';
import { getMe } from '@/services/me.serivce';

export const clientLoader: LoaderFunction = async () => {
  try {
    return getMe();
  } catch (error) {
    console.error('fail to get me', error);
  }
};

export const meta: MetaFunction<typeof clientLoader> = ({ data }) => {
  return [
    { title: `${data?.name} | Profile` },
    { name: 'description', content: data?.description },
  ];
};

export default function Index() {
  const me = useLoaderData<typeof clientLoader>();

  return (
    <div className="divide-y divide-solid">
      <ProfileCard about={me} />
      <div className="py-8">
        <TechStack items={me.techs} />
      </div>
    </div>
  );
}
