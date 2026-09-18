import { test, expect } from '../../fixtures/fixtures';

test(
  'navigates the menu and sorts inventory by price',
  { tag: ['@regression', '@ui'] },
  async ({ inventoryPage }) => {
    await inventoryPage.openMenu();
    await inventoryPage.goToAllItems();
    await inventoryPage.closeMenu();

    await inventoryPage.sortByPriceLowToHigh();
    const firstPrice = await inventoryPage.itemPrice(0).innerText();
    const secondPrice = await inventoryPage.itemPrice(1).innerText();
    expect(parseFloat(firstPrice.replace('$', ''))).toBeLessThanOrEqual(
      parseFloat(secondPrice.replace('$', '')),
    );
  },
);
