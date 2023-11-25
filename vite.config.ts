import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://hiba-mohamed.github.io/NAS-Full-Stack-App/',
  optimizeDeps: {
    include: ['*.ts', '*.d.ts', '*.tsx', '*.js', '*.jsx'],
  },
})

