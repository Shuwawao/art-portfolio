
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use the repository path on GitHub Pages and the root path on Vercel.
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL
    ? '/'
    : '/art-portfolio/',
  server: {
    port: 3000,
    open: false,
    host: true
  }
});