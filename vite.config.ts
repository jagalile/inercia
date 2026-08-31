import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base is relative so the build works from any subpath (GitHub Pages
// project sites live at https://<user>.github.io/<repo>/) without having
// to know the repository name at build time.
export default defineConfig({
  plugins: [react()],
  base: './',
})
