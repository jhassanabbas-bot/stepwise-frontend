import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/stepwise-frontend/',
  build: {
    outDir: 'dist',
  },
})