import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5176,    
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_API_URL}` ,
        changeOrigin: true,
        secure: false,
        ws: false
      }
    }
  },
  plugins: [react()],
})
