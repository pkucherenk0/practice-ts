import { test, expect } from '../../fixtures/fixtures';
import { parseCurrency } from '../../utils/currency';
import { products } from '../../utils/products';

for (const product of products) {
  test(
    `shows correct details for ${product.name}`,
    { tag: ['@regression', '@ui'] },
    async ({ productDetailPage }) => {
      await test.step('open product page', async () => {
        await productDetailPage.openProduct(product.id);
      });

      await test.step('verify details', async () => {
        await expect(productDetailPage.title()).toHaveText(product.name);
        await expect(productDetailPage.description()).toHaveText(product.description);
        await expect
          .poll(() =>
            productDetailPage
              .image(product.slug)
              .evaluate((img: HTMLImageElement) => img.naturalWidth),
          )
          .toBeGreaterThan(0);
        const priceText = await productDetailPage.price().textContent();
        expect(parseCurrency(priceText ?? '')).toBe(product.price);
      });
    },
  );
}
