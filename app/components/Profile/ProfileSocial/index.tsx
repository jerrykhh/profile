import { Profile } from '@/types/profile';

import ProfileSocialList from './ProfileSocialList';

type ProfileSocialProps = Pick<Profile, 'image' | 'socials'>;

const ProfileSocial = ({ image, socials }: ProfileSocialProps) => {
  return (
    <div className="flex flex-col gap-4">
      <img src={image} alt="Profile" className="max-w-full" />
      <ProfileSocialList items={socials} />
    </div>
  );
};

export default ProfileSocial;
