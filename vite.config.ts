import mdx from '@mdx-js/rollup';
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    mdx(),
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('works', 'routes/works.$type._layout.tsx', () => {
            route('blog/:slug', 'routes/works.blog.$slug.tsx');
            route('project/:slug', 'routes/works.project.$slug.tsx');
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
