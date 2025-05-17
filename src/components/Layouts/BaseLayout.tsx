import { Footer } from '../Footer';
import { NavHeader } from '../NavHeader';

type BaseLayoutParams = {
  children: React.ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutParams) => {
  return (
    <div className="w-full mx-auto min-h-screen max-w-3xl flex flex-col gap-2">
      <div className="md:py-4 px-3">
        <div className="py-4">
          <NavHeader />
        </div>
        {children}
        <div className="mt-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};
