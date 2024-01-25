import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/movie': 'https://genre-challenge-demo-dvijshjgk-nt5k.vercel.app'
    }
  },
  plugins: [react()],
})
