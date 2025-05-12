import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Chemin relatif pour GitHub Pages
  resolve: {
    alias: {
      // Créer des alias pour faciliter les imports
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    // Optimisations pour GitHub Pages
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          // Séparation des chunks pour de meilleures performances
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom']
        }
      }
    }
  }
})