import { vitePlugin as remix } from '@remix-run/dev';
import { createRoutesFromFolders } from '@remix-run/v1-route-convention';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';
declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
    compression({ algorithm: 'gzip', ext: '.gz' }),
    compression({
      verbose: true,
      disable: false,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    remix({
      ignoredRouteFiles: ['**/.*'],
      routes(defineRoutes) {
        return createRoutesFromFolders(defineRoutes);
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
