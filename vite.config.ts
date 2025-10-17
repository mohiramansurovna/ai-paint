import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use BASE_PATH env (set in CI) to correctly serve under /<repo>/ on GitHub Pages
const base = import.meta.env.BASE_PATH || '/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
