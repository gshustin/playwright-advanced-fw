import { chromium } from '@playwright/test';
import { loadEnv } from '../utils/config';

export default async function authSetup() {
  const cfg = loadEnv();
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${cfg.BASE_URL}/login`);
  await page.fill('#username', cfg.USERNAME);
  await page.fill('#password', cfg.PASSWORD);
  await page.click("button[type='submit']");

  await page.context().storageState({ path: 'auth/state.json' });
  await browser.close();
}