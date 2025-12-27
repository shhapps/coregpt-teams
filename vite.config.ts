import { readFileSync } from 'fs'
import path, { resolve } from 'path'

import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(async ({ mode }) => {
  const isDev = mode === 'development'

  const sentryViteConfig = sentryVitePlugin({
    authToken: process.env.SENTRY_AUTH_TOKEN,
    org: 'shhapps-limited-liability-comp',
    project: 'teams-app',
    telemetry: false,
    debug: isDev,
    silent: isDev
  })

  return {
    plugins: [react(), sentryViteConfig],
    base: '/tabs/home/',
    server: {
      port: 5173,
      strictPort: true,
      https: {
        key: readFileSync(resolve(__dirname, './certs/server.key')),
        cert: readFileSync(resolve(__dirname, './certs/server.crt'))
      },
      proxy: {
        '/': {
          target: 'https://localhost:3001',
          changeOrigin: true,
          secure: false
        }
      }
    },
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
