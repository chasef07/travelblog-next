import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL: 'http://localhost:3100',
  },
  webServer: {
    command: 'bun dev --port 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: true,
  },
})
