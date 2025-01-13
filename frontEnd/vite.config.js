import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Store-System/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/src/main.jsx',
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});