import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: 'http://localhost:3100',
  },
  webServer: {
    command: 'bun dev --port 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: true,
  },
})
