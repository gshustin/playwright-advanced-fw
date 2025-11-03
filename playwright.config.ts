import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from './utils/config';

const cfg = loadEnv();

export default defineConfig({
  timeout: 30_000,
  retries: 1,
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['junit', { outputFile: 'test-results/results.xml' }] // ← добавлено для Jenkins
  ],
  use: {
    baseURL: cfg.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', testDir: './tests/ui', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  testDir: './tests/ui', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   testDir: './tests/ui', use: { ...devices['Desktop Safari'] } },
    { name: 'api',      testDir: './tests/api', use: {} }
  ],
  globalSetup: './tests/setup/global.setup.ts',
  globalTeardown: './tests/setup/global.teardown.ts'
});