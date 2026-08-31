import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Base is relative so the build works from any subpath (GitHub Pages
// project sites live at https://<user>.github.io/<repo>/) without having
// to know the repository name at build time.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Inercia',
        short_name: 'Inercia',
        lang: 'es',
        description:
          'Construye un hábito a la vez, con seguimiento flexible y sin gamificación.',
        theme_color: '#0b0f14',
        background_color: '#fafaf9',
        display: 'standalone',
        orientation: 'portrait',
        // Relative to the manifest's own URL, so this resolves correctly
        // whatever subpath the app is deployed under (e.g. GitHub Pages
        // project sites at /<repo>/).
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the whole app shell so it works fully offline — there's
        // no backend, everything lives in localStorage already.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
      },
    }),
  ],
  base: './',
})
