import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import { siteMeta } from './src/data/siteMeta'

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Fills index.html's `%SITE_*%` placeholders from src/data/siteMeta.ts, the one
 * copy of the landing head that useDocumentMeta also restores on "/".
 */
function siteMetaPlugin(): Plugin {
  const values: Record<string, string> = {
    SITE_TITLE: siteMeta.title,
    SITE_DESCRIPTION: siteMeta.description,
    SITE_CANONICAL: siteMeta.canonical,
    SITE_ROBOTS: siteMeta.robots,
    SITE_OG_TITLE: siteMeta.ogTitle,
    SITE_OG_DESCRIPTION: siteMeta.ogDescription,
  }
  return {
    name: 'trendev-site-meta',
    transformIndexHtml(html) {
      return html.replace(/%(SITE_[A-Z_]+)%/g, (match, key: string) => {
        if (!(key in values)) throw new Error(`index.html: unknown ${match}`)
        return escapeHtml(values[key])
      })
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), siteMetaPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
})
