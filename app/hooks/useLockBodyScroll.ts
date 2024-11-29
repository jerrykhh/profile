import { useEffect, useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {};

export const useLockBodyScroll = () => {
  const isLocked = useRef(false);
  const { body } = safeDocument as Document;
  const html = (safeDocument as Document).documentElement;

  const blockScroll = () => {
    if (!body || !body.style || isLocked.current) return;
    if (html) {
      html.style.position = 'relative';
      html.style.overflow = 'hidden';
    }

    body.style.position = 'relative';
    body.style.overflow = 'hidden';

    isLocked.current = true;
  };

  const allowScroll = () => {
    if (!body || !body.style || !isLocked.current) return;

    if (html) {
      html.style.position = '';
      html.style.overflow = '';
    }

    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    isLocked.current = false;
  };

  useEffect(() => {
    return () => {
      isLocked.current && allowScroll();
    };
  }, []);

  return { blockScroll, allowScroll };
};
