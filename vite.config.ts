import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/wp-api': {
        target: 'https://sleigh.staymedia.ng/wp-json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-api/, '')
      },
      '/wp-content': {
        target: 'https://sleigh.staymedia.ng/wp-content',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-content/, '')
      }
    }
  }
});
