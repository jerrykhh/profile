/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
import type { AppLoadContext as OriginalAppLoadContext } from '@remix-run/server-runtime';

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext extends OriginalAppLoadContext {
    cloudflare: {
      env: {
        NOTION_API_BASE_URL: string;
        NOTION_API_TOKEN: string; // secret
      };
    };
  }
}
