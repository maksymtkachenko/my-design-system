import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  use: { channel: 'chrome', baseURL: 'http://127.0.0.1:4173', viewport: { width: 1200, height: 1100 } },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview apps/docs --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
  },
});
