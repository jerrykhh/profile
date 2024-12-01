import { Link, Outlet } from '@remix-run/react';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';

export function Layout() {
  return (
    <React.Fragment>
      <div className="min-h-screen">
        <div className="w-full p-4">
          <div className="flex flex-col gap-12 lg:max-w-5xl lg:mx-auto">
            <div className="w-full justify-start mt-4">
              <Link to="/works">
                <button className="hover:underline">
                  <div className="flex items-center gap-2">
                    <ArrowLeftIcon className="size-4" />
                    <span className="text-sm">back</span>
                  </div>
                </button>
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Layout;
