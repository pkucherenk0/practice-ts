import { test, expect } from '../../fixtures/fixtures';
import { LoginPage } from '../../pages/login.page';

// Start unauthenticated instead of inheriting the global logged-in session.
test.use({ storageState: { cookies: [], origins: [] } });

test('logs in as standard_user', { tag: ['@regression', '@ui'] }, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('open login page', async () => {
    await loginPage.open();
  });

  await test.step('log in with valid credentials', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('land on the inventory page', async () => {
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });
});
