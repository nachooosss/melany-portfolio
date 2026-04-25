import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Force pre-bundling para evitar corrupción de cache de Vite
    // (los subpaths /react de Vercel a veces confunden al optimizador lazy)
    include: ['@vercel/analytics/react'],
  },
})
