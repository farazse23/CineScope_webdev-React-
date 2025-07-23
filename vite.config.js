import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CineScope_webdev-React-/',
  css: {
    postcss: './postcss.config.js',
  },
})
