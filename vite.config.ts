import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  root: 'client',
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'client/src/app'),
      '@pages': path.resolve(__dirname, 'client/src/pages'),
      '@features': path.resolve(__dirname, 'client/src/features'),
      '@shared': path.resolve(__dirname, 'client/src/shared'),
      '@entities': path.resolve(__dirname, 'client/src/entities'),
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'client-dist'),
    emptyOutDir: true,
  },
});
