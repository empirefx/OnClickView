import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  return {
    base: isDev ? '/' : '/OnClickView/',
    build: {
      outDir: 'dist',
      lib: !isDev ? {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'OnClickView',
        fileName: (format) => `onclickview.${format}.js`
      } : undefined,
      rollupOptions: {
        // Externalize any dependencies that shouldn't be bundled
        external: []
      },
      emptyOutDir: !isDev
    },
    server: {
      port: 3000,
      open: true
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  };
});
