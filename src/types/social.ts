import type { NotionPropertyText } from './notion/database/property';

export type NotionContentSocialProperty = {
  'social.og.title': NotionPropertyText;
  'social.og.description': NotionPropertyText;
  'social.og.image': NotionPropertyText;
};
