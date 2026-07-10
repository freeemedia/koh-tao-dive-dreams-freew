import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }

          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }

          if (id.includes('node_modules/@tiptap')) {
            return 'vendor-editor';
          }

          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-ui';
          }

          if (id.includes('node_modules/recharts') || id.includes('node_modules/date-fns') || id.includes('node_modules/react-big-calendar')) {
            return 'vendor-charts';
          }
        },
      },
    },
  },
}));
