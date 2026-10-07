import { test, expect } from '../../fixtures/fixtures';
import { parseCurrency } from '../../utils/currency';

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
    expect(parseCurrency(firstPrice)).toBeLessThanOrEqual(parseCurrency(secondPrice));
  },
);
