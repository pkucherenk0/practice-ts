// Legacy file, kept on purpose: no page objects, no fixtures, everything inline.
// Raw exploratory-script style, for contrast with structured specs elsewhere in tests/ui/.
import { test, expect } from '@playwright/test';

test('logs in and browses inventory', { tag: '@regression' }, async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('Swag Labs').click();
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-0-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-1-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-5-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-2-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-3-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await page.getByRole('button', { name: 'Close Menu' }).click();
  // Sort products low-to-high by price.
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.locator('[data-test="inventory-list"]').click();

  // Arm the popup listener BEFORE the click that triggers it, await after —
  // awaiting too early deadlocks waiting for a popup that can't open yet.
  const popupPromise = page.waitForEvent('popup');
  await page.locator('[data-test="social-linkedin"]').click();
  const page1 = await popupPromise;

  await page1.getByRole('button', { name: 'Dismiss' }).click();
  await page1.close();
});
