import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { BREAKPOINT } from '@/constants/screen';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export enum DevicePlatform {
  DESKTOP = 'Desktop',
  MOBILE = 'Mobile',
  TABLET = 'Tablet',
}

// Create a context for DevicePlatform
const DevicePlatformContext = createContext<DevicePlatform | null>(null);

export const DevicePlatformProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { width } = useWindowDimensions();
  const [devicePlatform, setDevicePlatform] = useState<DevicePlatform | null>(
    null
  );

  useEffect(() => {
    if (width === undefined) return setDevicePlatform(null);
    if ((width && width < BREAKPOINT.SM_MIN) || width === 0) {
      setDevicePlatform(DevicePlatform.MOBILE);
    } else if (width && width < BREAKPOINT.LG_MIN) {
      setDevicePlatform(DevicePlatform.TABLET);
    } else {
      setDevicePlatform(DevicePlatform.DESKTOP);
    }
  }, [width]);

  return (
    <DevicePlatformContext.Provider value={devicePlatform}>
      {children}
    </DevicePlatformContext.Provider>
  );
};

// Update useDevicePlatform to use context
const useDevicePlatform = (): DevicePlatform | null => {
  const context = useContext(DevicePlatformContext);
  if (context === undefined) {
    throw new Error(
      'useDevicePlatform must be used within a DevicePlatformProvider'
    );
  }
  return context;
};

export default useDevicePlatform;
