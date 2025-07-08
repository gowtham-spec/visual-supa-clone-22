
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for external libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI components chunk
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          // Three.js and related 3D libraries
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          // Icons chunk
          icons: ['lucide-react'],
          // Charts chunk
          charts: ['recharts'],
        }
      }
    },
    // Use esbuild for minification instead of terser to avoid dependency issues
    minify: 'esbuild',
    // Target modern browsers for better optimization
    target: 'es2020',
    // Enable source maps for debugging in development
    sourcemap: mode === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog'
    ],
    exclude: ['three', '@react-three/fiber', '@react-three/drei']
  },
}));
