import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openProduct(id: number): Promise<void> {
    await this.page.goto(`/inventory-item.html?id=${id}`);
  }

  title(): Locator {
    return this.page.locator('[data-test="inventory-item-name"]');
  }

  description(): Locator {
    return this.page.locator('[data-test="inventory-item-desc"]');
  }

  price(): Locator {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  image(slug: string): Locator {
    return this.page.locator(`[data-test="item-${slug}-img"]`);
  }

  async addToCart(): Promise<void> {
    await this.page.locator('[data-test="add-to-cart"]').click();
  }

  async removeFromCart(): Promise<void> {
    await this.page.locator('[data-test="remove"]').click();
  }

  async backToProducts(): Promise<void> {
    await this.page.locator('[data-test="back-to-products"]').click();
  }
}
