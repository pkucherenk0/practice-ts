import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addToCart(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productSlug}"]`).click();
  }

  async removeFromCart(productSlug: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug}"]`).click();
  }

  // Building a Locator is instant, no await needed — only actions on it (.click(),
  // .fill(), expect(...)) are async.
  itemImage(index: number): Locator {
    return this.page.locator(`[data-test="item-${index}-img-link"]`);
  }

  async goToCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }
}
