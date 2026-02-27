import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/power-up-app/',
  build: {
    target: 'es2015',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion-vendor': ['framer-motion']
        }
      }
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'styled-components']
  }
})
