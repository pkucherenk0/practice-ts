// test.step(...) groups actions into named, collapsible steps in the HTML report
// and trace viewer — built into Playwright Test, no extra package needed.
import { test, expect } from '../../fixtures/fixtures';
import { CartPage } from '../../pages/cart.page';
import { CheckoutStepOnePage } from '../../pages/checkoutStepOne.page';
import { CheckoutStepTwoPage } from '../../pages/checkoutStepTwo.page';
import { CheckoutCompletePage } from '../../pages/checkoutComplete.page';
import { userInfo } from '../../factories/userFactory';

test(
  'completes checkout end to end for two cart items',
  { tag: ['@regression', '@ui'] },
  async ({ inventoryPage }) => {
    await test.step('Add items to cart', async () => {
      await inventoryPage.addToCart('sauce-labs-backpack');
      await inventoryPage.addToCart('sauce-labs-bike-light');
      await inventoryPage.goToCart();

      // Pass the raw Page (exposed as .page) into the next page object to hop
      // between pages of the checkout flow.
      const cartPage = new CartPage(inventoryPage.page);
      await expect(cartPage.itemName(4)).toBeVisible();
      await expect(cartPage.itemName(0)).toBeVisible();
      await cartPage.checkout();
    });

    await test.step('Fill checkout information', async () => {
      const checkoutStepOne = new CheckoutStepOnePage(inventoryPage.page);
      const customer = userInfo();
      // customer is a typed UserInfo object — a typo'd field fails to compile.
      await checkoutStepOne.fillInformation(
        customer.firstName,
        customer.lastName,
        customer.postcode,
      );
      await checkoutStepOne.continueToOverview();
    });

    await test.step('Complete checkout', async () => {
      const checkoutStepTwo = new CheckoutStepTwoPage(inventoryPage.page);
      await expect(checkoutStepTwo.totalLabel).toBeVisible();
      await checkoutStepTwo.finish();

      const checkoutComplete = new CheckoutCompletePage(inventoryPage.page);
      await expect(checkoutComplete.completeHeader).toHaveText('Thank you for your order!');
    });
  },
);
