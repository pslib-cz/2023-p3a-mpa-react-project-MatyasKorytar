import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2023-p3a-mpa-react-project-MatyasKorytar/',
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
