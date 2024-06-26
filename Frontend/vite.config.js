import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://social-app-latest-4.onrender.com'
    }
  },
  plugins: [react()],
})
