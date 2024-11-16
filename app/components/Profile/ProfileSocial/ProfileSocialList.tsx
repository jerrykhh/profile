import { Link } from '@remix-run/react';

import { MappedSocial } from '@/types/profile/social';

const ProfileSocialList = ({ items }: { items: MappedSocial[] }) => {
  return (
    <ul className="list-none list-inside px-4 ">
      {items.map((item) => (
        <li key={item.key}>
          <Link to={item.url} target="_blank" rel="noreferrer">
            <div className="flex items-center gap-4 text-secondary-foreground hover:text-primary-foreground transition-colors">
              <item.icon className="w-5 h-5" />
              {item.username ?? item.url}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfileSocialList;
