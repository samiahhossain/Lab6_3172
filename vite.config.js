/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Vite to the local API server for calls to '/api'
      '/api': 'http://localhost:3000',
      // Also proxy Netlify function-style paths to the same local API server
      // so requests like '/.netlify/functions/api?route=weather' reach our local server.
      '/.netlify/functions': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ''),
      },
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
