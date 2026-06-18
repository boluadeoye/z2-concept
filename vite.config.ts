import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/wp-api': {
        target: 'https://sleigh.staymedia.ng/wp-json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-api/, ''),
      }
    }
  }
});
