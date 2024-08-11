'use client';

import { useEffect, useState } from 'react';

import { BREAKPOINT } from '../constants/screen';
import { useWindowDimensions } from './useWindowDimensions';

export type DevicePlatform = 'Desktop' | 'Mobile' | 'Tablet';

export const useDevicePlatform = (): DevicePlatform | null => {
  const { width } = useWindowDimensions();

  const [devicePlatform, setDevicePlatform] = useState<DevicePlatform | null>(
    null
  );

  useEffect(() => {
    if (!width) return setDevicePlatform(null);
    if (width < BREAKPOINT.SM_MIN) return setDevicePlatform('Mobile');
    else if (width < BREAKPOINT.MD_MIN) return setDevicePlatform('Tablet');
    else return setDevicePlatform('Desktop');
  }, [width]);

  return devicePlatform;
};
