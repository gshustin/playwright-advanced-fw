
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { SecurePage } from '../../pages/SecurePage';
import { loadEnv } from '../../utils/config';
import { allure } from 'allure-playwright';

const cfg = loadEnv();

test.describe('UI: Login (composition, state reuse)', () => {
  test('User can login and see Secure Area', async ({ page }) => {
    
    await allure.label('feature', 'UI');
    
    const login = new LoginPage(page);
    const secure = new SecurePage(page);

    await login.open();
    await login.login(cfg.USERNAME, cfg.PASSWORD);
    await expect(await secure.headerText()).toContain('Secure Area');
  });

  
});
