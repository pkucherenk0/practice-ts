import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async removeFromCart(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  itemName(index: number): Locator {
    return this.page.locator(`[data-test="item-${index}-title-link"]`);
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
