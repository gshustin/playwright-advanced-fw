import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from './utils/config';

const cfg = loadEnv();

export default defineConfig({
  timeout: 30_000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: cfg.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    // Если хочешь запускать тесты с уже сохранённым логином —
    // раскомментируй строку ниже
    // storageState: 'auth/state.json'
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      testDir: './tests/ui',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      testDir: './tests/ui',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {}
    }
  ],
  globalSetup: './tests/setup/global.setup.ts',
  globalTeardown: './tests/setup/global.teardown.ts'
});