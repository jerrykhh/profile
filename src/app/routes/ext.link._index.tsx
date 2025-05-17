import { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import profileImage from 'public/static/icon.jpg';

import { EmailIcon } from '@/components/Icons/EmailIcon';
import GithubIcon from '@/components/Icons/GithubIcon';
import { LinkedInIcon } from '@/components/Icons/LinkedInIcon';
import { YoutubeIcon } from '@/components/Icons/YoutubeIcon';
import { generateDefaultMetadata } from '@/constants/metadata';

export const meta: MetaFunction = () => {
  return generateDefaultMetadata('Contact', '/ext/link');
};

const ExtLinkPage = () => {
  const externalUrls = [
    {
      username: 'jerrykhh',
      component: GithubIcon,
      to: 'https://github.com/jerrykhh',
    },
    {
      username: 'jerrykhh',
      component: LinkedInIcon,
      to: 'https://github.com/jerrykhh',
    },
    {
      username: 'jerrykwok.khh@gmail.com',
      component: EmailIcon,
      to: 'mailto:jerrykwok.khh@gmail.com',
    },
    {
      username: '@jerry_kwok',
      component: YoutubeIcon,
      to: 'https://www.youtube.com/@jerry_kwok',
    },
  ];

  return (
    <div className="flex justify-center py-32">
      <div className="flex flex-col gap-5 w-92">
        <div className=" ">
          <img src={profileImage} alt="profile icon" className="rounded" />
        </div>
        <div className="grow">
          <div className="flex flex-col">
            <p>
              Hey there! my little corner of the internet. When I’m not busy,
              you’ll find me sharing insights, inspirations, and maybe a meme or
              two. Drop by my socials—let’s chat!
            </p>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          {externalUrls.map((item, i) => {
            return (
              <Link key={i} to={item.to} target="_blank" rel="noreferrer">
                <item.component className="w-8 h-8 text-neutral-400 hover:text-neutral-200 transition-colors duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExtLinkPage;
