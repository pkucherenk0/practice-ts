// Playwright Test runner config: browsers, retries, reporters, tracing, one typed file.
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,

  // Run test files in parallel across worker processes.
  fullyParallel: true,
  ...(process.env.CI ? { workers: 4 } : {}),
  retries: process.env.CI ? 1 : 0,

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // No shared baseURL: saucedemo (UI) and fakestoreapi (API) are two unrelated
    // demo services, each page object / API client hardcodes its own URL instead.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // Run the whole suite across chromium, firefox, webkit in one command.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    // Mobile emulation only matters for real browser pages, not the API project's
    // request context — restrict these two to tests/ui so API tests skip them.
    {
      name: 'mobile-chrome',
      testDir: './tests/ui',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-safari',
      testDir: './tests/ui',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
