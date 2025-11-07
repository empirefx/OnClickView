import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'OnClickView',
      fileName: (format) => `onclickview.${format}.js`
    },
    rollupOptions: {
      // Externalize any dependencies that shouldn't be bundled
      external: []
    }
  }
});
