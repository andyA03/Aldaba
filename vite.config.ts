import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  root: 'client',
  plugins: [react()],
  resolve: {
    alias: {
      '@constants': path.resolve(__dirname, 'constants'),
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
