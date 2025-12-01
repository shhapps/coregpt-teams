import path, { resolve } from 'path'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(async ({ mode }) => {
  const isDev = mode === 'development'

  const sentryViteConfig = sentryVitePlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: 'shhapps-limited-liability-comp',
    project: 'outlook',
    telemetry: false,
    debug: isDev,
    silent: isDev
  })

  return {
    plugins: [react(), sentryViteConfig],
    base: '/tabs/home/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      outDir: './dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      }
    }
  }
})
