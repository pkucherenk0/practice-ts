// Extended `test` object with custom fixtures. Every spec file must explicitly
// import { test, expect } from here instead of '@playwright/test' directly —
// no auto-discovery, imports show exactly which fixtures a spec has access to.
import { test as base, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { InventoryPage } from '../pages/inventory.page';
import { ProductDetailPage } from '../pages/productDetail.page';

// Shape of the fixture map: `inventoryPage` resolves to an InventoryPage instance.
interface Fixtures {
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
}

export const test = base.extend<Fixtures>({
  // Login already happened once in the `setup` project (see tests/setup/auth.setup.ts)
  // and is reused via storageState — this fixture just opens the inventory page.
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.open();
    await use(inventoryPage);
  },
  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  },
});

// Tags each result with its browser project so Allure treats chromium/firefox/
// webkit/mobile-chrome/mobile-safari runs of the same test as distinct history
// entries, not retries of one another (Allure's historyId ignores the project
// by default and collapses same-name cross-browser runs together otherwise).
// Playwright's beforeEach requires a fixtures object as the first param even when none are used.
// eslint-disable-next-line no-empty-pattern
test.beforeEach(async ({}, testInfo) => {
  await allure.parameter('Browser', testInfo.project.name);
});

export { expect };
