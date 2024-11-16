import { cn } from '@/lib/utils';
import { Profile } from '@/types/profile';

import { ProfileContent } from './ProfileContent';
import ProfileSocial from './ProfileSocial';

const ProfileCard = ({ about }: { about: Profile }) => {
  return (
    <div className={cn('flex flex-col md:gap-8', 'md:flex-row')}>
      <div className="w-full max-w-md self-center md:self-start">
        <ProfileSocial image={about.image} socials={about.socials} />
      </div>
      <ProfileContent
        welcomeHeading={about.welcomeHeading}
        description={about.description}
        todo={about.todo}
      />
    </div>
  );
};

export default ProfileCard;
