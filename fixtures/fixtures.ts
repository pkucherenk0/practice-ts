// Extended `test` object with custom fixtures. Every spec file must explicitly
// import { test, expect } from here instead of '@playwright/test' directly —
// no auto-discovery, imports show exactly which fixtures a spec has access to.
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

// Shape of the fixture map: `inventoryPage` resolves to an InventoryPage instance.
interface Fixtures {
  inventoryPage: InventoryPage;
}

export const test = base.extend<Fixtures>({
  // Fixture body: do setup, call await use(value) to hand it to the test.
  // Code after use() resolves would be teardown — none needed here.
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await use(new InventoryPage(page));
  },
});

export { expect };
