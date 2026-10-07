// Tagged @visual only (not @ui) — deliberately excluded from CI's --grep @ui run.
// Font/anti-aliasing rendering differs between macOS (local) and the Ubuntu CI
// runner, so a baseline captured here would flake constantly in CI.
import { test, expect } from '../../fixtures/fixtures';

test(
  'inventory page matches visual baseline',
  { tag: '@visual' },
  async ({ inventoryPage }, testInfo) => {
    // eslint-disable-next-line playwright/no-skipped-test -- intentional: baseline only exists for chromium
    testInfo.skip(
      testInfo.project.name !== 'chromium',
      'baseline maintained only for desktop chromium',
    );
    await expect(inventoryPage.page).toHaveScreenshot('inventory-page.png');
  },
);
