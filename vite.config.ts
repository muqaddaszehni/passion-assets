import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is the repo subpath for GitHub Pages in production builds,
// and root ("/") for local `npm run dev`.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/passion-assets/' : '/',
  plugins: [react()],
}))
