import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': '/src',
    },
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/@kite-ui/react/**'],
    },
  },
  optimizeDeps: {
    exclude: ['@kite-ui/react'],
  },
})
