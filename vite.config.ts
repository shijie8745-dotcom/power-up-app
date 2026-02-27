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
        manualChunks: undefined // 禁用代码分割
      }
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'styled-components']
  }
})
