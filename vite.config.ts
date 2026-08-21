import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Percorso relativo: funziona sia in locale (npm run dev) sia pubblicato
  // su GitHub Pages sotto qualsiasi nome di repository (username.github.io/nome-repo/),
  // senza dover hardcodare il nome del repo qui.
  base: "./",
  plugins: [react()],
})
