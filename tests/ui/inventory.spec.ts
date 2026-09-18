// Test name is the free-text first argument to test(...). Tags passed as
// { tag: '@name' } option, filtered at run time via --grep.
import { test, expect } from '../../fixtures/fixtures';

test(
  'shows all six inventory item images',
  { tag: ['@regression', '@smoke', '@ui'] },
  async ({ inventoryPage }) => {
    // Check all 6 inventory item images render, one by one.
    for (let index = 0; index < 6; index++) {
      await expect(inventoryPage.itemImage(index)).toBeVisible();
    }
  },
);

test(
  'adds and removes items from the cart',
  { tag: ['@regression', '@ui'] },
  async ({ inventoryPage }) => {
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge()).toHaveText('2');
    await inventoryPage.removeFromCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge()).toHaveText('1');
  },
);
