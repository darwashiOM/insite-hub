import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sentryVitePlugin } from '@sentry/vite-plugin'

const enableSentryUpload = Boolean(
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT
)

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: enableSentryUpload,
  },
  plugins: [
    react(),
    enableSentryUpload && sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        name: process.env.SENTRY_RELEASE,
        deploy: {
          env: process.env.SENTRY_ENVIRONMENT || 'production',
        },
      },
      sourcemaps: {
        filesToDeleteAfterUpload: ['dist/assets/**/*.map'],
      },
      telemetry: false,
    }),
  ].filter(Boolean),
})
