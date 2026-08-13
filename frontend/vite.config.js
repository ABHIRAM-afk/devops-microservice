import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request to /api/* in the frontend is forwarded to the Spring Boot
      // backend running on localhost:8080, with the "/api" prefix stripped.
      // e.g. GET /api/employees  ->  GET http://localhost:8080/employees
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
