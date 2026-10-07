// Runs once before chromium/firefox/webkit/mobile-* projects (see the `setup`
// project + `dependencies` in playwright.config.ts). Logs in through the UI once
// and saves the session, so individual tests skip the login flow entirely.
import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

const authFile = 'playwright/.auth/user.json';

// This is a login/session-setup step, not a behavioral test — no expect() needed.
// eslint-disable-next-line playwright/expect-expect
setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: authFile });
});
