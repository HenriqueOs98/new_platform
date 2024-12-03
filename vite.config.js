import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          codemirror: [
            'codemirror',
            '@codemirror/lang-javascript',
            '@codemirror/lang-html',
            '@codemirror/lang-css',
            '@codemirror/theme-one-dark'
          ]
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'codemirror',
      '@codemirror/lang-javascript',
      '@codemirror/lang-html',
      '@codemirror/lang-css',
      '@codemirror/theme-one-dark'
    ]
  }
});