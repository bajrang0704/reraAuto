import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled', '@mui/icons-material'],
          utils: ['axios', '@tanstack/react-query', 'react-router-dom', 'react-hook-form'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: Increase limit if splitting isn't enough, but splitting is better
  },
})
