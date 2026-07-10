import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const apiTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:4001';

  return {
  server: {
    host: "::",
    port: 3000,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
  ],
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
  };
});
