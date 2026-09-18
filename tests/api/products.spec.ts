// The for-loop below generates 3 separate, individually-reportable tests
// (one per product ID) while the file loads, before the runner starts executing.
import { test, expect } from '../../fixtures/fixtures';
import { ProductsApiClient } from '../../api/productsClient';
import { Product } from '../../api/types';

test('returns all products as a list', { tag: ['@regression', '@api'] }, async ({ request }) => {
  const client = new ProductsApiClient(request);
  const response = await client.getAllProducts();

  // response.status() is a method call; .json() is async and must be awaited —
  // forgetting await silently compares an unresolved Promise, never the real value.
  expect(response.status()).toBe(200);
  expect(Array.isArray(await response.json())).toBe(true);
});

const productIds = [1, 2, 3];

for (const productId of productIds) {
  test(
    `returns product ${productId} with title and price`,
    { tag: ['@regression', '@api'] },
    async ({ request }) => {
      const client = new ProductsApiClient(request);
      const response = await client.getProduct(productId);
      const body = (await response.json()) as Product;

      expect(response.status()).toBe(200);
      expect(body.id).toBe(productId);
      expect(body).toHaveProperty('title');
      expect(body).toHaveProperty('price');
      expect(typeof body.price).toBe('number');
    },
  );
}
