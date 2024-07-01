import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 5173,    
  //   proxy: {
  //     '/api': {
  //       target: `https://video-sharing-app-backend-fcv2.onrender.com` ,
  //       changeOrigin: true,
  //       secure: false,
  //       ws: false
  //     }
  //   }
  // },
  plugins: [react()],
})
